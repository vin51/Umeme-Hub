document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validateSignupForm()) {
                try {
                    const formData = {
                        username: document.getElementById('username').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        password: document.getElementById('password').value
                    };

                    const response = await fetch('/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        alert('Registration successful!');
                        window.location.href = '/login';
                    } else {
                        showError(data.field + 'Error', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Registration failed. Please try again.');
                }
            }
        });
    }

    // Login Form Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validateLoginForm()) {
                try {
                    const formData = {
                        email: document.getElementById('email').value.trim(),
                        password: document.getElementById('password').value
                    };

                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        window.location.href = '/home';
                    } else {
                        showError('emailError', data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Login failed. Please try again.');
                }
            }
        });
    }
});

// Signup Form Validation
function validateSignupForm() {
    clearErrors();
    let isValid = true;

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Username validation
    if (username === '') {
        showError('usernameError', 'Username is required');
        isValid = false;
    } else if (username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/;
    if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('emailError', 'Invalid email format');
        isValid = false;
    }

    // Password validation
    if (password === '') {
        showError('passwordError', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Confirm password
    if (confirmPassword === '') {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (confirmPassword !== password) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

// Login Form Validation
function validateLoginForm() {
    clearErrors();
    let isValid = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Email validation
    if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
    }

    // Password validation
    if (password === '') {
        showError('passwordError', 'Password is required');
        isValid = false;
    }

    return isValid;
}

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}