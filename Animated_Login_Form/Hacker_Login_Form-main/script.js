// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitBtn = document.querySelector('input[type="submit"]');
    const signupLink = document.querySelector('.links a:nth-child(2)');
    const forgotPasswordLink = document.querySelector('.links a:nth-child(1)');
    const formTitle = document.querySelector('.content h2');
    
    let isSignupMode = false;
    
    // Signup link handler
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        isSignupMode = !isSignupMode;
        
        if (isSignupMode) {
            formTitle.textContent = 'Sign Up';
            submitBtn.value = 'Register';
            signupLink.textContent = 'Login';
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            formTitle.textContent = 'Sign In';
            submitBtn.value = 'Login';
            signupLink.textContent = 'Signup';
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });
    
    // Forgot password handler
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Password reset link sent to your email', 'success');
    });
    
    // Add form submission handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }
        
        if (isSignupMode) {
            // Simulate signup process
            submitBtn.value = 'Creating Account...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMessage('Account Created Successfully!', 'success');
                submitBtn.value = 'Register';
                submitBtn.disabled = false;
                
                // Switch back to login mode
                setTimeout(() => {
                    isSignupMode = false;
                    formTitle.textContent = 'Sign In';
                    submitBtn.value = 'Login';
                    signupLink.textContent = 'Signup';
                    usernameInput.value = '';
                    passwordInput.value = '';
                }, 1500);
            }, 1500);
        } else {
            // Simulate login process
            submitBtn.value = 'Logging in...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMessage('Access Granted!', 'success');
                submitBtn.value = 'Login';
                submitBtn.disabled = false;
                
                // Clear form after successful login
                setTimeout(() => {
                    usernameInput.value = '';
                    passwordInput.value = '';
                }, 1500);
            }, 1500);
        }
    });
    
    // Show message function
    function showMessage(text, type) {
        // Remove existing message if any
        const existingMsg = document.querySelector('.message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        const content = document.querySelector('.signin .content');
        content.insertBefore(message, content.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Add keyboard support for Enter key
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
});
