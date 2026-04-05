const axios = require('axios');

module.exports = {
    name: 'quote',
    description: 'Afficher une citation inspirante.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "📜 Recherche d'une citation inspirante..." });
        
        try {
            // Ici on utiliserait un service de citations
            // Pour l'exemple, on simule une réponse de citation
            const response = `📜 *CITATION*\n\n"The only way to do great work is to love what you do." - Steve Jobs\n\n(Connectez-vous à une API de citations pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la citation." });
        }
    }
};
