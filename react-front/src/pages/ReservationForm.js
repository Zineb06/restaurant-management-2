import React from "react";
import PizzaLeft from "../assets/pizzaLeft.jpg";
import "../styles/Contact.css";

function ReservationForm() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      <div className="rightSide">
        <h1> Make A Reservation </h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="cin">Cin</label>
          <input name="cin" placeholder="Enter cin..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="email">Phone</label>
          <input name="phone" placeholder="Enter phone number..." type="text" />
          <label htmlFor="date">Date</label>
          <input name="date" placeholder="Enter reservation date..." type="text" />
          <label htmlFor="time">Time</label>
          <input name="time" placeholder="Enter reservation time..." type="text" />
          <label htmlFor="guests">Guests Number</label>
          <input name="guests" placeholder="Enter guests number..." type="text" />
          <label htmlFor="table number">Table Number</label>
          <input name="table" placeholder="Enter table number..." type="text" />

          <button type="submit"> Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
