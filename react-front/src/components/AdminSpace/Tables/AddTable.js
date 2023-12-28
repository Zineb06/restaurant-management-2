// AddTable.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTable = ({ show, handleClose, updateTableList }) => {
  const [idTable, setIdTable] = useState('');
  const [location, setLocation] = useState('inside');
  const [guests, setGuests] = useState('2');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
        body: JSON.stringify({
          idTable,
          location,
          guests,
        }),
      });

      if (response.ok) {
        setIdTable('');
        setLocation('inside');
        setGuests('2');
        handleClose();
        setShowSuccessModal(true);

        // Mettre à jour la liste des tables dans ListTable
        updateTableList();
      } else {
        console.error('Error adding table:', response.statusText);
        alert('Failed to add table. Please try again.');
      }
    } catch (error) {
      console.error('Error adding table:', error);
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
          <Modal.Title>Add New Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="idTable">
              <Form.Label>Table ID</Form.Label>
              <Form.Control
                type="text"
                value={idTable}
                onChange={(e) => setIdTable(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="inside">Inside</option>
                <option value="outside">Outside</option>
                <option value="front">Front</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="guests">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                as="select"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
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
              Add Table
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
              <div className="modal-body">Table added successfully!</div>
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

export default AddTable;