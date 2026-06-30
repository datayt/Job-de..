// ==============================================
// app.js - GitHub Frontend API Connector
// ==============================================
const API_URL = "https://script.google.com/macros/s/AKfycbxhpATAb-8BvEBzk7F_pLLGMvQvZ5p094RPs6D6GBHa_2gobULAffqNmj94xqlGzgqmPQ/exec"; // Paste your deployed URL

// Universal API Caller
async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    alert('Connection error. Check console for details.');
    return { success: false };
  }
}
