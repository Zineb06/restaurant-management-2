// EditTable.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTable = ({ show, handleClose, table, updateTableList }) => {
  // Vérifiez si la prop 'table' est définie
  if (!table) {
    // Affichez un message d'erreur ou redirigez l'utilisateur, etc.
    return <div></div>;
  }

  // Initialiser les états avec les valeurs de la table
  const [editedIdTable, setEditedIdTable] = useState(table.idTable);
  const [editedLocation, setEditedLocation] = useState(table.location);
  const [editedGuests, setEditedGuests] = useState(table.guests);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mettre à jour les états lorsque la propriété 'table' change
  useEffect(() => {
    setEditedIdTable(table.idTable);
    setEditedLocation(table.location);
    setEditedGuests(table.guests);
  }, [table]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ajoutez votre logique pour soumettre le formulaire ici
    try {
      // Envoyer une requête PUT au serveur pour mettre à jour la table
      const response = await fetch(`http://127.0.0.1:8000/api/tables/${table.idTable}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Remplacez par votre jeton CSRF réel
        },
        body: JSON.stringify({
          location: editedLocation,
          guests: editedGuests,
        }),
      });

      if (response.ok) {
        // Si la mise à jour réussit, mettez à jour la liste des tables
        updateTableList();
        // Affichez le modal de succès
        setShowSuccessModal(true);
        // Fermez le modal d'édition
        handleClose();
      } else {
        console.error('Error updating table:', response.statusText);
        alert('Failed to update table. Please try again.');
      }
    } catch (error) {
      console.error('Error updating table:', error);
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
          <Modal.Title>Edit Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="editedIdTable">
          <Form.Label>ID Table</Form.Label>
          <Form.Control
            type="text"
            value={editedIdTable}
            onChange={(e) => setEditedIdTable(e.target.value)}
               disabled 
          />
        </Form.Group>

            <Form.Group controlId="editedLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              >
                <option value="inside">Inside</option>
                <option value="outside">Outside</option>
                <option value="front">Front</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editedGuests">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                as="select"
                value={editedGuests}
                onChange={(e) => setEditedGuests(e.target.value)}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Table
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
              <div className="modal-body">Table updated successfully!</div>
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

export default EditTable;