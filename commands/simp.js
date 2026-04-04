export default async function simp(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Simp** command executed!\n\n📝 Description: Simp detector`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}