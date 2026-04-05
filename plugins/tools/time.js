const moment = require('moment-timezone');

module.exports = {
    name: 'time',
    description: 'Afficher l\'heure actuelle d\'une ville.',
    category: 'tools',
    async execute(client, m, from, text) {
        if (!text) return client.sendMessage(from, { text: "⚠️ Veuillez fournir une ville (ex: Europe/Paris) !" });
        
        try {
            const time = moment().tz(text).format('HH:mm:ss');
            const date = moment().tz(text).format('DD/MM/YYYY');
            await client.sendMessage(from, { text: `🕒 *HEURE (${text})* : ${time}\n📅 *DATE* : ${date}` }, { quoted: m });
        } catch (err) {
            await client.sendMessage(from, { text: "❌ Ville ou fuseau horaire invalide." });
        }
    }
};
