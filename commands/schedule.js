export default async function schedule(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Schedule** command executed!\n\n📝 Description: Schedule message`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}