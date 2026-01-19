document.addEventListener("DOMContentLoaded", () => {

    /* ================= HERO IMAGE SWAP ================= */
    const mainImg = document.querySelector(".hero-image-main img");
    const secondaryImg = document.querySelector(".hero-image-secondary img");

    if (mainImg && secondaryImg) {
        setInterval(() => {
            [mainImg.src, secondaryImg.src] = [secondaryImg.src, mainImg.src];
            [mainImg.alt, secondaryImg.alt] = [secondaryImg.alt, mainImg.alt];
        }, 2000);
    }

    /* ================= NAV ACTIVE LINK ================= */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, {
        rootMargin: "0px 0px -50% 0px"
    });

    sections.forEach(section => observer.observe(section));

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            activateLink(link.getAttribute("href").replace("#", ""));
        });
    });

    /* ================= BURGER MENU ================= */
    const burgerMenu = document.querySelector(".burger-menu");
    const mainNav = document.querySelector(".main-navigation");

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener("click", () => {
            const isActive = mainNav.classList.toggle("active");
            burgerMenu.classList.toggle("active");
            burgerMenu.setAttribute("aria-expanded", isActive);
            document.body.style.overflow = isActive ? "hidden" : "";
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                burgerMenu.classList.remove("active");
                mainNav.classList.remove("active");
                burgerMenu.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });

        document.addEventListener("click", (e) => {
            if (!mainNav.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove("active");
                mainNav.classList.remove("active");
                burgerMenu.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }
        });
    }

    /* ================= EMAILJS CONTACT FORM ================= */
    
    (function () {
        emailjs.init("O7jKAWzTn4caMDqE6");
    })();

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const responseMessage = document.getElementById('responseMessage');

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';

            // Hide any previous messages
            if (responseMessage) {
                responseMessage.style.display = 'none';
            }

            // Get form values - UPDATED ID
            const fullNameInput = document.getElementById('fullName');
            const contactInput = document.getElementById('contactInfo'); 
            const messageInput = document.getElementById('message');

            const fullNameValue = fullNameInput ? fullNameInput.value : '';
            const contactValue = contactInput ? contactInput.value : '';
            const messageValue = messageInput ? messageInput.value : '';

            // Debug log
            console.log('Form Values:');
            console.log('Full Name:', fullNameValue);
            console.log('Contact:', contactValue);
            console.log('Message:', messageValue);

          
            const templateParams = {
                fullName: fullNameValue,
                name: fullNameValue,
                contact: contactValue,
                message: messageValue
            };

            console.log('Template Params:', templateParams);

            
            emailjs.send('service_z352xvb', 'template_ggznnln', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success message
                    if (responseMessage) {
                        responseMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                        responseMessage.className = 'response-message success';
                        responseMessage.style.display = 'block';
                    } else {
                        alert('Message sent successfully! We will get back to you soon.');
                    }

                    // Reset form
                    contactForm.reset();

                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SUBMIT';

                    // Auto-hide success message after 5 seconds
                    if (responseMessage) {
                        setTimeout(() => {
                            responseMessage.style.display = 'none';
                        }, 5000);
                    }
                }, function (error) {
                    console.log('FAILED...', error);

                    // Show error message
                    if (responseMessage) {
                        responseMessage.textContent = 'Failed to send message. Please try again later.';
                        responseMessage.className = 'response-message error';
                        responseMessage.style.display = 'block';
                    } else {
                        alert('Failed to send message. Please try again later.');
                    }

                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SUBMIT';
                });
        });
    }
});