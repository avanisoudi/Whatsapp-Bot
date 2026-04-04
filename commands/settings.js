export default async function settings(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Settings** command executed!\n\n📝 Description: Bot settings`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}