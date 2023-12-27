// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('time');
  const [tableData, setTableData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin', {
        params: {
          date,
          time: selectedTime,
        },
      });
  
      console.log('Response from API:', response.data);
  
      // Assurez-vous que la propriété "table" existe dans la réponse
      if (response.data && response.data.table) {
        setTableData(response.data.table);
      } else {
        console.error('La propriété "table" est manquante dans la réponse de l\'API');
      }
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API', error);
    }
  };
  

  useEffect(() => {
    // Appeler la fonction de recherche lorsque le composant est monté
    handleSearch();
  }, []); // Le tableau vide signifie que cela s'exécute une seule fois à l'initialisation

  return (
    <div className="container">
      <center>
        <h1>Admin Dashboard</h1>
        <label className="form-label" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          data-mdb-select-init
          data-mdb-filter="true"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="time">Time</option>
        </select>
        <button
          type="button"
          className="btn btn-primary"
          data-mdb-ripple-init
          onClick={handleSearch}
        >
          <i className="fas fa-search"></i> Search
        </button>
      </center>

      <div className="row">
        {tableData.map((item) => (
          <div key={item.idTable} className="col-sm-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Table {item.idTable}</h5>
                {/* Ajoutez votre logique pour afficher le statut de la table ici */}
                {item.status === 'available' ? (
                  <span className="badge bg-success">Available</span>
                ) : (
                  <span className="badge bg-danger">Reserved</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
    