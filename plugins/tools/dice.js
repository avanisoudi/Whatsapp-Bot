module.exports = {
    name: 'dice',
    description: 'Lancer un dé.',
    category: 'tools',
    async execute(client, m, from, text) {
        const result = Math.floor(Math.random() * 6) + 1;
        await client.sendMessage(from, { text: `🎲 *RÉSULTAT DU DÉ* : ${result}` }, { quoted: m });
    }
};
