module.exports = {
    name: 'gpt4',
    description: 'Commande gpt4 de la catégorie ai.',
    category: 'ai',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.gpt4* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};