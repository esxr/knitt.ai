# Knitt AI

Knitt AI is a tool that allows you to integrate AI into your website in `a single line of code`.

![](/demo.gif)

## Features

- **Comprehensive Website Insights**: Knitt AI helps users understand all about your website with ease.
- **Smart Navigation**: Direct users to the most relevant webpages according to their queries, streamlining their search process.
- **Reduced Search Time**: Decreases search time by approximately 50%, allowing users to find what they need faster.
- **Increased User Retention**: Boosts user retention by around 30%, keeping visitors engaged and returning to your site.

Elevate your website's functionality and user experience with Knitt AI, making your digital presence smarter and more efficient.

## Demo

Paste this script in your browser `console` on any website to try it out
> It doesn't currently work with server rendered pages

```js
// Create a new div element with id="knitt-root"
const knittRoot = document.createElement('div');
knittRoot.id = 'knitt-root';

// Append the created div to the body
document.body.appendChild(knittRoot);

// Create a script element
const knittScript = document.createElement('script');
knittScript.src = 'https://cdn.jsdelivr.net/gh/esxr/knitt.ai@main/dist/index.js';
knittScript.setAttribute('data-openai-api-key', 'YOUR-OPENAI-API-KEY');
knittScript.defer = true;

// Append the script to the body
document.body.appendChild(knittScript);
```

## Installation

**Ready to revolutionize your website?**
It's as easy as _1-2-3!_

### Self-Hosted Open-Source Solution

If you have an OpenAI API key, use this snippet:

```html
<div id="knitt-root"></div>
<script
  src="https://cdn.jsdelivr.net/gh/esxr/knitt.ai@main/dist/index.js"
  data-openai-api-key="YOUR_OPENAI_API_KEY"
  defer
></script>
```

> **Note**: Using the open-source version only provides a basic experience and is prone to errors. For an advanced experience with features like Retrieval Augmented Generation, Custom PDFs, Auto Navigation, and much more, use Knitt AI with a custom API key.

### CloudFront Distribution with Custom API Key

If you have a custom API key provided by Knitt AI, use this snippet:

```html
<div id="knitt-root"></div>
<script
  src="https://d1234567890.cloudfront.net/index.js"
  data-api-key="YOUR_CUSTOM_API_KEY"
  defer
></script>
```

**That's it!** Sit back and watch Knitt AI transform your website into an intelligent, user-friendly powerhouse. 🚀

## Example

Here is a partial example of how to integrate Knitt AI into your existing website:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tech Consulting - Knitt AI Navigation Demo</title>
  </head>
  <body>
    <!-- rest of the site content -->

    <!-- Self-hosted open-source solution using OpenAI API key -->
    <div id="knitt-root"></div>
    <script
      src="https://cdn.jsdelivr.net/gh/esxr/knitt.ai@main/dist/index.js"
      data-openai-api-key="YOUR_OPENAI_API_KEY"
      defer
    ></script>

    <!-- OR -->

    <!-- CloudFront distribution with custom API key -->
    <div id="knitt-root"></div>
    <script
      src="https://d1234567890.cloudfront.net/index.js"
      data-api-key="YOUR_CUSTOM_API_KEY"
      defer
    ></script>
  </body>
</html>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.