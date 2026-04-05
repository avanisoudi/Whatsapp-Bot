module.exports = {
    name: 'brainly',
    description: 'Commande brainly de la catégorie ai.',
    category: 'ai',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.brainly* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};