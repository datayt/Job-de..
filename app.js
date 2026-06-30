// ==============================================
// app.js - GitHub Frontend API Connector
// PASTE YOUR DEPLOYED APPS SCRIPT URL BELOW:
// ==============================================
const API_URL = "https://script.google.com/macros/s/AKfycbw1GtnkgbLG6qCLgsBqL3WuObis-8odYP1LNB3-xyf_65_T_YgxavVe5_ka3us4XJedyg/exec"; 

// Universal API Caller
async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  try {
    console.log(`Sending request to ${API_URL} with action: ${action}`); // Debug
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors', // DO NOT use 'no-cors'. 'cors' is required to read JSON.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Server returned an empty response. Check your Apps Script logs.');
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('API Call Error:', error);
    // User-friendly alerts
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      alert('Network error. Did you paste the correct Apps Script URL? Ensure you deployed it with "Anyone" access.');
    } else if (error.message.includes('JSON')) {
      alert('Server returned invalid data. Did you correctly copy the Code.gs script?');
    } else {
      alert('Connection error: ' + error.message + ' (Check console for details)');
    }
    return { success: false, error: error.message };
  }
}
