import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import "./App.css";
import Navbar from "./homepage/Navbar";
import Footer from "./homepage/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import ReservationForm from "./pages/ReservationForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login';

function App() { 
   const {getToken} = AuthUser();
  if(getToken()){
  return <Auth/>
    }

  // return (
  //     <Guest/>
  // );
  return (
    <Router>
      <div className="App">
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/reservationForm" element={<ReservationForm/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;