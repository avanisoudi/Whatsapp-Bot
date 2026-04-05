module.exports = {
    name: 'antiword',
    description: 'Commande antiword de la catégorie group.',
    category: 'group',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.antiword* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};