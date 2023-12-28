import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditMenu = ({ show, handleClose, menuItem, updateMenuList }) => {
  // Vérifiez si la prop 'menuItem' est définie
  if (!menuItem) {
    // Affichez un message d'erreur ou redirigez l'utilisateur, etc.
    return <div></div>;
  }

  // Initialiser les états avec les valeurs du menuItem
  const [editedCategory, setEditedCategory] = useState(menuItem.category);
  const [editedDish, setEditedDish] = useState(menuItem.dish);
  const [editedPrice, setEditedPrice] = useState(menuItem.price);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mettre à jour les états lorsque la propriété 'menuItem' change
  useEffect(() => {
    setEditedCategory(menuItem.category);
    setEditedDish(menuItem.dish);
    setEditedPrice(menuItem.price);
  }, [menuItem]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ajoutez votre logique pour soumettre le formulaire ici
    try {
      // Envoyer une requête PUT au serveur pour mettre à jour le menuItem
      const response = await fetch(`http://localhost:8000/api/menus/${menuItem.idMenu}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Remplacez par votre jeton CSRF réel
        },
        body: JSON.stringify({
          category: editedCategory,
          dish: editedDish,
          price: editedPrice,
        }),
      });

      if (response.ok) {
        // Si la mise à jour réussit, mettez à jour la liste des menus
        updateMenuList();
        // Affichez le modal de succès
        setShowSuccessModal(true);
        // Fermez le modal d'édition
        handleClose();
      } else {
        console.error('Error updating menu:', response.statusText);
        alert('Failed to update menu. Please try again.');
      }
    } catch (error) {
      console.error('Error updating menu:', error);
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
          <Modal.Title>Edit Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="editedCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="Normal">Normal</option>
                <option value="Special">Special</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editedDish">
              <Form.Label>Dish</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Dish"
                value={editedDish}
                onChange={(e) => setEditedDish(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editedPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Menu
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
              <div className="modal-body">Menu updated successfully!</div>
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

export default EditMenu;