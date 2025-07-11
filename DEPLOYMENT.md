# Harmony Home Services - Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub, GitLab, or email
3. Drag your entire project folder to the Netlify dashboard
4. Wait for deployment (usually 1-2 minutes)
5. Your site will be live at a random URL like `https://amazing-site-123456.netlify.app`

### Option 2: GitHub Integration (Recommended)
1. Push your code to a GitHub repository
2. Connect your GitHub account to Netlify
3. Select your repository
4. Configure build settings (not needed for static sites)
5. Deploy automatically on every push

## File Structure for Deployment
```
harmony-website/
├── index.html (main page)
├── services.html
├── about.html
├── contact.html
├── privacy-policy.html
├── terms-conditions.html
├── images/ (all images)
├── fonts/ (Montserrat fonts)
├── videos/ (hero video)
├── placeholder images/ (stock photos)
└── README.md
```

## Important Notes
- ✅ All files are static HTML/CSS/JS - no build process needed
- ✅ Images and assets are properly linked
- ✅ Mobile responsive design
- ✅ SEO optimized
- ✅ Accessibility features included
- ✅ **HTTPS/SSL automatically enabled by Netlify**
- ✅ **Security headers configured**
- ✅ **HTTP to HTTPS redirects enabled**

## Custom Domain Setup
1. After deployment, go to Site Settings > Domain Management
2. Add your custom domain (e.g., harmonyhomeservices.com)
3. Update DNS records as instructed by Netlify
4. **HTTPS is automatically enabled** - no additional setup needed
5. Verify SSL certificate is active (should show green lock in browser)

## Security Features
- **Automatic HTTPS/SSL**: Netlify provides free SSL certificates
- **Security Headers**: X-Frame-Options, XSS Protection, Content Security Policy
- **HSTS**: Forces HTTPS for 1 year
- **HTTP Redirects**: All HTTP traffic automatically redirected to HTTPS
- **Content Security Policy**: Prevents XSS and other attacks
- **Referrer Policy**: Controls what information is sent to other sites

## Post-Deployment Checklist
- [ ] Test all pages load correctly
- [ ] Verify mobile menu works
- [ ] Check contact form functionality
- [ ] Test video loading on hero section
- [ ] Verify all images display properly
- [ ] Test navigation between pages
- [ ] Check loading speed
- [ ] Test on different devices/browsers
- [ ] **Verify HTTPS is working** (green lock in browser)
- [ ] **Test HTTP to HTTPS redirects**
- [ ] **Check security headers** (use browser dev tools)
- [ ] **Verify SSL certificate** is valid and active 