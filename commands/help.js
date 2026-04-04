export default async function help(sock, chatId, message, args, config) {
  const helpText = `
╔════════════════════════════════════════╗
║     🤖 ${config.botName} - HELP MENU 🤖      ║
╚════════════════════════════════════════╝

📋 **COMMAND CATEGORIES:**

🎮 **ENTERTAINMENT**
${config.prefix}joke - Get a random joke
${config.prefix}meme - Get a random meme
${config.prefix}quote - Get an inspirational quote
${config.prefix}fact - Get a fun fact
${config.prefix}trivia - Play trivia game
${config.prefix}truth - Truth or Dare
${config.prefix}dare - Dare challenge
${config.prefix}hangman - Play hangman
${config.prefix}tictactoe - Play tic-tac-toe
${config.prefix}eightball - Magic 8-ball

🎨 **MEDIA & EDITING**
${config.prefix}sticker - Convert image to sticker
${config.prefix}attp - Create text art sticker
${config.prefix}tts - Text to speech
${config.prefix}img-blur - Blur image
${config.prefix}removebg - Remove background
${config.prefix}remini - Enhance image
${config.prefix}textmaker - Create text art

🎵 **MUSIC & VIDEO**
${config.prefix}play - Play music
${config.prefix}song - Download song
${config.prefix}video - Download video
${config.prefix}tiktok - Download TikTok video
${config.prefix}instagram - Download Instagram post
${config.prefix}facebook - Download Facebook video
${config.prefix}spotify - Get Spotify info
${config.prefix}lyrics - Get song lyrics

🔍 **SEARCH & INFO**
${config.prefix}weather - Get weather info
${config.prefix}news - Get latest news
${config.prefix}github - Get GitHub user info
${config.prefix}anime - Search anime
${config.prefix}movie - Search movies
${config.prefix}pinterest - Search Pinterest
${config.prefix}reddit - Search Reddit

👥 **GROUP MANAGEMENT**
${config.prefix}promote - Promote member
${config.prefix}demote - Demote member
${config.prefix}kick - Kick member
${config.prefix}ban - Ban member
${config.prefix}unban - Unban member
${config.prefix}mute - Mute member
${config.prefix}unmute - Unmute member
${config.prefix}tagall - Tag all members
${config.prefix}mention - Mention members
${config.prefix}groupinfo - Group information
${config.prefix}resetlink - Reset group link
${config.prefix}welcome - Set welcome message

⚙️ **BOT SETTINGS**
${config.prefix}ping - Bot latency
${config.prefix}alive - Bot status
${config.prefix}settings - Bot settings
${config.prefix}owner - Owner information
${config.prefix}sudo - Sudo commands
${config.prefix}clear - Clear chat
${config.prefix}delete - Delete message
${config.prefix}update - Update bot

🎯 **UTILITY**
${config.prefix}translate - Translate text
${config.prefix}ss - Screenshot website
${config.prefix}url - Shorten URL
${config.prefix}qr - Generate QR code
${config.prefix}calc - Calculator
${config.prefix}timer - Set timer
${config.prefix}remind - Set reminder

✨ **SPECIAL FEATURES**
${config.prefix}ai - AI chat (GPT/Gemini)
${config.prefix}chatbot - Chat with bot
${config.prefix}imagine - Generate image
${config.prefix}sora - AI video generation
${config.prefix}character - Character info

📞 **CONTACT**
For support, use: ${config.prefix}support

═══════════════════════════════════════

💡 **TIPS:**
- Use ${config.prefix}command --help for command details
- All commands are FREE - no premium restrictions!
- Report bugs: ${config.prefix}report <issue>

═══════════════════════════════════════
`;

  await sock.sendMessage(chatId, { text: helpText }, { quoted: message });
}
