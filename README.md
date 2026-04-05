# 🛡️ Bot de Modération "Forteresse" v3.0.0

A powerful, robust, and easy-to-deploy moderation bot for Discord and Telegram, featuring advanced **Anti-X protections** and automated security.

## 🚀 Deployment in 5 Minutes

### 1. Prerequisites
- **Python 3.9+** installed.
- **Node.js & PM2** (optional but recommended for production).
- A bot **TOKEN** from [Discord Developer Portal](https://discord.com/developers/applications).

### 2. Automatic Installation
**On Linux/macOS:**
```bash
chmod +x install.sh
./install.sh
```

**On Windows:**
```cmd
install.bat
```

### 3. Configuration
1. Open the `.env` file created during installation.
2. Replace `VOTRE_TOKEN_ICI` with your bot's token.
3. Customize thresholds in `config/antispam.yml` and `config/whitelist.yml`.

### 4. Start the Bot
**On Linux/macOS (with PM2):**
```bash
chmod +x start.sh
./start.sh
```

**Manually (without PM2):**
```bash
source venv/bin/activate
python main.py
```

---

## 🛡️ Anti-X Protections (20 Filters)

| Protection | Description | Status |
|---|---|---|
| **Anti-Spam** | Blocks repeated messages and emoji flooding. | ✅ Active |
| **Anti-Link** | Deletes unauthorized Discord invites and blacklisted URLs. | ✅ Active |
| **Anti-Raid** | Detects massive influx of members in a short time. | ✅ Active |
| **Anti-Mention** | Limits @everyone, @here, and excessive role mentions. | ✅ Active |
| **Anti-Ghost-Ping** | Detects and warns users who delete messages with mentions. | ✅ Active |
| **Anti-Caps** | Blocks messages with more than 70% uppercase letters. | ✅ Active |
| **Anti-Bot** | Detects and quarantines suspicious or new accounts. | ✅ Active |
| **Anti-Unicode** | Blocks invisible characters and spoofing attempts. | ✅ Active |
| **Anti-Media** | Restricts photos and videos to authorized channels. | ✅ Active |
| **Anti-Invite-Bot** | Blocks unauthorized bot invite links (OAuth2). | ✅ Active |
| **Anti-Mass-DM** | Detects users sending massive private messages. | ✅ Active |
| **Anti-Flood** | Limits files and commands per second per user. | ✅ Active |
| **Anti-Mass-Role** | Blocks rapid adding or removing of roles. | ✅ Active |
| **Anti-Mass-Channel** | Detects rapid creation or deletion of channels. | ✅ Active |
| **Anti-Mass-Ban** | Blocks users banning members in rapid succession. | ✅ Active |
| **Anti-Mass-Kick** | Blocks users kicking members in rapid succession. | ✅ Active |
| **Anti-Status** | Monitors abusive nickname or status changes. | ✅ Active |
| **Anti-Transfer** | Detects users joining and leaving quickly. | ✅ Active |
| **Anti-Webhook** | Monitors and restricts unauthorized webhook usage. | ✅ Active |
| **Anti-Emoji** | Limits the number of emojis per message. | ✅ Active |

---

## 🛠️ Commands

### 🔨 Moderation
- `.kick @user [reason]` - Kick a member.
- `.ban @user [reason]` - Ban a member.
- `.clear [amount]` - Delete messages in bulk.

### 🛡️ Anti-X Management
- `.anti spam on/off` - Enable/Disable Anti-Spam.
- `.anti link on/off` - Enable/Disable Anti-Link.
- `.anti status` - Show current protection status.

### 📊 Utility
- `.ping` - Show bot latency.
- `.stats` - Show system and bot statistics (CPU, RAM, Uptime).

---

## 🐛 Bug Fixes in v3.0.0
- **Memory Leaks**: Fixed by using efficient caching and proper event cleanup.
- **Timeouts**: Handled with global `asyncio` timeouts and retry logic.
- **Race Conditions**: Resolved using `asyncio.Lock` for sensitive operations.
- **Sanitization**: All user inputs are sanitized before processing.
- **Logging**: Implemented rotating logs (5MB max, 5 backups) to prevent disk saturation.

---

## 🤝 Support & License
- **Author**: Manus AI
- **License**: MIT
- **Support**: Join our [Discord Support Server](https://discord.gg/manus-ai)

**Remember**: This bot is for educational purposes. Use responsibly and respect Discord's Terms of Service.
