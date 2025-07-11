# Formspree Setup for Contact Form

## What is Formspree?
Formspree is a service that handles form submissions and forwards them to your email without requiring server-side code.

## Setup Steps:

### 1. Create Formspree Account
1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Get your unique form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

### 2. Update Your Contact Form
Replace the current form action with your Formspree endpoint:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your existing form fields -->
</form>
```

### 3. Update JavaScript
Replace the current form handling with:

```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Thank you for your message! We will contact you within 24 hours.');
            this.reset();
        } else {
            alert('Sorry, there was an error. Please try again.');
        }
    })
    .catch(error => {
        alert('Sorry, there was an error. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});
```

## Benefits:
- ✅ No server setup required
- ✅ Free tier available (100 submissions/month)
- ✅ Spam protection
- ✅ Email notifications
- ✅ Form analytics
- ✅ Easy to set up

## Pricing:
- Free: 100 submissions/month
- Paid: $8/month for 1,000 submissions
- Enterprise: Custom pricing

## Alternative Services:
- Netlify Forms (if using Netlify hosting)
- Getform.io
- Web3Forms
- EmailJS 