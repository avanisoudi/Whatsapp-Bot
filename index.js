import {
  default as makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logger setup
const logger = pino({ transport: { target: 'pino-pretty' } });

// Bot configuration
const config = {
  botName: process.env.BOT_NAME || 'Unified Bot',
  prefix: process.env.PREFIX || '.',
  sessionDir: process.env.SESSION_DIR || './session',
  ownerNumber: process.env.OWNER_NUMBER || '',
  publicMode: process.env.PUBLIC_MODE !== 'false',
  // Numéro de téléphone pour le Pairing Code (format international sans +, ex: 212612345678)
  phoneNumber: process.env.PHONE_NUMBER || ''
};

// Ensure session directory exists
if (!fs.existsSync(config.sessionDir)) {
  fs.mkdirSync(config.sessionDir, { recursive: true });
}

// Import command modules
const commandsPath = path.join(__dirname, 'commands');
const commands = new Map();

// Utility : ask a question in the terminal and return the answer
function question(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Load all commands
async function loadCommands() {
  if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
  }

  const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const command = await import(path.join(commandsPath, file));
      const cmdName = file.replace('.js', '');
      if (command.default && typeof command.default === 'function') {
        commands.set(cmdName, command.default);
        logger.info(`✅ Command loaded: ${cmdName}`);
      }
    } catch (error) {
      logger.error(`❌ Error loading command ${file}:`, error.message);
    }
  }

  logger.info(`📦 Total commands loaded: ${commands.size}`);
}

// Main bot function
async function startBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionDir);

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      // Désactiver le QR code dans le terminal
      printQRInTerminal: false,
      auth: state,
      browser: ['Ubuntu', 'Chrome', '121.0']
    });

    // ─── Connexion via Pairing Code ──────────────────────────────────────────
    // Le Pairing Code n'est disponible que si la session n'est pas encore établie
    if (!sock.authState.creds.registered) {
      // Récupérer le numéro de téléphone : priorité à .env, sinon demander dans le terminal
      let phoneNumber = config.phoneNumber;

      if (!phoneNumber) {
        logger.info('');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('  🔐  CONNEXION VIA CODE DE COUPLAGE (PAIRING CODE)');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('  Entrez votre numéro au format international sans le +');
        logger.info('  Exemple : 212612345678  (Maroc)  |  33612345678  (France)');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('');
        phoneNumber = await question('📱 Votre numéro WhatsApp : ');
      }

      // Nettoyer le numéro (supprimer espaces, tirets, +)
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

      if (!phoneNumber) {
        logger.error('❌ Numéro de téléphone invalide. Arrêt du bot.');
        process.exit(1);
      }

      // Demander le Pairing Code à Baileys
      try {
        const pairingCode = await sock.requestPairingCode(phoneNumber);
        logger.info('');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info(`  🔑  VOTRE CODE DE COUPLAGE : ${pairingCode}`);
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('  📲  Comment l\'utiliser :');
        logger.info('      1. Ouvrez WhatsApp sur votre téléphone');
        logger.info('      2. Allez dans  Paramètres > Appareils connectés');
        logger.info('      3. Appuyez sur  "Connecter un appareil"');
        logger.info('      4. Choisissez  "Connexion par code"');
        logger.info(`      5. Entrez le code :  ${pairingCode}`);
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('  ⏳  En attente de la confirmation sur WhatsApp...');
        logger.info('');
      } catch (err) {
        logger.error('❌ Impossible de générer le code de couplage :', err.message);
        logger.error('   Vérifiez que votre numéro est correct et réessayez.');
        process.exit(1);
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Load commands
    await loadCommands();

    // Handle connection events
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        logger.info('✅ Bot connecté avec succès via Pairing Code !');
        logger.info(`🤖 Bot : ${config.botName} | Préfixe : ${config.prefix}`);
      }

      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        logger.error('❌ Connexion fermée. Raison :', lastDisconnect?.error?.message || 'inconnue');
        if (shouldReconnect) {
          logger.info('🔄 Tentative de reconnexion...');
          startBot();
        } else {
          logger.warn('🚪 Session expirée. Supprimez le dossier session/ et relancez le bot.');
        }
      }
    });

    // Save credentials
    sock.ev.on('creds.update', saveCreds);

    // Handle incoming messages
    sock.ev.on('messages.upsert', async (m) => {
      try {
        const message = m.messages[0];

        if (!message.message || message.key.fromMe) return;

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');

        // Extract text from message
        const text = (
          message.message?.conversation ||
          message.message?.extendedTextMessage?.text ||
          message.message?.imageMessage?.caption ||
          message.message?.videoMessage?.caption ||
          ''
        ).toLowerCase().trim();

        if (!text.startsWith(config.prefix)) return;

        // Parse command and arguments
        const args = text.slice(config.prefix.length).trim().split(/\s+/);
        const commandName = args[0];
        const commandArgs = args.slice(1);

        logger.info(`📨 Commande : ${commandName} | De : ${senderId} | Groupe : ${isGroup}`);

        // Execute command
        const command = commands.get(commandName);
        if (command) {
          try {
            await command(sock, chatId, message, commandArgs, config);
          } catch (error) {
            logger.error(`Erreur lors de l'exécution de ${commandName} :`, error.message);
            await sock.sendMessage(
              chatId,
              { text: `❌ Erreur : ${error.message}` },
              { quoted: message }
            );
          }
        } else {
          await sock.sendMessage(
            chatId,
            {
              text: `❌ Commande introuvable : ${commandName}\n\nUtilisez ${config.prefix}help pour voir toutes les commandes disponibles.`
            },
            { quoted: message }
          );
        }
      } catch (error) {
        logger.error('Erreur lors du traitement du message :', error);
      }
    });

  } catch (error) {
    logger.error('Erreur fatale :', error);
    process.exit(1);
  }
}

// Start the bot
logger.info('🚀 Démarrage du Unified WhatsApp Bot...');
startBot().catch(error => {
  logger.error('Échec du démarrage du bot :', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('👋 Arrêt propre du bot...');
  process.exit(0);
});
