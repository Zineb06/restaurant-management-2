import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Nav, NavLink, NavBtnLink, NavBtn, NavMenu } from './NavbarElements';

import "../../App.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// AdminSpace components
import Dashboard from '../AdminSpace/Dashboard';
import ListClient from '../AdminSpace/Clients/ListClient';
import AddClient from '../AdminSpace/Clients/AddClient'
import EditClient from "../AdminSpace/Clients/EditClient";
import ShowClient from "../AdminSpace/Clients/ShowClient";

import ListMenu from '../AdminSpace/Menus/ListMenu';
import AddMenu from '../AdminSpace/Menus/AddMenu';
import EditMenuModal from '../AdminSpace/Menus/EditMenu';

import ListTable from '../AdminSpace/Tables/ListTable';
import ListReservation from '../AdminSpace/Reservations/ListReservation';
import AuthUser from '../AuthUser';
import Home from "../../pages/Home";

const headerStyles = {
  background: 'rgb(24,24,24)',
  borderBottom: '1px solid rgba(12, 11, 9, 0.6)',
  transition: 'all 0.5s',
  zIndex: '997',
  padding: '15px 0',
  top: '40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyles = {
  fontSize: '28px',
  margin: '0',
  padding: '0',
  lineHeight: '1',
  fontWeight: '300',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: '#fff',
};

const navLinkStyles = {
  textDecoration: 'none',
  color: '#fff',
  fontSize: '16px',
  marginRight: '20px',
  transition: 'color 0.3s ease',
};
const logout = {
  background: '#cda45e',
};
const AdminNavbar = () => {

  // const {token,logout} = AuthUser();
  //   const logoutUser = () => {
  //       if(token != undefined){
  //           logout();
  //       }
  //   }

  
  return (
    <>
      <Nav style={headerStyles}>
        <h2 style={logoStyles}>Pizza Palace</h2>
        <NavMenu>
        <NavLink to='/' style={navLinkStyles}>
            Home Page
          </NavLink>
          <NavLink to='Dashboard' style={navLinkStyles}>
            Dashboard
          </NavLink>
          <NavLink to='ListClient' style={navLinkStyles}>
            Clients  
          </NavLink>
          <NavLink to='ListTable' style={navLinkStyles}>
            Tables  
          </NavLink>
          <NavLink to='ListReservation' style={navLinkStyles}>
            Reservations  
          </NavLink>
          <NavLink to='ListMenu' style={navLinkStyles}>
            Menu  
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='login' style={logout} >
            Log out
          </NavBtnLink>
        </NavBtn>
      </Nav>
      <Outlet />
    
    </>
  );
};

export default AdminNavbar;
