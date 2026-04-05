module.exports = {
    name: 'sticker',
    description: 'Convertir une image en sticker.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!m.message.imageMessage && !m.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
            return client.sendMessage(from, { text: "⚠️ Veuillez envoyer une image avec .sticker ou répondre à une image !" });
        }
        
        await client.sendMessage(from, { text: "🎨 Création du sticker en cours..." });
        
        try {
            // Ici on utiliserait fluent-ffmpeg ou un module spécialisé
            // Pour l'exemple, on simule une conversion réussie
            await client.sendMessage(from, { text: "✅ Sticker créé avec succès !\n(Connectez votre convertisseur ffmpeg pour un envoi réel)" });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Erreur lors de la création du sticker." });
        }
    }
};
