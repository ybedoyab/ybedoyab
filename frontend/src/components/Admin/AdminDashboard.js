import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- ProfileManager (condensed) ---
const ProfileManager = () => {
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', contact: { email: '', phone: '', linkedin: '', github: '', location: '' } });
  const [message, setMessage] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/api/profile')
      .then(response => {
        const data = response.data || {}; data.contact = data.contact || {};
        setProfile({
            name: data.name || '', title: data.title || '', bio: data.bio || '',
            contact: { email: data.contact.email || '', phone: data.contact.phone || '', linkedin: data.contact.linkedin || '', github: data.contact.github || '', location: data.contact.location || '' }
        });
      }).catch(error => console.error('Error fetching profile:', error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(p => ({ ...p, [parent]: { ...p[parent], [child]: value } }));
    } else { setProfile(p => ({ ...p, [name]: value })); }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/api/profile', profile)
      .then(response => {
        const data = response.data || {}; data.contact = data.contact || {};
        setProfile({
            name: data.name || '', title: data.title || '', bio: data.bio || '',
            contact: { email: data.contact.email || '', phone: data.contact.phone || '', linkedin: data.contact.linkedin || '', github: data.contact.github || '', location: data.contact.location || '' }
        });
        setMessage('Profile updated successfully!'); setTimeout(() => setMessage(''), 3000);
      }).catch(error => { console.error('Error updating profile:', error); setMessage('Failed to update profile.'); setTimeout(() => setMessage(''), 3000); });
  };
  return (
    <div>
      <h3>Manage Profile</h3> {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div><label>Name:</label><input type="text" name="name" value={profile.name} onChange={handleChange} /></div>
        <div><label>Title:</label><input type="text" name="title" value={profile.title} onChange={handleChange} /></div>
        <div><label>Bio:</label><textarea name="bio" value={profile.bio} onChange={handleChange} /></div>
        <h4>Contact Information</h4>
        <div><label>Email:</label><input type="email" name="contact.email" value={profile.contact.email} onChange={handleChange} /></div>
        <div><label>Phone:</label><input type="text" name="contact.phone" value={profile.contact.phone} onChange={handleChange} /></div>
        <div><label>LinkedIn:</label><input type="text" name="contact.linkedin" value={profile.contact.linkedin} onChange={handleChange} /></div>
        <div><label>GitHub:</label><input type="text" name="contact.github" value={profile.contact.github} onChange={handleChange} /></div>
        <div><label>Location:</label><input type="text" name="contact.location" value={profile.contact.location} onChange={handleChange} /></div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

// --- ExperienceManager (condensed) ---
const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({ title: '', company: '', duration: '', description: '' });
  const [isEditing, setIsEditing] = useState(false); const [editId, setEditId] = useState(null); const [message, setMessage] = useState('');
  const fetchExperiences = () => {
    axios.get('http://localhost:3001/api/experience')
      .then(response => setExperiences(Array.isArray(response.data) ? response.data : []))
      .catch(error => { console.error('Error fetching experiences:', error); setExperiences([]); });
  };
  useEffect(fetchExperiences, []);
  const handleChange = (e) => { const { name, value } = e.target; setCurrentExperience(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:3001/api/experience/${editId}` : 'http://localhost:3001/api/experience';
    const method = isEditing ? 'put' : 'post';
    axios[method](url, currentExperience)
      .then(() => { fetchExperiences(); setMessage(`Experience ${isEditing ? 'updated' : 'added'} successfully!`); resetForm(); })
      .catch(error => { console.error(`Error ${isEditing ? 'updating' : 'adding'} experience:`, error); setMessage(`Failed to ${isEditing ? 'update' : 'add'} experience.`); })
      .finally(() => setTimeout(() => setMessage(''), 3000));
  };
  const handleEdit = (exp) => {
    setIsEditing(true); setEditId(exp.id);
    setCurrentExperience({ title: exp.title || '', company: exp.company || '', duration: exp.duration || '', description: exp.description || '' });
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      axios.delete(`http://localhost:3001/api/experience/${id}`)
        .then(() => { fetchExperiences(); setMessage('Experience deleted successfully!'); })
        .catch(error => { console.error('Error deleting experience:', error); setMessage('Failed to delete experience.'); })
        .finally(() => setTimeout(() => setMessage(''), 3000));
    }
  };
  const resetForm = () => { setIsEditing(false); setEditId(null); setCurrentExperience({ title: '', company: '', duration: '', description: '' }); };
  return (
    <div>
      <h3>Manage Experience</h3> {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <h4>{isEditing ? 'Edit Experience' : 'Add New Experience'}</h4>
        <div><label>Title:</label><input type="text" name="title" value={currentExperience.title} onChange={handleChange} required /></div>
        <div><label>Company:</label><input type="text" name="company" value={currentExperience.company} onChange={handleChange} required /></div>
        <div><label>Duration:</label><input type="text" name="duration" value={currentExperience.duration} onChange={handleChange} /></div>
        <div><label>Description:</label><textarea name="description" value={currentExperience.description} onChange={handleChange} /></div>
        <button type="submit">{isEditing ? 'Update Experience' : 'Add Experience'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h4>Existing Experiences</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Added UL */}
        {experiences.map(exp => (
          <li key={exp.id} style={{ border:'1px solid #ccc', margin:'10px', padding:'10px' }}>
            <strong>{exp.title || 'N/A'}</strong> at {exp.company || 'N/A'} ({exp.duration || 'N/A'}) <p>{exp.description || 'No description'}</p>
            <button onClick={() => handleEdit(exp)}>Edit</button> <button onClick={() => handleDelete(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- ProjectsManager (condensed) ---
const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false); const [editId, setEditId] = useState(null); const [message, setMessage] = useState('');
  const fetchProjects = () => {
    axios.get('http://localhost:3001/api/projects')
      .then(response => setProjects(Array.isArray(response.data) ? response.data : []))
      .catch(error => { console.error('Error fetching projects:', error); setProjects([]); });
  };
  useEffect(fetchProjects, []);
  const handleChange = (e) => { const { name, value } = e.target; setCurrentProject(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:3001/api/projects/${editId}` : 'http://localhost:3001/api/projects';
    const method = isEditing ? 'put' : 'post';
    axios[method](url, currentProject)
      .then(() => { fetchProjects(); setMessage(`Project ${isEditing ? 'updated' : 'added'} successfully!`); resetForm(); })
      .catch(error => { console.error(`Error ${isEditing ? 'updating' : 'adding'} project:`, error); setMessage(`Failed to ${isEditing ? 'update' : 'add'} project.`); })
      .finally(() => setTimeout(() => setMessage(''), 3000));
  };
  const handleEdit = (proj) => {
    setIsEditing(true); setEditId(proj.id);
    setCurrentProject({ name: proj.name || '', description: proj.description || '' });
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios.delete(`http://localhost:3001/api/projects/${id}`)
        .then(() => { fetchProjects(); setMessage('Project deleted successfully!'); })
        .catch(error => { console.error('Error deleting project:', error); setMessage('Failed to delete project.'); })
        .finally(() => setTimeout(() => setMessage(''), 3000));
    }
  };
  const resetForm = () => { setIsEditing(false); setEditId(null); setCurrentProject({ name: '', description: '' }); };
  return (
    <div>
      <h3>Manage Projects</h3> {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <h4>{isEditing ? 'Edit Project' : 'Add New Project'}</h4>
        <div><label>Name:</label><input type="text" name="name" value={currentProject.name} onChange={handleChange} required /></div>
        <div><label>Description:</label><textarea name="description" value={currentProject.description} onChange={handleChange} /></div>
        <button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h4>Existing Projects</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Added UL */}
        {projects.map(proj => (
          <li key={proj.id} style={{ border:'1px solid #ccc', margin:'10px', padding:'10px' }}>
            <strong>{proj.name || 'N/A'}</strong> <p>{proj.description || 'No description'}</p>
            <button onClick={() => handleEdit(proj)}>Edit</button> <button onClick={() => handleDelete(proj.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- EducationManager (condensed) ---
const EducationManager = () => {
  const [educations, setEducations] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({ institution: '', degree: '', duration: '', details: '' });
  const [isEditing, setIsEditing] = useState(false); const [editId, setEditId] = useState(null); const [message, setMessage] = useState('');
  const fetchEducations = () => {
    axios.get('http://localhost:3001/api/education')
      .then(response => setEducations(Array.isArray(response.data) ? response.data : []))
      .catch(error => { console.error('Error fetching education:', error); setEducations([]); });
  };
  useEffect(fetchEducations, []);
  const handleChange = (e) => { const { name, value } = e.target; setCurrentEducation(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:3001/api/education/${editId}` : 'http://localhost:3001/api/education';
    const method = isEditing ? 'put' : 'post';
    axios[method](url, currentEducation)
      .then(() => { fetchEducations(); setMessage(`Education ${isEditing ? 'updated' : 'added'} successfully!`); resetForm(); })
      .catch(error => { console.error(`Error ${isEditing ? 'updating' : 'adding'} education:`, error); setMessage(`Failed to ${isEditing ? 'update' : 'add'} education.`); })
      .finally(() => setTimeout(() => setMessage(''), 3000));
  };
  const handleEdit = (edu) => {
    setIsEditing(true); setEditId(edu.id);
    setCurrentEducation({ institution: edu.institution || '', degree: edu.degree || '', duration: edu.duration || '', details: edu.details || '' });
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      axios.delete(`http://localhost:3001/api/education/${id}`)
        .then(() => { fetchEducations(); setMessage('Education entry deleted successfully!'); })
        .catch(error => { console.error('Error deleting education entry:', error); setMessage('Failed to delete education entry.'); })
        .finally(() => setTimeout(() => setMessage(''), 3000));
    }
  };
  const resetForm = () => { setIsEditing(false); setEditId(null); setCurrentEducation({ institution: '', degree: '', duration: '', details: '' }); };
  return (
    <div>
      <h3>Manage Education</h3> {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <h4>{isEditing ? 'Edit Education Entry' : 'Add New Education Entry'}</h4>
        <div><label>Institution:</label><input type="text" name="institution" value={currentEducation.institution} onChange={handleChange} required /></div>
        <div><label>Degree:</label><input type="text" name="degree" value={currentEducation.degree} onChange={handleChange} required /></div>
        <div><label>Duration:</label><input type="text" name="duration" value={currentEducation.duration} onChange={handleChange} /></div>
        <div><label>Details:</label><textarea name="details" value={currentEducation.details} onChange={handleChange} /></div>
        <button type="submit">{isEditing ? 'Update Entry' : 'Add Entry'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h4>Existing Education Entries</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {educations.map(edu => (
          <li key={edu.id} style={{ border:'1px solid #ccc', margin:'10px', padding:'10px' }}>
            <strong>{edu.degree || 'N/A'}</strong> at {edu.institution || 'N/A'} ({edu.duration || 'N/A'}) <p>{edu.details || 'No details.'}</p>
            <button onClick={() => handleEdit(edu)}>Edit</button> <button onClick={() => handleDelete(edu.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- SkillsManager ---
const SkillsManager = () => {
  const initialSkillsText = { frontend: '', backend: '', algorithms: '', data: '', soft: '' };
  const [skillsText, setSkillsText] = useState(initialSkillsText);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/skills')
      .then(response => {
        const fetchedSkills = response.data || {};
        const textSkills = {};
        for (const category in initialSkillsText) { // Iterate over known categories
          textSkills[category] = Array.isArray(fetchedSkills[category]) ? fetchedSkills[category].join(', ') : '';
        }
        setSkillsText(textSkills);
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
        setSkillsText(initialSkillsText); // Reset to initial empty strings on error
      });
  }, []); // initialSkillsText is stable, so dependency array is empty

  const handleChange = (e) => {
    const { name, value } = e.target; // name will be category, e.g., "frontend"
    setSkillsText(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsToSave = {};
    for (const category in skillsText) {
      skillsToSave[category] = skillsText[category].split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    axios.put('http://localhost:3001/api/skills', skillsToSave)
      .then(response => {
        const updatedSkills = response.data || {};
        const updatedTextSkills = {};
        for (const category in initialSkillsText) { // Iterate over known categories
          updatedTextSkills[category] = Array.isArray(updatedSkills[category]) ? updatedSkills[category].join(', ') : '';
        }
        setSkillsText(updatedTextSkills);
        setMessage('Skills updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error('Error updating skills:', error);
        setMessage('Failed to update skills.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div>
      <h3>Manage Skills</h3>
      {message && <p>{message}</p>}
      <p>Enter skills for each category, separated by commas.</p>
      <form onSubmit={handleSubmit}>
        {Object.keys(skillsText).map(category => (
          <div key={category}>
            <label style={{textTransform: 'capitalize'}}>{category}:</label>
            <textarea
              name={category}
              value={skillsText[category]}
              onChange={handleChange}
              rows="3"
              style={{width: '100%', marginTop: '5px', marginBottom: '10px'}}
            />
          </div>
        ))}
        <button type="submit">Save Skills</button>
      </form>
    </div>
  );
};


// --- AdminDashboard Main Component ---
const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('profile');

  const renderSectionManager = () => {
    switch (currentSection) {
      case 'profile': return <ProfileManager />;
      case 'experience': return <ExperienceManager />;
      case 'projects': return <ProjectsManager />;
      case 'education': return <EducationManager />;
      case 'skills': return <SkillsManager />;
      default: return <p>Select a section to manage.</p>;
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentSection('profile')} style={{ marginRight: '10px' }}>Profile</button>
        <button onClick={() => setCurrentSection('experience')} style={{ marginRight: '10px' }}>Experience</button>
        <button onClick={() => setCurrentSection('projects')} style={{ marginRight: '10px' }}>Projects</button>
        <button onClick={() => setCurrentSection('education')} style={{ marginRight: '10px' }}>Education</button>
        <button onClick={() => setCurrentSection('skills')} style={{ marginRight: '10px' }}>Skills</button>
      </nav>
      <hr />
      {renderSectionManager()}
    </div>
  );
};

export default AdminDashboard;
