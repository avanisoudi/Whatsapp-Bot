const axios = require('axios');

module.exports = {
    name: 'plant',
    description: 'Afficher une espèce de plante.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🌿 Recherche d'une espèce de plante..." });
        
        try {
            // Ici on utiliserait trefle.io ou un service similaire
            // Pour l'exemple, on simule une réponse de plante
            const response = `🌿 *PLANTE*\n\nEspèce : Lavande\n\n(Connectez-vous à une API de plantes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la plante." });
        }
    }
};
