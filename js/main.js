document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Hero Carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    
    // Create indicators
    carouselSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        carouselIndicators.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    function updateCarousel() {
        carouselSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    heroCarousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    heroCarousel.addEventListener('mouseleave', () => {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    });
    
    // Scroll Reveal Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.classList.add('fade-in');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cart counter (demo functionality)
    const cartBtn = document.querySelector('.cart-btn');
    let cartCount = 0;
    
    document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            cartBtn.setAttribute('data-count', cartCount);
            
            // Add animation
            cartBtn.classList.add('animate');
            setTimeout(() => cartBtn.classList.remove('animate'), 500);
        });
    });
});

// [Previous JS remains the same, add this at the top]

// Language Translation
const translations = {
    en: {
        "nav.home": "Home",
        "nav.products": "Products",
        "nav.offers": "Offers",
        "nav.about": "About",
        "nav.contact": "Contact",
        "hero.title1": "Radiant Beauty Starts Here",
        "hero.text1": "Discover our vegan, cruelty-free cosmetics for your perfect glow",
        "hero.cta": "Shop Now",
        "hero.title2": "Summer Glow Collection",
        "hero.text2": "Limited edition products for your sun-kissed look",
        "hero.cta2": "Explore",
        "sections.categories": "Shop By Category",
        "sections.offers": "Special Offers",
        "sections.about": "Our Story",
        "categories.skincare": "Skin Care",
        "categories.makeup": "Makeup",
        "categories.haircare": "Hair Care",
        "categories.body": "Body Care",
        "general.explore": "Explore",
        "general.viewAll": "View All",
        "general.addToCart": "Add to Bag",
        "badges.discount": "-20%",
        "badges.bestseller": "Bestseller",
        "badges.new": "New",
        "products.serum": "Vitamin C Serum",
        "products.lipstick": "Matte Lipstick Set",
        "products.moisturizer": "Hydrating Moisturizer",
        "products.eyecream": "Revitalizing Eye Cream",
        "about.text1": "Founded in 2015, Lumière Cosmetics was born from a passion for clean, effective beauty products that enhance your natural radiance without compromise.",
        "about.text2": "We believe in cruelty-free, vegan formulations that deliver luxurious results while being kind to your skin and the planet.",
        "stats.crueltyFree": "Cruelty-Free",
        "stats.vegan": "Vegan",
        "stats.customers": "Happy Customers",
        "newsletter.title": "Join Our Beauty Community",
        "newsletter.text": "Subscribe to get exclusive offers, beauty tips, and early access to new products.",
        "form.email": "Your email address",
        "form.subscribe": "Subscribe",
        "footer.tagline": "Premium vegan beauty products for your radiant glow.",
        "footer.shop": "Shop",
        "footer.help": "Help",
        "footer.contact": "Contact Us",
        "footer.faq": "FAQs",
        "footer.shipping": "Shipping & Returns",
        "footer.track": "Track Order",
        "footer.address": "123 Beauty Ave, Cosmopolis",
        "footer.copyright": "© 2023 Lumière Cosmetics. All rights reserved.",
        "categories.bodycare": "Body Care"
    },
    ar: {
        "nav.home": "الرئيسية",
        "nav.products": "المنتجات",
        "nav.offers": "العروض",
        "nav.about": "من نحن",
        "nav.contact": "اتصل بنا",
        "hero.title1": "الجمال المشع يبدأ هنا",
        "hero.text1": "اكتشف مستحضرات التجميل النباتية والخالية من القسوة للحصول على توهجك المثالي",
        "hero.cta": "تسوق الآن",
        "hero.title2": "مجموعة الإشراق الصيفي",
        "hero.text2": "منتجات محدودة الإصدار لمظهرك المشمس",
        "hero.cta2": "استكشف",
        "sections.categories": "تسوق حسب الفئة",
        "sections.offers": "عروض خاصة",
        "sections.about": "قصتنا",
        "categories.skincare": "العناية بالبشرة",
        "categories.makeup": "مكياج",
        "categories.haircare": "العناية بالشعر",
        "categories.body": "العناية بالجسم",
        "general.explore": "استكشف",
        "general.viewAll": "عرض الكل",
        "general.addToCart": "أضف إلى السلة",
        "badges.discount": "خصم 20%",
        "badges.bestseller": "الأكثر مبيعاً",
        "badges.new": "جديد",
        "products.serum": "سيروم فيتامين سي",
        "products.lipstick": "مجموعة أحمر شفاه مات",
        "products.moisturizer": "مرطب للبشرة",
        "products.eyecream": "كريم العيون المنعش",
        "about.text1": "تأسست لوميير كوزميتكس في عام 2015 من شغف بمنتجات التجميل النظيفة والفعالة التي تعزز إشراقتك الطبيعية دون أي مساومة.",
        "about.text2": "نؤمن بالتركيبات النباتية والخالية من القسوة التي تقدم نتائج فاخرة مع الحفاظ على بشرتك وكوكب الأرض.",
        "stats.crueltyFree": "خالي من القسوة",
        "stats.vegan": "نباتي",
        "stats.customers": "عملاء سعداء",
        "newsletter.title": "انضم إلى مجتمع الجمال لدينا",
        "newsletter.text": "اشترك للحصول على عروض حصرية ونصائح تجميل ووصول مبكر إلى المنتجات الجديدة.",
        "form.email": "عنوان بريدك الإلكتروني",
        "form.subscribe": "اشتراك",
        "footer.tagline": "منتجات تجميل نباتية فاخرة لتوهجك المشع.",
        "footer.shop": "تسوق",
        "footer.help": "مساعدة",
        "footer.contact": "اتصل بنا",
        "footer.faq": "الأسئلة الشائعة",
        "footer.shipping": "الشحن والإرجاع",
        "footer.track": "تتبع الطلب",
        "footer.address": "123 جادة الجمال، كوزموبوليس",
        "footer.copyright": "© 2023 لوميير كوزميتكس. جميع الحقوق محفوظة.",
        "categories.bodycare": "العناية بالجسم" 
    }
};

// Language Toggle Functionality
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key];
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[lang][key];
    });
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
}

// Initialize language
const savedLang = localStorage.getItem('preferredLang') || 'en';
setLanguage(savedLang);

// Language toggle event
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// [Rest of the previous JS code]