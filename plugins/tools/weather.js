const axios = require('axios');

module.exports = {
    name: 'weather',
    description: 'Afficher la météo d\'une ville.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir une ville !" });
        
        await client.sendMessage(from, { text: `🌍 Recherche de la météo pour ${text}...` });
        
        try {
            // Ici on utiliserait openweathermap ou un service similaire
            // Pour l'exemple, on simule une réponse météo
            const response = `🌍 *MÉTÉO : ${text.toUpperCase()}*\n\n🌡️ *Température* : 25°C\n☁️ *Condition* : Ensoleillé\n💧 *Humidité* : 60%\n🌬️ *Vent* : 15 km/h\n\n🕒 Mise à jour : ${new Date().toLocaleString()}`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche météo." });
        }
    }
};
