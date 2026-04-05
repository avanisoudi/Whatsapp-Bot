const axios = require('axios');

module.exports = {
    name: 'timezone',
    description: 'Afficher le fuseau horaire d\'un pays.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un pays !" });
        
        await client.sendMessage(from, { text: `🕒 Recherche du fuseau horaire pour : ${text}...` });
        
        try {
            // Ici on utiliserait restcountries ou un service similaire
            // Pour l'exemple, on simule une réponse de fuseau horaire
            const response = `🕒 *FUSEAU HORAIRE : ${text.toUpperCase()}*\n\nZone : UTC+1\n\n(Connectez-vous à une API de pays pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du fuseau horaire." });
        }
    }
};
