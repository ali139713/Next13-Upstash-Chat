"use client";

import { Message } from "../typings";
import fetcher from "../utils/fetchMessages"; 
import useSWR from 'swr';

const MessageList = () => {
  const { data: messages, error, mutate } = useSWR<Message[]>("/api/messages", fetcher);
  return (
    <main>
      {messages?.map((message: Message) => (
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
      ))}
    </main>
  );
};

export default MessageList;