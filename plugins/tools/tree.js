const axios = require('axios');

module.exports = {
    name: 'tree',
    description: 'Afficher une espèce d\'arbre.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🌳 Recherche d'une espèce d'arbre..." });
        
        try {
            // Ici on utiliserait un service d'arbres
            // Pour l'exemple, on simule une réponse d'arbre
            const response = `🌳 *ARBRE*\n\nEspèce : Chêne\n\n(Connectez-vous à une API d'arbres pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de l'arbre." });
        }
    }
};
