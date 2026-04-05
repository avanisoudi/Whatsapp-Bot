const axios = require('axios');

module.exports = {
    name: 'drink',
    description: 'Afficher une boisson.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🍹 Recherche d'une boisson..." });
        
        try {
            // Ici on utiliserait thecocktaildb ou un service similaire
            // Pour l'exemple, on simule une réponse de boisson
            const response = `🍹 *BOISSON*\n\nNom : Mojito\n\n(Connectez-vous à une API de boissons pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la boisson." });
        }
    }
};
