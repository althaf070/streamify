"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { 
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
} from "lucide-react";
import { NavItem, NavItemSkeleton } from "./NavItem";


export const Navigation = () => {
    const pathname = usePathname();
    const { user } = useUser();
  
    const routes = [
      {
        label: "Stream",
        href: `/u/${user?.username}`,
        icon: Fullscreen,
      },
      {
        label: "Keys",
        href: `/u/${user?.username}/keys`,
        icon: KeyRound,
      },
      {
        label: "Chat",
        href: `/u/${user?.username}/chat`,
        icon: MessageSquare,
      },
      {
        label: "Community",
        href: `/u/${user?.username}/community`,
        icon: Users,
      },
    ];
    
    if (!user?.username) {
        return (
          <ul className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <NavItemSkeleton key={i} />
            ))}
          </ul>
        );
      }
  return (
    <ul>
        {routes.map((route)=>(
            <div key={route.href}>
              <NavItem
              key={route.href}
              label={route.label}
              href={route.href}
              icon={route.icon}
              isActive={pathname===route.href}
              />
            </div>
        ))}
    </ul>
  )
}
