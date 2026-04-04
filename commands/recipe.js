export default async function recipe(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Recipe** command executed!\n\n📝 Description: Recipe search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}