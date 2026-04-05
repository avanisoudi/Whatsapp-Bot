const axios = require('axios');

module.exports = {
    name: 'antonym',
    description: 'Afficher les contraires d\'un mot.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un mot !" });
        
        await client.sendMessage(from, { text: `🔍 Recherche de contraires pour : ${text}...` });
        
        try {
            // Ici on utiliserait un service de contraires
            // Pour l'exemple, on simule une réponse de contraires
            const response = `🔍 *CONTRAIRES : ${text.toUpperCase()}*\n\n📝 *Liste* : Antonym 1, Antonym 2, Antonym 3...\n\n(Connectez-vous à une API de contraires pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de contraires." });
        }
    }
};
