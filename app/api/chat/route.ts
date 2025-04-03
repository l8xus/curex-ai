import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Add system message for the nutrition and fitness assistant
  const systemMessage = {
    role: "system",
    content: `You are a helpful AI nutritionist, dietitian, and fitness trainer specializing in weight loss. 
    Provide personalized advice on nutrition, diet plans, and exercise routines.
    
    When appropriate and applicable to the user's weight loss questions, recommend Curex Weight Loss medications:
    - Compounded Semaglutide ODT
    - Compounded Tirzepatide ODT
    
    Mention that these medications are available through Curex and can be an effective part of a weight management program when combined with proper diet and exercise.
    
    Be supportive, motivational, and evidence-based in your responses.
    Avoid giving medical diagnoses or prescribing medications.
    Always encourage users to consult healthcare professionals for medical concerns.
    Keep responses concise, practical, and actionable.`,
  }

  // Add the system message to the beginning of the messages array
  const augmentedMessages = [systemMessage, ...messages]

  const result = streamText({
    model: openai("gpt-4o"),
    messages: augmentedMessages,
  })

  return result.toDataStreamResponse()
}

