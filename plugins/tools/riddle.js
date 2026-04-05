const axios = require('axios');

module.exports = {
    name: 'riddle',
    description: 'Afficher une énigme.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🧩 Recherche d'une énigme..." });
        
        try {
            // Ici on utiliserait un service d'énigmes
            // Pour l'exemple, on simule une réponse d'énigme
            const response = `🧩 *ÉNIGME*\n\nQuestion : What has keys but can't open locks?\nRéponse : A piano!\n\n(Connectez-vous à une API d'énigmes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de l'énigme." });
        }
    }
};
