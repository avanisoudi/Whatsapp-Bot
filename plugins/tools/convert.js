const axios = require('axios');

module.exports = {
    name: 'convert',
    description: 'Convertir une devise.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un montant et les devises (ex: 10 USD to EUR) !" });
        
        await client.sendMessage(from, { text: `💰 Conversion de : ${text}...` });
        
        try {
            // Ici on utiliserait un service de conversion de devises
            // Pour l'exemple, on simule une réponse de conversion
            const response = `💰 *CONVERSION : ${text.toUpperCase()}*\n\nMontant : 9.20 EUR\n\n(Connectez-vous à une API de devises pour des données réelles)`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la conversion." });
        }
    }
};
