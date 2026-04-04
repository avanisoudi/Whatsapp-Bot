export default async function artist(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Artist** command executed!\n\n📝 Description: Artist information`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}