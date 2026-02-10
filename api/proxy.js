// Vercel Serverless Function — Secure proxy to Grist /access API (bypasses CORS)
// Usage: POST /api/proxy
// Body: { "gristUrl": "https://docs.getgrist.com", "docId": "xxx", "endpoint": "/access", "method": "GET", "apiKey": "xxx", "body": {} }
//
// Security:
// - Only /access endpoint is allowed (not a general-purpose proxy)
// - Only GET and PATCH methods are allowed
// - gristUrl must be HTTPS
// - API key is never logged

// Allowed endpoints (strict whitelist)
const ALLOWED_ENDPOINTS = ['/access'];

// Allowed HTTP methods
const ALLOWED_METHODS = ['GET', 'PATCH'];

export default async function handler(req, res) {
  // Only allow POST to the proxy itself
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { gristUrl, docId, endpoint, method, apiKey, body } = req.body;

    // --- Validation ---
    if (!gristUrl || !docId || !endpoint || !apiKey) {
      return res.status(400).json({ error: 'Missing required fields: gristUrl, docId, endpoint, apiKey' });
    }

    // Endpoint whitelist: only /access
    if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
      return res.status(403).json({ error: 'Endpoint not allowed. Only /access is permitted.' });
    }

    // Method whitelist: only GET and PATCH
    const safeMethod = (method || 'GET').toUpperCase();
    if (!ALLOWED_METHODS.includes(safeMethod)) {
      return res.status(403).json({ error: 'Method not allowed. Only GET and PATCH are permitted.' });
    }

    // gristUrl must be HTTPS (except localhost for dev)
    const urlObj = new URL(gristUrl);
    if (urlObj.protocol !== 'https:' && urlObj.hostname !== 'localhost' && urlObj.hostname !== '127.0.0.1') {
      return res.status(403).json({ error: 'Only HTTPS Grist servers are allowed.' });
    }

    // Prevent path traversal in docId
    if (docId.includes('/') || docId.includes('..')) {
      return res.status(400).json({ error: 'Invalid docId.' });
    }

    // --- Build and execute request ---
    const targetUrl = `${gristUrl}/api/docs/${docId}${endpoint}`;

    const fetchOpts = {
      method: safeMethod,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    if (body && safeMethod === 'PATCH') {
      fetchOpts.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, fetchOpts);
    const text = await response.text();

    // Forward the status and body (never log apiKey)
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    return res.send(text);

  } catch (error) {
    // Never log request body (contains apiKey)
    console.error('Proxy error:', error.message);
    return res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
}
