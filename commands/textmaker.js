export default async function textmaker(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Textmaker** command executed!\n\n📝 Description: Create text art`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}