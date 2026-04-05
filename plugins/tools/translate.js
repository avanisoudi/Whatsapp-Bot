const axios = require('axios');

module.exports = {
    name: 'translate',
    description: 'Traduire un texte.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un texte et les langues (ex: Hello to fr) !" });
        
        await client.sendMessage(from, { text: `🌍 Traduction de : ${text}...` });
        
        try {
            // Ici on utiliserait google-translate-api ou un service similaire
            // Pour l'exemple, on simule une réponse de traduction
            const response = `🌍 *TRADUCTION : ${text.toUpperCase()}*\n\nTexte : Bonjour\n\n(Connectez-vous à une API de traduction pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la traduction." });
        }
    }
};
