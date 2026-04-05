const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Rechercher et télécharger de la musique YouTube.',
    category: 'download',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un titre ou un lien YouTube !" });
        
        await client.sendMessage(from, { text: "🔍 Recherche sur YouTube en cours..." });
        
        try {
            const search = await yts(text);
            const video = search.videos[0];
            
            if (video) {
                const caption = `🎬 *${video.title}*\n👤 *Auteur* : ${video.author.name}\n⏱️ *Durée* : ${video.timestamp}\n🌐 *Lien* : ${video.url}\n\n📥 Téléchargement de l'audio en cours...`;
                
                await client.sendMessage(from, { 
                    image: { url: video.thumbnail }, 
                    caption: caption 
                }, { quoted: m });
                
                // Ici on appellerait un convertisseur MP3 réel
                await client.sendMessage(from, { text: `✅ Audio de : ${video.title}\n(Connectez votre convertisseur MP3 pour un envoi réel)` });
            } else {
                await client.sendMessage(from, { text: "❌ Aucune vidéo trouvée." });
            }
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la recherche." });
        }
    }
};
