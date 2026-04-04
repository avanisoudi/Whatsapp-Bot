export default async function video(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Video** command executed!\n\n📝 Description: Download video`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}