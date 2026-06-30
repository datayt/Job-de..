// ==============================================
// app.js - Enhanced Debugging Version
// ==============================================
const API_URL = "https://script.google.com/macros/s/AKfycbzyEZZ1elC8UqQBmY6ZIKOOwlV5mBAKrqJxfpLYcj0kRfoPL7bbS6amYbI7K1FHm5S4NA/exec"; // e.g. https://script.google.com/macros/s/ABCDE/exec

// Universal API Caller with Detailed Logging
async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  try {
    console.log(`[1] Sending POST to: ${API_URL}`);
    console.log(`[2] Payload:`, payload);

    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`[3] Response Status: ${response.status} (${response.statusText})`);

    // If the server returns a 302 redirect (which means it's asking for auth), this will fail.
    if (!response.ok) {
      // Try to read error text even if status is not 200
      const errorText = await response.text();
      console.error(`[4] Server responded with error:`, errorText);
      throw new Error(`Server returned HTTP ${response.status}. Check console for details.`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Server returned an empty response (Check Apps Script logs for crashes).');
    }

    console.log(`[5] Raw Response:`, text);
    const json = JSON.parse(text);
    console.log(`[6] Parsed JSON:`, json);
    return json;

  } catch (error) {
    console.error('CRITICAL API ERROR:', error);
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      alert('NETWORK ERROR. \n1. Ensure you opened the Apps Script URL in your browser tab and it shows {"status":"OK"}.\n2. Ensure the deployment is set to "Execute as: Me" and "Anyone" access.\n3. If using HTTPS, ensure your GitHub page is also HTTPS.');
    } else if (error.message.includes('JSON')) {
      alert('The server sent back HTML/Login redirect instead of JSON. This means the script is trying to ask for permissions. Set "Execute as: Me" in the Apps Script deployment settings.');
    } else {
      alert('Error: ' + error.message);
    }
    return { success: false, error: error.message };
  }
}
