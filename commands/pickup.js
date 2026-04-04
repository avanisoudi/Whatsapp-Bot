export default async function pickup(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Pickup** command executed!\n\n📝 Description: Get a pickup line`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}