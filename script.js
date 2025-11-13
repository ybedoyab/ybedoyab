// Load projects dynamically
document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (projectsContainer && typeof projectsData !== 'undefined') {
        projectsData.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    }
});

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const logo = document.createElement('div');
    logo.className = 'project-logo';
    const img = document.createElement('img');
    img.src = project.logo;
    img.alt = `${project.name} logo`;
    img.onerror = function() {
        // If image fails to load, show a placeholder
        this.style.display = 'none';
        logo.innerHTML = `<div class="logo-placeholder">${project.name.charAt(0)}</div>`;
    };
    logo.appendChild(img);
    
    const content = document.createElement('div');
    content.className = 'project-content';
    
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.name;
    
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    
    const link = document.createElement('a');
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'project-link';
    link.textContent = 'Ver Proyecto →';
    
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(link);
    
    card.appendChild(logo);
    card.appendChild(content);
    
    return card;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

