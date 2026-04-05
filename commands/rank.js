// Gestionnaire global de l'XP par utilisateur
// En production, il est recommandé d'utiliser une base de données (SQLite/MongoDB)
export const userXP = new Map();

export default async function rank(sock, chatId, message, args, config) {
  const isGroup = chatId.endsWith('@g.us');
  if (!isGroup) {
    return await sock.sendMessage(chatId, { text: '❌ Cette commande ne peut être utilisée que dans un groupe.' }, { quoted: message });
  }

  try {
    const senderId = message.key.participant || message.key.remoteJid;
    const xp = userXP.get(senderId) || 0;
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;
    const nextLevelXP = Math.pow(level, 2) * 100;
    const progress = Math.floor((xp / nextLevelXP) * 100);

    const caption = `📊 *VOTRE CLASSEMENT* :\n\n👤 *Utilisateur* : @${senderId.split('@')[0]}\n⭐ *Niveau* : ${level}\n📈 *XP* : ${xp} / ${nextLevelXP}\n🔥 *Progression* : ${progress}%\n\n_Envoyez plus de messages pour monter en grade !_`;

    await sock.sendMessage(chatId, { 
      text: caption, 
      mentions: [senderId] 
    }, { quoted: message });
  } catch (error) {
    console.error('Erreur Rank:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur : ${error.message}` }, { quoted: message });
  }
}
