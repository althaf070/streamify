"use client"
import Link from "next/link"
import { LucideCalendarPlus } from "lucide-react";

export const Meetings = () => {
 
  return (
    <>
    <div className="flex flex-col items-center">
      {/* Show only icon on small devices */}
      <div className="mb-4 cursor-pointer sm:block lg:hidden">
      <Link href={'/meeting'}>
        <LucideCalendarPlus />
        </Link>
      </div>
</div>
      {/* Show only paragraph on larger devices */}
      <div className="mb-4 ml-6 cursor-pointer hidden lg:block">
        <Link href={'/meeting'}>
          <p className="flex gap-2"><LucideCalendarPlus />Meetings</p>
        </Link>
     
    </div>
    </>
  )
}
