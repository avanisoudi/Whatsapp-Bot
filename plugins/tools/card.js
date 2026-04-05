module.exports = {
    name: 'card',
    description: 'Tirer une carte.',
    category: 'tools',
    async execute(client, m, from, text) {
        const suits = ["Coeur", "Carreau", "Trèfle", "Pique"];
        const values = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valet", "Dame", "Roi"];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        await client.sendMessage(from, { text: `🃏 *CARTE TIRÉE* : ${value} de ${suit}` }, { quoted: m });
    }
};
