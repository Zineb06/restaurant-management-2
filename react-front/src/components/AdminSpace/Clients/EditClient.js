// EditClient.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditClient = ({ show, handleClose, client, updateClientList }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Set initial values when the client prop changes
    if (client) {
      setNom(client.nom);
      setPrenom(client.prenom);
      setEmail(client.email);
      setPhone(client.phone);
      setCin(client.cin);
    }
  }, [client]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          phone,
          cin,
        }),
      });

      if (response.ok) {
        handleClose();
        // Update the client list in ListClient
        updateClientList();
        setShowSuccessModal(true);
      } else {
        console.error('Error editing client:', response.statusText);
        alert('Failed to edit client. Please try again.');
      }
    } catch (error) {
      console.error('Error editing client:', error);
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
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="prenom">
              <Form.Label>Prenom</Form.Label>
              <Form.Control type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="cin">
              <Form.Label>CIN</Form.Label>
              <Form.Control type="text" value={cin} onChange={(e) => setCin(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
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
              <div className="modal-body">Client updated successfully!</div>
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

export default EditClient;
