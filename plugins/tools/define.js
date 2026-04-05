const axios = require('axios');

module.exports = {
    name: 'define',
    description: 'Afficher la définition d\'un mot.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un mot !" });
        
        await client.sendMessage(from, { text: `📖 Recherche de la définition pour : ${text}...` });
        
        try {
            // Ici on utiliserait dictionaryapi ou un service similaire
            // Pour l'exemple, on simule une réponse de définition
            const response = `📖 *DÉFINITION : ${text.toUpperCase()}*\n\n📚 *Signification* : Definition will be displayed here...\n🗣️ *Prononciation* : Phonetic will be displayed here...\n\n(Connectez-vous à une API de dictionnaire pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche de la définition." });
        }
    }
};
