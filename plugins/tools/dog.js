const axios = require('axios');

module.exports = {
    name: 'dog',
    description: 'Afficher une race de chien.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🐶 Recherche d'une race de chien..." });
        
        try {
            // Ici on utiliserait dogapi ou un service similaire
            // Pour l'exemple, on simule une réponse de race de chien
            const response = `🐶 *RACE DE CHIEN*\n\nNom : Labrador Retriever\n\n(Connectez-vous à une API de chiens pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du chien." });
        }
    }
};
