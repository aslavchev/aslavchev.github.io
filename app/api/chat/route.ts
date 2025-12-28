import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"
import { rateLimit } from "@/lib/rate-limit"

export const maxDuration = 30

export async function POST(req: Request): Promise<Response> {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

  if (!rateLimit(ip, 10, 60000)) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again in a minute.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      },
    )
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `You are a helpful AI assistant for Alex Rivera's portfolio website. Alex is a Senior QA Engineer with expertise in:

- Test Automation (Selenium, Cypress, Playwright)
- API Testing (Postman, REST Assured)
- Performance Testing (JMeter, K6)
- CI/CD Integration (Jenkins, GitHub Actions)
- Mobile Testing (Appium)

Key achievements to mention:
- Reduced regression testing time by 70% through comprehensive automation framework
- Increased test coverage from 45% to 92% across web and mobile platforms
- Implemented CI/CD pipelines reducing deployment time by 40%
- Led QA initiatives on enterprise e-commerce and fintech platforms

When answering questions:
1. Be friendly and professional
2. Focus on Alex's QA expertise and achievements
3. If asked about projects, mention the E-Commerce Testing, Financial Services API Testing, or Healthcare Mobile App QA
4. If asked about contact, encourage visitors to use the contact form or connect via LinkedIn/GitHub
5. Keep responses concise but informative

Do not make up information beyond what's provided above.`

  const prompt = convertToModelMessages([
    {
      id: "system",
      role: "system",
      parts: [{ type: "text", text: systemPrompt }],
    },
    ...messages,
  ])

  const result = streamText({
    model: "openai/gpt-5-mini",
    prompt,
    maxOutputTokens: 500,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
