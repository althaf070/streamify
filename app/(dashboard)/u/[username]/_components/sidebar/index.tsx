import { Navigation } from "./navigation"
import { Toggle } from "./Toggle"
import { Wrapper } from "./Wrapper"

export const SideBar=()=>{
    return (
        <Wrapper>
           <Toggle/>
         <Navigation/>
        </Wrapper>
    )
}