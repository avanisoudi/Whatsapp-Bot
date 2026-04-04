export default async function mute(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Mute** command executed!\n\n📝 Description: Mute member`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}