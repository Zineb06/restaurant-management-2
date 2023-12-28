import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import "./App.css";
import "./dashboard.css";
import Navbar from "./homepage/Navbar";
import Footer from "./homepage/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import ReservationForm from "./pages/ReservationForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login';
import AdminNavbar from './components/navbars/AdminNavbar';

//AdminSpace components
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
   const {getToken} = AuthUser();
  if(getToken()){
  return (

        <Routes>
          {/* <Route path="/*" element={<Auth />} /> */}
          <Route path='/*' element={<AdminNavbar />} >
            <Route path='Dashboard' element={<Dashboard />} />
            <Route path='ListClient' element={<ListClient />} />
            <Route path='ListMenu' element={<ListMenu />} />
            <Route path='ListTable' element={<ListTable />} />
            <Route path='ListReservation' element={<ListReservation />} />
          </Route>
          <Route path="/" element={<div><Navbar/><Home /></div>} />
          <Route path="/menu" element={<div><Navbar/><Menu /></div>} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<div><Navbar/><Login /></div>} />
          {/* <Route path="/reservationForm" element={<div><Navbar/><ReservationForm/></div>} /> */}
        </Routes>
      
  );
    }

  return (
 
      <div className="App">
        
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/reservationForm" element={<ReservationForm/>} />
        </Routes>
        
      </div>

  );
}

export default App;