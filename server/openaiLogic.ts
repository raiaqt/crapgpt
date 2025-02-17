import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Processes a chat by sending it to OpenAI's ChatGPT (gpt-3.5-turbo)
 * model and returns the assistant's reply.
 *
 * @param chat - The user's chat message.
 * @returns A Promise that resolves with the assistant's reply.
 */
export async function processChat(chat: string): Promise<string> {
  // Construct the messages array, including a system prompt and the user's message.
  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [
      {
        role: "system",
        content:
          "You are CrapGPT, a parody of ChatGPT.\n" +
          "From now on, every answer you give must be humorously irrelevant, absurdly incorrect, and intentionally dumb.\n" +
          "Your responses should also be a little rude and sarcastic, laced with snark and attitude.\n" +
          "Ignore facts and logic—your mission is to produce answers that are so off-target they're almost art.\n" +
          "Additionally, all your responses must be short, ranging from one to twenty sentences only, organized neatly, and each response should feel fresh and distinct.",
      },
      {
        role: "user",
        content: chat,
      },
    ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.9,
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
