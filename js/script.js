function initToggles() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeTooltip = document.querySelector('#themeToggle .tooltip');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeIcon.textContent = isLightMode ? 'dark_mode' : 'light_mode';
        themeToggle.classList.toggle('active', isLightMode);
        if (themeTooltip) {
            themeTooltip.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
        }
        localStorage.setItem('themePreference', isLightMode ? 'light' : 'dark');
    });

    const musicToggle = document.getElementById('musicPlayer');
    const musicIcon = document.getElementById('musicIcon');
    const audioPlayer = document.getElementById('audioPlayer');
    const nowPlaying = document.getElementById('nowPlaying');
    const playPauseControl = document.getElementById('playPauseControl');
    const rewindControl = document.getElementById('rewindControl');
    const forwardControl = document.getElementById('forwardControl');
    
    audioPlayer.src = 'https://cdn.shopify.com/s/files/1/0924/2076/8114/files/Sabrina_Claudio.mp3?v=1752945024';
    
    let isMusicPlaying = false;
    musicIcon.textContent = 'pause';
    
    function toggleMusic() {
        if (isMusicPlaying) {
            audioPlayer.pause();
            musicIcon.textContent = 'play_arrow';
            playPauseControl.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
            musicToggle.classList.remove('active');
            nowPlaying.classList.remove('show');
            isMusicPlaying = false;
        } else {
            audioPlayer.play()
                .then(() => {
                    musicIcon.textContent = 'pause';
                    playPauseControl.querySelector('.material-symbols-outlined').textContent = 'pause';
                    musicToggle.classList.add('active');
                    nowPlaying.classList.add('show');
                    isMusicPlaying = true;
                })
                .catch(error => {
                    console.error('Audio playback failed:', error);
                    musicIcon.textContent = 'play_arrow';
                    playPauseControl.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
                    musicToggle.classList.remove('active');
                    nowPlaying.classList.remove('show');
                    const tooltip = musicToggle.querySelector('.tooltip');
                    if (tooltip) {
                        tooltip.textContent = 'Playback error';
                        setTimeout(() => {
                            tooltip.textContent = 'Music Player';
                        }, 2000);
                    }
                });
        }
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    playPauseControl.addEventListener('click', toggleMusic);
    
    rewindControl.addEventListener('click', function() {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    });
    
    forwardControl.addEventListener('click', function() {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    });

    const scrollToggle = document.getElementById('scrollToggle');
    const scrollIcon = document.getElementById('scrollIcon');
    const scrollTooltip = document.querySelector('#scrollToggle .tooltip');
    
    function updateScrollButton() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            scrollIcon.textContent = 'keyboard_double_arrow_up';
            if (scrollTooltip) {
                scrollTooltip.textContent = 'Scroll to Top';
            }
        } else {
            scrollIcon.textContent = 'keyboard_double_arrow_down';
            if (scrollTooltip) {
                scrollTooltip.textContent = 'Scroll to Bottom';
            }
        }
    }
    
    scrollToggle.addEventListener('click', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
    
    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();

    const cvDownloadBtn = document.getElementById('cvDownload');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const cancelPassword = document.getElementById('cancelPassword');
    const passwordError = document.getElementById('passwordError');
    
    const correctPassword = "pearl2024";
    
    cvDownloadBtn.addEventListener('click', function() {
        passwordModal.style.display = 'flex';
        passwordInput.focus();
    });
    
    cancelPassword.addEventListener('click', function() {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        passwordError.textContent = '';
    });
    
    submitPassword.addEventListener('click', function() {
        if (passwordInput.value === correctPassword) {
            const cvUrl = 'https://drive.google.com/uc?export=download&id=YOUR_CV_FILE_ID';
            if (cvUrl) {
                const link = document.createElement('a');
                link.href = cvUrl;
                link.download = 'Pearl_Malapile_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            passwordModal.style.display = 'none';
            passwordInput.value = '';
            passwordError.textContent = '';
        } else {
            passwordError.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPassword.click();
        }
    });

    const pearl = document.querySelector('.pearl');
    pearl.addEventListener('click', function() {
        this.classList.toggle('paused');
    });

    const blurToggle = document.getElementById('blurToggle');
    const blurIcon = document.getElementById('blurIcon');
    
    blurToggle.addEventListener('click', function() {
        document.body.classList.toggle('blur-mode');
        const isBlurred = document.body.classList.contains('blur-mode');
        blurIcon.textContent = isBlurred ? 'blur_off' : 'blur_on';
        blurToggle.classList.toggle('active', isBlurred);
        const tooltip = blurToggle.querySelector('.tooltip');
        if (tooltip) {
            tooltip.textContent = isBlurred ? 'Remove Blur' : 'Add Blur';
        }
    });

    const rotateToggle = document.getElementById('rotateToggle');
    const rotateIcon = document.getElementById('rotateIcon');
    let isRotated = false;
    
    rotateToggle.addEventListener('click', function() {
        isRotated = !isRotated;
        if (isRotated) {
            document.body.classList.remove('rotated-portrait');
            document.body.classList.add('rotated-landscape');
            rotateIcon.textContent = 'rotate_90_degrees_ccw';
            rotateToggle.classList.add('active');
            const tooltip = rotateToggle.querySelector('.tooltip');
            if (tooltip) {
                tooltip.textContent = 'Portrait View';
            }
        } else {
            document.body.classList.remove('rotated-landscape');
            document.body.classList.add('rotated-portrait');
            rotateIcon.textContent = 'rotate_90_degrees_cw';
            rotateToggle.classList.remove('active');
            const tooltip = rotateToggle.querySelector('.tooltip');
            if (tooltip) {
                tooltip.textContent = 'Landscape View';
            }
        }
    });

    const zoomToggle = document.getElementById('zoomToggle');
    const zoomIcon = document.getElementById('zoomIcon');
    const zoomTooltip = document.querySelector('#zoomToggle .tooltip');
    let zoomLevel = 1;
    
    document.documentElement.style.fontSize = '75%';
    zoomToggle.classList.add('active');
    
    zoomToggle.addEventListener('click', function() {
        if (zoomLevel === 1) {
            document.documentElement.style.fontSize = '50%';
            zoomIcon.textContent = 'zoom_in_map';
            zoomLevel = 0.5;
            if (zoomTooltip) zoomTooltip.textContent = 'Zoom (50%)';
        } else if (zoomLevel === 0.5) {
            document.documentElement.style.fontSize = '75%';
            zoomIcon.textContent = 'zoom_out_map';
            zoomLevel = 0.75;
            if (zoomTooltip) zoomTooltip.textContent = 'Zoom (75%)';
        } else {
            document.documentElement.style.fontSize = '100%';
            zoomIcon.textContent = 'zoom_out_map';
            zoomLevel = 1;
            if (zoomTooltip) zoomTooltip.textContent = 'Zoom (100%)';
        }
    });

    const collapseToggle = document.getElementById('collapseToggle');
    const fixedControls = document.querySelector('.fixed-controls');
    const collapseIcon = document.getElementById('collapseIcon');
    let isCollapsed = true;
    
    collapseToggle.addEventListener('click', function() {
        isCollapsed = !isCollapsed;
        fixedControls.classList.toggle('collapsed', isCollapsed);
        collapseIcon.textContent = isCollapsed ? 'grid_view' : 'close';
        const tooltip = collapseToggle.querySelector('.tooltip');
        if (tooltip) {
            tooltip.textContent = isCollapsed ? 'Expand Controls' : 'Collapse Controls';
        }
        
        if (isCollapsed) {
            collapseToggle.classList.add('shake');
            setTimeout(() => {
                collapseToggle.classList.remove('shake');
            }, 500);
        }
    });

    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = 'dark_mode';
        themeToggle.classList.add('active');
        if (themeTooltip) {
            themeTooltip.textContent = 'Dark Mode';
        }
    }
}

function initNavigation() {
    document.getElementById('logo').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        updateActiveNav();
    });

    function updateActiveNav() {
        const aboutSection = document.getElementById('about');
        const servicesSection = document.getElementById('services');
        const projectsSection = document.getElementById('projects');
        const contactSection = document.getElementById('contact');
        const aboutLink = document.querySelector('a[href="#about"]');
        const servicesLink = document.querySelector('a[href="#services"]');
        const projectsLink = document.querySelector('a[href="#projects"]');
        const contactLink = document.querySelector('a[href="#contact"]');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const aboutRect = aboutSection.getBoundingClientRect();
        const servicesRect = servicesSection.getBoundingClientRect();
        const projectsRect = projectsSection.getBoundingClientRect();
        const contactRect = contactSection.getBoundingClientRect();
        
        if (contactRect.top <= 100 && contactRect.bottom >= 100) {
            contactLink.classList.add('active');
        } else if (projectsRect.top <= 100 && projectsRect.bottom >= 100) {
            projectsLink.classList.add('active');
        } else if (servicesRect.top <= 100 && servicesRect.bottom >= 100) {
            servicesLink.classList.add('active');
        } else if (aboutRect.top <= 100 && aboutRect.bottom >= 100) {
            aboutLink.classList.add('active');
        }
    }

    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress-fill');
        progressBars.forEach(bar => {
            bar.style.width = '0';
            void bar.offsetWidth;
            bar.style.width = bar.getAttribute('data-width');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            updateActiveNav();
            
            if (targetId === '#about') {
                animateProgressBars();
            }
        });
    });

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', function() {
        animateProgressBars();
        updateActiveNav();
    });

    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    setTimeout(checkScroll, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    initToggles();
    initNavigation();
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#64c8ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64c8ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});

const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
particlesScript.onload = function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#64c8ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64c8ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
};
document.head.appendChild(particlesScript);