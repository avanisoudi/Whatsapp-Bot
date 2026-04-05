module.exports = {
    name: 'balance',
    description: 'Commande balance de la catégorie games.',
    category: 'games',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.balance* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};