const axios = require('axios');

module.exports = {
    name: 'horoscope',
    description: 'Afficher l\'horoscope d\'un signe.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un signe astrologique !" });
        
        await client.sendMessage(from, { text: `✨ Recherche de l'horoscope pour : ${text}...` });
        
        try {
            // Ici on utiliserait un service d'horoscope
            // Pour l'exemple, on simule une réponse d'horoscope
            const response = `✨ *HOROSCOPE : ${text.toUpperCase()}*\n\n🌟 *Prédiction* : Your horoscope for today will be displayed here...\n\n(Connectez-vous à une API d'horoscope pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de l'horoscope." });
        }
    }
};
