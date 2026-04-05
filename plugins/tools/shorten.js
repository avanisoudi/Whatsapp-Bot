const axios = require('axios');

module.exports = {
    name: 'shorten',
    description: 'Raccourcir une URL.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir une URL !" });
        
        await client.sendMessage(from, { text: `🔗 Raccourcissement de l'URL : ${text}...` });
        
        try {
            // Ici on utiliserait tinyurl ou un service similaire
            // Pour l'exemple, on simule une réponse de raccourcissement
            const response = `🔗 *URL RACCOURCIE : ${text.toUpperCase()}*\n\nLien : https://tinyurl.com/xyz\n\n(Connectez-vous à une API de raccourcissement pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors du raccourcissement." });
        }
    }
};
