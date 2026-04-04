export default async function barcode(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Barcode** command executed!\n\n📝 Description: Generate barcode`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}