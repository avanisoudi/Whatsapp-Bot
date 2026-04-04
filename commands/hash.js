export default async function hash(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Hash** command executed!\n\n📝 Description: Hash text`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}