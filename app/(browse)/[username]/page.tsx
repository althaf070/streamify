import { isFollowingUser } from "@/lib/followService";
import { getUserByusername } from "@/lib/userService"
import { notFound } from "next/navigation";
import { Actions } from "./_components/Actions";
import { isBlockedByUser } from "@/lib/blockService";
import { StreamPlayer } from "@/components/streampalyer";

interface UserpageProps{
    params:{
        username:string
    }
}
const UserPage = async({params}:UserpageProps) => {
  const user=await getUserByusername(params.username);
  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing=await isFollowingUser(user.id);
  const isBlocked=await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound();
  }
  return (
    <div className="h-full">
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  </div>
  )
}

export default UserPage