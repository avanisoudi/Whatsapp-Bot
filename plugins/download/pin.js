module.exports = {
    name: 'pin',
    description: 'Commande pin de la catégorie download.',
    category: 'download',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.pin* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};