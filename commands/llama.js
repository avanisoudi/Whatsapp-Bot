export default async function llama(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Llama** command executed!\n\n📝 Description: Llama model`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}