import Pusher, { Options } from "pusher"
import ClientPusher from "pusher-js"

export const serverPusher =  new Pusher ({
    appId : process.env.PUSHER_APPID!,
    key : '047c3d993a5f00e67485',
    secret : process.env.PUSHER_SECRET!,
    cluster : 'ap2',
    useTLS:true
})



export const clientPusher = new ClientPusher('047c3d993a5f00e67485',{
    cluster : 'ap2',
    forceTLS:true
})