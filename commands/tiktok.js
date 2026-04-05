import axios from 'axios';

export default async function tiktok(sock, chatId, message, args, config) {
  const url = args[0];
  
  if (!url || !url.includes('tiktok.com')) {
    return await sock.sendMessage(chatId, { text: 'Veuillez fournir un lien TikTok valide (ex: .tiktok https://www.tiktok.com/@user/video/123...)' }, { quoted: message });
  }

  // Notification à l'utilisateur
  await sock.sendMessage(chatId, { text: '⏳ *Téléchargement de la vidéo TikTok (sans filigrane) en cours...*' }, { quoted: message });

  try {
    // Utilisation de l'API publique tikwm.com pour récupérer la vidéo sans filigrane
    const apiResponse = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const result = apiResponse.data;

    if (!result || result.code !== 0 || !result.data) {
      throw new Error('Vidéo introuvable ou lien invalide.');
    }

    const videoData = result.data;
    const videoUrl = videoData.play; // Lien direct vers la vidéo sans watermark
    const author = videoData.author.nickname;
    const title = videoData.title || "Sans titre";

    // Envoi de la vidéo au format WhatsApp
    await sock.sendMessage(chatId, { 
      video: { url: videoUrl }, 
      caption: `📱 *TikTok Downloader* :\n\n👤 *Auteur* : ${author}\n📝 *Description* : ${title}\n\n💾 Téléchargé avec Unified Bot` 
    }, { quoted: message });

  } catch (error) {
    console.error('Erreur TikTok:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur lors du téléchargement TikTok : ${error.message}` }, { quoted: message });
  }
}
