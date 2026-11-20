// Adds a sign-up for the Lead the Room 5-Day Email Course to its SendFox list.
// NOT LIVE YET: the landing page runs in PROTOTYPE mode and never calls this.
// To go live: set LIST_ID below, add SENDFOX_API_KEY in Netlify, redeploy,
// then set PROTOTYPE = false in minicourse/index.html. See minicourse/README.md.
const LIST_ID = 687988; // SendFox list: Lead the Room 5-Day Email Course (new SendFox account)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { email, firstName, consent } = body;
  if (!firstName || !String(firstName).trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter your first name.' }) };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter a valid email address.' }) };
  }
  if (consent !== true) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please tick the box to agree to receive emails.' }) };
  }
  const apiKey = process.env.SENDFOX_API_KEY;
  if (!apiKey || !LIST_ID) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Sign-up is not switched on yet. Please try again later.' }) };
  }

  const contact = {
    email,
    first_name: String(firstName).trim().slice(0, 100),
    lists: [LIST_ID]
  };

  try {
    const response = await fetch('https://api.sendfox.com/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(contact)
    });
    const data = await response.json().catch(() => ({}));
    // 422 is treated as "already on the list". Check this against the SendFox API docs.
    if (response.ok || response.status === 422) {
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
    }
    return { statusCode: response.status, body: JSON.stringify({ error: data.message || 'Sign-up failed. Please try again.' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Network error. Please try again.' }) };
  }
};
