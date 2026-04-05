const axios = require('axios');

module.exports = {
    name: 'tiktok',
    description: 'Télécharger une vidéo TikTok sans filigrane.',
    category: 'download',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un lien TikTok !" });
        
        await client.sendMessage(from, { text: "📥 Téléchargement en cours..." });
        
        try {
            const res = await axios.get(`https://www.tikwm.com/api/?url=${text}`);
            const data = res.data.data;
            
            if (data) {
                await client.sendMessage(from, { 
                    video: { url: data.play }, 
                    caption: `✅ TikTok sans filigrane\n👤 Auteur : ${data.author.nickname}\n💬 Titre : ${data.title}`,
                    mimetype: 'video/mp4'
                }, { quoted: m });
            } else {
                await client.sendMessage(from, { text: "❌ Impossible de trouver la vidéo." });
            }
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors du téléchargement." });
        }
    }
};
