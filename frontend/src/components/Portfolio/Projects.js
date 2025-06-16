import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/projects')
      .then(response => {
        setProjects(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects listed yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map(proj => (
            <div key={proj.id} className="project-card">
              <h3>{proj.name || 'Project Name'}</h3>
              <p>{proj.description || 'No description provided.'}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Projects;
