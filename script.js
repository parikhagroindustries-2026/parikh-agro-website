document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            const isExpanded = navMenu.classList.contains("show");
            mobileToggle.querySelector("i").className = isExpanded ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        });

        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("show")) {
                    navMenu.classList.remove("show");
                    mobileToggle.querySelector("i").className = "fa-solid fa-bars";
                }
            });
        });
    }

    // 2. ACTIVE NAVIGATION LINK ON SCROLL
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSectionId = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 3. PRODUCT ENQUIRY MODAL POPUP
    const productEnquiryModal = document.getElementById("productEnquiryModal");
    const modalClose = document.querySelector(".enquiry-modal-close");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductInput = document.getElementById("modalProductInput");
    const enquiryForm = document.getElementById("enquiryForm");
    const modalEnquiryForm = document.getElementById("modalEnquiryForm");
    const formFeedback = document.getElementById("formFeedback");
    const modalFeedback = document.getElementById("modalFeedback");

    // Open Modal on "Get Price Quote" click
    document.querySelectorAll(".btn-enquire").forEach(button => {
        button.addEventListener("click", (e) => {
            const btn = e.target.closest('.btn-enquire');
            const productName = btn.getAttribute("data-product");
            modalProductName.textContent = productName;
            modalProductInput.value = productName;
            productEnquiryModal.classList.add("show");
        });
    });

    // Close Modal
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            productEnquiryModal.classList.remove("show");
            modalEnquiryForm.reset();
            modalFeedback.className = "form-feedback hidden";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === productEnquiryModal) {
            productEnquiryModal.classList.remove("show");
            modalEnquiryForm.reset();
            modalFeedback.className = "form-feedback hidden";
        }
    });

    // Contact Form Submission
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("fullName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const product = document.getElementById("interestProduct").value;
            
            if (name && phone) {
                formFeedback.textContent = `Thank you, ${name}. Your enquiry regarding ${product} has been registered. Our sales team will contact you shortly.`;
                formFeedback.className = "form-feedback success";
                enquiryForm.reset();
                setTimeout(() => { formFeedback.className = "form-feedback hidden"; }, 6000);
            } else {
                formFeedback.textContent = "Please fill in all required fields.";
                formFeedback.className = "form-feedback error";
            }
        });
    }

    // Modal Form Submission
    if (modalEnquiryForm) {
        modalEnquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("modalName").value.trim();
            const phone = document.getElementById("modalPhone").value.trim();
            const product = modalProductInput.value;
            
            if (name && phone) {
                modalFeedback.textContent = `Thank you, ${name}. Request for ${product} registered.`;
                modalFeedback.className = "form-feedback success";
                modalEnquiryForm.reset();
                setTimeout(() => {
                    productEnquiryModal.classList.remove("show");
                    modalFeedback.className = "form-feedback hidden";
                }, 3000);
            } else {
                modalFeedback.textContent = "Please fill in all required fields.";
                modalFeedback.className = "form-feedback error";
            }
        });
    }
});
