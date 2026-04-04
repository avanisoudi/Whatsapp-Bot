export default async function ping(sock, chatId, message, args, config) {
  const start = Date.now();
  const msg = await sock.sendMessage(chatId, { text: '🏓 Pong!' });
  const latency = Date.now() - start;

  await sock.sendMessage(chatId, { 
    text: `🏓 **Pong!**\n⏱️ Latency: ${latency}ms` 
  }, { quoted: message });
}
