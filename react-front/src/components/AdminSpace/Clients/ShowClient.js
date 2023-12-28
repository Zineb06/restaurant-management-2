import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShowClient = ({ client, handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Client Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <React.Fragment>
          <section className="text-center" style={{ backgroundColor: '#f4f5f7' }}>
            <div className="col-md-4 mx-auto gradient-custom text-white" style={{ borderRadius: '.5rem' }}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar"
                className="my-5"
                style={{ width: '100px' }}
              />
            </div>
            <div className="row pt-1">
              <div className="col-6 mb-3">
                <h6>Last Name</h6>
                <p className="text-muted">{client.prenom}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>First Name</h6>
                <p className="text-muted">{client.nom}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Email</h6>
                <p className="text-muted">{client.email}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>CIN</h6>
                <p className="text-muted">{client.cin}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Phone</h6>
                <p className="text-muted">{client.phone}</p>
              </div>
            </div>
          </section>
        </React.Fragment>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowClient;
