export default async function donate(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Donate** command executed!\n\n📝 Description: Donation info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}