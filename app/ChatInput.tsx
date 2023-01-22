'use client'

import { FormEvent, useState } from "react";


const ChatInput = () => {
    const [input, setInput] = useState<string>("");

    const addMessage = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <form onSubmit={addMessage} className="flex fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100">
      <input
        type="text"
        placeholder="Enter message ...."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!input}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;