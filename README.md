# Deploying OpenAI API Proxy on Cloudflare Worker

This guide will help you set up an OpenAI API proxy using Cloudflare Workers. This proxy can improve request performance and provide additional security benefits.

## Step 1: Deploy the Worker

1. **Copy the Script**:
   - Open the `index.js` file from this repository.
   - Copy all the content.

2. **Paste into Cloudflare Worker**:
   - Log into your Cloudflare account.
   - Go to the Workers section and create a new worker.
   - Paste the copied content into the script editor in the Cloudflare Worker's dashboard.
   - Save your changes.

## Step 2: Bind a Custom Domain

1. **Add Route**:
   - Still in the Workers section, select your worker.
   - Go to the "Triggers" tab and add a route using your custom domain (e.g., `https://your-openai-proxy.com/*`).
   - Ensure that your DNS settings for the domain are correctly configured in Cloudflare.

## Step 3: Configure Your Application to Use the Proxy

1. **Update API Endpoint**:
   - In your application, change the OpenAI API endpoint from `https://api.openai.com` to your custom domain (e.g., `https://your-openai-proxy.com`).

2. **Keep Authentication**:
   - Continue to use your OpenAI API key for authentication. The proxy will forward this to the OpenAI API.

## Step 4: Test the Proxy

You can test your proxy using the following curl command. Replace `your-openai-proxy.com` with your actual domain, and `$OPENAI_API_KEY` with your OpenAI API key.

```bash
curl https://your-openai-proxy.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
    },
    {
      "role": "user",
      "content": "Compose a poem that explains the concept of recursion in programming."
    }
  ]
}'
```
If the proxy is working correctly, you should receive a response from the OpenAI API with a poetic explanation of recursion.

## Notes

- Ensure that your Cloudflare Worker has the necessary CORS headers set up if you're making requests from a browser-based application.
- This proxy forwards all requests to the OpenAI API. Make sure to implement any necessary rate limiting or additional security measures in your Worker script if needed.
- Keep your OpenAI API key secure and do not expose it in client-side code.

By following these steps, your applications will now use your Cloudflare Worker as a proxy for OpenAI API requests, which can improve performance and provide additional security benefits.
