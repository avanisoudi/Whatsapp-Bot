export default async function wikipedia(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Wikipedia** command executed!\n\n📝 Description: Wikipedia search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}