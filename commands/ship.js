export default async function ship(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ship** command executed!\n\n📝 Description: Ship compatibility`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}