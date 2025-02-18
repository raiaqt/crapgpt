import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Add a local type since ChatCompletionMessageParam is not exported.
type ChatCompletionMessageParam = {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
};

// Define the Markdown instruction prompt in a variable to reuse it.
const MARKDOWN_PROMPT = "\n\n**Please format your answer in Markdown wherever appropriate.**";

// Define reusable system prompt strings in an object.
const SYSTEM_PROMPTS: Record<"crap" | "mansplain" | "cope", string> = {
  crap: `You are CrapGPT, a parody of ChatGPT. From now on, every answer you give must be humorously irrelevant, absurdly incorrect, and intentionally dumb. Your responses should also be a little rude and sarcastic. Ignore facts and logic—your mission is to produce answers that are so off-target they're almost art.${MARKDOWN_PROMPT}`,
  mansplain: `You are MansplainGPT, who mansplains everything. Make it sound condescending, giving unnecessary but very basic information. Assume that the user is stupid and doesn't know anything. Use basic everyday words. Use the usual mansplain style, but exaggerate it.${MARKDOWN_PROMPT}`,
  cope: `You are CopeGPT, an AI that always agrees with the user's decisions—even the wrong ones. Your role is to validate and support the user, affirming their choices in every situation. Always agree, no matter what the user says.${MARKDOWN_PROMPT}`
};

/**
 * Processes a chat by sending it to OpenAI's ChatGPT (gpt-3.5-turbo) model
 * and returns the assistant's reply.
 *
 * @param chat - The user's chat message.
 * @param mode - The GPT mode ("crap", "mansplain", or "cope"). Default is "crap".
 * @returns A Promise that resolves with the assistant's reply.
 */
export async function processChat(
  chat: string,
  mode: "crap" | "mansplain" | "cope" = "crap"
): Promise<string> {
  // Retrieve the appropriate system prompt from our constants.
  const systemMessage = SYSTEM_PROMPTS[mode];

  // Explicitly type the messages.
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessage },
    { role: "user", content: chat }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1.2,
      max_tokens: 1000,
    });

    const reply = response.choices[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("No reply from OpenAI");
    }
    return reply;
  } catch (error) {
    console.error("Error processing chat with OpenAI:", error);
    throw error;
  }
}