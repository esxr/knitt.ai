export const validateCustomApiKey = async (apiKey, serverUrl) => {
    const validationUrl = `${serverUrl}/validate`;
  
    try {
      const response = await fetch(validationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: apiKey }),
      });
  
      const data = await response.json();
      return data?.body?.valid || false;
    } catch (error) {
      console.error('Error validating custom API key:', error);
      return false;
    }
  };
  