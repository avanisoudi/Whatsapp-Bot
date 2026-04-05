module.exports = {
    name: 'mega',
    description: 'Commande mega de la catégorie download.',
    category: 'download',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.mega* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};