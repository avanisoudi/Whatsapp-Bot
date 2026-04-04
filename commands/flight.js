export default async function flight(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Flight** command executed!\n\n📝 Description: Flight search`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}