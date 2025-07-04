document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.style.display = 'none', 600);
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
    });
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        follower.style.left = cursorX + 'px'; follower.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .project-preview, .social-icon').forEach(elem => {
        elem.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(1.6)'; follower.style.transform = 'scale(1.6)'; });
        elem.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; follower.style.transform = 'scale(1)'; });
    });

    // Color Switcher
    const switcherBtn = document.querySelector('.switcher-btn');
    const colorSwitcher = document.querySelector('.color-switcher');
    switcherBtn.addEventListener('click', () => colorSwitcher.classList.toggle('open'));
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            document.documentElement.style.setProperty('--gradient-1', `linear-gradient(45deg, ${color}, ${getSecondaryColor(color)})`);
        });
    });
    function getSecondaryColor(primary) { return primary === '#4a90e2' ? '#50e3c2' : primary === '#50e3c2' ? '#4a90e2' : '#f5a623'; }
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.body.classList.toggle('dark-theme', btn.classList.contains('dark'));
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navUl = document.querySelector('nav ul');
    menuBtn.addEventListener('click', () => {
        navUl.classList.toggle('show');
        menuBtn.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    // Typed.js
    new Typed('.typed-text', { strings: ['Web Developer', 'Tech Innovator', 'UI/UX Enthusiast'], typeSpeed: 60, backSpeed: 40, backDelay: 2500, loop: true });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
            anchor.classList.add('active');
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                menuBtn.classList.remove('open');
            }
        });
    });

    // Scroll Header
    window.addEventListener('scroll', () => document.querySelector('header').classList.toggle('scrolled', window.scrollY > 60));

    // AOS
    AOS.init({ duration: 1200, once: true, easing: 'ease-in-out' });

    // Project Filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.project-card').forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = filter === 'all' || category === filter ? 'block' : 'none';
                card.style.opacity = filter === 'all' || category === filter ? '1' : '0';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        });
    });

    // Skill Progress
    const skillProgress = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            skillProgress.forEach(bar => bar.style.width = bar.getAttribute('data-level'));
            observer.unobserve(skillsSection);
        }
    }, { threshold: 0.6 });
    observer.observe(skillsSection);

    // Animated Text
    const animatedTexts = document.querySelectorAll('.animated-text');
    const textObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.6 });
    animatedTexts.forEach(text => textObserver.observe(text));

    // Wave Background
    const canvas = document.getElementById('wave-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const waves = [];
    for (let i = 0; i < 5; i++) {
        waves.push({ y: canvas.height / 2 + i * 50, amplitude: 30 + i * 10, frequency: 0.02 + i * 0.005, speed: 0.05 + i * 0.01, color: `rgba(74, 144, 226, ${0.2 - i * 0.03})` });
    }
    function animateWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let time = Date.now() * 0.001;
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, wave.y);
            for (let x = 0; x < canvas.width; x++) {
                const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fillStyle = wave.color;
            ctx.fill();
        });
        requestAnimationFrame(animateWaves);
    }
    animateWaves();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    // Tilt Effect
    VanillaTilt.init(document.querySelectorAll('.social-icon'), { max: 15, speed: 400, glare: true, 'max-glare': 0.2 });
});