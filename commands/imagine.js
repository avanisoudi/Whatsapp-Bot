import axios from 'axios';

export default async function imagine(sock, chatId, message, args, config) {
  const prompt = args.join(' ');
  
  if (!prompt) {
    return await sock.sendMessage(chatId, { text: 'Décrivez l\'image que vous voulez générer après la commande .imagine (ex: .imagine un chat dans l\'espace)' }, { quoted: message });
  }

  // Notification à l'utilisateur
  await sock.sendMessage(chatId, { text: '🎨 *Génération de votre image en cours...* (cela prend environ 10 secondes)' }, { quoted: message });

  try {
    // Utilisation de Pollinations.ai (Flux Model) pour une qualité exceptionnelle et gratuite
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}&model=flux`;
    
    // Téléchargement de l'image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    // Envoi de l'image au format WhatsApp
    await sock.sendMessage(chatId, { 
      image: buffer, 
      caption: `✨ *Résultat pour* : "${prompt}"\n\n🎨 Généré avec Unified AI (Modèle Flux)` 
    }, { quoted: message });

  } catch (error) {
    console.error('Erreur Génération Image:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur lors de la génération de l'image : ${error.message}` }, { quoted: message });
  }
}
