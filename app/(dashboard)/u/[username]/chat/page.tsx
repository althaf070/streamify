import { getSelf } from "@/lib/auth-store"
import { getStreamByUserId } from "@/lib/streamService"
import { Togglecard } from "./_components/Togglecard"



const page = async() => {
    const self=await getSelf() 
    const stream=await getStreamByUserId(self.id)
    if(!stream){
        throw new Error("Stream not found")
    }
  return (
    <div className="p-6">
        <div className="mb-4">
            <h1 className="text-2x1 font-bold">
                Chat Settings
            </h1>
        </div>
        <div className="space-y-4">
        <Togglecard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <Togglecard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <Togglecard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
        </div>
    </div>
  )
}

export default page

