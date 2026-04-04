import { default as makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import QRCode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
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
  publicMode: process.env.PUBLIC_MODE !== 'false'
};

// Ensure session directory exists
if (!fs.existsSync(config.sessionDir)) {
  fs.mkdirSync(config.sessionDir, { recursive: true });
}

// Import command modules
const commandsPath = path.join(__dirname, 'commands');
const commands = new Map();

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
      printQRInTerminal: true,
      auth: state,
      browser: ['Ubuntu', 'Chrome', '121.0']
    });

    // Load commands
    await loadCommands();

    // Handle QR code
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;
      
      if (qr) {
        logger.info('📱 Scan this QR code with WhatsApp:');
        QRCode.generate(qr, { small: true });
      }
      
      if (connection === 'open') {
        logger.info('✅ Bot connected successfully!');
      }
      
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        logger.error('❌ Connection closed. Reason:', lastDisconnect?.error);
        if (shouldReconnect) {
          logger.info('🔄 Attempting to reconnect...');
          startBot();
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
        
        logger.info(`📨 Command: ${commandName} | From: ${senderId} | Group: ${isGroup}`);
        
        // Execute command
        const command = commands.get(commandName);
        if (command) {
          try {
            await command(sock, chatId, message, commandArgs, config);
          } catch (error) {
            logger.error(`Error executing command ${commandName}:`, error.message);
            await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
          }
        } else {
          // Command not found - show help
          await sock.sendMessage(chatId, { 
            text: `❌ Command not found: ${commandName}\n\nUse ${config.prefix}help to see all available commands.` 
          }, { quoted: message });
        }
      } catch (error) {
        logger.error('Error processing message:', error);
      }
    });

  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

// Start the bot
logger.info('🚀 Starting Unified WhatsApp Bot...');
startBot().catch(error => {
  logger.error('Failed to start bot:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('👋 Bot shutting down gracefully...');
  process.exit(0);
});
