const axios = require('axios');

module.exports = {
    name: 'vegetable',
    description: 'Afficher une espèce de légume.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🥦 Recherche d'une espèce de légume..." });
        
        try {
            // Ici on utiliserait un service de légumes
            // Pour l'exemple, on simule une réponse de légume
            const response = `🥦 *LÉGUME*\n\nEspèce : Brocoli\n\n(Connectez-vous à une API de légumes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du légume." });
        }
    }
};
