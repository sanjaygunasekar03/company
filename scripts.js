// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar ul li a');
const serviceCards = document.querySelectorAll('.service-card');
const testimonialTrack = document.getElementById('testimonialTrack');
const currentYear = document.getElementById('currentYear');

// Service data organized by data-service attribute
const servicesData = {
    'medical-billing': {
        title: 'Medical Billing',
        description: 'Our Medical Billing Services manage the complete billing lifecycle—from charge capture to final reimbursement—so your practice can focus on patient care while we focus on revenue performance.<br><br>By combining certified billing professionals, payer-specific workflows, and intelligent automation, we ensure faster payments, fewer errors, and consistent cash flow—all at a transparent cost starting at just 2% of monthly collections.',
        points: [
            'End-to-end billing management, from claim creation to payment resolution',
            'Clean claim submission aligned with payer-specific rules',
            'Real-time claim tracking and follow-up',
            'Rapid resolution of rejections, edits, and underpayments',
            'Transparent reporting and performance metrics'
        ]
    },
    'medical-coding': {
        title: 'Medical Coding & Audits',
        description: 'Our Medical Coding & Audit services ensure your clinical documentation is accurately translated into compliant, revenue-optimized codes across all specialties.<br><br>With certified coders and proactive audits, we help practices reduce denials, avoid payer scrutiny, and uncover missed revenue opportunities—without disrupting provider workflows.',
        points: [
            'AAPC® and AHIMA® certified coding professionals',
            'Specialty-specific CPT, ICD-10-CM, and HCPCS expertise',
            'Coding audits and chart reviews for accuracy and compliance',
            'Identification of undercoding and overcoding risks',
            'Alignment with payer and regulatory guidelines'
        ]
    },
    'ar-management': {
        title: 'Accounts Receivable (AR) Management',
        description: 'Our AR Management services focus on reducing outstanding balances and shortening payment cycles through disciplined follow-ups and data-driven prioritization.<br><br>We actively pursue unpaid and underpaid claims while providing complete visibility into AR performance and recovery trends.',
        points: [
            'Timely follow-up on unpaid and underpaid claims',
            'Prioritization of high-value and aging accounts',
            'Direct payer communication and issue resolution',
            'Reduction in days in AR and aging backlogs',
            'Detailed AR analytics and recovery reporting'
        ]
    },
    'eligibility': {
        title: 'Insurance Eligibility & Verification',
        description: 'Our Insurance Eligibility & Verification services eliminate preventable denials by validating patient coverage and benefits before services are rendered.<br><br>By confirming coverage details upfront, we help practices improve clean claim rates, reduce rework, and set accurate financial expectations with patients.',
        points: [
            'Real-time insurance eligibility and benefits verification',
            'Identification of copays, deductibles, and coinsurance',
            'Prior authorization and referral verification',
            'Payer-specific coverage validation',
            'Improved front-end accuracy and patient financial clarity'
        ]
    },
    'denial-management': {
        title: 'Denial Management & Appeals',
        description: 'Our Denial Management & Appeals services focus on resolving current denials while preventing future ones through root-cause analysis and process improvement.<br><br>We prepare and submit timely, well-supported appeals that comply with payer guidelines and documentation requirements.',
        points: [
            'Comprehensive denial analysis and categorization',
            'Timely appeal submission with supporting documentation',
            'Root-cause identification and corrective action plans',
            'Reduction in recurring denial patterns',
            'Continuous denial trend reporting and insights'
        ]
    },
    'charge-entry': {
        title: 'Charge Entry & Payment Posting',
        description: 'Accurate charge entry and payment posting are essential to preventing revenue leakage and maintaining financial transparency. Our specialists ensure every service is captured, posted, and reconciled correctly.<br><br>Any discrepancies are flagged immediately, enabling faster follow-up and resolution.',
        points: [
            'Accurate charge capture and validation',
            'Timely payment posting and adjustment reconciliation',
            'Identification of underpayments and posting discrepancies',
            'Support for secondary billing and patient balances',
            'Improved financial visibility and reporting accuracy'
        ]
    }
};

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Service Cards Modal with Bootstrap
let bootstrapModal = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap modal
    const modalElement = document.getElementById('serviceModal');
    if (modalElement) {
        bootstrapModal = new bootstrap.Modal(modalElement);
    }
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

// Open modal when service card is clicked
serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.closest('a')) {
            e.preventDefault();
            const serviceKey = this.getAttribute('data-service');
            const service = servicesData[serviceKey];
            
            if (service) {
                document.getElementById('modalTitle').innerText = service.title;
                document.getElementById('modalDescription').innerHTML = service.description;
                
                const list = document.getElementById('modalPointers');
                list.innerHTML = '';
                service.points.forEach(point => {
                    const li = document.createElement('li');
                    li.innerHTML = point;
                    list.appendChild(li);
                });
                
                // Show Bootstrap modal
                if (bootstrapModal) {
                    bootstrapModal.show();
                    
                    // Add blur effect to main content
                    document.getElementById('mainContent').classList.add('blur-effect');
                    
                    // Ensure modal body scrolls properly
                    const modalBody = document.querySelector('.modal-body');
                    if (modalBody) {
                        modalBody.scrollTop = 0;
                    }
                }
            }
        }
    });
});

// Close modal handler
document.querySelector('.btn-close').addEventListener('click', function() {
    document.getElementById('mainContent').classList.remove('blur-effect');
});

// Also close when clicking outside modal
document.getElementById('serviceModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('mainContent').classList.remove('blur-effect');
});

// Close modal with ESC key (Bootstrap handles this automatically)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('mainContent').classList.remove('blur-effect');
    }
});

// Ensure modal body scrolls properly on mobile
document.addEventListener('shown.bs.modal', function() {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
        
        // Fix for iOS scrolling
        modalBody.addEventListener('touchmove', function(e) {
            if (this.scrollHeight > this.clientHeight) {
                if ((this.scrollTop === 0 && e.deltaY > 0) || 
                    (this.scrollTop === this.scrollHeight - this.clientHeight && e.deltaY < 0)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }
});

// ---------- STEP 1 VALIDATION ----------
function validateStep1() {
    let valid = true;
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    
    document.querySelectorAll(".error-text").forEach(e => e.style.display = "none");
    
    if (name === "") {
        document.getElementById("nameError").style.display = "block";
        valid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").style.display = "block";
        valid = false;
    }
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").style.display = "block";
        valid = false;
    }
    
    if (valid) {
        nextStep();
    }
}

// ---------- MULTI-STEP NAVIGATION ----------
function nextStep() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot2').classList.add('active');
}

function prevStep() {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    document.getElementById('dot2').classList.remove('active');
    document.getElementById('dot1').classList.add('active');
}

// ---------- FINAL SUBMIT POPUP ----------
document.getElementById("multiStepForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert(
        "✅ Thank you for requesting your instant quote!\n" +
        "Our billing experts will review your details and get back to you shortly with a customized pricing plan tailored to your practice."
    );
    this.reset();
    prevStep();
});

// Testimonial Slider Logic
let currentTestimonial = 0;
const totalTestimonials = 4;
let autoSlideInterval;

function moveTestimonial(direction) {
    currentTestimonial = (currentTestimonial + direction + totalTestimonials) % totalTestimonials;
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }, 5000);
}

// Start auto slide on page load
document.addEventListener('DOMContentLoaded', function() {
    startAutoSlide();
});

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

// Back to top button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
document.querySelector('.contact-us form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    this.reset();
});