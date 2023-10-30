import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAIKEY,
  dangerouslyAllowBrowser: true
});

export default async function AI() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo'
  });

  return chatCompletion.choices;
}
