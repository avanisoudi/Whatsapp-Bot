export default async function song(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Song** command executed!\n\n📝 Description: Download song`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}