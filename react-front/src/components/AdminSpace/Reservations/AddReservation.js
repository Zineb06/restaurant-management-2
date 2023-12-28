// AddReservation.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddReservation = ({ show, handleClose, updateReservationList }) => {
  const [idClient, setIdClient] = useState('');
  const [numTable, setNumTable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestsNumber, setGuestsNumber] = useState('');
  const [status, setStatus] = useState('confirmed');
  const [tables, setTables] = useState([]);
  const [clients, setClients] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Fetch tables data
    fetch('http://127.0.0.1:8000/api/tables')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data.tables is defined before setting state
        if (data.tables) {
          setTables(data.tables);
        }
      })
      .catch((error) => console.error('Error fetching tables:', error));

    // Fetch clients data
    fetch('http://127.0.0.1:8000/api/clients')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data.clients is defined before setting state
        if (data.client) {
          setClients(data.client);
        }
      })
      .catch((error) => console.error('Error fetching clients:', error));
  }, []); // Empty dependency array to fetch data only once on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
        body: JSON.stringify({
          idClient,
          NumTable: numTable,
          date,
          time,
          GuestsNumber: guestsNumber,
          status,
        }),
      });

      if (response.ok) {
        setIdClient('');
        setNumTable('');
        setDate('');
        setTime('');
        setGuestsNumber('');
        setStatus('');
        handleClose();
        setShowSuccessModal(true);

        // Update the reservation list in ListReservation
        updateReservationList();
      } else {
        console.error('Error adding reservation:', response.statusText);
        alert('Failed to add reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="idClient">
            <Form.Label>Client ID</Form.Label>
            <Form.Control
              as="select"
              value={idClient}
              onChange={(e) => setIdClient(e.target.value)}
            >
              <option value="" disabled>Select Client ID</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.id} ({client.nom}-{client.prenom})
                </option>
              ))}
            </Form.Control>
          </Form.Group>

           
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  as="select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}  
                > 
                  <option value="" disabled selected>Select Time</option>
                  <option value="8:00">8:00</option>
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </Form.Control>
              </Form.Group>

            <Form.Group controlId="numTable">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                as="select"
                value={numTable}
                onChange={(e) => setNumTable(e.target.value)}
              >
                <option value="" disabled>Select Table Number</option>
                {tables.map((table) => (
                  <option key={table.idTable} value={table.idTable}>
                  {table.idTable}  ({table.location} - Guests: {table.guests})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="guestsNumber">
              <Form.Label>Guests Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Guests Number"
                value={guestsNumber}
                onChange={(e) => setGuestsNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="confirmed">Reserved</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SuccessModal component */}
      {showSuccessModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button type="button" className="close" onClick={handleCloseSuccessModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">Reservation added successfully!</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCloseSuccessModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReservation;
