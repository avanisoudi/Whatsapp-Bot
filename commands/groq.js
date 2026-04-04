export default async function groq(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Groq** command executed!\n\n📝 Description: Groq AI`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}