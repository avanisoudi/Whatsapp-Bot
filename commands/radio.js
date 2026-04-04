export default async function radio(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Radio** command executed!\n\n📝 Description: Radio stations`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}