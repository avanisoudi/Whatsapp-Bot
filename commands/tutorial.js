export default async function tutorial(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tutorial** command executed!\n\n📝 Description: Tutorial`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}