const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Afficher une blague.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "😂 Recherche d'une blague..." });
        
        try {
            // Ici on utiliserait jokeapi ou un service similaire
            // Pour l'exemple, on simule une réponse de blague
            const response = `😂 *BLAGUE*\n\nQuestion : Why did the chicken cross the road?\nRéponse : To get to the other side!\n\n(Connectez-vous à une API de blagues pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la blague." });
        }
    }
};
