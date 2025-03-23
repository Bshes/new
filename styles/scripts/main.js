// scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initLoader();
    initParticles();
    initPortfolioCarousel();
    initMap();
    initTestimonials();
    initConfetti();
    initSoundEffects();
    initAnimations();
});

function initLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });
}

function initParticles() {
    // Particle system from previous code
}

function initPortfolioCarousel() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 600);
    const portfolioCarousel = document.querySelector('#portfolio-carousel');
    if (portfolioCarousel) {
        portfolioCarousel.appendChild(renderer.domElement);
    }

    // Add project textures
    const textures = [
        new THREE.TextureLoader().load('assets/images/project1.jpg'),
        new THREE.TextureLoader().load('assets/images/project2.jpg'),
        // Add more textures
    ];

    // Create carousel items
    const geometry = new THREE.BoxGeometry(4, 6, 0.1);
    textures.forEach((texture, index) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (index - 1) * 5;
        scene.add(mesh);
    });

    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

function initMap() {
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-81.5158, 28.2916],
        zoom: 6
    }).addControl(new mapboxgl.NavigationControl());
}

function initTestimonials() {
    new Swiper('.testimonials-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
}

function initConfetti() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#c0c0c0'] // Replace CSS variables with actual values
            });
        });
    }
}

function initSoundEffects() {
    const clickSound = new Audio('assets/sounds/stone-click.mp3');
    document.querySelectorAll('button, a').forEach(btn => {
        btn.addEventListener('click', () => clickSound.play());
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
}