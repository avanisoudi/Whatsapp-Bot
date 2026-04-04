export default async function insult(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Insult** command executed!\n\n📝 Description: Get a funny insult`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}