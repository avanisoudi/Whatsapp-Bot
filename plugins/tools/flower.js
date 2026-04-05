const axios = require('axios');

module.exports = {
    name: 'flower',
    description: 'Afficher une espèce de fleur.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🌸 Recherche d'une espèce de fleur..." });
        
        try {
            // Ici on utiliserait un service de fleurs
            // Pour l'exemple, on simule une réponse de fleur
            const response = `🌸 *FLEUR*\n\nEspèce : Rose\n\n(Connectez-vous à une API de fleurs pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la fleur." });
        }
    }
};
