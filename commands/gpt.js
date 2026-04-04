export default async function gpt(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Gpt** command executed!\n\n📝 Description: GPT chat`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}