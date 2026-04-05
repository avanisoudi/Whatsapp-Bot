# 🤖 Unified WhatsApp Bot (Version Ultime)

A powerful, unified WhatsApp bot with **200+ commands**, featuring advanced AI, Media Downloaders, and Group Management. Fully functional, no premium restrictions, and completely free!

## ✨ New "Ultime" Features

- 🤖 **Advanced AI** : Integrated **ChatGPT** and **Gemini Pro** for smart conversations.
- 🎨 **AI Image Generation** : Generate high-quality images with `.imagine` (Flux/DALL-E model).
- 📱 **Social Media Downloader** : 
  - **TikTok** : Download videos without watermark.
  - **YouTube** : Search and download music/videos directly.
- 🛡️ **Group Security** : 
  - **Anti-Link** : Automatically delete links from non-admins.
  - **XP/Rank System** : Track member activity with levels and ranks.
- ✅ **No Premium Restrictions** - All features are FREE for everyone.
- ✅ **No External Links** - Completely clean, no WhatsApp group/channel links.
- ✅ **Pairing Code Login** - Connect without scanning QR code.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- FFmpeg (for media processing)

### Installation

1. **Clone or download the bot**
```bash
git clone <repository-url>
cd unified-whatsapp-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Configure your phone number** *(optional but recommended)*

Open your `.env` file and set your WhatsApp number (international format, no `+`):
```env
PHONE_NUMBER=212612345678
```
If left empty, the bot will ask for it at startup.

5. **Start the bot**
```bash
npm start
```

6. **Connect via Pairing Code** *(replaces QR code)*
- A **8-character pairing code** will appear in the terminal
- Open WhatsApp on your phone
- Go to **Settings > Linked Devices > Link a Device**
- Tap **"Link with phone number instead"**
- Enter the pairing code shown in the terminal
- Bot will connect automatically — no QR code needed!

## 📋 Command Categories

### 🎮 Entertainment (20 commands)
- `.joke` - Random joke
- `.meme` - Random meme
- `.quote` - Inspirational quote
- `.fact` - Fun fact
- `.trivia` - Trivia game
- `.truth` - Truth question
- `.dare` - Dare challenge
- `.hangman` - Hangman game
- `.tictactoe` - Tic-tac-toe game
- `.eightball` - Magic 8-ball
- And 10+ more...

### 🎨 Media & Editing (20 commands)
- `.sticker` - Convert image to sticker
- `.attp` - Text art sticker
- `.tts` - Text to speech
- `.removebg` - Remove background
- `.remini` - Enhance image
- `.qr` - Generate QR code
- And 14+ more...

### 🎵 Music & Video (20 commands)
- `.play` - Play music
- `.song` - Download song
- `.video` - Download video
- `.tiktok` - Download TikTok
- `.instagram` - Download Instagram
- `.spotify` - Spotify info
- `.lyrics` - Song lyrics
- And 13+ more...

### 🔍 Search & Info (20 commands)
- `.weather` - Weather info
- `.news` - Latest news
- `.github` - GitHub user info
- `.anime` - Search anime
- `.movie` - Search movies
- `.wikipedia` - Wikipedia search
- And 14+ more...

### 👥 Group Management (20 commands)
- `.promote` - Promote member
- `.demote` - Demote member
- `.kick` - Kick member
- `.ban` - Ban member
- `.mute` - Mute member
- `.tagall` - Tag all members
- `.groupinfo` - Group info
- And 13+ more...

### ⚙️ Bot Settings (20 commands)
- `.ping` - Bot latency
- `.alive` - Bot status
- `.settings` - Bot settings
- `.owner` - Owner info
- `.mode` - Bot mode
- `.prefix` - Change prefix
- And 14+ more...

### 🎯 Utility (20 commands)
- `.translate` - Translate text
- `.calc` - Calculator
- `.timer` - Set timer
- `.remind` - Set reminder
- `.todo` - Todo list
- `.poll` - Create poll
- And 14+ more...

### ✨ AI & Special (27+ commands)
- `.ai` - AI chat
- `.gpt` - ChatGPT
- `.gemini` - Gemini AI
- `.imagine` - Generate image
- `.summarize` - Summarize text
- And 22+ more...

## 🎯 Usage Examples

```
.help              - Show all commands
.alive             - Check bot status
.ping              - Bot latency
.joke              - Get a joke
.weather London    - Get weather
.translate hello   - Translate text
.play song name    - Play music
.sticker           - Convert to sticker (reply to image)
.tagall            - Tag all members (group only)
.promote @user     - Promote user (group only)
```

## ⚙️ Configuration

Edit `.env` file to customize:

```env
BOT_NAME=Unified Bot          # Bot name
OWNER_NUMBER=1234567890       # Owner WhatsApp number
PREFIX=.                      # Command prefix
PHONE_NUMBER=212612345678     # Your WhatsApp number (international, no +)
PUBLIC_MODE=true              # Public or private mode
SESSION_DIR=./session         # Session storage location
```

> **Note:** `PHONE_NUMBER` is used for the **Pairing Code** authentication method.
> If not set in `.env`, the bot will prompt you to enter it in the terminal at startup.

## 🛠️ Adding New Commands

1. Create a new file in `commands/` folder:
```bash
touch commands/mycommand.js
```

2. Write your command:
```javascript
export default async function mycommand(sock, chatId, message, args, config) {
  const response = "Your command response here";
  await sock.sendMessage(chatId, { text: response }, { quoted: message });
}
```

3. Command will be automatically loaded!

## 📊 Command Statistics

- **Total Commands:** 187+
- **Entertainment:** 20
- **Media & Editing:** 20
- **Music & Video:** 20
- **Search & Info:** 20
- **Group Management:** 20
- **Bot Settings:** 20
- **Utility:** 20
- **AI & Special:** 27+

## 🔒 Security & Privacy

- ✅ No data collection
- ✅ No external links
- ✅ No premium restrictions
- ✅ Open source
- ✅ All commands are local
- ✅ Session data stored locally

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Found a bug or want to add a command? Feel free to contribute!

## 📞 Support

For issues and questions:
- Use `.support` command in WhatsApp
- Check command help: `.help`
- Report bugs: `.report <issue>`

## 🙏 Credits

- **Baileys** - WhatsApp Web API
- **Knightbot-MD** - Original command base
- **Levanter** - Plugin system inspiration
- **Community** - Feedback and contributions

---

**Made with ❤️ for WhatsApp Bot Enthusiasts**

**Remember:** This bot is for educational purposes. Use responsibly and respect WhatsApp's Terms of Service.
