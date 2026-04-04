export default async function concert(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Concert** command executed!\n\n📝 Description: Concert information`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}