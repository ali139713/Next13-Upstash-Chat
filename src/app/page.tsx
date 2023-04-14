import { getServerSession } from 'next-auth'
import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const HomePage = async () => {

  const data:any = await fetch(`${process.env.VERCEL_URL}/api/getMessages`)
  const messages:Message[] = data.messages;

  const session = await getServerSession();

  return (
    <>
   <MessageList initialMessages={messages}/>
   <ChatInput session={session}/>
   </>
  )
}

export default HomePage