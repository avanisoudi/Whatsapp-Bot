export default async function youtube(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Youtube** command executed!\n\n📝 Description: Download YouTube`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}