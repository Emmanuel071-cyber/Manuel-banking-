"use strict";

/* ==================================================
   ELEMENTS
================================================== */

const body = document.body;

const header =
    document.getElementById("siteHeader");

const mobileToggle =
    document.getElementById("mobileToggle");

const navMenu =
    document.getElementById("navMenu");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const authModal =
    document.getElementById("authModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const loginTab =
    document.getElementById("loginTab");

const registerTab =
    document.getElementById("registerTab");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const toast =
    document.getElementById("toast");

const balanceToggle =
    document.getElementById("balanceToggle");

const balanceAmount =
    document.getElementById("balanceAmount");


/* ==================================================
   YEAR
================================================== */

document.getElementById("currentYear")
    .textContent = new Date().getFullYear();


/* ==================================================
   THEME
================================================== */

const savedTheme =
    localStorage.getItem("manuel-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeIcon.textContent = "☀";

} else {

    themeIcon.textContent = "☾";
}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const dark =
        body.classList.contains("dark");

    localStorage.setItem(
        "manuel-theme",
        dark ? "dark" : "light"
    );

    themeIcon.textContent =
        dark ? "☀" : "☾";

});


/* ==================================================
   STICKY HEADER
================================================== */

function updateHeader() {

    header.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* ==================================================
   MOBILE MENU
================================================== */

function closeMobileMenu() {

    navMenu.classList.remove("open");

    mobileToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


mobileToggle.addEventListener("click", () => {

    const isOpen =
        navMenu.classList.toggle("open");

    mobileToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


document.querySelectorAll(
    ".nav-menu a"
).forEach(link => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* ==================================================
   AUTH MODAL
================================================== */

function openModal(mode = "login") {

    authModal.classList.add("active");

    authModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("modal-open");

    setAuthMode(mode);

    setTimeout(() => {

        const firstInput =
            authModal.querySelector(
                "form:not(.hidden) input"
            );

        firstInput?.focus();

    }, 100);

}


function closeModalWindow() {

    authModal.classList.remove("active");

    authModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove("modal-open");

}


function setAuthMode(mode) {

    const login =
        mode === "login";

    loginForm.classList.toggle(
        "hidden",
        !login
    );

    registerForm.classList.toggle(
        "hidden",
        login
    );

    loginTab.classList.toggle(
        "active",
        login
    );

    registerTab.classList.toggle(
        "active",
        !login
    );

}


document.querySelectorAll(
    "[data-auth]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            openModal(
                button.dataset.auth
            );

        }
    );

});


loginTab.addEventListener(
    "click",
    () => setAuthMode("login")
);


registerTab.addEventListener(
    "click",
    () => setAuthMode("register")
);


modalClose.addEventListener(
    "click",
    closeModalWindow
);


modalBackdrop.addEventListener(
    "click",
    closeModalWindow
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            authModal.classList.contains("active")
        ) {

            closeModalWindow();

        }

    }
);


/* ==================================================
   PASSWORD VISIBILITY
================================================== */

document.querySelectorAll(
    ".password-toggle"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    button.dataset.password
                );

            const showing =
                input.type === "text";

            input.type =
                showing
                    ? "password"
                    : "text";

            button.textContent =
                showing
                    ? "Show"
                    : "Hide";

        }
    );

});


/* ==================================================
   BALANCE TOGGLE
================================================== */

let balanceVisible = true;

balanceToggle.addEventListener(
    "click",
    () => {

        balanceVisible =
            !balanceVisible;

        balanceAmount.textContent =
            balanceVisible
                ? "₦1,284,500.00"
                : "₦••••••••";

        balanceToggle.textContent =
            balanceVisible
                ? "●●●"
                : "•••";

    }
);


/* ==================================================
   FAQ ACCORDION
================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains("open");


            /* Close other items */

            faqItems.forEach(other => {

                if (other !== item) {

                    other.classList.remove("open");

                    other.querySelector(
                        ".faq-question"
                    ).setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    other.querySelector(
                        ".faq-answer"
                    ).style.maxHeight = null;

                }

            });


            if (isOpen) {

                item.classList.remove("open");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                answer.style.maxHeight = null;

            } else {

                item.classList.add("open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;

            }

        }
    );

});


/* ==================================================
   TOAST
================================================== */

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);

}


/* ==================================================
   FORM VALIDATION
================================================== */

function validateForm(form) {

    const inputs =
        form.querySelectorAll(
            "input[required]"
        );

    let valid = true;


    inputs.forEach(input => {

        input.setCustomValidity("");


        if (!input.checkValidity()) {

            valid = false;

            input.reportValidity();

        }

    });


    /* Password validation */

    const password =
        form.querySelector(
            'input[type="password"]'
        );


    if (
        password &&
        password.value.length < 6
    ) {

        password.setCustomValidity(
            "Password must contain at least 6 characters."
        );

        password.reportValidity();

        valid = false;

    }


    return valid;

}


/* ==================================================
   LOGIN
================================================== */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateForm(loginForm)) {
            return;
        }


        showToast(
            "Login successful — demo mode."
        );


        setTimeout(
            closeModalWindow,
            1200
        );

    }
);


/* ==================================================
   REGISTER
================================================== */

registerForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateForm(registerForm)) {
            return;
        }


        showToast(
            "Account created successfully — demo mode."
        );


        registerForm.reset();


        setTimeout(
            closeModalWindow,
            1200
        );

    }
);


/* ==================================================
   FORGOT PASSWORD
================================================== */

document.getElementById(
    "forgotPassword"
).addEventListener(
    "click",
    () => {

        showToast(
            "Password recovery would connect to a secure backend."
        );

    }
);


/* ==================================================
   DEMO QUICK ACTIONS
================================================== */

document.querySelectorAll(
    ".quick-actions button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showToast(
                `${button.textContent.trim()} feature selected.`
            );

        }
    );

});


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ==================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener(
    "click",
    event => {

        const clickedInside =
            navMenu.contains(event.target) ||
            mobileToggle.contains(event.target);

        if (
            !clickedInside &&
            navMenu.classList.contains("open")
        ) {

            closeMobileMenu();

        }

    }
);


/* ==================================================
   REDUCE MOTION ACCESSIBILITY
================================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}