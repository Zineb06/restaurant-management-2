// EditReservation.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReservation = ({ show, handleClose, reservation, updateReservationList }) => {
  // Check if the prop 'reservation' is defined
  if (!reservation) {
    // Display an error message or redirect the user, etc.
    return <div></div>;
  }

  // Initialize states with the values of the reservation
  const [editedClient, setEditedClient] = useState(reservation.client);
  const [editedTable, setEditedTable] = useState(reservation.table);
  const [editedDate, setEditedDate] = useState(reservation.date);
  const [editedTime, setEditedTime] = useState(reservation.time);
  const [editedGuestsNumber, setEditedGuestsNumber] = useState(reservation.GuestsNumber);
  const [editedStatus, setEditedStatus] = useState(reservation.Status);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Update states when the 'reservation' prop changes
  useEffect(() => {
    setEditedClient(reservation.client);
    setEditedTable(reservation.table);
    setEditedDate(reservation.date);
    setEditedTime(reservation.time);
    setEditedGuestsNumber(reservation.GuestsNumber);
    setEditedStatus(reservation.Status);
  }, [reservation]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your logic to submit the form here
    try {
      // Send a PUT request to the server to update the reservation
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${reservation.idReservation}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
        body: JSON.stringify({
          client: editedClient,
          table: editedTable,
          date: editedDate,
          time: editedTime,
          GuestsNumber: editedGuestsNumber,
          Status: editedStatus,
        }),
      });

      if (response.ok) {
        // If the update succeeds, update the list of reservations
        updateReservationList();
        // Show the success modal
        setShowSuccessModal(true);
        // Close the edit modal
        handleClose();
      } else {
        console.error('Error updating reservation:', response.statusText);
        alert('Failed to update reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
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
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="editedClient">
              <Form.Label>Client</Form.Label>
              <Form.Control
                type="text"
                value={editedClient}
                onChange={(e) => setEditedClient(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editedTable">
              <Form.Label>Table</Form.Label>
              <Form.Control
                type="text"
                value={editedTable}
                onChange={(e) => setEditedTable(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editedTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editedGuestsNumber">
              <Form.Label>Guests Number</Form.Label>
              <Form.Control
                type="number"
                value={editedGuestsNumber}
                onChange={(e) => setEditedGuestsNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editedStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Reservation
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
              <div className="modal-body">Reservation updated successfully!</div>
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

export default EditReservation;