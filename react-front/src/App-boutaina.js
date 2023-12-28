import React from 'react';
import { Routes, Route } from 'react-router-dom';

// CSS imports
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Navbar components
import MainNavbar from './components/navbars/MainNavbar';
import AdminNavbar from './components/navbars/AdminNavbar';
import ClientNavbar from './components/navbars/ClientNavbar';

// Auth components
import LoginAdmin from "./components/Auth/LoginAdmin";
import LoginClient from "./components/Auth/LoginClient";

// HomePage component
import HomePage from "./components/HomePage";

// AdminSpace components
import Dashboard from './components/AdminSpace/Dashboard';
import ListClient from './components/AdminSpace/Clients/ListClient';
import AddClient from './components/AdminSpace/Clients/AddClient'
import EditClient from "./components/AdminSpace/Clients/EditClient";
import ShowClient from "./components/AdminSpace/Clients/ShowClient";

import ListMenu from './components/AdminSpace/Menus/ListMenu';
import AddMenu from './components/AdminSpace/Menus/AddMenu';
import EditMenuModal from './components/AdminSpace/Menus/EditMenu';

import ListTable from './components/AdminSpace/Tables/ListTable';
import ListReservation from './components/AdminSpace/Reservations/ListReservation';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<><MainNavbar/><HomePage/></>} />
        
        <Route path='/login/*'>
          <Route path='admin' element={<LoginAdmin />} />
          <Route path='student' element={<LoginClient />} />
        </Route>

        <Route path='/clients/AddClient' element={<AddClient />} />
        <Route path='/clients/EditClient' element={<EditClient />} />
        <Route path="/clients/EditClient/:id" element={<EditClient  />} />
        <Route path="/clients/:id" element={<ShowClient />} />

        <Route path='/menus/AddMenu' element={<AddMenu />} />
        <Route path='/menus/EditMenu' element={<EditMenuModal/>} />
        <Route path="/menus/EditMenu/:id" element={<EditMenuModal/>} />

        <Route path='/admin/*' element={<AdminNavbar />}>
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='ListClient' element={<ListClient />} />
          <Route path='ListMenu' element={<ListMenu />} />
          <Route path='ListTable' element={<ListTable />} />
          <Route path='ListReservation' element={<ListReservation />} />
          
        </Route>

        <Route path='/Client/*' element={<ClientNavbar />}>
          <Route path='view-profile/:email/:password' element={<ShowClient />} />
          <Route path='' element={<ShowClient />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
