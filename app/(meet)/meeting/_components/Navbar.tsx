import { Logo } from '@/app/(browse)/_components/navbar/logo';
import MobileNav from '@/components/meet/MobileNav';
import {SignedIn, UserButton } from '@clerk/nextjs';



export const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full  bg-[#1F2544] px-6 py-4 lg:px-10">
     <Logo/>
   
   <div className="flex-between gap-5">
   <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
    <MobileNav/>
   </div>
    
  </nav>
  )
}
