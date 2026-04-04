export default async function owner(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Owner** command executed!\n\n📝 Description: Owner information`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}