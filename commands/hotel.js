export default async function hotel(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Hotel** command executed!\n\n📝 Description: Hotel search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}