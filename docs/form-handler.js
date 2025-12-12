/**
 * Contact Form Handler
 * Handles form submission and sends email via EmailJS
 */

// Initialize EmailJS when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load EmailJS SDK
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
      emailjs.init('YOUR_PUBLIC_KEY');
    }
  };
  document.head.appendChild(script);

  // Handle form submission
  const contactForm = document.querySelector('#consultation-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Get form data
  const email = form.querySelector('#email').value;
  const name = form.querySelector('#name').value || 'Not provided';
  const notes = form.querySelector('#notes').value || 'Not provided';
  
  // Validate email
  if (!email || !isValidEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  submitButton.classList.add('opacity-75', 'cursor-not-allowed');
  
  try {
    // Send email via EmailJS
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' with your actual IDs
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: name,
        from_email: email,
        message: notes,
        to_email: 'contact@axiotic.ai', // Your receiving email
      }
    );
    
    if (response.status === 200) {
      showMessage('Thank you! We\'ll be in touch soon.', 'success');
      form.reset();
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    showMessage('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
  }
}

/**
 * Show success/error message
 */
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message mt-4 p-4 rounded-lg text-sm ${
    type === 'success' 
      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
      : 'bg-red-500/20 text-red-300 border border-red-500/30'
  }`;
  messageEl.textContent = message;
  
  // Insert after form
  const form = document.querySelector('#consultation-form');
  form.parentNode.insertBefore(messageEl, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageEl.style.transition = 'opacity 0.3s';
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

