const axios = require('axios');

module.exports = {
    name: 'synonym',
    description: 'Afficher les synonymes d\'un mot.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un mot !" });
        
        await client.sendMessage(from, { text: `🔍 Recherche de synonymes pour : ${text}...` });
        
        try {
            // Ici on utiliserait un service de synonymes
            // Pour l'exemple, on simule une réponse de synonymes
            const response = `🔍 *SYNONYMES : ${text.toUpperCase()}*\n\n📝 *Liste* : Synonym 1, Synonym 2, Synonym 3...\n\n(Connectez-vous à une API de synonymes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de synonymes." });
        }
    }
};
