const axios = require('axios');

module.exports = {
    name: 'fish',
    description: 'Afficher une espèce de poisson.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🐟 Recherche d'une espèce de poisson..." });
        
        try {
            // Ici on utiliserait un service de poissons
            // Pour l'exemple, on simule une réponse de poisson
            const response = `🐟 *POISSON*\n\nEspèce : Poisson-clown\n\n(Connectez-vous à une API de poissons pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du poisson." });
        }
    }
};
