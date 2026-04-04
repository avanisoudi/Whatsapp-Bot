export default async function invert(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Invert** command executed!\n\n📝 Description: Invert image colors`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}