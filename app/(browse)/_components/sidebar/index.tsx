import { getRecommended} from "@/lib/reccomendedservicce"
import { Reccomended, RecommendedSkeleton } from "./Reccomended"
import { Toggle, ToggleSkelton } from "./Toggle"
import { Wrapper } from "./Wrapper"
import { getFollowedUsers } from "@/lib/followService"
import { Following, FollowingSkeleton } from "./Following"
import {Meetings} from './Meetings'


export const Sidebar = async() => {
  const reccomended=await getRecommended()
  const following=await getFollowedUsers()
  return (
    <Wrapper>
        <Toggle/>
        <div className="space-y-4 pt-4 lg:pt-0">
          <Following data={following}/>
          <Reccomended data={reccomended}/>
          <Meetings/>
        </div>
    </Wrapper>
  )
}
export const SidebarSkeleton = () => {
  return(
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkelton/>
      <FollowingSkeleton/>
      <RecommendedSkeleton/>

    </aside>
  )
}
