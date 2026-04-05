const axios = require('axios');

module.exports = {
    name: 'movie',
    description: 'Afficher les informations d\'un film.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un titre de film !" });
        
        await client.sendMessage(from, { text: `🎬 Recherche du film : ${text}...` });
        
        try {
            // Ici on utiliserait omdbapi ou un service similaire
            // Pour l'exemple, on simule une réponse de film
            const response = `🎬 *FILM : ${text.toUpperCase()}*\n\n📅 *Année* : 2024\n🌟 *Note* : 8.5/10\n🎭 *Genre* : Action, Drame\n📜 *Résumé* : Movie summary will be displayed here...`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du film." });
        }
    }
};
