const axios = require('axios');

module.exports = {
    name: 'region',
    description: 'Afficher la région d\'un pays.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un pays !" });
        
        await client.sendMessage(from, { text: `📍 Recherche de la région pour : ${text}...` });
        
        try {
            // Ici on utiliserait restcountries ou un service similaire
            // Pour l'exemple, on simule une réponse de région
            const response = `📍 *RÉGION : ${text.toUpperCase()}*\n\nRégion : Europe de l'Ouest\n\n(Connectez-vous à une API de pays pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la région." });
        }
    }
};
