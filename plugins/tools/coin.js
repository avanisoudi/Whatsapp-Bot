module.exports = {
    name: 'coin',
    description: 'Lancer une pièce.',
    category: 'tools',
    async execute(client, m, from, text) {
        const result = Math.random() < 0.5 ? "Pile" : "Face";
        await client.sendMessage(from, { text: `🪙 *RÉSULTAT DE LA PIÈCE* : ${result}` }, { quoted: m });
    }
};
