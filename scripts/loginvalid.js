document.addEventListener('DOMContentLoaded', function() {
    // Get the registration link
    const showSignupLink = document.getElementById('showSignup');
    
    // Add click event to registration link
    showSignupLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'signup.html';
    });

    // Get the login form
    const loginForm = document.getElementById('loginForm');
    
    // Add submit event to login form
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateLoginForm()) {
            //  handle the login logic
            alert('Login successful!');
            // Redirect to  home page after successful login
            // window.location.href = 'dashboard.html';
        }
    });
});

function validateLoginForm() {
    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Get form values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/;
    if (email === '') {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('loginEmailError', 'Invalid email format');
        isValid = false;
    }

    // Password validation
    if (password === '') {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.innerHTML = '';
    });
}