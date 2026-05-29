// Backend submission helper for renovation request form

const backendConfig = {
endpoint: 'http://localhost:3001/api/renovation-request'
};

/**
 * Send renovation form data to the backend.
 * @param {Object} data
 * @returns {Promise<object>}
 */
async function sendFormToBackend(data) {
  const response = await fetch(backendConfig.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

window.sendFormToBackend = sendFormToBackend;
