export default async function spell(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Spell** command executed!\n\n📝 Description: Spell check`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}