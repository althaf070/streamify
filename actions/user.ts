"use server"

import { getSelf } from "@/lib/auth-store"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateUser=async (values:Partial<User>) =>{
    try{
        const self=await getSelf()
        const validate={
            bio:values.bio
        }
        const user=await db.user.update({
            where:{id:self.id},
            data:{...validate}
        })
        revalidatePath(`/${self.username}`)
        revalidatePath(`/u/${self.username}`)
        return user
    }
    catch{
        throw new Error("Internl Error")
    }
}