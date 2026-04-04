export default async function github(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Github** command executed!\n\n📝 Description: GitHub user info`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}