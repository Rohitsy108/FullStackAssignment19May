import React, { useState } from 'react';
import axios from 'axios';
import './EventCard.css';

function EventCard({ event }) {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleGetTickets = () => setShowModal(true);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/tickets', {
        email,
        event
      });

      if (res.data.message === "Email sent successfully") {
        setConfirmed(true);
      } else {
        alert("Email failed to send.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong!");
    }
  };


  return (
    <div className="card">

      <div className="card-body">
        <h2>{event.title}</h2>
        <p className="event-info"><strong>{event.date}</strong> • {event.location}</p>
        <p className="event-description">{event.description}</p>
        <button onClick={handleGetTickets}>🎟️ Get Tickets</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
          {!confirmed ? (
            <>
              <h3>Enter your email</h3>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <button onClick={handleSubmit}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>🎉 Ticket Confirmed!</h3>
              <p>Details sent for:</p>
              <strong>{event.title}</strong>
              <p>{event.date} — {event.location}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
