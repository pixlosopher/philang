# PhiLang Deployment Guide

This guide covers deploying PhiLang to various hosting platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Pages (Recommended)](#github-pages-recommended)
3. [Netlify](#netlify)
4. [Vercel](#vercel)
5. [Local Development](#local-development)
6. [Security Considerations](#security-considerations)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] All files in the repository
- [ ] API key handling documented for users
- [ ] Tested all features locally
- [ ] Run the test suite (`tests/test_runner.html`)

### Required Files

```
philangv1/
├── index.html                      # Landing page
├── socratic_counsel.html           # Philosophical therapy
├── dialectical_dialogue.html       # Multi-tradition debates
├── derivation_graph.html           # Concept visualization
├── philang_embeddings.html         # Embeddings explorer
├── philang_embeddings_advanced.html # Advanced embeddings
├── philang-theme.css               # Main stylesheet
├── philang_*.js                    # Core modules (10 files)
├── sw.js                           # Service Worker
└── tests/                          # Test suite
```

---

## GitHub Pages (Recommended)

GitHub Pages is the recommended free hosting option for PhiLang.

### Step 1: Create Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial PhiLang commit"
```

### Step 2: Push to GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/philang.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/philang/`

### Step 4: Custom Domain (Optional)

1. In Settings > Pages, enter your custom domain
2. Add a `CNAME` file to your repository with your domain
3. Configure DNS with your domain provider:
   - A record pointing to `185.199.108.153`
   - CNAME record pointing to `YOUR_USERNAME.github.io`

---

## Netlify

### Drag and Drop

1. Go to [netlify.com](https://netlify.com)
2. Drag your `philangv1` folder to the deploy zone
3. Done! Get your `.netlify.app` URL

### Git Integration

1. Connect your GitHub repository
2. Set build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `/`
3. Deploy

### Netlify Configuration

Create `netlify.toml` for custom headers:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Vercel

### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### Git Integration

1. Import your GitHub repository at [vercel.com](https://vercel.com)
2. No build configuration needed (static site)
3. Deploy

---

## Local Development

### Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server installed)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

### Live Reload (Optional)

```bash
# Install live-server globally
npm install -g live-server

# Run with live reload
live-server --port=8000
```

---

## Security Considerations

### API Key Handling

PhiLang stores the Anthropic API key in `localStorage`. This is acceptable for a client-side application where:

- Users provide their own API key
- The key never leaves the browser
- The key is not committed to version control

**Inform users:**
- They need their own Anthropic API key
- The key is stored locally in their browser
- They should not share their browser profile

### Content Security Policy

All HTML files include CSP headers:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com ...;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    connect-src 'self' https://api.anthropic.com;
    frame-ancestors 'none';
">
```

### HTTPS

Always use HTTPS in production:
- GitHub Pages: Automatic HTTPS
- Netlify: Automatic HTTPS
- Vercel: Automatic HTTPS
- Custom servers: Use Let's Encrypt

---

## Post-Deployment Checklist

After deploying, verify:

### Functionality
- [ ] Landing page loads correctly
- [ ] All navigation links work
- [ ] Mobile menu functions properly
- [ ] API configuration modal opens
- [ ] API key can be saved and tested
- [ ] Socratic Counsel starts conversations
- [ ] Dialectical Dialogue initiates debates
- [ ] Derivation Graph visualizes concepts
- [ ] Embeddings pages render correctly

### Performance
- [ ] Service Worker registers
- [ ] Offline indicator appears when offline
- [ ] Assets are cached properly
- [ ] No console errors

### Security
- [ ] HTTPS is enforced
- [ ] CSP headers are active
- [ ] No API keys in source code
- [ ] No sensitive data in URLs

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus states visible

---

## Troubleshooting

### Service Worker Not Registering

Check browser console for errors. Common issues:
- Not served over HTTPS (except localhost)
- Wrong path to `sw.js`
- Syntax error in service worker

### API Calls Failing

1. Check API key is configured correctly
2. Verify CORS headers (Anthropic API requires `anthropic-dangerous-direct-browser-access`)
3. Check rate limiting status

### Offline Mode Not Working

1. Clear site data and reload
2. Check Service Worker in DevTools > Application
3. Verify `sw.js` is in the root directory

### Styles Not Loading

1. Check `philang-theme.css` is accessible
2. Verify Tailwind CDN is loading
3. Check CSP isn't blocking styles

---

## Support

For issues:
1. Check browser console for errors
2. Run the test suite (`tests/test_runner.html`)
3. Clear cache and try again
4. Open an issue on GitHub

---

*PhiLang - Philosophical Programming Language*
