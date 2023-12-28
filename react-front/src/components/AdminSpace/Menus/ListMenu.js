// ListMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AddMenu from './AddMenu';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditMenu from './EditMenu';

const ListMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch menu items data from API
    fetchMenuItems();
  }, [searchTerm]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/menus?search=${searchTerm}`);
      const data = await response.json();
      setMenuItems(data.menu);
    } catch (error) {
      console.error('Error fetching menu items from API', error);
    }
  };

  const handleDelete = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMenuItem) {
      // Proceed with deletion
      await deleteMenuItem(selectedMenuItem.idMenu);

      // Reset selected menu item and hide modal
      setSelectedMenuItem(null);
      setShowDeleteModal(false);
    }
  };

  const deleteMenuItem = async (idMenu) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/menus/${idMenu}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
      });

      if (response.ok) {
        // If deletion succeeds, update the list of menu items
        fetchMenuItems();
      } else {
        console.error('Error deleting menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item', error);
    }
  };

  const handleEdit = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowEditModal(true);
  };

  const handleView = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowViewModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  // Filter menu items based on search term
  const filteredMenuItems = menuItems.filter(
    (menuItem) =>
      menuItem.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menuItem.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container ml-5 pl-5">
      <div className="row mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Search by Dish or Category:</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by dish or category..."
          />
        </Form.Group>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2>Menu Item Management</h2>
            </div>
            <div className="card-body">
              <Button variant="primary" onClick={handleShowAddModal}>
                Add New
              </Button>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Dish</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((menuItem, index) => (
                    <tr key={index}>
                      <td>{menuItem.idMenu}</td>
                      <td>{menuItem.category}</td>
                      <td>{menuItem.dish}</td>
                      <td>{menuItem.price}</td>
                      <td>
                        <img
                          src={
                            menuItem.image.startsWith('/storage')
                              ? process.env.PUBLIC_URL + menuItem.image.replace('/storage', '')
                              : menuItem.image
                          }
                          alt="image"
                          width="90"
                          height="90"
                          className="img img-responsive rounded-circle"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          onClick={() => handleEdit(menuItem)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(menuItem)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info mx-2"
                          onClick={() => handleView(menuItem)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* View Menu Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <React.Fragment>
            <section className="text-center" style={{ backgroundColor: '#f4f5f7' }}>
              <div className="col-md-6 mx-auto gradient-custom text-white" style={{ borderRadius: '.5rem' }}>
                <img
                  src={
                    selectedMenuItem?.image.startsWith('/storage')
                      ? process.env.PUBLIC_URL + selectedMenuItem?.image.replace('/storage', '')
                      : selectedMenuItem?.image
                  }
                  alt="Image"
                  className="my-5"
                  style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }} // Adjust the maximum size according to your preferences
                />
              </div>
              <div className="row pt-1">
                <div className="col-12 mb-3">
                  <h6>Category</h6>
                  <p className="text-muted">{selectedMenuItem?.category}</p>
                </div>
                <div className="col-12 mb-3">
                  <h6>Dish</h6>
                  <p className="text-muted">{selectedMenuItem?.dish}</p>
                </div>
                <div className="col-12 mb-3">
                  <h6>Price</h6>
                  <p className="text-muted">{selectedMenuItem?.price}</p>
                </div>
                {/* Add more fields if necessary */}
              </div>
            </section>
          </React.Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />

      {/* Edit Menu Modal */}
      <EditMenu show={showEditModal} handleClose={handleCloseEditModal} menuItem={selectedMenuItem} updateMenuList={fetchMenuItems} />

      {/* Add Menu Modal */}
      <AddMenu show={showAddModal} handleClose={handleCloseAddModal} updateMenuList={fetchMenuItems} />
    </div>
  );
};

export default ListMenu;
