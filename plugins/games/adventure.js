module.exports = {
    name: 'adventure',
    description: 'Commande adventure de la catégorie games.',
    category: 'games',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.adventure* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};