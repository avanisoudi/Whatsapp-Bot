export default async function movie(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Movie** command executed!\n\n📝 Description: Search movies`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}