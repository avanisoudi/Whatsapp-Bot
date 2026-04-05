module.exports = {
    name: 'calc',
    description: 'Calculatrice simple.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir un calcul (ex: 2+2) !" });
        
        try {
            const result = eval(text.replace(/[^0-9+\-*/().]/g, ''));
            await client.sendMessage(from, { text: `🧮 *CALCUL* : ${text}\n✅ *RÉSULTAT* : ${result}` }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Calcul invalide." });
        }
    }
};
