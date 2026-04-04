export default async function play(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Play** command executed!\n\n📝 Description: Play music`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}