export default async function truth(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Truth** command executed!\n\n📝 Description: Truth question`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}