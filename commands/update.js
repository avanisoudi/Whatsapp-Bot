export default async function update(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Update** command executed!\n\n📝 Description: Update bot`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}