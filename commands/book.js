export default async function book(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Book** command executed!\n\n📝 Description: Book search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}