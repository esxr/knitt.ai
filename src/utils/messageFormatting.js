export const formatUserMessage = (text) => {
    return `This is a user query: ${text}. Find the appropriate link, and send a response like so:\n\n{\n"response": "<your_response>",\n"relevant_link": "<link_here>"\n}`;
  };
  