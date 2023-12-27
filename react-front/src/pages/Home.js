import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Pizza Palace </h1><br></br>
        <p> Pizza That Fits Your Taste </p>
        {/* <Link to="/reservationForm">
          <button> Make Reservation </button>
        </Link> */}
        <>     </>
        <Link to="/login">
          <button> Login </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
