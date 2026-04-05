const axios = require('axios');

module.exports = {
    name: 'cat',
    description: 'Afficher une race de chat.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🐱 Recherche d'une race de chat..." });
        
        try {
            // Ici on utiliserait thecatapi ou un service similaire
            // Pour l'exemple, on simule une réponse de race de chat
            const response = `🐱 *RACE DE CHAT*\n\nNom : Siamois\n\n(Connectez-vous à une API de chats pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du chat." });
        }
    }
};
