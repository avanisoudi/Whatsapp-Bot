const axios = require('axios');

module.exports = {
    name: 'recipe',
    description: 'Afficher une recette de cuisine.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un plat !" });
        
        await client.sendMessage(from, { text: `🍳 Recherche de la recette pour : ${text}...` });
        
        try {
            // Ici on utiliserait spoonacular ou un service similaire
            // Pour l'exemple, on simule une réponse de recette
            const response = `🍳 *RECETTE : ${text.toUpperCase()}*\n\n🛒 *Ingrédients* : Ingredient 1, Ingredient 2, Ingredient 3...\n👨‍🍳 *Étapes* : Step 1, Step 2, Step 3...\n\nBon appétit !`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la recette." });
        }
    }
};
