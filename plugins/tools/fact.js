const axios = require('axios');

module.exports = {
    name: 'fact',
    description: 'Afficher un fait intéressant.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "💡 Recherche d'un fait intéressant..." });
        
        try {
            // Ici on utiliserait un service de faits
            // Pour l'exemple, on simule une réponse de fait
            const response = `💡 *FAIT INTÉRESSANT*\n\nDid you know that honey never spoils?\n\n(Connectez-vous à une API de faits pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du fait." });
        }
    }
};
