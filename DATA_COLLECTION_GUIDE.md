# Data Collection Guide for Harmony Home Services

## Current Status
✅ **UPDATED**: Your contact forms now use Netlify Forms for data collection

## Where You Can Access User Input Data

### **Option 1: Netlify Forms Dashboard (Recommended)**
Since you're deploying to Netlify, this is the easiest way to collect and view form submissions.

#### **How to Access:**
1. **Deploy your site to Netlify** (drag and drop your files)
2. **Go to your Netlify dashboard**
3. **Click on your site**
4. **Go to "Forms" tab**
5. **You'll see two forms:**
   - `contact` (from contact.html)
   - `contact-home` (from index.html)

#### **What You'll See:**
- All form submissions in a table format
- Date and time of each submission
- All form fields (name, email, phone, county, service, message, etc.)
- Export data as CSV
- Email notifications for new submissions

#### **Setup Email Notifications:**
1. In Forms tab, click on your form name
2. Go to "Settings" → "Notifications"
3. Add your email: `info@harmonyhousingss.com`
4. You'll receive an email for every new submission

### **Option 2: Email Notifications**
You'll receive emails with all form data for each submission.

### **Option 3: CSV Export**
Download all submissions as a spreadsheet for analysis.

## Form Fields Being Collected

### **Contact Page Form (`contact`):**
- First Name *
- Last Name *
- Email Address *
- Phone Number
- County of Residence *
- Service Needed
- Urgency Level
- Message *

### **Home Page Form (`contact-home`):**
- Full Name *
- Email Address *
- Phone Number
- County of Residence *
- Service Needed
- Message

## Data Privacy & Security

### **What Netlify Does:**
- ✅ Encrypts all data in transit
- ✅ Stores data securely
- ✅ Provides GDPR compliance tools
- ✅ Automatic spam filtering
- ✅ No data sharing with third parties

### **Your Responsibilities:**
- ✅ Update your Privacy Policy to mention Netlify Forms
- ✅ Inform users about data collection
- ✅ Handle data according to your privacy policy

## Alternative Solutions (If Needed)

### **Option A: Formspree**
- Third-party service
- Free tier: 100 submissions/month
- Easy setup, no server required

### **Option B: PHP Email Script**
- Requires web server with PHP
- Sends emails directly to your inbox
- Logs submissions to file

### **Option C: Google Forms**
- Create a Google Form
- Embed it in your website
- Responses go to Google Sheets

## Next Steps

### **Immediate Actions:**
1. **Deploy to Netlify** (if not already done)
2. **Test the forms** by submitting test data
3. **Check your Netlify dashboard** for form submissions
4. **Set up email notifications**

### **After Deployment:**
1. **Monitor form submissions** in Netlify dashboard
2. **Set up email notifications** for real-time alerts
3. **Export data regularly** for record keeping
4. **Review and respond** to submissions within 24 hours

## Troubleshooting

### **Form Not Working:**
- Check that `data-netlify="true"` is in your form tag
- Ensure hidden input field is present
- Verify form is deployed to Netlify

### **No Email Notifications:**
- Check spam folder
- Verify email address in Netlify settings
- Test with a different email address

### **Data Not Appearing:**
- Wait 5-10 minutes for Netlify to process
- Check form name matches in dashboard
- Verify form submission was successful

## Data Management Best Practices

### **Regular Maintenance:**
- Export data monthly for backup
- Review and clean up old submissions
- Monitor for spam submissions
- Update privacy policy as needed

### **Response Time:**
- Aim to respond within 24 hours
- Set up auto-reply if needed
- Track response times for quality assurance

### **Data Retention:**
- Keep submissions for required period
- Delete old data according to policy
- Export important data before deletion

---

**Note**: Your forms are now ready to collect real user data once deployed to Netlify. The data will be accessible through your Netlify dashboard and email notifications. 