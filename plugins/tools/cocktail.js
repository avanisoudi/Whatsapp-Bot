const axios = require('axios');

module.exports = {
    name: 'cocktail',
    description: 'Afficher une recette de cocktail.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🍸 Recherche d'une recette de cocktail..." });
        
        try {
            // Ici on utiliserait thecocktaildb ou un service similaire
            // Pour l'exemple, on simule une réponse de cocktail
            const response = `🍸 *COCKTAIL*\n\nNom : Margarita\n\n(Connectez-vous à une API de cocktails pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du cocktail." });
        }
    }
};
