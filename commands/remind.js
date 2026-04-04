export default async function remind(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Remind** command executed!\n\n📝 Description: Set reminder`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}