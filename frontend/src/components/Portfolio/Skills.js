import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/skills')
      .then(response => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading skills...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!skills) return <p>No skills information available.</p>;

  const skillCategories = ['frontend', 'backend', 'algorithms', 'data', 'soft'];
  const categoryDisplayNames = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    algorithms: 'Algorithms & Data Structures',
    data: 'Data Science & AI',
    soft: 'Soft Skills'
  };

  return (
    <section id="skills" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Skills</h2>
      {skillCategories.map(category => (
        (skills[category] && skills[category].length > 0) && (
          <div key={category} style={{ marginBottom: '15px' }}>
            <h4>{categoryDisplayNames[category] || category}</h4>
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
              {skills[category].map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )
      ))}
      {skillCategories.every(cat => !skills[cat] || skills[cat].length === 0) && <p>Skill details not available.</p>}
    </section>
  );
};

export default Skills;
