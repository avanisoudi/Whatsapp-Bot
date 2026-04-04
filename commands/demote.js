export default async function demote(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Demote** command executed!\n\n📝 Description: Demote member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}