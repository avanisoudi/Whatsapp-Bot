export default async function password(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Password** command executed!\n\n📝 Description: Generate password`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}