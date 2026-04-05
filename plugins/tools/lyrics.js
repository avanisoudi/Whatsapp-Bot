const axios = require('axios');

module.exports = {
    name: 'lyrics',
    description: 'Afficher les paroles d\'une chanson.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un titre de chanson !" });
        
        await client.sendMessage(from, { text: `🎵 Recherche des paroles pour : ${text}...` });
        
        try {
            // Ici on utiliserait genius-lyrics ou un service similaire
            // Pour l'exemple, on simule une réponse de paroles
            const response = `🎵 *PAROLES : ${text.toUpperCase()}*\n\n[Verse 1]\nLyrics will be displayed here...\n\n[Chorus]\nConnecting to Lyrics API for real data...`;
            await client.sendMessage(from, { text: response }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche des paroles." });
        }
    }
};
