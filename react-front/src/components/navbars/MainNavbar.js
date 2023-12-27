import { Outlet } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./NavbarElements"

export default function MainNavbar(){
    return(
      <>
        <Nav>
            <NavMenu>
              <NavLink to='admin'>AdminSpace</NavLink>
              <NavLink to=''>ClientSpace</NavLink>
              
            </NavMenu> 
          </Nav>
        <Outlet/>
      </>
    );
}