export default async function series(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Series** command executed!\n\n📝 Description: Search TV series`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}