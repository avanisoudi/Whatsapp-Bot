export default async function encode(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Encode** command executed!\n\n📝 Description: Encode text`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}