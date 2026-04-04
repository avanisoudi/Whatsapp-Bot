export default async function timezone(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Timezone** command executed!\n\n📝 Description: Set timezone`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}