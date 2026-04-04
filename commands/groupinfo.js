export default async function groupinfo(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Groupinfo** command executed!\n\n📝 Description: Group information`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}