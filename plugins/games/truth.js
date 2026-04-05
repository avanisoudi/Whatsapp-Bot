module.exports = {
    name: 'truth',
    description: 'Commande truth de la catégorie games.',
    category: 'games',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.truth* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};