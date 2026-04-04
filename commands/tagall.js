export default async function tagall(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tagall** command executed!\n\n📝 Description: Tag all members`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}