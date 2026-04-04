export default async function notes(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Notes** command executed!\n\n📝 Description: Note taking`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}