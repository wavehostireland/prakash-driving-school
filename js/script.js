/* =====================================================================
   PRAKASH DRIVING SCHOOL — MAIN JAVASCRIPT (script.js)
   -----------------------------------------------------------------
   Plain vanilla JavaScript, no libraries/frameworks. Every function
   below is commented explaining exactly what it does. Sections run
   only if the matching HTML element exists on the current page, so
   this one file can safely be included on every page of the site.
===================================================================== */

/* Run everything once the HTML document has finished loading */
document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------------
       1. PAGE LOADER
       Shows a spinner while the page loads, then fades it out.
    --------------------------------------------------------------- */
    var loader = document.querySelector(".page-loader");
    window.addEventListener("load", function () {
        if (loader) {
            loader.classList.add("hide"); // fades the loader out (see .page-loader.hide in style.css)
        }
    });

    /* ---------------------------------------------------------------
       2. MOBILE HAMBURGER MENU
       Toggles the mobile navigation panel open/closed when the
       hamburger icon is clicked, and closes it again when a link
       inside the menu is clicked (so the menu doesn't stay open
       after navigating to a new page).
    --------------------------------------------------------------- */
    var hamburger = document.querySelector(".hamburger");
    var mainNav = document.querySelector(".main-nav");
    if (hamburger && mainNav) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("open");   // animates the hamburger into an "X"
            mainNav.classList.toggle("open");      // slides the mobile menu panel into view
        });
        // close the mobile menu automatically after tapping any nav link
        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                hamburger.classList.remove("open");
                mainNav.classList.remove("open");
            });
        });
    }

    /* ---------------------------------------------------------------
       3. BACK TO TOP BUTTON
       Shows the round blue button once the visitor has scrolled down
       300px, and scrolls smoothly to the top of the page when clicked.
    --------------------------------------------------------------- */
    var backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "flex";
            } else {
                backToTop.style.display = "none";
            }
        });
        backToTop.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" }); // ANIMATION - smooth scroll to top
        });
    }

    /* ---------------------------------------------------------------
       4. SCROLL REVEAL ANIMATIONS
       Any element with class="reveal" starts hidden (see style.css)
       and fades/slides into view the first time it scrolls into the
       browser's viewport. Uses IntersectionObserver (built into all
       modern browsers, no library needed).
    --------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view"); // triggers the fade/slide-up transition
                    obs.unobserve(entry.target);            // only needs to animate once
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // fallback for very old browsers: just show everything immediately
        revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }

    /* ---------------------------------------------------------------
       5. HERO IMAGE CAROUSEL (homepage + page-hero banners)
       Cycles through ".hero-slide" elements automatically every 6
       seconds, and lets the visitor click the prev/next arrows or
       the dot indicators to jump to a specific slide manually.
    --------------------------------------------------------------- */
    var heroSlides = document.querySelectorAll(".hero-slide");
    var heroDots = document.querySelectorAll(".hero-dots button");
    var heroPrev = document.querySelector(".hero-arrow.prev");
    var heroNext = document.querySelector(".hero-arrow.next");
    var currentSlide = 0;
    var heroTimer = null;

    function showSlide(index) {
        if (!heroSlides.length) return;
        currentSlide = (index + heroSlides.length) % heroSlides.length; // wraps around at both ends
        heroSlides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === currentSlide); // shows only the current slide (CSS fades it in)
        });
        heroDots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === currentSlide); // highlights the matching dot
        });
    }

    function startHeroAutoplay() {
        heroTimer = setInterval(function () { showSlide(currentSlide + 1); }, 6000); // auto-advance every 6 seconds
    }
    function resetHeroAutoplay() {
        clearInterval(heroTimer);
        startHeroAutoplay(); // restarts the 6-second timer whenever the visitor manually changes slide
    }

    if (heroSlides.length) {
        showSlide(0);
        startHeroAutoplay();
        if (heroPrev) heroPrev.addEventListener("click", function () { showSlide(currentSlide - 1); resetHeroAutoplay(); });
        if (heroNext) heroNext.addEventListener("click", function () { showSlide(currentSlide + 1); resetHeroAutoplay(); });
        heroDots.forEach(function (dot, i) {
            dot.addEventListener("click", function () { showSlide(i); resetHeroAutoplay(); });
        });
    }

    /* ---------------------------------------------------------------
       6. TESTIMONIALS CAROUSEL (dots + prev/next under "Success Stories")
       On small screens only one card is visible at a time; the dots
       and arrows below just scroll the track sideways.
    --------------------------------------------------------------- */
    var testimonialTrack = document.querySelector(".testimonial-track");
    var testimonialDots = document.querySelectorAll(".testimonial-dots span");
    var testimonialPrev = document.querySelector(".testimonial-controls .prev");
    var testimonialNext = document.querySelector(".testimonial-controls .next");
    if (testimonialTrack && testimonialDots.length) {
        var tIndex = 0;
        var cards = testimonialTrack.querySelectorAll(".testimonial-card");
        function highlightTestimonialDot(i) {
            testimonialDots.forEach(function (d, di) { d.classList.toggle("active", di === i); });
        }
        function scrollToCard(i) {
            tIndex = (i + cards.length) % cards.length;
            var card = cards[tIndex];
            if (card) {
                testimonialTrack.scrollTo({ left: card.offsetLeft - testimonialTrack.offsetLeft, behavior: "smooth" });
            }
            highlightTestimonialDot(tIndex);
        }
        if (testimonialPrev) testimonialPrev.addEventListener("click", function () { scrollToCard(tIndex - 1); });
        if (testimonialNext) testimonialNext.addEventListener("click", function () { scrollToCard(tIndex + 1); });
        testimonialDots.forEach(function (dot, i) {
            dot.addEventListener("click", function () { scrollToCard(i); });
        });
    }

    /* ---------------------------------------------------------------
       7. FAQ ACCORDION
       Clicking a question expands/collapses its answer. Only one
       answer is kept open at a time to keep the page tidy.
    --------------------------------------------------------------- */
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        var question = item.querySelector(".faq-question");
        var answer = item.querySelector(".faq-answer");
        question.addEventListener("click", function () {
            var isOpen = item.classList.contains("open");
            // close every other FAQ item first
            faqItems.forEach(function (other) {
                other.classList.remove("open");
                other.querySelector(".faq-answer").style.maxHeight = null;
            });
            // then open this one, unless it was already open (acts as a toggle)
            if (!isOpen) {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px"; // ANIMATION - expands to fit the answer's real height
            }
        });
    });

    /* ---------------------------------------------------------------
       8. BOOKING FORM + CONTACT FORM (no backend yet)
       -----------------------------------------------------------
       HOW TO CONNECT A REAL EMAIL SERVICE LATER:
       Right now, submitting either form just shows a green success
       message on the page (no email is actually sent anywhere). To
       make it really send you an email, pick ONE of these options:

       OPTION A - FormSubmit (easiest, no signup for basic use):
         1. Change the <form> tag's action to:
            action="https://formsubmit.co/YOUR-EMAIL@example.com"
         2. Change the method to method="POST"
         3. Remove the "preventDefault()" line below for that form
            (or just delete this whole handler for that form) so the
            browser submits normally to FormSubmit.

       OPTION B - EmailJS (send email directly from JavaScript):
         1. Create a free account at https://www.emailjs.com
         2. Include their SDK script tag in the <head> of this page
         3. Replace the "// TODO: EmailJS integration" comment below
            with their emailjs.send(...) call using your service ID,
            template ID and public key.

       OPTION C - Netlify Forms (if you host this site on Netlify):
         1. Add the attribute data-netlify="true" to the <form> tag
         2. Add a hidden input: <input type="hidden" name="form-name" value="booking">
         3. Remove/adjust this JS handler so Netlify can intercept
            the real form submission.
    --------------------------------------------------------------- */
    function wireDemoForm(formId) {
        var form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // STOPS the real page reload / network request (remove this line once FormSubmit/EmailJS/Netlify is wired up above)

            // TODO: EmailJS integration could replace this whole block with an emailjs.send() call

            var successBox = form.querySelector(".form-success");
            if (successBox) {
                successBox.classList.add("show");   // reveals the green "thank you" message
                successBox.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            form.reset(); // clears all the input fields ready for a new submission
        });
    }
    wireDemoForm("booking-form");
    wireDemoForm("contact-form");
    wireDemoForm("newsletter-form");

    /* ---------------------------------------------------------------
       9. CURRENT YEAR IN FOOTER
       Automatically keeps the copyright year up to date so you never
       have to edit it by hand.
    --------------------------------------------------------------- */
    var yearEls = document.querySelectorAll(".current-year");
    yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });

});
