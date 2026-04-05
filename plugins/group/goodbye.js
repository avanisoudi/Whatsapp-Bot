module.exports = {
    name: 'goodbye',
    description: 'Commande goodbye de la catégorie group.',
    category: 'group',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.goodbye* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};