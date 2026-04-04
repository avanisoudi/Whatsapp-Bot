export default async function report(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Report** command executed!\n\n📝 Description: Report bug`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}