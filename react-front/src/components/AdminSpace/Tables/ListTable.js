// ListTable.js
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddTable from './AddTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditTable from './EditTable';

const ListTable = () => {
  const [tables, setTables] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch tables data from API
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tables');
      const data = await response.json();
      setTables(data.tables);
    } catch (error) {
      console.error('Error fetching tables from API', error);
    }
  };

  const handleDelete = (table) => {
    setSelectedTable(table);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTable) {
      // Proceed with deletion
      await deleteTable(selectedTable.idTable);

      // Reset selected table and hide modal
      setSelectedTable(null);
      setShowDeleteModal(false);
    }
  };

  const deleteTable = async (idTable) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tables/${idTable}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
      });

      if (response.ok) {
        // If deletion succeeds, update the list of tables
        fetchTables();
      } else {
        console.error('Error deleting table');
      }
    } catch (error) {
      console.error('Error deleting table', error);
    }
  };

  const handleEdit = (table) => {
    setSelectedTable(table);
    setShowEditModal(true);
  };

  const handleView = (table) => {
    setSelectedTable(table);
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

  const filteredTables = tables.filter(
    (table) =>
      table.idTable.toString().includes(searchTerm.toLowerCase()) ||
      table.location.toLowerCase().includes(searchTerm.toLowerCase()) 
      
  );

  return (
    <div className="container ml-5 pl-5">
      <div className="row mb-3">
        <label htmlFor="search" className="form-label">
          Search by ID, Location:
        </label>
        <input
          type="text"
          id="search"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2>Table Management</h2>
            </div>
            <div className="card-body">
              <Button variant="primary" onClick={handleShowAddModal}>
                Add New
              </Button>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Guests</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTables.map((table, index) => (
                    <tr key={index}>
                      <td>{table.idTable}</td>
                      <td>{table.location}</td>
                      <td>{table.guests}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          onClick={() => handleEdit(table)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(table)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info mx-2"
                          onClick={() => handleView(table)}
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
      {/* Edit Table Modal */}
      <EditTable
        show={showEditModal}
        handleClose={handleCloseEditModal}
        table={selectedTable}
        updateTableList={fetchTables}
      />
      {/* View Table Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display table details here */}
          <p>Table: {selectedTable?.idTable}</p>
          <p>Location: {selectedTable?.location}</p>
          <p>Guests: {selectedTable?.guests}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Table Modal */}
      <AddTable show={showAddModal} handleClose={handleCloseAddModal} updateTableList={fetchTables} />
    </div>
  );
};

export default ListTable;
