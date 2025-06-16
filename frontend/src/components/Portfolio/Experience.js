import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/experience')
      .then(response => {
        setExperiences(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experience information.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section id="experience" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Work Experience</h2>
      {experiences.length === 0 ? (
        <p>No work experience listed yet.</p>
      ) : (
        experiences.map(exp => (
          <div key={exp.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
            <h3>{exp.title || 'Job Title'} at {exp.company || 'Company'}</h3>
            <p><em>{exp.duration || 'Dates'}</em></p>
            <p>{exp.description || 'Description not available.'}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Experience;
