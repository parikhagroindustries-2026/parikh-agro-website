document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        const isExpanded = navMenu.classList.contains("show");
        mobileToggle.querySelector("i").className = isExpanded ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });

    // Close menu when a navigation link is clicked (mobile navigation behavior)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                mobileToggle.querySelector("i").className = "fa-solid fa-bars";
            }
        });
    });

    // 2. ACTIVE NAVIGATION LINK ON SCROLL
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let currentSectionId = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
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

    // 3. ENQUIRY HANDLING & MODALS
    const productEnquiryModal = document.getElementById("productEnquiryModal");
    const modalClose = document.querySelector(".enquiry-modal-close");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductInput = document.getElementById("modalProductInput");
    const enquiryForm = document.getElementById("enquiryForm");
    const modalEnquiryForm = document.getElementById("modalEnquiryForm");
    const formFeedback = document.getElementById("formFeedback");
    const modalFeedback = document.getElementById("modalFeedback");

    // Open inquiry modal for specific product cards
    document.querySelectorAll(".btn-enquire").forEach(button => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-product");
            modalProductName.textContent = productName;
            modalProductInput.value = productName;
            productEnquiryModal.classList.add("show");
        });
    });

    // Close inquiry modal
    modalClose.addEventListener("click", () => {
        productEnquiryModal.classList.remove("show");
        modalEnquiryForm.reset();
        modalFeedback.className = "form-feedback hidden";
    });

    // Click outside modal content to close
    window.addEventListener("click", (e) => {
        if (e.target === productEnquiryModal) {
            productEnquiryModal.classList.remove("show");
            modalEnquiryForm.reset();
            modalFeedback.className = "form-feedback hidden";
        }
    });

    // Handle Contact Page Form Submission
    enquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const product = document.getElementById("interestProduct").value;
        
        if (name && phone) {
            formFeedback.textContent = `Thank you, ${name}. Your enquiry regarding ${product} has been registered. Our sales representative will contact you shortly.`;
            formFeedback.className = "form-feedback success";
            enquiryForm.reset();
            
            setTimeout(() => {
                formFeedback.className = "form-feedback hidden";
            }, 6000);
        } else {
            formFeedback.textContent = "Please fill in all required fields.";
            formFeedback.className = "form-feedback error";
        }
    });

    // Handle Modal Form Submission
    modalEnquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("modalName").value.trim();
        const phone = document.getElementById("modalPhone").value.trim();
        const product = modalProductInput.value;
        
        if (name && phone) {
            modalFeedback.textContent = `Thank you, ${name}. Your request for ${product} has been registered.`;
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

    // 4. GALLERY FILTER & LIGHTBOX
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryModal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const galleryModalClose = document.querySelector(".modal-close");

    // Filtering items
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const filterValue = e.target.getAttribute("data-filter");
            
            galleryItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Zoom-in modal triggers
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgElement = item.querySelector("img");
            const captionText = item.querySelector("h4").textContent;
            
            modalImg.src = imgElement.src;
            modalCaption.textContent = captionText;
            galleryModal.classList.add("show");
        });
    });

    // Close lightbox
    galleryModalClose.addEventListener("click", () => {
        galleryModal.classList.remove("show");
    });

    // Click outside modal content to close lightbox
    galleryModal.addEventListener("click", (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove("show");
        }
    });
});
