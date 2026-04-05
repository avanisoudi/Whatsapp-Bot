import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function ai(sock, chatId, message, args, config) {
  const prompt = args.join(' ');
  
  if (!prompt) {
    return await sock.sendMessage(chatId, { text: 'Posez une question après la commande .ai (ex: .ai comment vas-tu ?)' }, { quoted: message });
  }

  // Priorité à Gemini car souvent plus accessible gratuitement
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    return await sock.sendMessage(chatId, { text: '❌ Erreur : Aucune clé API (Gemini ou OpenAI) n\'est configurée dans le fichier .env.' }, { quoted: message });
  }

  try {
    let aiResponse = "";

    if (geminiKey) {
      // Utilisation de Gemini
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      aiResponse = response.text();
    } else {
      // Utilisation d'OpenAI
      const openai = new OpenAI({ apiKey: openaiKey });
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      aiResponse = completion.choices[0].message.content;
    }

    await sock.sendMessage(chatId, { text: `🤖 *IA Unified* :\n\n${aiResponse}` }, { quoted: message });
  } catch (error) {
    console.error('Erreur IA:', error);
    await sock.sendMessage(chatId, { text: `❌ Erreur lors de la génération : ${error.message}` }, { quoted: message });
  }
}
