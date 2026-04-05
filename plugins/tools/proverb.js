const axios = require('axios');

module.exports = {
    name: 'proverb',
    description: 'Afficher un proverbe.',
    category: 'tools',
    async execute(client, m, from, text) {
        await client.sendMessage(from, { text: "📖 Recherche d'un proverbe..." });
        
        try {
            // Ici on utiliserait un service de proverbes
            // Pour l'exemple, on simule une réponse de proverbe
            const response = `📖 *PROVERBE*\n\n"A journey of a thousand miles begins with a single step."\n\n(Connectez-vous à une API de proverbes pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche du proverbe." });
        }
    }
};
