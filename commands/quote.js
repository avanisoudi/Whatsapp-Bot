export default async function quote(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Quote** command executed!\n\n📝 Description: Get an inspirational quote`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}