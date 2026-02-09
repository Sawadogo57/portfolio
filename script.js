// ===== CONFIGURATION =====
const CONFIG = {
    terminal: {
        enabled: false,
        sounds: true,
        scanEffect: true
    },
    animations: {
        enabled: true,
        delay: 50
    },
    security: {
        honeypot: true,
        encryption: true
    }
};

// ===== DOM ELEMENTS =====
const elements = {
    menuToggle: document.getElementById('menuToggle'),
    mainMenu: document.getElementById('mainMenu'),
    terminalToggle: document.getElementById('terminalToggle'),
    contactForm: document.getElementById('contactForm'),
    newsletterForm: document.getElementById('newsletterForm'),
    downloadCV: document.getElementById('downloadCV'),
    contactBtn: document.getElementById('contactBtn'),
    viewProjects: document.getElementById('viewProjects'),
    typedElement: document.getElementById('textD'),
    formStatus: document.getElementById('formStatus'),
    securityStatus: document.getElementById('securityStatus'),
    liveTerminal: document.getElementById('liveTerminal')
};

// ===== AUDIO ELEMENTS =====
const sounds = {
    keyPress: document.getElementById('keySound'),
    terminalAmbient: document.getElementById('terminalSound')
};

// ===== STATE =====
let state = {
    terminalMode: false,
    menuOpen: false,
    formSubmitting: false,
    particlesActive: false,
    currentSection: 'accueil'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c[+] Portfolio v2.0 Initialized', 'color: #64ffda; font-weight: bold;');
    console.log('%c> Security Protocols: ACTIVE', 'color: #2ed573;');
    console.log('%c> Terminal Mode: STANDBY', 'color: #ffa502;');
    
    initTypedJS();
    initMenu();
    initTerminalMode();
    initAnimations();
    initContactForm();
    initScrollSpy();
    initCounters();
    initTooltips();
    initSoundSystem();
    initLoadingScreen();
    
    // Easter Egg
    initEasterEggs();
});

// ===== TYPED.JS INITIALIZATION =====
function initTypedJS() {
    if (!elements.typedElement) return;
    
    const typed = new Typed(elements.typedElement, {
        strings: [
            '<span class="cyber-text">Etudiant</span>',
            '<span class="cyber-text">Développeur Sécurité</span>',
            '<span class="cyber-text">Entrepreneur</span>',
            
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 800,
        loop: true,
        showCursor: true,
        cursorChar: '█',
        smartBackspace: true,
        onStringTyped: () => {
            if (CONFIG.terminal.sounds && state.terminalMode) {
                playSound('keyPress');
            }
        }
    });
}

// ===== MENU SYSTEM =====
function initMenu() {
    if (!elements.menuToggle || !elements.mainMenu) return;
    
    // Menu Toggle
    elements.menuToggle.addEventListener('click', () => {
        toggleMenu();
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (state.menuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (state.menuOpen && 
            !elements.mainMenu.contains(e.target) && 
            !elements.menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.menuOpen) {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    state.menuOpen = !state.menuOpen;
    elements.mainMenu.classList.toggle('active');
    elements.menuToggle.innerHTML = state.menuOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Play sound if terminal mode is active
    if (CONFIG.terminal.sounds && state.terminalMode) {
        playSound('keyPress');
    }
}

// ===== TERMINAL MODE SYSTEM =====
function initTerminalMode() {
    if (!elements.terminalToggle) return;
    
    // Listen for toggle changes
    elements.terminalToggle.addEventListener('change', () => {
        toggleTerminalMode();
    });
    
    // Keyboard shortcut: Ctrl+Shift+T
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            elements.terminalToggle.checked = !elements.terminalToggle.checked;
            toggleTerminalMode();
        }
    });
}

function toggleTerminalMode() {
    state.terminalMode = !state.terminalMode;
    
    if (state.terminalMode) {
        enableTerminalMode();
    } else {
        disableTerminalMode();
    }
}

function enableTerminalMode() {
    console.log('%c[!] TERMINAL MODE: ACTIVATED', 'color: #00ff41; font-weight: bold;');
    
    // Add terminal class to body
    document.body.classList.add('terminal-mode');
    
    // Load terminal CSS
    const terminalStyle = document.getElementById('terminalStyle');
    if (terminalStyle) {
        terminalStyle.disabled = false;
    }
    
    // Play ambient sound
    if (CONFIG.terminal.sounds) {
        sounds.terminalAmbient.loop = true;
        sounds.terminalAmbient.volume = 0.2;
        sounds.terminalAmbient.play().catch(e => console.log('Audio error:', e));
    }
    
    // Update live terminal
    if (elements.liveTerminal) {
        updateLiveTerminal();
    }
    
    // Show notification
    showNotification('Mode Terminal Activé', 'terminal');
    
    // Start scan effect
    if (CONFIG.terminal.scanEffect) {
        startScanEffect();
    }
    
    // Easter egg: Random terminal message
    const messages = [
        "> root@kali:~# system security --level=maximum",
        "> Scanning for vulnerabilities...",
        "> Encryption protocols engaged",
        "> Welcome to the backdoor..."
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(`%c${randomMessage}`, 'color: #00ff41;');
}

function disableTerminalMode() {
    console.log('%c[!] TERMINAL MODE: DEACTIVATED', 'color: #ff4757; font-weight: bold;');
    
    // Remove terminal class
    document.body.classList.remove('terminal-mode');
    
    // Disable terminal CSS
    const terminalStyle = document.getElementById('terminalStyle');
    if (terminalStyle) {
        terminalStyle.disabled = true;
    }
    
    // Stop ambient sound
    if (CONFIG.terminal.sounds) {
        sounds.terminalAmbient.pause();
        sounds.terminalAmbient.currentTime = 0;
    }
    
    // Stop scan effect
    if (CONFIG.terminal.scanEffect) {
        stopScanEffect();
    }
    
    // Show notification
    showNotification('Mode Normal', 'info');
}

function updateLiveTerminal() {
    if (!elements.liveTerminal) return;
    
    const commands = [
        "whoami",
        "cat /etc/passwd | grep -i abdoul",
        "netstat -tulpn",
        "ps aux | grep -i security",
        "lastlog | tail -5",
        "w"
    ];
    
    const responses = [
        "abdoul-cyber",
        "abdoul:x:1000:1000:Abdoul,,,:/home/abdoul:/bin/bash",
        "Active Internet connections (only servers)",
        "securityd   1234  0.0  0.5  123456  7890 ?        Ssl  09:00   0:05 /usr/sbin/securityd",
        "abdoul     pts/0    192.168.1.100     Mon Feb 15 09:00:00 2026",
        "09:00:00 up 5 days,  1:00,  1 user,  load average: 0.05, 0.10, 0.15"
    ];
    
    // Clear terminal
    elements.liveTerminal.innerHTML = '';
    
    // Add initial prompt
    addTerminalLine('root@abdoul:~#', 'neofetch');
    addTerminalLine('', `\n██████╗ ██████╗  █████╗ ███████╗██╗  ██╗\n██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║\n██████╔╝██████╔╝███████║███████╗███████║\n██╔═══╝ ██╔══██╗██╔══██║╚════██║██╔══██║\n██║     ██║  ██║██║  ██║███████║██║  ██║\n╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝\n\nOS: Kali Linux Rolling\nHost: VirtualBox\nKernel: 6.1.0-kali5-amd64\nUptime: 5 days, 1 hour\nShell: bash 5.1.4\nTerminal: xterm-256color\nCPU: Intel i7-12700K (16) @ 5.00GHz\nMemory: 16384MiB / 32768MiB\n`);
    
    // Add random commands
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * commands.length);
        setTimeout(() => {
            addTerminalLine('root@abdoul:~#', commands[randomIndex]);
            setTimeout(() => {
                addTerminalLine('', responses[randomIndex]);
            }, 500);
        }, (i + 1) * 1000);
    }
    
    // Add cursor at the end
    setTimeout(() => {
        addTerminalLine('root@abdoul:~#', '<span class="cursor">█</span>');
    }, 4000);
}

function addTerminalLine(prompt, content) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = prompt ? `<span class="prompt">${prompt}</span> ${content}` : content;
    elements.liveTerminal.appendChild(line);
    elements.liveTerminal.scrollTop = elements.liveTerminal.scrollHeight;
}

function startScanEffect() {
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ff41, transparent);
        z-index: 9999;
        pointer-events: none;
        animation: scan 3s linear infinite;
    `;
    document.body.appendChild(scanLine);
}

function stopScanEffect() {
    const scanLine = document.querySelector('.scan-line');
    if (scanLine) {
        scanLine.remove();
    }
}

// ===== ANIMATION SYSTEM =====
function initAnimations() {
    if (!CONFIG.animations.enabled) return;
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.dataset.delay) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(entry.target.dataset.delay));
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.skill-category, .project-card, .blog-card, .stat-item, .tool-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.dataset.delay = index * CONFIG.animations.delay;
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== CONTACT FORM SYSTEM =====
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Contact button click
    if (elements.contactBtn) {
        elements.contactBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (state.formSubmitting) return;
    state.formSubmitting = true;
    
    // Honeypot check
    if (CONFIG.security.honeypot) {
        const honeypot = e.target.querySelector('input[name="honeypot"]');
        if (honeypot && honeypot.value) {
            console.warn('Bot detected via honeypot');
            showNotification('Spam détecté', 'error');
            state.formSubmitting = false;
            return;
        }
    }
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate
    if (!validateForm(data)) {
        state.formSubmitting = false;
        return;
    }
    
    // Update button state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encryption...';
    submitBtn.disabled = true;
    
    // Show progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 20;
        updateFormStatus(`Encryption: ${progress}%`, 'info');
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Simulate API call
            setTimeout(() => {
                simulateFormSubmission(data, submitBtn, originalText);
            }, 500);
        }
    }, 200);
}

function validateForm(data) {
    // Required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Veuillez remplir tous les champs requis', 'warning');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Adresse email invalide', 'warning');
        return false;
    }
    
    // Privacy policy
    if (!data.privacy) {
        showNotification('Veuillez accepter la politique de confidentialité', 'warning');
        return false;
    }
    
    return true;
}

function simulateFormSubmission(data, submitBtn, originalText) {
    // Simulate success
    updateFormStatus('<i class="fas fa-check-circle"></i> Message envoyé avec succès!', 'success');
    
    if (state.terminalMode) {
        console.log('%c[+] Secure transmission complete', 'color: #00ff41;');
        console.log(`%c> From: ${data.email}\n> Subject: ${data.subject}\n> Status: DELIVERED`, 'color: #00ff41;');
    }
    
    // Reset form
    elements.contactForm.reset();
    
    // Reset button
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé';
    
    // Show success notification
    showNotification('Message envoyé avec succès!', 'success');
    
    // Play sound if terminal mode
    if (CONFIG.terminal.sounds && state.terminalMode) {
        playSound('keyPress');
    }
    
    // Reset after delay
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        updateFormStatus('');
        state.formSubmitting = false;
    }, 3000);
}

function updateFormStatus(message, type = 'info') {
    if (!elements.formStatus) return;
    
    elements.formStatus.innerHTML = message;
    elements.formStatus.className = 'form-status';
    
    switch (type) {
        case 'success':
            elements.formStatus.style.color = '#2ed573';
            break;
        case 'error':
            elements.formStatus.style.color = '#ff4757';
            break;
        case 'warning':
            elements.formStatus.style.color = '#ffa502';
            break;
        case 'info':
            elements.formStatus.style.color = '#3742fa';
            break;
    }
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                state.currentSection = entry.target.id;
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update security status
                if (elements.securityStatus) {
                    elements.securityStatus.textContent = `Surveillance: ${getSectionSecurityLevel(entry.target.id)}`;
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => observer.observe(section));
}

function getSectionSecurityLevel(sectionId) {
    const levels = {
        'accueil': 'MAXIMUM',
        'apropos': 'ÉLEVÉ',
        'competences': 'MOYEN',
        'projets': 'MOYEN',
        'blog': 'BAS',
        'contact': 'ÉLEVÉ'
    };
    
    return levels[sectionId] || 'INCONNU';
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = e.target.getAttribute('data-tooltip');
    if (!tooltip) return;
    
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltip;
    tooltipElement.style.cssText = `
        position: absolute;
        background-color: var(--dark-bg);
        color: var(--text-light);
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        transform: translateX(-50%);
        margin-top: 5px;
    `;
    
    const rect = e.target.getBoundingClientRect();
    tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
    tooltipElement.style.top = `${rect.bottom}px`;
    
    document.body.appendChild(tooltipElement);
    
    e.target._tooltip = tooltipElement;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        e.target._tooltip = null;
    }
}

// ===== SOUND SYSTEM =====
function initSoundSystem() {
    // Preload sounds
    Object.values(sounds).forEach(sound => {
        if (sound) sound.load();
    });
}

function playSound(soundName) {
    if (!CONFIG.terminal.sounds || !sounds[soundName]) return;
    
    try {
        const sound = sounds[soundName].cloneNode();
        sound.volume = 0.2;
        sound.play().catch(e => console.log('Sound play error:', e));
    } catch (e) {
        console.log('Sound error:', e);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icon based on type
    let icon = 'info-circle';
    switch (type) {
        case 'success': icon = 'check-circle'; break;
        case 'error': icon = 'exclamation-circle'; break;
        case 'warning': icon = 'exclamation-triangle'; break;
        case 'terminal': icon = 'terminal'; break;
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#2ed573';
        case 'error': return '#ff4757';
        case 'warning': return '#ffa502';
        case 'terminal': return '#00ff41';
        default: return '#3742fa';
    }
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">INITIALISATION DU SYSTÈME</div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Konami Code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        // Check for konami code
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg('konami');
            konamiCode = [];
        }
        
        // Secret password
        if (e.key === 'c') {
            setTimeout(() => {
                const typed = konamiCode.join('').toLowerCase();
                if (typed.includes('cyber')) {
                    activateEasterEgg('cyber');
                    konamiCode = [];
                }
            }, 1000);
        }
    });
}

function activateEasterEgg(type) {
    switch (type) {
        case 'konami':
            console.log('%c[!] EASTER EGG UNLOCKED: KONAMI CODE', 'color: #ff00ff; font-weight: bold; font-size: 20px;');
            showNotification('Easter Egg Débloqué: Mode Développeur!', 'terminal');
            
            // Enable all features
            CONFIG.terminal.enabled = true;
            CONFIG.terminal.sounds = true;
            CONFIG.terminal.scanEffect = true;
            CONFIG.animations.enabled = true;
            CONFIG.security.encryption = true;
            
            // Activate terminal mode
            elements.terminalToggle.checked = true;
            toggleTerminalMode();
            break;
            
        case 'cyber':
            console.log('%c[!] BACKDOOR ACTIVATED', 'color: #ff00ff; font-weight: bold;');
            console.log('%c> Accessing hidden features...', 'color: #ff00ff;');
            
            // Add matrix effect
            addMatrixEffect();
            showNotification('Backdoor Activée! Mode Expert Engagé.', 'terminal');
            break;
    }
}

function addMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    // Simple matrix effect
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&@";
    const charArray = chars.split("");
    const rainDrops = [];
    
    for (let i = 0; i < 100; i++) {
        rainDrops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * 20, rainDrops[i]);
            
            if (rainDrops[i] > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 30);
    
    // Remove after 10 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.remove();
    }, 10000);
}

// ===== DOWNLOAD CV =====
if (elements.downloadCV) {
    elements.downloadCV.addEventListener('click', () => {
        // Create download link
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'sawadogo abdoul.pdf';
        
        // Create blob with CV content (simulated)
        const cvContent = `
            NOM: Abdoul
            TITRE: Étudiant en Master Cybersécurité
            EMAIL: sawadogoabr57@gmail.com
            TÉLÉPHONE: +22657057504
            
            COMPÉTENCES:
            - Pentesting Éthique
            - Sécurité Réseau
            - Développement Python
            - Analyse de Vulnérabilités
            - Cryptographie
            
            EXPÉRIENCE:
            2023-Présent: Étudiant en Master Cybersécurité
            2022-2023: Formation Autodidacte
            
            CERTIFICATIONS:
            - TryHackMe Complete Beginner
            - HackTheBox Starting Point
            - Cisco CCNA Security
            
            PROJETS:
            - PyScan-Sec: Scanner de sécurité automatisé
            - SIEM Dashboard: Surveillance en temps réel
            - CTF Platform: Plateforme éducative
            
            LANGUES:
            - Français: Langue maternelle
            - Anglais: Niveau B2
        `;
        
        const blob = new Blob([cvContent], { type: 'application/pdf' });
        link.href = URL.createObjectURL(blob);
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        showNotification('CV téléchargé avec succès!', 'success');
        
        // Play sound if terminal mode
        if (CONFIG.terminal.sounds && state.terminalMode) {
            playSound('keyPress');
        }
    });
}

// ===== VIEW PROJECTS =====
if (elements.viewProjects) {
    elements.viewProjects.addEventListener('click', () => {
        document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== NEWSLETTER FORM =====
if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Veuillez entrer votre email', 'warning');
            return;
        }
        
        // Simulate subscription
        showNotification('Merci pour votre inscription!', 'success');
        e.target.reset();
    });
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Update scan line if active
    if (state.terminalMode && CONFIG.terminal.scanEffect) {
        stopScanEffect();
        startScanEffect();
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    
    if (state.terminalMode) {
        console.log('%c[ERROR] System encountered an error', 'color: #ff4757;');
        console.log(`%c> ${e.message}`, 'color: #ff4757;');
    }
});

// ===== EXPORT FUNCTIONS FOR DEBUGGING =====
if (typeof window !== 'undefined') {
    window.portfolio = {
        config: CONFIG,
        state,
        enableTerminalMode: () => {
            elements.terminalToggle.checked = true;
            toggleTerminalMode();
        },
        disableTerminalMode: () => {
            elements.terminalToggle.checked = false;
            toggleTerminalMode();
        },
        showNotification,
        playSound
    };
}

console.log('%c[✓] System Initialization Complete', 'color: #2ed573; font-weight: bold;');
console.log('%c> Ready for incoming connections...', 'color: #64ffda;');
// Activer
document.getElementById('terminalStyle').disabled = false;

// Désactiver
document.getElementById('terminalStyle').disabled = true;

let binaryRain = null;

function startBinaryRain() {
    if (binaryRain) return;

    binaryRain = document.createElement('div');
    binaryRain.className = 'terminal-binary-rain';
    document.body.appendChild(binaryRain);

    for (let i = 0; i < 50; i++) {
        const char = document.createElement('span');
        char.className = 'binary-char';
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        char.style.left = `${Math.random() * 100}%`;
        char.style.animationDuration = `${Math.random() * 3 + 2}s`;
        char.style.animationDelay = `${Math.random() * 5}s`;
        binaryRain.appendChild(char);
    }
}

function stopBinaryRain() {
    if (binaryRain) {
        binaryRain.remove();
        binaryRain = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.getElementById('email-link');

    if (emailLink) {
        // 'c2F3YWRvZ29hYnI1N0BnbWFpbC5jb20=' est le Base64 de sawadogoabr57@gmail.com
        const encodedEmail = "c2F3YWRvZ29hYnI1N0BnbWFpbC5jb20=";
        
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Décodage au moment du clic
            const decodedEmail = atob(encodedEmail);
            
            // Ouvre le client mail de l'utilisateur
            window.location.href = "mailto:" + decodedEmail;
            
            // Optionnel : affiche l'email dans le texte du lien après le premier clic
            this.textContent = decodedEmail;
        });
    }
});