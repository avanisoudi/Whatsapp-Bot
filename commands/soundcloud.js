export default async function soundcloud(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Soundcloud** command executed!\n\n📝 Description: Download SoundCloud`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}