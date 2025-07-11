# DNS Setup Guide for harmonyhomeservices.org

## Current Status
❌ **DNS Verification Failed** - Domain not properly configured

## Step-by-Step Solution

### Step 1: Verify Domain Registration
1. Check if `harmonyhomeservices.org` is registered at your domain registrar
2. If not registered, purchase the domain first
3. Wait 24-48 hours for registration to complete

### Step 2: Choose DNS Configuration Method

#### Option A: Netlify DNS (Recommended)
1. **In Netlify Dashboard:**
   - Go to your site settings
   - Navigate to "Domain management"
   - Click "Add custom domain"
   - Enter: `harmonyhomeservices.org`
   - Select "Use Netlify DNS"

2. **At Your Domain Registrar:**
   - Log into your domain registrar account
   - Find DNS/Nameserver settings
   - Change nameservers to Netlify's:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```

#### Option B: Registrar DNS
If keeping DNS at your registrar, add these records:

```
Type: A
Name: @ (or leave blank)
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: www
Value: harmonyhomeservices.org
TTL: 3600
```

### Step 3: Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- You can check propagation status at: https://www.whatsmydns.net/

### Step 4: Verify Configuration
Run these commands to check DNS status:

```bash
# Check A record
nslookup harmonyhomeservices.org

# Check nameservers
nslookup -type=ns harmonyhomeservices.org

# Check from different DNS servers
dig harmonyhomeservices.org @8.8.8.8
```

### Step 5: Test in Netlify
1. Go back to Netlify dashboard
2. Check domain verification status
3. If successful, HTTPS certificate will be automatically provisioned

## Common Issues & Solutions

### Issue: "Domain not found" (NXDOMAIN)
**Solution:** Domain not registered or DNS not configured

### Issue: "Nameservers not pointing to Netlify"
**Solution:** Update nameservers at your registrar

### Issue: "DNS propagation delay"
**Solution:** Wait 24-48 hours, check propagation status

### Issue: "Certificate pending"
**Solution:** DNS must be fully propagated before Let's Encrypt can issue certificate

## Support Resources
- [Netlify DNS Documentation](https://docs.netlify.com/domains-ssl/custom-domains/configure-external-dns/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
- [Let's Encrypt Status](https://letsencrypt.status.io/)

## Next Steps After DNS Setup
1. ✅ DNS properly configured
2. ✅ Domain verified in Netlify
3. ✅ HTTPS certificate issued
4. ✅ Site accessible at https://harmonyhomeservices.org
5. ✅ Test all pages and functionality
6. ✅ Monitor site performance

---
**Note:** This guide assumes you have already deployed your site to Netlify. If not, deploy first using the drag-and-drop method or Git integration. 