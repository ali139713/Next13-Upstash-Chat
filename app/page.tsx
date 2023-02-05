import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const HomePage = async () => {

  const data:any = await fetch(`${process.env.VERCEL_URL}/api/getMessages`)
  const messages:Message[] = data.messages;
  return (
    <>
   <MessageList initialMessages={messages}/>
   <ChatInput/>
   </>
  )
}

export default HomePage