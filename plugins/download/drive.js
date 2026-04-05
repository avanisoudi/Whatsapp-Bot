module.exports = {
    name: 'drive',
    description: 'Commande drive de la catégorie download.',
    category: 'download',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.drive* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};