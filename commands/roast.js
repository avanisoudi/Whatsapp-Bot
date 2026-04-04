export default async function roast(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Roast** command executed!\n\n📝 Description: Get a roast`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}