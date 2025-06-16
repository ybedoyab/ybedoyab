import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Education = () => {
  const [educationEntries, setEducationEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/education')
      .then(response => {
        setEducationEntries(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching education entries:', err);
        setError('Failed to load education information.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading education history...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section id="education" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Education</h2>
      {educationEntries.length === 0 ? (
        <p>No education history listed yet.</p>
      ) : (
        educationEntries.map(edu => (
          <div key={edu.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
            <h3>{edu.degree || 'Degree'} - {edu.institution || 'Institution'}</h3>
            <p><em>{edu.duration || 'Dates'}</em></p>
            <p>{edu.details || 'Details not available.'}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Education;
