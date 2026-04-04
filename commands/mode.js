export default async function mode(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Mode** command executed!\n\n📝 Description: Bot mode`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}