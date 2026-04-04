export default async function base64(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Base64** command executed!\n\n📝 Description: Base64 encode/decode`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}