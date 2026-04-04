export default async function removebg(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Removebg** command executed!\n\n📝 Description: Remove background`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}