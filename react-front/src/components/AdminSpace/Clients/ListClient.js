import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddClient from './AddClient';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditClient from './EditClient';

const ListClient = () => {
  const [clients, setClients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch clients data from API
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/clients');
      const data = await response.json();
      setClients(data.client);
    } catch (error) {
      console.error('Error fetching clients from API', error);
    }
  };

  const handleDelete = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedClient) {
      // Proceed with deletion
      await deleteClient(selectedClient.id);

      // Reset selected client and hide modal
      setSelectedClient(null);
      setShowDeleteModal(false);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
      });

      if (response.ok) {
        // If deletion succeeds, update the list of clients
        fetchClients();
      } else {
        console.error('Error deleting client');
      }
    } catch (error) {
      console.error('Error deleting client', error);
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleView = (client) => {
    setSelectedClient(client);
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

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container ml-5 pl-5">
      <div className="row mb-3">
        
          <label htmlFor="search" className="form-label">
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or last name..."
          />
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2>Client Management</h2>
            </div>
            <div className="card-body">
              <Button variant="primary" onClick={handleShowAddModal}>
                Add New
              </Button>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>CIN</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.nom}</td>
                      <td>{client.prenom}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.cin}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          onClick={() => handleEdit(client)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(client)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info mx-2"
                          onClick={() => handleView(client)}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />

      {/* View Client Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Client</Modal.Title>
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
                  <p className="text-muted">{selectedClient?.prenom}</p>
                </div>
                <div className="col-6 mb-3">
                  <h6>First Name</h6>
                  <p className="text-muted">{selectedClient?.nom}</p>
                </div>
                <div className="col-6 mb-3">
                  <h6>Email</h6>
                  <p className="text-muted">{selectedClient?.email}</p>
                </div>
                <div className="col-6 mb-3">
                  <h6>CIN</h6>
                  <p className="text-muted">{selectedClient?.cin}</p>
                </div>
                <div className="col-6 mb-3">
                  <h6>Phone</h6>
                  <p className="text-muted">{selectedClient?.phone}</p>
                </div>
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
      {/* Edit Client Modal */}
      <EditClient
        show={showEditModal}
        handleClose={handleCloseEditModal}
        client={selectedClient}
        updateClientList={fetchClients}
      />
      {/* View Client Modal */}

      {/* Add Client Modal */}
      <AddClient show={showAddModal} handleClose={handleCloseAddModal} updateClientList={fetchClients} />
    </div>
  );
};

export default ListClient;
