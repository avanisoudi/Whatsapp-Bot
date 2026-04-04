export default async function autoread(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Autoread** command executed!\n\n📝 Description: Auto read messages`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}