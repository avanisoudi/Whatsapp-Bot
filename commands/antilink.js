// Gestionnaire global de l'état antilien par groupe
// En production, il est recommandé d'utiliser une base de données (SQLite/MongoDB)
export const antilinkState = new Set();

export default async function antilink(sock, chatId, message, args, config) {
  const isGroup = chatId.endsWith('@g.us');
  if (!isGroup) {
    return await sock.sendMessage(chatId, { text: '❌ Cette commande ne peut être utilisée que dans un groupe.' }, { quoted: message });
  }

  try {
    const groupMetadata = await sock.groupMetadata(chatId);
    const senderId = message.key.participant || message.key.remoteJid;
    const participant = groupMetadata.participants.find(p => p.id === senderId);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');

    if (!isAdmin) {
      return await sock.sendMessage(chatId, { text: '❌ Vous devez être administrateur du groupe pour configurer l\'Anti-Link.' }, { quoted: message });
    }

    const action = args[0]?.toLowerCase();

    if (action === 'on') {
      antilinkState.add(chatId);
      await sock.sendMessage(chatId, { text: '🛡️ *Anti-Link Activé* :\n\nTous les liens envoyés par des membres (non-admins) seront désormais supprimés automatiquement.' }, { quoted: message });
    } else if (action === 'off') {
      antilinkState.delete(chatId);
      await sock.sendMessage(chatId, { text: '🛡️ *Anti-Link Désactivé*.' }, { quoted: message });
    } else {
      const status = antilinkState.has(chatId) ? 'Activé ✅' : 'Désactivé ❌';
      await sock.sendMessage(chatId, { text: `🛡️ *Statut Anti-Link* : ${status}\n\nUtilisation : \n.antilink on  - Activer\n.antilink off - Désactiver` }, { quoted: message });
    }
  } catch (error) {
    console.error('Erreur Antilink:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur : ${error.message}` }, { quoted: message });
  }
}
