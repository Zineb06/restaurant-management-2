// ListReservation.js
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddReservation from './AddReservation';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditReservation from './EditReservation';

const ListReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    // Fetch reservations data from API
    fetch('http://127.0.0.1:8000/api/reservations')
      .then(response => response.json())
      .then(data => setReservations(data.reservations))
      .catch(error => console.error('Error fetching reservations from API', error));
  }, []);

  const handleDelete = (reservation) => {
    setSelectedReservation(reservation);
    setShowDeleteModal(true);
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations');
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      console.error('Error fetching reservations from API', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedReservation) {
      // Proceed with deletion
      await deleteReservation(selectedReservation.idReservation);

      // Reset selected reservation and hide modal
      setSelectedReservation(null);
      setShowDeleteModal(false);
    }
  };

  const deleteReservation = async (idReservation) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${idReservation}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{your_csrf_token_here}', // Replace with your actual CSRF token
        },
      });

      if (response.ok) {
        // If deletion succeeds, update the list of reservations
        fetchReservations();
      } else {
        console.error('Error deleting reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation', error);
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  const handleView = (reservation) => {
    setSelectedReservation(reservation);
    setShowViewModal(true);
  };

  useEffect(() => {
    // Call the fetchReservations function when the component loads
    fetchReservations();
  }, []);

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

  return (
    <div className="container ml-5 pl-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2>Reservation Management</h2>
            </div>
            <div className="card-body">
              <Button variant="primary" onClick={handleShowAddModal}>
                Add New
              </Button>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Table Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <tr key={index}>
                      <td>{reservation.idReservation}</td>
                      <td>{reservation.idClient}</td>
                      <td>{reservation.NumTable}</td>
                      <td>{reservation.date}</td>
                      <td>{reservation.time}</td>
                      <td>{reservation.GuestsNumber}</td>
                      <td>{reservation.Status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning mx-2"
                          onClick={() => handleEdit(reservation)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(reservation)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info mx-2"
                          onClick={() => handleView(reservation)}
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
      {/* Edit Reservation Modal */}
      <EditReservation
        show={showEditModal}
        handleClose={handleCloseEditModal}
        reservation={selectedReservation}
        updateReservationList={fetchReservations}
      />
      {/* View Reservation Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <React.Fragment>
          <section className="text-center" style={{ backgroundColor: '#f4f5f7' }}>

          <div className="col-6 mb-3 mx-auto text-center">
            <h6>ID Reservation:</h6>
            <p className="text-muted">{selectedReservation?.idReservation}</p>
          </div>


           <div className="row pt-1">
             
              <div className="col-6 mb-3">
                <h6>Client:</h6>
                <p className="text-muted">{selectedReservation?.idClient}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Table Number:</h6>
                <p className="text-muted">{selectedReservation?.NumTable}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Date:</h6>
                <p className="text-muted">{selectedReservation?.date}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Time:</h6>
                <p className="text-muted">{selectedReservation?.time}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Guests Number:</h6>
                <p className="text-muted">{selectedReservation?.GuestsNumber}</p>
              </div>
              <div className="col-6 mb-3">
                <h6>Status:</h6>
                <p className="text-muted">{selectedReservation?.Status}</p>
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

      {/* Add Reservation Modal */}
      <AddReservation show={showAddModal} handleClose={handleCloseAddModal} updateReservationList={fetchReservations} />
    </div>
  );
};

export default ListReservation;
