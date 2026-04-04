export default async function kick(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Kick** command executed!\n\n📝 Description: Kick member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}