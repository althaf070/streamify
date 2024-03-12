"use client"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useChatSideBar } from "@/store/useChatsidebar"
import { Hint } from "../Hint";
import { Button } from "../ui/button";


export const ChatToggle = () => {
    const{collapsed,onCollapse,onExpand}=useChatSideBar((state)=>state)
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const onToggle = () => {
        if (collapsed) {
          onExpand();
        } else {
          onCollapse();
        }
      };
    
      const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" aschild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}
