
import { UrlCard } from "./_components/UrlCard"
import { getSelf } from "@/lib/auth-store"
import { getStreamByUserId } from "@/lib/streamService"
import { KeyCard } from "./_components/KeyCard"
import { ConnectModel } from "./_components/ConnectModel"


const Keyspage = async() => {
    const self=await getSelf()
    const stream=await getStreamByUserId(self.id)

    if(!stream){
        throw new Error("Stream not found")
    }
  return (
    <div className="p-6">
        
      
      <h1 className="text-2xl font-bold mb-4">
          Keys & URLs
        </h1>
           <ConnectModel/>
           <div className="flex items-center justify-between mt-4 mb-4">
            <div className="space-y-4">
                <UrlCard value={stream.serverUrl}/>
                <KeyCard value={stream.streamKey}/>
            </div>
        </div>
    </div>
  )
}

export default Keyspage