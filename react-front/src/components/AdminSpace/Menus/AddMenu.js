import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const AddMenu = ({ show, handleClose, updateMenuList }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    dish: "",
    price: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("dish", formData.dish);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);

      const response = await axios.post("http://localhost:8000/api/add/menus", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setMessage(response.data.message);
        setShowSuccessModal(true);
        handleClose();

        // Update the menu list in ListMenu
        updateMenuList();

        setTimeout(() => {
          navigate("/ListMenu", { state: { successMessage: response.data.message } });
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      setMessage("Network error: Unable to connect to the API.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <p className="text-success">{message}</p>}
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Normal">Normal</option>
                <option value="Special">Special</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dish">
              <Form.Label>Dish</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Dish"
                name="dish"
                value={formData.dish}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="success" type="submit">
              Add Menu
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
              <div className="modal-body">Menu added successfully!</div>
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

export default AddMenu;