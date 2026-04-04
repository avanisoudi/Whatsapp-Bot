export default async function summarize(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Summarize** command executed!\n\n📝 Description: Summarize text`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}