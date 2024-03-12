"use client"
import { cn } from "@/lib/utils"
import { useSideBar } from "@/store/use-sidebar"

import { ToggleSkelton } from "./Toggle"
import { RecommendedSkeleton } from "./Reccomended"
import { useIsClient } from "usehooks-ts"
import { FollowingSkeleton } from "./Following"

interface WrapprerProps{
    children:React.ReactNode
}

export const Wrapper =({
    children,
}:WrapprerProps)=>{
    const isClient=useIsClient()
    const{collapsed}=useSideBar((state)=>state)
    if(!isClient){return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkelton/>
            <FollowingSkeleton/>
            <RecommendedSkeleton/>
        </aside>
    )}
    return(
      <aside className={cn(
            "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px]"
          )}
        >
            {children}
        </aside>
    )
}