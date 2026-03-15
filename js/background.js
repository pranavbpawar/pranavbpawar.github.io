// Background animation with particles
document.addEventListener('DOMContentLoaded', function() {
    const backgroundImages = [
        'images/navbar/nav-bg-1.jpg',
        'images/navbar/nav-bg-2.jpg',
        'images/navbar/nav-bg-3.jpg',
        'images/navbar/nav-bg-4.jpg',
        'images/navbar/nav-bg-5.jpg',
        'images/navbar/nav-bg-6.jpg',
        'images/navbar/nav-bg-7.jpg'
    ];

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    // Style canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.8';

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connecting lines
        particles.forEach(particle1 => {
            particles.forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            });
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Handle window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    // Background image handling
    let currentImageIndex = 0;
    const backgroundElement = document.createElement('div');
    backgroundElement.id = 'animated-background';
    document.body.insertBefore(backgroundElement, document.body.firstChild);

    // Style background element
    backgroundElement.style.position = 'fixed';
    backgroundElement.style.top = '0';
    backgroundElement.style.left = '0';
    backgroundElement.style.width = '100%';
    backgroundElement.style.height = '100%';
    backgroundElement.style.zIndex = '-2';
    backgroundElement.style.transition = 'opacity 1s ease-in-out';
    backgroundElement.style.backgroundSize = 'cover';
    backgroundElement.style.backgroundPosition = 'center';

    function changeBackground() {
        const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        const nextImage = new Image();
        
        nextImage.onload = () => {
            backgroundElement.style.opacity = '0';
            
            setTimeout(() => {
                backgroundElement.style.backgroundImage = `url('${backgroundImages[nextImageIndex]}')`;
                backgroundElement.style.opacity = '1';
                currentImageIndex = nextImageIndex;
            }, 1000);
        };

        nextImage.src = backgroundImages[nextImageIndex];
    }

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    // Set initial background
    backgroundElement.style.backgroundImage = `url('${backgroundImages[0]}')`;

    // Change background every 10 seconds
    setInterval(changeBackground, 10000);
}); 