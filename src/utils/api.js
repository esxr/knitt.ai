export const fetchResponseFromOpenAI = async (apiKey, requestBody) => {
  try {
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    throw error;
  }
};

export const fetchResponseFromCustomServer = async (apiKey, requestBody, serverUrl) => {

  serverUrl = 'http://localhost:5000';

  try {
    const apiResponse = await fetch(`${serverUrl}/openai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await apiResponse.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching response from custom server:', error);
    throw error;
  }
};
