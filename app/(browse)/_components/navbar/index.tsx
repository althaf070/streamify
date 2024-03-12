import { Actions } from "./Actions"
import { Search } from "./Search"
import { Logo } from "./logo"

export const Navbar = ()=> {
    return(
        <nav className="fixed top-0 w-full h-20 z-[49] bg-[#1F2544] px-2 lg:px-4 flex justify-between items-center shadow-sm">
          <Logo/>
          <Search/>
          <Actions/>
        </nav>
    )
}