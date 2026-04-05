const axios = require('axios');

module.exports = {
    name: 'countrycode',
    description: 'Afficher le code d\'un pays.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un pays !" });
        
        await client.sendMessage(from, { text: `📞 Recherche du code pour : ${text}...` });
        
        try {
            // Ici on utiliserait restcountries ou un service similaire
            // Pour l'exemple, on simule une réponse de code de pays
            const response = `📞 *CODE PAYS : ${text.toUpperCase()}*\n\nCode : +33\n\n(Connectez-vous à une API de pays pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du code." });
        }
    }
};
