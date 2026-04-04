export default async function autotyping(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Autotyping** command executed!\n\n📝 Description: Auto typing`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}