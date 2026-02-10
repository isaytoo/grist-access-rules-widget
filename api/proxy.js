// Vercel Serverless Function — Proxy to Grist API (bypasses CORS)
// Usage: POST /api/proxy
// Body: { "gristUrl": "https://docs.getgrist.com", "docId": "xxx", "endpoint": "/access", "method": "GET", "apiKey": "xxx", "body": {} }

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { gristUrl, docId, endpoint, method, apiKey, body } = req.body;

    if (!gristUrl || !docId || !endpoint || !apiKey) {
      return res.status(400).json({ error: 'Missing required fields: gristUrl, docId, endpoint, apiKey' });
    }

    // Build the target URL
    const targetUrl = `${gristUrl}/api/docs/${docId}${endpoint}`;

    const fetchOpts = {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    if (body && (method === 'PATCH' || method === 'POST' || method === 'PUT')) {
      fetchOpts.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, fetchOpts);
    const text = await response.text();

    // Forward the status and body
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    return res.send(text);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
}
