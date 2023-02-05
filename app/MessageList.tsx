"use client";

import { Message } from "../typings";
import fetcher from "../utils/fetchMessages"; 
import useSWR from 'swr';
import MessageComponent from "./MessageComponent";

const MessageList = () => {
  const { data: messages, error, mutate } = useSWR<Message[]>("/api/messages", fetcher);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message: Message) => (
        <MessageComponent key={message.id} message={message}/>
      ))}
    </div>
  );
};

export default MessageList;