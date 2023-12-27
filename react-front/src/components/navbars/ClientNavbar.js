import { Outlet } from "react-router-dom";
import { Nav, NavLink, NavBtnLink, NavBtn, NavMenu } from "./NavbarElements"

export default function ClientNavbar(){
  return(
    <>
      <Nav>
          <NavMenu>
            <NavLink to=''>Voir profil</NavLink>
       
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='..'>Log out</NavBtnLink>
          </NavBtn>
        </Nav>
      <Outlet/>
    </>
    );
}