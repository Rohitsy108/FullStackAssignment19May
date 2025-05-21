import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import './EventsPage.css';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading events...</p>;
  if (events.length === 0) return <p className="loading">No events found.</p>;

  return (
    <div className="page-container">
      <h1 className="page-title">Events in Sydney</h1>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
