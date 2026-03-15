function sendEmail(event) {
    event.preventDefault();
    
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Disable the submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Create the email body
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(formData.get('subject'))}&body=${encodeURIComponent(
        `Name: ${formData.get('name')}
Email: ${formData.get('email')}

Message:
${formData.get('message')}`
    )}`;

    // Open the user's email client
    window.location.href = mailtoLink;
    
    // Show success message
    showMessage('Message prepared in your email client!', 'success');
    
    // Reset form and button
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
}

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert message after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Add show class after a brief delay (for animation)
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

// Add form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    });
}); 