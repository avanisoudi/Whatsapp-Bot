export default async function album(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Album** command executed!\n\n📝 Description: Album information`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}