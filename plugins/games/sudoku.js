module.exports = {
    name: 'sudoku',
    description: 'Commande sudoku de la catégorie games.',
    category: 'games',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🚀 Commande *.sudoku* (Version Illimitée)\n\nCette fonctionnalité est en cours d'activation sur votre serveur Katabump." }, { quoted: m });
    }
};