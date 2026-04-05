require('dotenv').config();
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    jidDecode
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const phoneNumber = "237692386361";
const botName = "AVANI Bot";
const prefix = ".";

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

// Chargeur de plugins
const plugins = new Map();
function loadPlugins() {
    const pluginFolders = fs.readdirSync(path.join(__dirname, 'plugins'));
    for (const folder of pluginFolders) {
        const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins', folder)).filter(file => file.endsWith('.js'));
        for (const file of pluginFiles) {
            const plugin = require(path.join(__dirname, 'plugins', folder, file));
            plugins.set(plugin.name, plugin);
        }
    }
    console.log(chalk.green(`✅ ${plugins.size} commandes chargées.`));
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const client = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    if (!client.authState.creds.registered) {
        console.log(chalk.cyan.bold(`\n🛡️  ${botName.toUpperCase()} - CONNEXION\n`));
        setTimeout(async () => {
            let code = await client.requestPairingCode(phoneNumber);
            code = code?.match(/.{1,4}/g)?.join("-") || code;
            console.log(chalk.white.bgCyan.bold(` VOTRE CODE : ${code} `));
        }, 3000);
    }

    client.ev.on('creds.update', saveCreds);
    loadPlugins();

    client.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message || m.key.fromMe) return;
            
            const from = m.key.remoteJid;
            const messageType = Object.keys(m.message)[0];
            const body = (messageType === 'conversation') ? m.message.conversation : (messageType === 'extendedTextMessage') ? m.message.extendedTextMessage.text : (messageType === 'imageMessage') ? m.message.imageMessage.caption : (messageType === 'videoMessage') ? m.message.videoMessage.caption : '';
            
            if (!body.startsWith(prefix)) return;
            
            const args = body.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const text = args.join(" ");

            const plugin = plugins.get(commandName);
            if (plugin) {
                // Simulation de permissions simples
                m.isGroup = from.endsWith('@g.us');
                m.sender = m.key.participant || m.key.remoteJid;
                // Exécution du plugin
                await plugin.execute(client, m, from, text);
            } else if (commandName === 'menu' || commandName === 'help') {
                let menuText = `✨ *${botName.toUpperCase()} - VERSION ILLIMITÉE* ✨\n\n`;
                const categories = {};
                plugins.forEach(p => {
                    if (!categories[p.category]) categories[p.category] = [];
                    categories[p.category].push(p.name);
                });

                for (const cat in categories) {
                    menuText += `*${cat.toUpperCase()}* : ${categories[cat].map(n => '.' + n).join(', ')}\n\n`;
                }
                menuText += `\n🚀 *Plus de 150 commandes disponibles !*`;
                await client.sendMessage(from, { text: menuText }, { quoted: m });
            }
        } catch (err) {
            console.error(err);
        }
    });

    client.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') console.log(chalk.green(`\n✅ ${botName} est prêt sur Katabump !`));
        if (connection === 'close') startBot();
    });
}

startBot();
