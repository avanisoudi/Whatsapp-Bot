export default async function achievement(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Achievement** command executed!\n\n📝 Description: Achievements`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}