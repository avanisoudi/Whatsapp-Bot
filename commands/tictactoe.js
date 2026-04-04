export default async function tictactoe(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tictactoe** command executed!\n\n📝 Description: Play tic-tac-toe`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}