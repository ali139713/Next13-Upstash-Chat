"use client";

import { Message } from "../typings";
import fetcher from "../utils/fetchMessages"; 
import useSWR from 'swr';
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { clientPusher } from "../pusher";

type Props = {
  initialMessages:Message[]
}

const MessageList = ({initialMessages}:Props) => {
  const { data: messages, error, mutate } = useSWR<Message[]>("/api/messages", fetcher);

  useEffect(() => {
      const channel = clientPusher.subscribe("messages");

      channel.bind("new-message", async (data:Message) => {

        if(messages?.find((message) => message.id === data.id))
        return;

        if(!messages){
          mutate(fetcher)
        }
        else{
          mutate(fetcher, {
            optimisticData:[...messages, data],
            rollbackOnError:true
          })
        }

      })

      return () => {
        channel.unbind_all();
        channel.unsubscribe()
      }

  },[])

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message: Message) => (
        <MessageComponent key={message.id} message={message}/>
      ))}
    </div>
  );
};

export default MessageList;