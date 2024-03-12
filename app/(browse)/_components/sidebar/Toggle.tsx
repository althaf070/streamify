"use client";

import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
             <Hint label={label} side="right" aschild>
          <Button variant={"ghost"} className="h-auto p-2" onClick={onExpand}>
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For You</p>
          <Hint label={label} side="right" aschild>
          <Button
            className="h-auto ml-auto p-2"
            variant="ghost"
            onClick={onCollapse}
          >
            <ArrowLeftFromLine className="h-4 w-4" />
          </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkelton=() => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[180px]"/>
      <Skeleton className="h-6 w-6"/>
    </div>
  )
}