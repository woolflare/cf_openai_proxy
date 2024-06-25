export default {
  async fetch(request) {
    const OPENAI_API_BASE = 'https://api.openai.com';
    const url = new URL(request.url);
    const openaiUrl = `${OPENAI_API_BASE}${url.pathname}${url.search}`;

    const safeHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || '',
    });

    try {
      const openaiRequest = new Request(openaiUrl, {
        method: request.method,
        headers: safeHeaders,
        body: request.body,
      });

      const openaiResponse = await fetch(openaiRequest);
      const response = new Response(openaiResponse.body, {
        status: openaiResponse.status,
        statusText: openaiResponse.statusText,
        headers: openaiResponse.headers,
      });

      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    } catch (error) {
      return new Response('Error proxying to OpenAI: ' + error.message, { status: 500 });
    }
  },
};
