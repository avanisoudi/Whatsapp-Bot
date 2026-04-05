module.exports = {
    name: 'demote',
    description: 'Commande demote de la catégorie group.',
    category: 'group',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.demote* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};