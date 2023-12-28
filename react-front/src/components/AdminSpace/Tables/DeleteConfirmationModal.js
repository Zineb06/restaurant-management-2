// components/DeleteConfirmationModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  const handleDeleteSuccessModalClose = () => {
    setShowDeleteSuccessModal(false);
    handleClose(); // Fermer le modal de confirmation de suppression
  };

  const handleDeleteConfirm = () => {
    handleConfirm();
    setShowDeleteSuccessModal(true); // Afficher le modal de suppression réussie
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Success Modal */}
      {showDeleteSuccessModal && (
        <Modal show={showDeleteSuccessModal} onHide={handleDeleteSuccessModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Table deleted successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDeleteSuccessModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
