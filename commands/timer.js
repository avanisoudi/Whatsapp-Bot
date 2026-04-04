export default async function timer(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Timer** command executed!\n\n📝 Description: Set timer`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}