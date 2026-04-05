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

// Correction du store (pour éviter l'erreur de type function)
const store = makeInMemoryStore ? makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) }) : null;

// Chargeur de plugins simplifié
const plugins = new Map();
function loadPlugins() {
    const pluginDir = path.join(__dirname, 'plugins');
    if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);
    
    const folders = fs.readdirSync(pluginDir);
    for (const folder of folders) {
        const folderPath = path.join(pluginDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                try {
                    const plugin = require(path.join(folderPath, file));
                    if (plugin.name) plugins.set(plugin.name, plugin);
                } catch (e) {
                    console.log(chalk.red(`Erreur chargement ${file}: ${e.message}`));
                }
            }
        }
    }
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

    // Sauvegarde automatique des identifiants
    client.ev.on('creds.update', saveCreds);

    // Demande de Pairing Code automatique
    if (!client.authState.creds.registered) {
        console.log(chalk.cyan.bold(`\n🛡️  ${botName.toUpperCase()} - CONNEXION EN COURS...\n`));
        setTimeout(async () => {
            try {
                let code = await client.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(chalk.white.bgCyan.bold(`\n VOTRE CODE DE COUPLAGE : ${code} \n`));
                console.log(chalk.gray(`Entrez ce code sur votre WhatsApp (Appareils connectés > Connecter par code)\n`));
            } catch (err) {
                console.log(chalk.red("Erreur génération code: " + err.message));
            }
        }, 3000);
    }

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
                await plugin.execute(client, m, from, text);
            } else if (commandName === 'menu' || commandName === 'help') {
                let menuText = `✨ *${botName.toUpperCase()} - ILLIMITÉ* ✨\n\n`;
                const categories = {};
                plugins.forEach(p => {
                    if (!categories[p.category]) categories[p.category] = [];
                    categories[p.category].push(p.name);
                });

                for (const cat in categories) {
                    menuText += `*${cat.toUpperCase()}* : ${categories[cat].map(n => '.' + n).join(', ')}\n\n`;
                }
                menuText += `🚀 *Plus de 150 commandes prêtes !*`;
                await client.sendMessage(from, { text: menuText }, { quoted: m });
            }
        } catch (err) {
            console.error("Erreur message:", err);
        }
    });

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            console.log(chalk.green.bold(`\n✅ ${botName} est EN LIGNE !`));
        }
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) startBot();
            else console.log(chalk.red("Déconnecté. Supprimez le dossier 'session' pour relancer."));
        }
    });
}

startBot().catch(err => console.log(chalk.red("Crash critique: " + err.message)));
