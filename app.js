// ==============================================
// app.js - Network & API Logic (CORS Fixed)
// ==============================================

// REPLACE THIS WITH YOUR NEW GOOGLE APPS SCRIPT WEB APP URL
const API_URL = "https://script.google.com/macros/s/AKfycbw0MBjVp9iC-j6WkbyrgGKD8RpBBgo-WPrLQ62F-DNHTBXHBBDGGfQRT5e7QfYCeipltw/exec";

async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  try {
    // We use text/plain to bypass strict CORS preflight blocks on GitHub Pages
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, 
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Server returned an empty response.');
    }

    return JSON.parse(text);

  } catch (error) {
    console.error('API ERROR:', error);
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      alert('NETWORK ERROR.\n1. Check if your API_URL in app.js is correct.\n2. Ensure your Apps Script is deployed as "Execute as: Me" and "Who has access: Anyone".');
    } else {
      alert('Error: ' + error.message);
    }
    return { success: false, error: error.message };
  }
}
