import { StreamPlayer } from "@/components/streampalyer"
import { getUserByusername } from "@/lib/userService"
import { currentUser } from "@clerk/nextjs"

interface CreaterPageProps{
  params:{
    username:string
  }
}
const Createrpage = async({params}:CreaterPageProps) => {
  const externalUser=await currentUser()
  const user=await getUserByusername(params.username)
  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing
      />
    </div>
  )
}

export default Createrpage