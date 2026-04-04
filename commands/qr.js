export default async function qr(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Qr** command executed!\n\n📝 Description: Generate QR code`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}