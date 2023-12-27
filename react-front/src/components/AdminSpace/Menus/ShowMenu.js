// ShowMenu.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShowMenu = ({ menu, handleClose }) => {
  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Menu Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <React.Fragment>
          <section className="text-center" style={{ backgroundColor: '#f4f5f7' }}>
            <div className="col-md-6 mx-auto gradient-custom text-white" style={{ borderRadius: '.5rem' }}>
              <img
                src={
                  menu.image.startsWith('/storage')
                    ? process.env.PUBLIC_URL + menu.image.replace('/storage', '')
                    : menu.image
                }
                alt="Image"
                className="my-5"
                style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }} // Ajustez la taille maximale selon vos préférences
              />
            </div>
            <div className="row pt-1">
              <div className="col-12 mb-3">
                <h6>Category</h6>
                <p className="text-muted">{menu.category}</p>
              </div>
              <div className="col-12 mb-3">
                <h6>Dish</h6>
                <p className="text-muted">{menu.dish}</p>
              </div>
              <div className="col-12 mb-3">
                <h6>Price</h6>
                <p className="text-muted">{menu.price}</p>
              </div>
              {/* Ajoutez plus de champs si nécessaire */}
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

export default ShowMenu;