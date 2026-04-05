import yts from 'yt-search';
import ytdl from '@distube/ytdl-core';
import { proto } from '@whiskeysockets/baileys';

export default async function play(sock, chatId, message, args, config) {
  const query = args.join(' ');
  
  if (!query) {
    return await sock.sendMessage(chatId, { text: 'Veuillez fournir le nom d\'une chanson après la commande .play (ex: .play Blinding Lights)' }, { quoted: message });
  }

  // Notification à l'utilisateur
  const searchingMsg = await sock.sendMessage(chatId, { text: `🔍 *Recherche de "${query}" sur YouTube...*` }, { quoted: message });

  try {
    // Recherche sur YouTube
    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      throw new Error('Aucun résultat trouvé sur YouTube.');
    }

    const title = video.title;
    const author = video.author.name;
    const duration = video.timestamp;
    const url = video.url;
    const thumbnail = video.thumbnail;

    const caption = `🎵 *Lecture en cours* :\n\n📌 *Titre* : ${title}\n👤 *Artiste* : ${author}\n⏳ *Durée* : ${duration}\n\n📥 *Téléchargement de l'audio en cours...*`;

    // Envoi des infos et de la miniature
    await sock.sendMessage(chatId, { 
      image: { url: thumbnail }, 
      caption: caption 
    }, { quoted: message });

    // Téléchargement de l'audio via ytdl-core (stream)
    const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

    // Envoi de l'audio au format WhatsApp
    await sock.sendMessage(chatId, { 
      audio: { stream: audioStream }, 
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: message });

    // Supprimer le message de recherche
    await sock.sendMessage(chatId, { delete: searchingMsg.key });

  } catch (error) {
    console.error('Erreur Play:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur lors de la lecture : ${error.message}` }, { quoted: message });
    // Supprimer le message de recherche en cas d'erreur
    await sock.sendMessage(chatId, { delete: searchingMsg.key });
  }
}
