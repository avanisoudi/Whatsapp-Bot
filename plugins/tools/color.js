module.exports = {
    name: 'color',
    description: 'Afficher une couleur aléatoire.',
    category: 'tools',
    async execute(client, m, from, text) {
        const hex = Math.floor(Math.random()*16777215).toString(16);
        const color = "#" + hex.padStart(6, '0');
        await client.sendMessage(from, { text: `🎨 *COULEUR GÉNÉRÉE* : ${color.toUpperCase()}` }, { quoted: m });
    }
};
