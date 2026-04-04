export default async function vote(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Vote** command executed!\n\n📝 Description: Vote on poll`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}