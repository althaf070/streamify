"use server"

import { getSelf } from "@/lib/auth-store"
import { blockUser, unBlockUser } from "@/lib/blockService"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
  );
  

export const onBlock=async(id:string)=>{
 const self=await getSelf()   
 let blockedUser;
 try{
     blockedUser=await blockUser(id)
 }catch{

 }
 try{
await roomService.removeParticipant(self.id,id)
 }catch{

 }
revalidatePath(`/u/${self.username}/community`)
return blockedUser
}
export const onUnBlock=async(id:string)=>{
    const self=await getSelf()
const unblockedUser=await unBlockUser(id)
revalidatePath(`/u/${self.username}/community`)

return unblockedUser
}

