export default async function hangman(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Hangman** command executed!\n\n📝 Description: Play hangman game`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}