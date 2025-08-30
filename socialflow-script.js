// SocialFlow - JavaScript Interactivo

class SocialFlowLanding {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupHeaderEffects();
        this.setupScrollAnimations();
        this.setupInteractiveFeatures();
        this.setupPricingCalculator();
        this.setupNewsletterSignup();
        this.setupMobileMenu();
        this.setupAnalytics();
    }

    // Smooth scrolling para enlaces de navegación
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Efectos del header al hacer scroll
    setupHeaderEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Efecto de transparencia
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--background-white)';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }

            // Efecto de ocultar/mostrar header
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Animaciones al hacer scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Añadir clase de animación
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.classList.add('animate-fade-in');
                    }
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        document.querySelectorAll('.feature-card, .pricing-card, .section-header').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Características interactivas
    setupInteractiveFeatures() {
        // Efecto hover en feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Efecto hover en pricing cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('featured')) {
                    card.style.transform = 'scale(1.05) translateY(-8px)';
                } else {
                    card.style.transform = 'translateY(-8px)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('featured')) {
                    card.style.transform = 'scale(1.05)';
                } else {
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Contador animado para estadísticas
        this.setupAnimatedCounters();
    }

    // Contadores animados
    setupAnimatedCounters() {
        const counters = [
            { element: '.hero-stats-users', target: 50000, suffix: '+' },
            { element: '.hero-stats-posts', target: 1000000, suffix: '+' },
            { element: '.hero-stats-engagement', target: 85, suffix: '%' }
        ];

        const animateCounter = (element, target, suffix) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 20);
        };

        // Observar cuando los contadores están visibles
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = counters.find(c => entry.target.matches(c.element));
                    if (counter) {
                        animateCounter(entry.target, counter.target, counter.suffix);
                        counterObserver.unobserve(entry.target);
                    }
                }
            });
        });

        counters.forEach(counter => {
            const element = document.querySelector(counter.element);
            if (element) {
                counterObserver.observe(element);
            }
        });
    }

    // Calculadora de ROI para pricing
    setupPricingCalculator() {
        const calculator = document.getElementById('roi-calculator');
        if (!calculator) return;

        const inputs = calculator.querySelectorAll('input[type="number"]');
        const result = calculator.querySelector('.roi-result');

        const calculateROI = () => {
            const followers = parseInt(document.getElementById('followers').value) || 0;
            const postsPerMonth = parseInt(document.getElementById('posts-per-month').value) || 0;
            const avgEngagement = parseFloat(document.getElementById('avg-engagement').value) || 0;

            const timeSaved = postsPerMonth * 2; // 2 horas por post
            const engagementIncrease = (avgEngagement * 0.3); // 30% mejora
            const revenueIncrease = (followers * engagementIncrease * 0.01); // $0.01 por engagement

            const monthlyValue = (timeSaved * 25) + revenueIncrease; // $25/hora
            const annualValue = monthlyValue * 12;
            const roi = ((annualValue - 348) / 348) * 100; // $29/mes = $348/año

            if (result) {
                result.innerHTML = `
                    <div class="roi-breakdown">
                        <h4>Tu ROI Estimado</h4>
                        <div class="roi-value">${roi.toFixed(0)}%</div>
                        <div class="roi-details">
                            <p>💰 Tiempo ahorrado: $${(timeSaved * 25).toFixed(0)}/mes</p>
                            <p>📈 Ingresos adicionales: $${revenueIncrease.toFixed(0)}/mes</p>
                            <p>💵 Valor total: $${annualValue.toFixed(0)}/año</p>
                        </div>
                    </div>
                `;
            }
        };

        inputs.forEach(input => {
            input.addEventListener('input', calculateROI);
        });
    }

    // Newsletter signup con validación
    setupNewsletterSignup() {
        const newsletterForm = document.getElementById('newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (this.validateEmail(email)) {
                submitBtn.textContent = '¡Gracias!';
                submitBtn.style.background = '#10b981';
                
                // Simular envío
                setTimeout(() => {
                    submitBtn.textContent = 'Suscribirse';
                    submitBtn.style.background = '';
                    newsletterForm.reset();
                }, 3000);
            } else {
                this.showNotification('Por favor, ingresa un email válido', 'error');
            }
        });
    }

    // Validación de email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Menú móvil
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });

            // Cerrar menú al hacer click en un enlace
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }
    }

    // Analytics básico
    setupAnalytics() {
        // Track CTA clicks
        document.querySelectorAll('.btn-primary, .pricing-cta').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('CTA Click', {
                    location: btn.closest('section')?.id || 'unknown',
                    text: btn.textContent.trim()
                });
            });
        });

        // Track feature card interactions
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const featureName = card.querySelector('h3')?.textContent;
                this.trackEvent('Feature View', { feature: featureName });
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.trackEvent('Scroll Depth', { depth: '25%' });
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.trackEvent('Scroll Depth', { depth: '50%' });
                } else if (maxScroll >= 75) {
                    this.trackEvent('Scroll Depth', { depth: '75%' });
                }
            }
        });
    }

    // Tracking de eventos
    trackEvent(eventName, properties = {}) {
        // Aquí puedes integrar con Google Analytics, Mixpanel, etc.
        console.log('Event:', eventName, properties);
        
        // Ejemplo con gtag (Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    // Notificaciones
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#10b981';
        }

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Lazy loading para imágenes
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Optimización de rendimiento
    optimizePerformance() {
        // Debounce para eventos de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Código que se ejecuta después de que el scroll se detenga
            }, 100);
        });

        // Preload de recursos críticos
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SocialFlowLanding();
});

// Exportar para uso en otros archivos
window.SocialFlowLanding = SocialFlowLanding; 