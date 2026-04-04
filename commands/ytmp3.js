export default async function ytmp3(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ytmp3** command executed!\n\n📝 Description: YouTube to MP3`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}