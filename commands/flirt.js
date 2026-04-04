export default async function flirt(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Flirt** command executed!\n\n📝 Description: Flirting tips`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}