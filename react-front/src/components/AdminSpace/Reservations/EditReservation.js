import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReservation = ({ show, handleClose, reservation, updateReservationList }) => {
  // Vérifiez si la prop 'reservation' est définie
  if (!reservation) {
    // Affichez un message d'erreur ou redirigez l'utilisateur, etc.
    return <div></div>;
  }

  // Initialiser les états avec les valeurs de la réservation
  const [editedStatus, setEditedStatus] = useState(reservation.Status);
  const [editedClient, setEditedClient] = useState(reservation.idClient);
  const [editedTableNumber, setEditedTableNumber] = useState(reservation.NumTable);
  const [editedDate, setEditedDate] = useState(reservation.date);
  const [editedTime, setEditedTime] = useState(reservation.time);
  const [editedGuestsNumber, setEditedGuestsNumber] = useState(reservation.GuestsNumber);
  const [clients, setClients] = useState([]);
  const [tables, setTables] = useState([]);

  // Mettre à jour les états lorsque la propriété 'reservation' change
  useEffect(() => {
    setEditedStatus(reservation.Status);
    setEditedClient(reservation.idClient);
    setEditedTableNumber(reservation.NumTable);
    setEditedDate(reservation.date);
    setEditedTime(reservation.time);
    setEditedGuestsNumber(reservation.GuestsNumber);
  }, [reservation]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Récupérer l'id de la réservation
      const id = reservation.idReservation;

      // Construire le corps de la requête avec les données mises à jour
      const data = {
        Status: editedStatus,
        idClient: editedClient,
        NumTable: editedTableNumber,
        date: editedDate,
        time: editedTime,
        GuestsNumber: editedGuestsNumber,
      };


      // Envoyer une requête PUT au serveur pour mettre à jour la réservation
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Si la mise à jour réussit, mettez à jour la liste des réservations
        updateReservationList();
        // Affichez le modal de succès
        setShowSuccessModal(true);
        // Fermez le modal d'édition
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
                as="select"
                type="text"
                value={editedClient}
                onChange={(e) => setEditedClient(e.target.value)}
                >
                <option value="" disabled>Select Client ID</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.id} ({client.nom}-{client.prenom})
                  </option>
              ))}
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="editedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editedTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
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
            <Form.Group controlId="editedTableNumber">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={editedTableNumber}
                onChange={(e) => setEditedTableNumber(e.target.value)}
                >
                <option value="" disabled>Select Table Number</option>
                {tables.map((table) => (
                  <option key={table.idTable} value={table.idTable}>
                  {table.idTable}  ({table.location} - Guests: {table.guests})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editedGuestsNumber">
              <Form.Label>Guests Number</Form.Label>
              <Form.Control
                type="number"
                value={editedGuestsNumber}
                onChange={(e) => setEditedGuestsNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editedStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SuccessModal component */}
      {showSuccessModal && (
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Reservation updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditReservation;