export default async function todo(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Todo** command executed!\n\n📝 Description: Todo list`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}