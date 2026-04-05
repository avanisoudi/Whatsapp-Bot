const axios = require('axios');

module.exports = {
    name: 'name',
    description: 'Afficher la signification d\'un prénom.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un prénom !" });
        
        await client.sendMessage(from, { text: `🏷️ Recherche de la signification pour : ${text}...` });
        
        try {
            // Ici on utiliserait un service de prénoms
            // Pour l'exemple, on simule une réponse de prénom
            const response = `🏷️ *PRÉNOM : ${text.toUpperCase()}*\n\n📜 *Signification* : Meaning will be displayed here...\n📅 *Fête* : Name day will be displayed here...\n\n(Connectez-vous à une API de prénoms pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du prénom." });
        }
    }
};
