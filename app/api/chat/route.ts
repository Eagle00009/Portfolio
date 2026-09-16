export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({error: {message: 'Chat is not configured yet.'}}, {status: 503});
  const body = await request.json();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)});
  return Response.json(await response.json(), {status:response.status});
}
