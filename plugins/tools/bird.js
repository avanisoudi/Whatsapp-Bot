const axios = require('axios');

module.exports = {
    name: 'bird',
    description: 'Afficher une espèce d\'oiseau.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "🐦 Recherche d'une espèce d'oiseau..." });
        
        try {
            // Ici on utiliserait un service d'oiseaux
            // Pour l'exemple, on simule une réponse d'oiseau
            const response = `🐦 *OISEAU*\n\nEspèce : Perroquet\n\n(Connectez-vous à une API d'oiseaux pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de l'oiseau." });
        }
    }
};
