const axios = require('axios');

module.exports = {
    name: 'insect',
    description: 'Afficher une espèce d\'insecte.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🐞 Recherche d'une espèce d'insecte..." });
        
        try {
            // Ici on utiliserait un service d'insectes
            // Pour l'exemple, on simule une réponse d'insecte
            const response = `🐞 *INSECTE*\n\nEspèce : Coccinelle\n\n(Connectez-vous à une API d'insectes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de l'insecte." });
        }
    }
};
