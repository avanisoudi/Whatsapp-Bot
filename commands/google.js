export default async function google(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Google** command executed!\n\n📝 Description: Google search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}