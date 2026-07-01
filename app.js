// ==============================================
// app.js - Network & API Logic (CORS Fixed)
// ==============================================

// 🔴 IMPORTANT: REPLACE THIS WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
// Example: const API_URL = "https://script.google.com/macros/s/your-id/exec";
const API_URL = "https://script.google.com/macros/s/AKfycbwOv2lLeeMmlPayv301F3RLkSfXBcL8aa98X2VqPWC3FaWqOaa2Q93c7RnC9BDkJoRq/exec";

async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  try {
    console.log("🚀 Sending request to:", API_URL);
    console.log("Payload:", payload);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const text = await response.text();
    console.log("📄 Raw response:", text);

    if (!text) {
      throw new Error('Server returned an empty response.');
    }

    return JSON.parse(text);

  } catch (error) {
    console.error('❌ API ERROR:', error);

    let msg = 'NETWORK ERROR.\n';
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      msg += '1. Check if your API_URL in app.js is correct.\n';
      msg += '2. Ensure your Apps Script is deployed as "Execute as: Me" and "Who has access: Anyone".\n';
      msg += '\n🔍 Open browser console (F12) for more details.';
    } else {
      msg += 'Error: ' + error.message;
    }
    alert(msg);
    return { success: false, error: error.message };
  }
}
