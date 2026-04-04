export default async function guide(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Guide** command executed!\n\n📝 Description: User guide`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}