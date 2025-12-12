# Deploying axiotic-website to axiotic.ai

This guide covers deploying the static website to `axiotic.ai` using your Namecheap domain.

## Quick Overview

The website is a **static site** (HTML, CSS, JS) located in the `docs/` directory. No build step is required.

## Recommended Options

### Option 1: Netlify (Recommended - Easiest)

**Pros:**
- Free tier with generous limits
- Automatic HTTPS
- Easy custom domain setup
- Continuous deployment from Git
- Built-in CDN

**Steps:**

1. **Push code to GitHub** (if not already):
   ```bash
   cd 15_codebases/axiotic-website
   git init  # if not already a git repo
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select the repository
   - **Build settings:**
     - **Base directory:** `docs` (or leave empty if you move files)
     - **Publish directory:** `docs` (or `.` if files are in root)
     - **Build command:** (leave empty - no build needed)
   - Click "Deploy site"

3. **Configure Custom Domain:**
   - In Netlify dashboard → Site settings → Domain management
   - Click "Add custom domain"
   - Enter `axiotic.ai`
   - Netlify will show you DNS records to add

4. **Configure DNS in Namecheap:**
   - Log into Namecheap
   - Go to Domain List → Manage `axiotic.ai`
   - Go to "Advanced DNS" tab
   - Add these records:
     ```
     Type: A Record
     Host: @
     Value: [Netlify's IP address - shown in their dashboard]
     TTL: Automatic
     
     Type: CNAME Record
     Host: www
     Value: [your-site-name].netlify.app
     TTL: Automatic
     ```
   - Netlify will provide the exact values in their dashboard

5. **Wait for DNS propagation** (usually 5-60 minutes)

6. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificates via Let's Encrypt
   - Should activate within a few minutes after DNS propagates

---

### Option 2: Vercel (Also Excellent)

**Pros:**
- Free tier
- Excellent performance
- Easy Git integration
- Automatic HTTPS

**Steps:**

1. **Push code to GitHub** (same as above)

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "Add New Project"
   - Import your GitHub repository
   - **Project Settings:**
     - **Root Directory:** `docs` (or configure accordingly)
     - **Framework Preset:** Other
     - **Build Command:** (leave empty)
     - **Output Directory:** `.` (or `docs` if needed)
   - Click "Deploy"

3. **Add Custom Domain:**
   - In Vercel dashboard → Project → Settings → Domains
   - Add `axiotic.ai` and `www.axiotic.ai`
   - Vercel will show DNS configuration

4. **Configure DNS in Namecheap:**
   - Add the DNS records Vercel provides (usually A records or CNAME)
   - Wait for DNS propagation

---

### Option 3: Cloudflare Pages (Free & Fast)

**Pros:**
- Free unlimited bandwidth
- Excellent global CDN
- Easy Git integration

**Steps:**

1. **Push code to GitHub**

2. **Deploy on Cloudflare Pages:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect GitHub repository
   - **Build settings:**
     - **Framework preset:** None
     - **Build command:** (empty)
     - **Build output directory:** `docs`
   - Deploy

3. **Add Custom Domain:**
   - In Pages project → Custom domains
   - Add `axiotic.ai`
   - Follow DNS instructions

4. **Configure DNS:**
   - If using Cloudflare DNS (recommended), add the domain to Cloudflare
   - Or add CNAME records in Namecheap pointing to Cloudflare Pages

---

### Option 4: GitHub Pages (Simple but Limited)

**Pros:**
- Free
- Simple setup
- Integrated with GitHub

**Cons:**
- Requires public repository (or GitHub Pro)
- Less flexible

**Steps:**

1. **Push code to GitHub**

2. **Enable GitHub Pages:**
   - Repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/docs`
   - Save

3. **Configure Custom Domain:**
   - In Pages settings, add `axiotic.ai` under Custom domain
   - Create a `CNAME` file in the `docs/` directory with content: `axiotic.ai`

4. **Configure DNS in Namecheap:**
   ```
   Type: A Record
   Host: @
   Value: 185.199.108.153
   
   Type: A Record
   Host: @
   Value: 185.199.109.153
   
   Type: A Record
   Host: @
   Value: 185.199.110.153
   
   Type: A Record
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME Record
   Host: www
   Value: [your-username].github.io
   ```

---

## DNS Configuration in Namecheap (General Guide)

### For A Records (IP addresses):
1. Log into Namecheap
2. Domain List → Manage `axiotic.ai`
3. Advanced DNS tab
4. Add A Record:
   - **Type:** A Record
   - **Host:** `@` (for root domain) or `www` (for www subdomain)
   - **Value:** [IP address from hosting provider]
   - **TTL:** Automatic (or 3600)

### For CNAME Records:
1. Same steps as above
2. Add CNAME Record:
   - **Type:** CNAME Record
   - **Host:** `www` (or subdomain)
   - **Value:** [hosting provider's domain, e.g., your-site.netlify.app]
   - **TTL:** Automatic

### Important Notes:
- DNS changes can take 5 minutes to 48 hours to propagate (usually < 1 hour)
- Use `@` for root domain (`axiotic.ai`)
- Use `www` for `www.axiotic.ai`
- You can check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)

---

## Recommended: Netlify Setup

For the easiest experience, I recommend **Netlify**. Here's why:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Free tier is generous
- ✅ Easy custom domain setup
- ✅ Can deploy from Git or drag-and-drop

### Quick Netlify Deploy (Drag & Drop Method):

If you want to deploy immediately without Git:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `docs/` folder onto the page
3. Netlify will give you a URL like `random-name-123.netlify.app`
4. Then add custom domain `axiotic.ai` in settings
5. Configure DNS as shown above

---

## Post-Deployment Checklist

- [ ] Site loads at `axiotic.ai`
- [ ] Site loads at `www.axiotic.ai` (redirects to root)
- [ ] HTTPS is enabled (green padlock)
- [ ] All images and assets load correctly
- [ ] Content loads from `content.yaml` correctly
- [ ] Mobile responsive design works
- [ ] Contact forms (if any) work correctly

---

## Troubleshooting

### DNS Not Working:
- Wait longer (up to 48 hours, but usually < 1 hour)
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify DNS records are correct in Namecheap
- Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

### HTTPS Not Working:
- Wait for DNS to fully propagate first
- SSL certificates usually provision automatically within minutes
- Check hosting provider's SSL status in dashboard

### Assets Not Loading:
- Check that paths are relative (not absolute)
- Verify all files are in the `docs/` directory
- Check browser console for 404 errors

---

## Need Help?

If you encounter issues, check:
1. Hosting provider's documentation
2. Namecheap's DNS documentation
3. Browser console for errors
4. Network tab in browser DevTools







