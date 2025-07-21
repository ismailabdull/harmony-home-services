# Complete User Data Access Guide for Harmony Home Services

## 📋 **Quick Overview**
Your website collects data through **2 different systems**:
1. **Netlify Forms** - Contact forms (general inquiries)
2. **Formspree** - Referral forms (professional referrals)

## 🎯 **Immediate Action Required**

### **Step 1: Access Netlify Forms Data (Contact Forms)**

#### **Setup Netlify Dashboard:**
1. **Deploy your website to Netlify** (if not already done)
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your entire website folder
   - Your site will get a URL like: `https://amazing-site-123.netlify.app`

2. **Access Form Submissions:**
   - Go to your Netlify dashboard
   - Click on your site
   - Navigate to **"Forms"** tab
   - You'll see TWO forms:
     - `contact` (from contact page)
     - `contact-home` (from homepage)

3. **Set Up Email Notifications:**
   - Click on each form name
   - Go to **Settings → Notifications**
   - Add your email: `info@harmonyhousingss.com`
   - You'll get instant emails for every submission

#### **What Data You'll See:**
**Contact Form Data:**
- First & Last Name
- Email & Phone
- County of residence  
- Service needed
- Urgency level
- Detailed message

**Homepage Form Data:**
- Full name
- Email & Phone
- County
- Service type
- Message

### **Step 2: Access Formspree Data (Referral Forms)**

#### **Access Your Formspree Account:**
1. **Log into Formspree:**
   - Go to [formspree.io](https://formspree.io)
   - Your form endpoint: `https://formspree.io/f/xpzgwqjz`
   - Log in to see all referral submissions

2. **View Referral Data:**
   - Dashboard shows all referral submissions
   - Detailed client information
   - Referrer contact details
   - Service needs assessment

#### **Referral Data Includes:**
- **Referrer Information:** Name, organization, contact details
- **Client Details:** Name, contact info, current address
- **Eligibility Data:** Medicaid ID, DOB, housing status, disability status
- **Service Needs:** Housing search, advocacy, benefits, case management
- **Urgent Needs:** Immediate concerns and special requirements

## 📧 **Email Notification Setup**

### **Netlify Forms Email Setup:**
```
1. Netlify Dashboard → Your Site → Forms
2. Click "contact" form → Settings → Notifications
3. Add email: info@harmonyhousingss.com
4. Repeat for "contact-home" form
```

### **Formspree Email Setup:**
```
1. Formspree Dashboard → Your Form
2. Settings → Notifications
3. Add email: info@harmonyhousingss.com
4. Enable instant notifications
```

## 💾 **Data Export & Backup**

### **Netlify Data Export:**
- Click "Download CSV" in Forms dashboard
- Export monthly for backup
- Data includes timestamps, IP addresses, all form fields

### **Formspree Data Export:**
- Go to form dashboard
- Export submissions as CSV/Excel
- Includes all referral details and metadata

## 🔒 **Data Security & Compliance**

### **What's Protected:**
- ✅ All data encrypted in transit
- ✅ Secure data storage (both platforms)
- ✅ GDPR compliant
- ✅ No third-party data sharing
- ✅ Automatic spam filtering

### **Your Responsibilities:**
- ✅ Respond to submissions within 24 hours
- ✅ Export data regularly for backup
- ✅ Handle data according to privacy policy
- ✅ Delete old data per retention policy

## 🚨 **Alternative Backup Solution**

### **Option: Add Database Logging**
If you want a backup system that saves everything to your own database:

1. **Enable PHP Handler:**
   - Use the existing `contact-form-handler.php`
   - Modify forms to also submit to PHP
   - Creates local logs of all submissions

2. **Dual Submission Setup:**
   - Forms submit to both Netlify/Formspree AND your PHP handler
   - Ensures no data is ever lost
   - Local backup files created

## 📊 **Data Monitoring Dashboard**

### **Daily Monitoring:**
1. **Check Netlify Forms:** Look for new contact submissions
2. **Check Formspree:** Review new referral submissions  
3. **Check Email:** Monitor notification emails
4. **Response Tracking:** Ensure 24-hour response time

### **Weekly Tasks:**
- Export data from both platforms
- Review submission trends
- Clean up spam submissions
- Update response procedures

## 🆘 **Troubleshooting**

### **Forms Not Working:**
- ✅ Verify deployment to Netlify
- ✅ Check form attributes (`data-netlify="true"`)
- ✅ Test with sample submissions
- ✅ Check spam folder for notifications

### **Missing Data:**
- ✅ Check both Netlify and Formspree dashboards
- ✅ Verify email notification settings
- ✅ Look for submissions in spam folder
- ✅ Export recent data for analysis

### **No Email Notifications:**
- ✅ Check notification settings in both platforms
- ✅ Add multiple notification emails
- ✅ Test with sample form submission
- ✅ Check email provider spam settings

## 📞 **Contact Information for Support**

### **Platform Support:**
- **Netlify Support:** support@netlify.com
- **Formspree Support:** support@formspree.io

### **Form Endpoints:**
- **Contact Forms:** Netlify (automatic detection)
- **Referral Form:** `https://formspree.io/f/xpzgwqjz`

---

## ✅ **Quick Start Checklist**

- [ ] Deploy website to Netlify
- [ ] Access Netlify Forms dashboard
- [ ] Set up email notifications for contact forms
- [ ] Log into Formspree account
- [ ] Set up email notifications for referral forms
- [ ] Test both form types with sample data
- [ ] Export initial data for backup
- [ ] Set up weekly data export schedule

**🎯 Result:** You'll receive instant email notifications for ALL form submissions and can access comprehensive data through both platforms' dashboards. 