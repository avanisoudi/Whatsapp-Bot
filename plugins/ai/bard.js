module.exports = {
    name: 'bard',
    description: 'Commande bard de la catégorie ai.',
    category: 'ai',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.bard* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};