export default async function autostatus(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Autostatus** command executed!\n\n📝 Description: Auto status`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}