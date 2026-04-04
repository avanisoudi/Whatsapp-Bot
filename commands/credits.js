export default async function credits(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Credits** command executed!\n\n📝 Description: Bot credits`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}