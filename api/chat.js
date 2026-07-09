export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

  try {
    const { system, messages } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system, messages })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
