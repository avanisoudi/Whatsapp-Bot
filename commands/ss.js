export default async function ss(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Ss** command executed!\n\n📝 Description: Screenshot website`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}