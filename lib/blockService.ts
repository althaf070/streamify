import { getSelf } from "./auth-store"
import { db } from "./db"

export const isBlockedByUser=async(id:string)=>{
    try {
        const  self=await getSelf()
        const otherUser = await db.user.findUnique({
            where:{id}
        })
        if(!otherUser){
            throw new Error("User..not..found")
        }
        if(otherUser.id===self.id){
            return false
        }
        const existingBlock=await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                blockerId:otherUser.id,
                blockedId:self.id
                }
            }
        })
        return !!existingBlock
    } catch {
        return false
    }
}

export const blockUser=async(id:string)=>{
const self=await getSelf()
if(self.id==id){
    throw new Error("Cannot block yourself.")
}
const otherUser = await db.user.findUnique({
    where:{id}
})
if(!otherUser){
    throw new Error("User..not..found")
}
const existingBlock=await db.block.findUnique({
    where:{
        blockerId_blockedId:{
        blockerId:self.id,
        blockedId:otherUser.id
        }
    }
})
if(existingBlock){
    throw new Error("Already blocked")
}
const block=await db.block.create({
    data:{
        blockerId:self.id,
        blockedId:otherUser.id,
    },
    include:{
        blocked:true,
    }
})
return block
}

export const unBlockUser=async(id:string)=>{
    const self=await getSelf();
    if(self.id==id){
        throw new Error("Cannot unblock yourself.")
    }
    const otherUser = await db.user.findUnique({
        where:{id}
    })
    if(!otherUser){
        throw new Error("User..not..found")
    }
    const existingBlock=await db.block.findUnique({
        where:{
            blockerId_blockedId:{
            blockerId:self.id,
            blockedId:otherUser.id
            }
        }
    })
    if(!existingBlock){
        throw new Error("Not blocked")
    }
    const unblock=await db.block.delete({
        where:{
            id:existingBlock.id
        },
        include:{
            blocked:true
        }
    })
    return unblock
}



export const getBlockedUsersByCurrentUser = async () => {
  try {
    // Fetch information about the current user
    const currentUser = await getSelf();

    // Fetch blocked users by the current user
    const blockedUsers = await db.block.findMany({
      where: {
        blockerId: currentUser.id, // Assuming blockerId represents the ID of the user who blocked others
      },
      include: {
        blocked: true, // Include the blocked user information
      },
    });

    return blockedUsers;
  } catch (error) {
    console.error("Error fetching blocked users:", error);
    return []; // Return an empty array if an error occurs
  }
};
