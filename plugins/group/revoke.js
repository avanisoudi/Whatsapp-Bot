module.exports = {
    name: 'revoke',
    description: 'Commande revoke de la catégorie group.',
    category: 'group',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.revoke* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};