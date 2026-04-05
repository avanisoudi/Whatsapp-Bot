const axios = require('axios');

module.exports = {
    name: 'babyname',
    description: 'Afficher des prénoms de bébés.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "👶 Recherche de prénoms de bébés..." });
        
        try {
            // Ici on utiliserait un service de prénoms de bébés
            // Pour l'exemple, on simule une réponse de prénoms de bébés
            const response = `👶 *PRÉNOMS DE BÉBÉS*\n\n📝 *Liste* : Name 1, Name 2, Name 3...\n\n(Connectez-vous à une API de prénoms de bébés pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche des prénoms." });
        }
    }
};
