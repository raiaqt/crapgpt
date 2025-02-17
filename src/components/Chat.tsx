import { useState, useRef, useEffect, FC, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import styles from './Chat.module.css';
import { processChat } from '../../server/openaiLogic';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Choose container style based on whether there are messages
  const containerClassName =
    messages.length === 0
      ? `${styles.chatContainer} ${styles.centered}`
      : styles.chatContainer;

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add the user's message
    const userMessage: Message = { sender: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await processChat(trimmedInput);
      const assistantMessage: Message = { sender: 'assistant', text: reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing chat:', error);
      const errorMessage: Message = { sender: 'assistant', text: 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Submit on Enter (unless Shift is held)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={containerClassName}>
      {messages.length > 0 && (
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${
                msg.sender === 'user' ? styles.user : styles.assistant
              }`}
            >
              <div className={styles.chatBubble}>{msg.text}</div>
            </div>
          ))}
          {/* Loader bubble for assistant message when loading */}
          {isLoading && (
            <div className={`${styles.chatMessage} ${styles.assistant}`}>
              <div className={styles.loaderBubble}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {messages.length === 0 && (
        <h2 className={styles.initialPrompt}>How can you bother me?</h2>
      )}

      <form className={styles.chatInputArea} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.chatInputField}
            placeholder="Ask anything"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          <button
            type="submit"
            className={styles.chatInputButton}
            disabled={isLoading}
          >
            {isLoading ? <div className={styles.loadingIcon} /> : <>&#8593;</>}
          </button>
        </div>
        <div className={styles.disclaimer}>
          Unlike other AIs, this program does not aim to help you.
        </div>
      </form>
    </div>
  );
};

export default Chat; 