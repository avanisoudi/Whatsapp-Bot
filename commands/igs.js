export default async function igs(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Igs** command executed!\n\n📝 Description: Instagram sticker search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}