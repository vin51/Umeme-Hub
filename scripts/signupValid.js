document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Store user data 
            const userData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value
            };
            
            //store user data in localStorage 
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Show success message
            alert('Registration successful!');
            
            // Redirect to login page
            window.location.href = 'login.html';  
        }
    });
});

function validateForm() {
    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Get form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Username validation
    if (username === "") {
        showError("usernameError", "Username is required");
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/;
    if (email === "") {
        showError("emailError", "Email is required");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("emailError", "Invalid email format");
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (password === "") {
        showError("passwordError", "Password is required");
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        showError("passwordError", "Password must be at least 8 characters, include a number and a special character");
        isValid = false;
    }

    // Confirm password validation
    if (confirmPassword === "") {
        showError("confirmPasswordError", "Please confirm your password");
        isValid = false;
    } else if (confirmPassword !== password) {
        showError("confirmPasswordError", "Passwords do not match");
        isValid = false;
    }

    return isValid;
}

// Helper functions 
function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.innerHTML = "";
    });
}