# Netlify Forms Setup

## What are Netlify Forms?
Netlify Forms is a built-in feature that automatically detects and handles form submissions when you deploy to Netlify.

## Setup Steps:

### 1. Update Your Contact Form
Add the `netlify` attribute to your form:

```html
<form id="contactForm" name="contact" method="POST" data-netlify="true">
    <!-- Add a hidden input for Netlify -->
    <input type="hidden" name="form-name" value="contact" />
    
    <!-- Your existing form fields -->
    <div class="form-row">
        <div class="form-group">
            <label for="firstName">First Name *</label>
            <input type="text" id="firstName" name="firstName" required>
        </div>
        <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input type="text" id="lastName" name="lastName" required>
        </div>
    </div>
    <!-- ... rest of your form fields ... -->
</form>
```

### 2. Update JavaScript
Replace your current form handling with:

```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        alert('Thank you for your message! We will contact you within 24 hours.');
        this.reset();
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

### 3. Deploy to Netlify
1. Upload your files to Netlify
2. Netlify will automatically detect your form
3. Go to your site dashboard → Forms tab
4. You'll see your "contact" form listed

### 4. Configure Email Notifications
1. In your Netlify dashboard, go to Forms
2. Click on your "contact" form
3. Go to Settings → Notifications
4. Add your email address to receive notifications

## Benefits:
- ✅ Free with Netlify hosting
- ✅ Automatic spam filtering
- ✅ Email notifications
- ✅ Form submissions dashboard
- ✅ No additional services needed
- ✅ Built-in reCAPTCHA support

## Viewing Submissions:
1. Go to your Netlify dashboard
2. Click on your site
3. Go to Forms tab
4. Click on your form name
5. View all submissions in the dashboard

## Exporting Data:
- Download submissions as CSV
- Integrate with Zapier for automation
- Webhook notifications for custom integrations

## Spam Protection:
- Built-in spam filtering
- Add reCAPTCHA: `<div data-netlify-recaptcha="true"></div>`
- Honeypot fields for additional protection 