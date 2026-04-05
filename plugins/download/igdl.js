module.exports = {
    name: 'igdl',
    description: 'Commande igdl de la catégorie download.',
    category: 'download',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.igdl* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};