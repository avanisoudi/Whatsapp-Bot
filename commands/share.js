export default async function share(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Share** command executed!\n\n📝 Description: Share bot`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}