const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Backend will run on port 3001

app.use(cors());
app.use(bodyParser.json());

// In-memory store (for simplicity)
let portfolioData = {
  profile: {
    name: "Yulián Bedoya",
    title: "Software Programmer",
    bio: "Graduated as a software programming technician in 2022. Currently studying Mechanical Engineering at the National University of Colombia. I like to lead work teams and speak in public, I consider myself to have a high level of public speaking and communication. I am very interested in learning and I adapt quickly to any obstacle.",
    contact: {
      email: "ybedoyab@unal.edu.co",
      phone: "+57 321 805 9894",
      linkedin: "linkedin.com/in/ybedoyab/",
      github: "github.com/ybedoyab",
      location: "Medellín, Antioquia"
    }
  },
  experience: [
    { id: 1, title: "English Teacher", company: "Instituto de Inglés de Cartago", duration: "2022", description: "English tutor for an intermediate level class in Cartago, Valle del Cauca." },
    { id: 2, title: "Student Assistant", company: "UNAL", duration: "2023 - Present", description: "Basic Mathematics tutor through the MinasContigo program of the Faculty of Mines." },
    { id: 3, title: "Web Developer", company: "DINARA (UNAL)", duration: "2024 - Present", description: "Web Developer for the Directorate of Academic Information, Registration and Enrollment (DINARA)." }
  ],
  education: [
    { id: 1, institution: "Institución Educativa GABO", degree: "Primary, Baccalaureate", details: "President of the student council and representative (2022)" },
    { id: 2, institution: "Servicio Nacional de Aprendizaje (SENA)", degree: "Technician in software programming", duration: "2020 - 2022" },
    { id: 3, institution: "Universidad Nacional de Colombia", degree: "Mechanical Engineering", duration: "2023 - Present" },
    { id: 4, institution: "Instituto de Inglés", degree: "English C2", duration: "2014 - 2021" }
  ],
  skills: {
    frontend: ["React", "Single-Spa", "HTML", "JS", "TS", "Tailwind", "MUI", "CSS"],
    backend: ["Express", "Node", "Nest", "MongoDB", "SQL"],
    algorithms: ["C++", "Python", "Data Structures", "Algorithmic Efficiency"],
    data: ["Machine Learning", "AI", "Big Data", "Power BI", "Optimization"],
    soft: ["Public Speaking", "Leadership", "Organization", "Adaptability", "Communication"]
  },
  projects: [
    { id: 1, name: "Akala", description: "Interactive web platform that supports the learning of logical skills in people with intellectual disabilities, aimed at families and organizations. Through decision-making games and puzzles based on everyday situations." },
    { id: 2, name: "Cryptix", description: "Blockchain platform for the secure issuance and management of tickets using NFTs and smart contracts, eliminating fraud and illegal resale. It offers transparent transactions, controlled resale and identity verification, with a business model based on commissions, subscriptions and advertising." },
    { id: 3, name: "FactopIA", description: "Interactive game that teaches media literacy through gamification. It has four game modes: fact-checking, responsible content creation, media crisis simulation and cooperation in disinformation research." },
    { id: 4, name: "Github Campus Expert", description: "Student leaders who strive to create diverse and inclusive spaces to learn skills, share their experiences and build projects together. I was chosen as one of over 2700 applicants." },
    { id: 5, name: "Seeds for the Future", description: "Huawei's program that brings global young talents to Mexico to explore cutting-edge ICT, experience Mexican culture, and enhance professional development. I was chosen as one of over 300 applicants." },
    { id: 6, name: "Bragi", description: "Web platform and mobile application that connects local artists from Medellín with clients, allowing them to showcase their talent and offer creative services in a safe and innovative ecosystem." },
    { id: 7, name: "GuardIA", description: "Extension that detects fraudulent publications on e-commerce platforms, protecting buyers and sellers from possible scams. Analyzes profiles, reviews, images and behavioral patterns to assess the reliability of each publication." },
    { id: 8, name: "RaiseAPP", description: "Blockchain platform that allows the tokenization of local businesses, facilitating decentralized investment. Entrepreneurs can sell a part of their business in the form of tokens, while investors acquire participation with potential profitability." }
  ],
  awards: [
    { id: 1, name: "2nd Place Hackathon eSummit 2023", description: "Focused on increasing sales for e-commerces." },
    { id: 2, name: "Winner of Hackathon Diverso League 2024", description: "Focused on developing a solution for the benefit of the population with intellectual disabilities." },
    { id: 3, name: "Winner of Hackathon Blockchain ICP", description: "Focused on solving social problems with the use of Blockchain and Web3 technologies." },
    { id: 4, name: "Winner of OPL X 0G X CAMP AI+WEB3 & SOCIAL 2024", description: "Focused on solving social problems with the use of Blockchain and Web3 technologies from the Kii Global network." },
    { id: 5, name: "Winner of Kickin' It With Kiichain", description: "Focused on solving social problems with the use of Blockchain and Web3 technologies from the Kii Global network." },
    { id: 6, name: "Finalist Regional Mathematics Olympiads 2022", description: "Event organized by Universidad del Valle in Cali that brings together students from all over the country to solve problems related to mathematics." },
    { id: 7, name: "2nd Place Expoingeniería 2023", description: "Event focused on cybersecurity with a Capture the Flag theme." },
    { id: 8, name: "Participant ICPC 2024", description: "International Collegiate Programming Contest, qualified after a full year of RPCs." },
    { id: 9, name: "2nd Place NASA SpaceApps Challenge 2023", description: "Event focused on solving challenges proposed by NASA, obtained second place at the Antioquia level." },
    { id: 10, name: "Novice Champion CHIDO 2024", description: "International virtual competitive debate event organized by Cornell University." },
    { id: 11, name: "Finalist CAB V 2024", description: "International virtual competitive debate event organized by Universidad Católica Andrés Bello in Caracas, Venezuela." },
    { id: 12, name: "Debater UNIANDES IV 2024", description: "Debater in the international level tournament organized by Universidad de los Andes." },
    { id: 13, name: "4th Place NASA SpaceApps Challenge 2024", description: "Event focused on solving challenges proposed by NASA, obtained fourth place at the Antioquia level." },
    { id: 14, name: "Attendee 18th Colombian Computing Congress", description: "Attended the 18CCC in Manizales, Colombia, where topics on computing, AI, etc., were discussed." }
  ],
  languages: [
    { id: 1, name: "Spanish", proficiency: "Native" },
    { id: 2, name: "English", proficiency: "C2 (Instituto de Inglés, 2014-2021)" }
  ],
  references: [
    { id: 1, name: "Marycielo Berrio", title: "Systems Engineering Student", email: "mberrioz@unal.edu.co", phone: "+57 320 898 6291" },
    { id: 2, name: "Angélica Guevara", title: "English Teacher", email: "yaguevara@iegabo.edu.co", phone: "+57 301 480 4400" }
  ],
  courses: [ // Added based on user's text, might need selection for portfolio
    "Analysis for mobile development with App Inventor", "Blockchain Basics", "Cybersecurity",
    "How to solve problems and make decisions effectively", "Labor competencies",
    "Conceptualization of the C++ programming language", "Controls and computer security",
    "Data Science and Artificial Intelligence", "From zero to blockchain",
    "Developing Back End Apps with Node.js and Express", "Academic writing",
    "Structure of the C++ programming language", "Fundamentals of Project Management",
    "Programming Fundamentals", "Fundamentals in Artificial Intelligence",
    "Data Management and Analysis with Python", "Artificial Intelligence: Tools for productivity",
    "Introduction to Software Engineering", "JavaScript Programming Essentials",
    "The notion of ethics for professional life", "Marketing 360", "Digital Marketing",
    "Metallurgy, properties and classification of the main metals",
    "Modules, Storage Structure and OOP using the C++ programming language",
    "Image Processing", "Programming for Machine Learning and Entrepreneurship",
    "Web Programming", "Being a Leader 4.0", "Smart Contracts", "Decision making at the managerial level"
  ]
};

// --- API Endpoints ---

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// --- Profile ---
app.get('/api/profile', (req, res) => {
  res.json(portfolioData.profile);
});

app.put('/api/profile', (req, res) => {
  portfolioData.profile = { ...portfolioData.profile, ...req.body };
  res.json(portfolioData.profile);
});

// --- Experience ---
app.get('/api/experience', (req, res) => {
  res.json(portfolioData.experience);
});

app.post('/api/experience', (req, res) => {
  const newEntry = { id: Date.now(), ...req.body };
  portfolioData.experience.push(newEntry);
  res.status(201).json(newEntry);
});

app.put('/api/experience/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = portfolioData.experience.findIndex(item => item.id === id);
  if (index !== -1) {
    portfolioData.experience[index] = { ...portfolioData.experience[index], ...req.body };
    res.json(portfolioData.experience[index]);
  } else {
    res.status(404).json({ message: 'Experience entry not found' });
  }
});

app.delete('/api/experience/:id', (req, res) => {
  const id = parseInt(req.params.id);
  portfolioData.experience = portfolioData.experience.filter(item => item.id !== id);
  res.status(204).send();
});

// --- Education ---
app.get('/api/education', (req, res) => {
  res.json(portfolioData.education);
});

app.post('/api/education', (req, res) => {
  const newEntry = { id: Date.now(), ...req.body };
  portfolioData.education.push(newEntry);
  res.status(201).json(newEntry);
});

app.put('/api/education/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = portfolioData.education.findIndex(item => item.id === id);
  if (index !== -1) {
    portfolioData.education[index] = { ...portfolioData.education[index], ...req.body };
    res.json(portfolioData.education[index]);
  } else {
    res.status(404).json({ message: 'Education entry not found' });
  }
});

app.delete('/api/education/:id', (req, res) => {
  const id = parseInt(req.params.id);
  portfolioData.education = portfolioData.education.filter(item => item.id !== id);
  res.status(204).send();
});

// --- Skills ---
app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.put('/api/skills', (req, res) => {
  // For skills, we expect the entire object to be replaced or updated.
  // Or individual categories can be updated.
  portfolioData.skills = { ...portfolioData.skills, ...req.body };
  res.json(portfolioData.skills);
});

// --- Projects ---
app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.post('/api/projects', (req, res) => {
  const newEntry = { id: Date.now(), ...req.body };
  portfolioData.projects.push(newEntry);
  res.status(201).json(newEntry);
});

app.put('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = portfolioData.projects.findIndex(item => item.id === id);
  if (index !== -1) {
    portfolioData.projects[index] = { ...portfolioData.projects[index], ...req.body };
    res.json(portfolioData.projects[index]);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  portfolioData.projects = portfolioData.projects.filter(item => item.id !== id);
  res.status(204).send();
});

// --- Awards ---
app.get('/api/awards', (req, res) => {
  res.json(portfolioData.awards);
});
// (CRUD for awards can be added similarly if needed for admin)

// --- Languages ---
app.get('/api/languages', (req, res) => {
  res.json(portfolioData.languages);
});
// (CRUD for languages can be added similarly)

// --- References ---
app.get('/api/references', (req, res) => {
  res.json(portfolioData.references);
});
// (CRUD for references can be added similarly)

// --- Courses ---
app.get('/api/courses', (req, res) => {
  res.json(portfolioData.courses);
});
// (CRUD for courses can be added similarly)



// --- Serve Frontend Static Files (Conceptual - for Production) ---
// This section should ideally be active if process.env.NODE_ENV === 'production'
// and after the frontend has been built and its 'build' folder is accessible.
/*
const path = require('path'); // Make sure path is required at the top of the file

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app's build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // The "catchall" handler: for any request that doesn't match one above,
  // send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}
*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
