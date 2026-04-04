export default async function decode(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Decode** command executed!\n\n📝 Description: Decode text`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}