module.exports = {
    name: 'tr',
    description: 'Commande tr de la catégorie tools.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.tr* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};