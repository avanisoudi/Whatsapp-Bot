export default async function prefix(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Prefix** command executed!\n\n📝 Description: Change prefix`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}