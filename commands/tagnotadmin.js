export default async function tagnotadmin(sock, chatId, message, args, config) {
  try {
    const response = `✅ **Tagnotadmin** command executed!\n\n📝 Description: Tag non-admins`;
    await sock.sendMessage(chatId, { text: response }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` }, { quoted: message });
  }
}