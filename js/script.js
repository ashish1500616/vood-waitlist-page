// Vood.ai Landing Page Script
// ---------------------------

import { supabase } from './supabaseClient.js'; // Import Supabase client

document.addEventListener('DOMContentLoaded', () => {
    // --- Asset Loading ---
    if (typeof getAsset === 'function') {
        const mainLogo = document.getElementById('mainLogo');
        if (mainLogo) mainLogo.src = getAsset('logos', 'mainLogo');

        const featureIcon1 = document.getElementById('featureIcon1');
        if (featureIcon1) featureIcon1.src = getAsset('icons', 'featureIcon1');
        const featureIcon2 = document.getElementById('featureIcon2');
        if (featureIcon2) featureIcon2.src = getAsset('icons', 'featureIcon2');
        const featureIcon3 = document.getElementById('featureIcon3');
        if (featureIcon3) featureIcon3.src = getAsset('icons', 'featureIcon3');

        const howItWorksStep1Img = document.getElementById('howItWorksStep1Img');
        if (howItWorksStep1Img) howItWorksStep1Img.src = getAsset('images', 'howItWorksStep1');
        const howItWorksStep2Img = document.getElementById('howItWorksStep2Img');
        if (howItWorksStep2Img) howItWorksStep2Img.src = getAsset('images', 'howItWorksStep2');
        const howItWorksStep3Img = document.getElementById('howItWorksStep3Img');
        if (howItWorksStep3Img) howItWorksStep3Img.src = getAsset('images', 'howItWorksStep3');

        const clientLogo1 = document.getElementById('clientLogo1');
        if (clientLogo1) clientLogo1.src = getAsset('logos', 'socialProofClient1');
        const clientLogo2 = document.getElementById('clientLogo2');
        if (clientLogo2) clientLogo2.src = getAsset('logos', 'socialProofClient2');
    } else {
        console.error('getAsset function not found. Ensure assets.js is loaded before script.js');
    }

    // --- Waitlist Form Handling ---
    const waitlistForm = document.getElementById('waitlistForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.getElementById('submitButton');
    const formStatus = document.getElementById('formStatus');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const termsError = document.getElementById('termsError');

    const waitlistCountSpan = document.getElementById('waitlistCount');
    let currentWaitlistCount = 1234; // Initial simulated count

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phone === '' || re.test(String(phone));
    }

    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
    }

    function displayError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        if (inputElement) { // Checkbox doesn't have an input element in the same way
            inputElement.classList.add('input-error');
        } else if (errorElement === termsError) { // Special handling for terms checkbox error
            termsCheckbox.classList.add('input-error'); // Or style its label
        }
    }

    function validateField(inputElement, errorElement, validationFn, requiredMessage, invalidMessage) {
        const value = inputElement.value.trim();
        if (!value && requiredMessage) {
            displayError(inputElement, errorElement, requiredMessage);
            return false;
        }
        if (value && !validationFn(value) && invalidMessage) {
            displayError(inputElement, errorElement, invalidMessage);
            return false;
        }
        clearError(inputElement, errorElement);
        return true;
    }

    function validateAllFields() {
        let isValid = true;
        isValid = validateField(nameInput, nameError, (val) => val.length > 0, 'Full name is required.') && isValid;
        isValid = validateField(emailInput, emailError, validateEmail, 'Email address is required.', 'Please enter a valid email address.') && isValid;
        isValid = validateField(phoneInput, phoneError, validatePhone, null, 'Please enter a valid phone number.') && isValid; // Phone is optional

        if (!termsCheckbox.checked) {
            displayError(null, termsError, 'You must accept the terms and privacy policy.');
            isValid = false;
        } else {
            clearError(termsCheckbox, termsError); // Clear terms error if checked
        }
        return isValid;
    }

    // Add event listeners for inline validation
    if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, nameError, (val) => val.length > 0, 'Full name is required.'));
    if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, emailError, validateEmail, 'Email address is required.', 'Please enter a valid email address.'));
    if (phoneInput) phoneInput.addEventListener('blur', () => validateField(phoneInput, phoneError, validatePhone, null, 'Please enter a valid phone number.'));
    if (termsCheckbox) termsCheckbox.addEventListener('change', () => {
        if (termsCheckbox.checked) clearError(termsCheckbox, termsError);
    });


    // Function to update (simulated) waitlist counter
    function updateWaitlistCounter(increment = 0) {
        if (waitlistCountSpan) {
            currentWaitlistCount += increment;
            waitlistCountSpan.textContent = currentWaitlistCount.toLocaleString();
        }
    }
    updateWaitlistCounter(); // Initialize on load


    // Confetti Function
    function triggerConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) return;

        const colors = ['--primary-color', '--accent-color', '--secondary-color', '#FFC700', '#FF85A2'];
        const numParticles = 100;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('confetti-particle');

            const randomColorVar = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = `var(${randomColorVar}, #fallbackColorIfNotVar)`; // Use CSS var
            if (randomColorVar.startsWith('#')) { // If it's a direct hex
                 particle.style.backgroundColor = randomColorVar;
            }


            const x = Math.random() * 100; // vw
            const y = -Math.random() * 20 - 5; // vh (start above screen)
            const rotation = Math.random() * 360; // deg
            const scale = Math.random() * 0.5 + 0.5; // 0.5 to 1.0

            particle.style.left = `${x}vw`;
            particle.style.top = `${y}vh`;
            particle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

            // Randomize animation duration and delay for more natural effect
            const animDuration = Math.random() * 2 + 2.5; // 2.5s to 4.5s
            const animDelay = Math.random() * 1; // 0s to 1s

            // Vary particle types (from CSS)
            const type = Math.floor(Math.random() * 3) + 1;
            if (type === 2) particle.classList.add('type2');
            if (type === 3) particle.classList.add('type3');


            particle.style.animation = `fall ${animDuration}s ${animDelay}s linear forwards`;
            

            confettiContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, (animDuration + animDelay + 0.5) * 1000);
        }
    }


    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            formStatus.classList.remove('visible', 'success', 'error', 'loading');


            if (!validateAllFields()) {
                formStatus.textContent = 'Please correct the errors above.';
                formStatus.className = 'error visible';
                return;
            }

            submitButton.disabled = true;
            submitButton.classList.add('loading-state');
            formStatus.textContent = 'Submitting...';
            formStatus.className = 'loading visible';

            try {
                console.log('Collecting form data...');
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim() === '' ? null : phoneInput.value.trim(),
                    // Add company and use_case if they were present in the form
                    // company: document.getElementById('company')?.value.trim(),
                    // use_case: document.getElementById('use_case')?.value.trim(),
                };
                console.log('Data being sent to Supabase:', formData);

                const { data, error } = await supabase
                    .from('waitlist_entries')
                    .insert([formData]);

                if (error) {
                    console.error('Supabase insert error:', error);
                    if (error.code === '23505') { // Unique violation code for duplicate email
                        throw new Error('This email is already on the waitlist. Please use a different one.');
                    } else {
                        throw new Error(error.message || 'Failed to sign up. Please try again.');
                    }
                }

                console.log('Form data successfully submitted to Supabase:', data);
                
                formStatus.textContent = "Success! You're on the waitlist. Check your email for confirmation. Thank you for your interest!";
                formStatus.className = 'success visible';
                triggerConfetti();
                updateWaitlistCounter(1); // Increment counter
                waitlistForm.reset();
                // Clear individual error messages and styles on successful reset
                [nameInput, emailInput, phoneInput, termsCheckbox].forEach(input => {
                    if(input) {
                        input.classList.remove('input-error');
                        const errorEl = document.getElementById(input.id + 'Error');
                        if(errorEl) errorEl.textContent = '';
                    }
                });


            } catch (error) {
                console.error('Form submission failed:', error);
                formStatus.textContent = error.message || 'An unexpected error occurred. Please try again later.';
                formStatus.className = 'error visible';
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading-state');
            }
        });
    }

    // --- Footer Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Parallax Scrolling ---
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

    function handleParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
            const offset = scrollTop * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleParallax);
        handleParallax(); // Initial call
    }

});