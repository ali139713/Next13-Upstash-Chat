"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from 'swr';
import fetcher from "../utils/fetchMessages";
import { getServerSession } from 'next-auth'  



type Props = {
  session:any
}

const ChatInput = ({session}:Props) => {
  const [input, setInput] = useState<string>("");

  const { data:messages, error, mutate } = useSWR<Message[]>('/api/messages', fetcher)


  const addMessage = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic:
      session?.user?.image! ,
      email: "aliazhar1306@gmail.com",
    };
    await mutate(uploadMessageToUpstash(message),{
      optimisticData:[message, ...messages!],
      rollbackOnError:true
    })
  };


  const uploadMessageToUpstash = async (message: Message) => {
    const res = await fetch("/api/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message}),
    });

    const data = await res.json();

    return [data.message, ...messages!];

  };

  return (
    <form
      onSubmit={addMessage}
      className="flex fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 bg-white border-t border-gray-100"
    >
      <input
        type="text"
        placeholder="Enter message ...."
        disabled={!session}
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
