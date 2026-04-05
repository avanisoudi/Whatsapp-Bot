module.exports = {
    name: 'kick',
    description: 'Expulser un membre du groupe.',
    category: 'group',
    async execute(client, m, from, text) {
        if (!m.isGroup) return client.sendMessage(from, { text: "❌ Cette commande est réservée aux groupes !" });
        if (!m.isAdmin) return client.sendMessage(from, { text: "❌ Vous n'êtes pas administrateur !" });
        if (!m.botAdmin) return client.sendMessage(from, { text: "❌ Le bot doit être administrateur !" });
        
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        
        if (!users) return client.sendMessage(from, { text: "⚠️ Mentionnez un utilisateur ou répondez à son message !" });
        
        try {
            await client.groupParticipantsUpdate(from, [users], "remove");
            await client.sendMessage(from, { text: `✅ Utilisateur expulsé avec succès.` });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Impossible d'expulser l'utilisateur." });
        }
    }
};
