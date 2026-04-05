module.exports = {
    name: 'plantspecies',
    description: 'Commande plantspecies de la catégorie tools.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.plantspecies* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};