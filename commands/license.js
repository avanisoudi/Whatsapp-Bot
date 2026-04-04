export default async function license(sock, chatId, message, args, config) {
  try {
    const response = `✅ **License** command executed!\n\n📝 Description: Bot license`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}