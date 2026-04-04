export default async function unban(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Unban** command executed!\n\n📝 Description: Unban member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}