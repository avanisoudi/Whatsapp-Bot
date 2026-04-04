export default async function ytmp4(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ytmp4** command executed!\n\n📝 Description: YouTube to MP4`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}