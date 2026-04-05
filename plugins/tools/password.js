module.exports = {
    name: 'password',
    description: 'Générer un mot de passe aléatoire.',
    category: 'tools',
    async execute(client, m, from, text) {
        const length = text ? parseInt(text) : 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        await client.sendMessage(from, { text: `🔑 *MOT DE PASSE GÉNÉRÉ* : ${password}` }, { quoted: m });
    }
};
