module.exports = {
    name: 'dogbreed',
    description: 'Commande dogbreed de la catégorie tools.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.dogbreed* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};