export default async function random(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Random** command executed!\n\n📝 Description: Random number`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}