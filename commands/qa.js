export default async function qa(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Qa** command executed!\n\n📝 Description: Question answering`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}