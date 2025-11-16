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

// ==================== POST INTERACTIONS ==================== //

// Create Post
const createPostInput = document.querySelector('.create-post-input');
const postButtons = document.querySelectorAll('.action-btn');
const postBtn = document.querySelector('.create-post-actions .btn-primary-small');

createPostInput.addEventListener('focus', () => {
    createPostInput.style.borderColor = 'var(--primary-color)';
});

createPostInput.addEventListener('blur', () => {
    createPostInput.style.borderColor = '#eee';
});

postBtn.addEventListener('click', () => {
    const text = createPostInput.value.trim();
    if (text.length > 0) {
        showNotification('Post created successfully! 🎉');
        createPostInput.value = '';
    } else {
        showNotification('Please write something to share!', 'warning');
    }
});

// Post Actions
const postActionBtns = document.querySelectorAll('.post-action-btn');
postActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        
        if (action.includes('Like')) {
            btn.classList.toggle('liked');
            if (btn.classList.contains('liked')) {
                btn.style.color = 'var(--primary-color)';
            } else {
                btn.style.color = 'var(--gray-color)';
            }
        } else if (action.includes('Comment')) {
            showNotification('Open comment section - coming soon!');
        } else if (action.includes('Share')) {
            showNotification('Share options opened - coming soon!');
        }
    });
});

// Join Community Button
const joinBtn = document.querySelector('.group-hero-content .btn-primary-large');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        joinBtn.textContent = '✓ Joined!';
        joinBtn.style.background = 'var(--success-color)';
        showNotification('Welcome to Career & Growth! 🎉');
        
        setTimeout(() => {
            joinBtn.textContent = 'Join Community';
            joinBtn.style.background = '';
        }, 3000);
    });
}

// Load More Posts
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.textContent = 'Loading...';
        setTimeout(() => {
            showNotification('Loaded 5 more posts!');
            loadMoreBtn.textContent = 'Load More Posts';
        }, 1000);
    });
}

// Topic Tag Filtering
const topicTags = document.querySelectorAll('.topic-tag');
topicTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const topic = tag.textContent;
        showNotification(`Filtering by "${topic}" - coming soon!`);
    });
});

// ==================== NOTIFICATION SYSTEM ==================== //

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'warning' ? '#f39c12' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== NAVBAR ENHANCEMENT ==================== //

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== SMOOTH SCROLL ==================== //

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

console.log('Career & Growth community page loaded! 🚀');
