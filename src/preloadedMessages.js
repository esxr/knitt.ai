const baseUrl = window.location.origin;

const preloadedMessages = [
  {
    role: "system",
    content: `List all the links in ${baseUrl} in a JSON list with the following schema.\n\n[
    {"link": "example.com/xyz", "description": "Used for ... (detailed description)"},
    {"link": "example.com/abc", "description": "Does ... (detailed description)"},
    ... (find out as many links as possible)
    ]\n\nIMPORTANT: Only provide the links. No additional text.`
  }
];

export default preloadedMessages;
