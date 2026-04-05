module.exports = {
    name: 'tomp3',
    description: 'Commande tomp3 de la catégorie tools.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.tomp3* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};