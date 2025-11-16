// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = hamburger.contains(event.target) || navMenu.contains(event.target);
    if (!isClickInsideNav) {
        navMenu.classList.remove('active');
    }
});

// Smooth scroll behavior for anchor links
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

// ==================== FILTERING AND SEARCH ==================== //

const filterButtons = document.querySelectorAll('.filter-btn');
const groupCards = document.querySelectorAll('.group-card');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

let activeFilter = 'all';

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.getAttribute('data-filter');
        
        applyFilters();
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    applyFilters();
});

// Sort functionality
sortSelect.addEventListener('change', () => {
    sortGroups();
});

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCards = 0;

    groupCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.group-description').textContent.toLowerCase();

        // Check category filter
        const matchesCategory = activeFilter === 'all' || category === activeFilter;

        // Check search term
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
            visibleCards++;
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    updateNoResultsMessage(visibleCards);
}

function updateNoResultsMessage(visibleCards) {
    let noResultsMsg = document.querySelector('.no-results');
    
    if (visibleCards === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No communities found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
            `;
            noResultsMsg.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 2rem;
                color: var(--gray-color);
            `;
            document.querySelector('.groups-container').appendChild(noResultsMsg);
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

function sortGroups() {
    const sortValue = sortSelect.value;
    const cardsArray = Array.from(groupCards);

    cardsArray.sort((a, b) => {
        if (sortValue === 'members') {
            const aMembersText = a.querySelector('.stat').textContent;
            const bMembersText = b.querySelector('.stat').textContent;
            const aMembersNum = parseInt(aMembersText) || 0;
            const bMembersNum = parseInt(bMembersText) || 0;
            return bMembersNum - aMembersNum;
        } else if (sortValue === 'name') {
            const aName = a.querySelector('h3').textContent;
            const bName = b.querySelector('h3').textContent;
            return aName.localeCompare(bName);
        } else if (sortValue === 'recent') {
            return Math.random() - 0.5; // Simulated recent sort
        } else if (sortValue === 'active') {
            const aPostsText = a.querySelectorAll('.stat')[1].textContent;
            const bPostsText = b.querySelectorAll('.stat')[1].textContent;
            const aPostsNum = parseInt(aPostsText) || 0;
            const bPostsNum = parseInt(bPostsText) || 0;
            return bPostsNum - aPostsNum;
        }
    });

    const container = document.querySelector('.groups-container');
    cardsArray.forEach(card => {
        container.appendChild(card);
    });
}

// ==================== BUTTON INTERACTIONS ==================== //

// Join Group buttons
const joinButtons = document.querySelectorAll('.btn-secondary-small');
joinButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const groupName = button.closest('.group-card').querySelector('h3').textContent;
        handleGroupAction('join', groupName, button);
    });
});

// Learn More buttons
const learnMoreButtons = document.querySelectorAll('.btn-outline-small');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const groupName = button.closest('.group-card').querySelector('h3').textContent;
        handleGroupAction('learn', groupName, button);
    });
});

// Create Group button
const createGroupBtn = document.querySelector('.community-cta .btn-primary-large');
if (createGroupBtn) {
    createGroupBtn.addEventListener('click', () => {
        handleGroupAction('create', 'New Group', createGroupBtn);
    });
}

function handleGroupAction(action, groupName, element) {
    // Show feedback
    const originalText = element.textContent;
    
    if (action === 'join') {
        element.textContent = '✓ Joined!';
        element.style.background = 'var(--success-color)';
        setTimeout(() => {
            element.textContent = originalText;
            element.style.background = '';
        }, 2000);
    } else if (action === 'learn') {
        // Navigate to group detail page (placeholder)
        console.log(`Learning more about: ${groupName}`);
        // In real app: window.location.href = `/group/${groupName}`;
    } else if (action === 'create') {
        element.textContent = 'Redirecting...';
        setTimeout(() => {
            element.textContent = originalText;
            console.log('Navigate to create group form');
            // In real app: window.location.href = '/create-group';
        }, 1500);
    }
}

// ==================== SCROLL ANIMATIONS ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for fade-in
document.querySelectorAll('.group-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ==================== NAVBAR ENHANCEMENT ==================== //

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== INITIAL LOAD ==================== //

console.log('Community Groups page loaded successfully! 🎉');

// Apply initial filters on page load
applyFilters();
