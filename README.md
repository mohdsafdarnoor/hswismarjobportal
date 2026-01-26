AI Career Hub - Hochschule Wismar
A professional university-style website providing AI tools and ready-made AI prompts to help international students at Hochschule Wismar find working student jobs, internships, master thesis opportunities, and full-time positions in Germany.

📋 Project Overview
Institution: Hochschule Wismar - University of Applied Sciences
Faculty: Faculty of Economics
Program: Master's in International Management
Purpose: Academic group project (5 members)

This website serves as a comprehensive career support platform, combining curated AI tools and structured prompts specifically designed for the challenges international students face in the German job market.

🎨 Design & Branding
The website strictly follows Hochschule Wismar's Corporate Design Guidelines:

Colors (Exact CD Manual)
Anthrazit (Primary): #2f3229

Green (Faculty of Economics): #339933

Blue (Faculty of Engineering): #00b1db

Orange (Faculty of Design): #ff5d02

Gray (Secondary): #afafaf

Typography
Primary Font: Meta (with Arial fallback for web)

Font Sizes: Responsive, professional hierarchy

Line Height: 1.6 for optimal readability

Visual Identity
Clean, academic, trustworthy appearance

No unnecessary white spaces

Full, structured pages

Professional university aesthetic

📁 File Structure
text
ai-career-hub/
├── index.html              # Home page
├── ai-tools.html           # AI Tools page with accordion
├── ai-prompts.html         # AI Prompts library
├── contact.html            # Contact form with Web3Forms
├── styles.css              # Complete CSS with Wismar branding
├── script.js               # JavaScript functionality
└── README.md               # This file
🚀 Features
1. Home Page (index.html)
Hero Section with project introduction

Comprehensive Explanation of project purpose and target audience

Important Warning Section about responsible AI usage

Features Overview for all 4 job categories

Call-to-Action buttons

Professional Footer with university contact info

2. AI Tools Page (ai-tools.html)
Accordion Structure organized by career stage:

Working Student / Part-Time Jobs (4 phases)

Internships (4 phases)

Master Thesis Opportunities (3 phases)

Full-Time Positions (4 phases)

Each tool includes:

Name

Description

Hover effects

External link (opens in new tab)

3. AI Prompts Page (ai-prompts.html)
19 Ready-to-Use Prompts organized by category:

Working Student: 3 prompts

Internships: 9 prompts

Master Thesis: 4 prompts

Full-Time: 3 prompts

Each prompt includes:

Background information required

Copy-paste ready template

Specific tasks for AI

Placeholders for customization

4. Contact Page (contact.html)
Web3Forms Integration (free, no backend)

Required fields: Name, Email, Category, Message

Optional: Student ID

Category dropdown with 7 options

Spam protection (honeypot)

Privacy notice

Alternative contact methods (Email, Phone, Address)

Google Maps integration

🔧 Technical Implementation
Responsive Design
Mobile (< 768px): Single column, hamburger menu

Tablet (769-1024px): 2-column grids

Desktop (> 1024px): Full layout, max-width 1200px

JavaScript Features
Mobile hamburger menu with smooth animation

Accordion expand/collapse functionality

Contact form submission handling

Smooth scrolling for anchor links

External links open in new tabs

Form field visual feedback

Keyboard accessibility support

Error handling

Accessibility
Semantic HTML5 structure

ARIA labels and roles

Keyboard navigation support

Focus states for all interactive elements

High contrast ratios

Screen reader compatible

SEO Optimized
Meta descriptions on all pages

Semantic heading hierarchy

Alt text ready for images

Clean URL structure

Fast loading times

📝 Setup Instructions
1. Basic Setup
Download all files to your project folder

Maintain file structure (all files in same directory)

Open index.html in a browser to preview

2. Web3Forms Configuration
Required for Contact Form:

Visit Web3Forms

Sign up for a free account

Create a new form

Copy your Access Key

Open contact.html

Find line 72: <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">

Replace YOUR_WEB3FORMS_ACCESS_KEY_HERE with your actual key

Optional Configuration:

xml
<!-- Redirect URL (line 75) -->
<input type="hidden" name="redirect" value="https://yourdomain.com/thank-you.html">

<!-- Custom subject line (line 78) -->
<input type="hidden" name="subject" value="New Contact Form Submission from AI Career Hub">
3. Deployment Options
Option A: GitHub Pages (Recommended)
bash
# 1. Create a GitHub repository
git init
git add .
git commit -m "Initial commit: AI Career Hub website"
git branch -M main
git remote add origin https://github.com/yourusername/ai-career-hub.git
git push -u origin main

# 2. Enable GitHub Pages
# Go to: Settings > Pages > Source > Select "main" branch > Save
# Your site will be live at: https://yourusername.github.io/ai-career-hub/
Option B: Netlify
Sign up at Netlify

Drag and drop your project folder

Your site is live instantly with SSL

Option C: Vercel
Sign up at Vercel

Import your GitHub repository

Deploy with one click

Option D: Traditional Web Hosting
Upload all files via FTP to your hosting provider

Ensure all files are in the same directory

Access via your domain

⚠️ Important Notes
Ethical AI Usage Warning
The website includes multiple prominent warnings about:

Not copying AI outputs directly

Personalizing all AI-generated content

Using AI as support, not replacement

Maintaining authenticity in applications

Developing critical thinking skills

These warnings are intentionally placed throughout the site to ensure responsible use.

Copyright & Branding
All branding follows official Hochschule Wismar CD guidelines

Logo placeholder included (replace with actual logo if available)

Social media links point to official university accounts

Footer includes proper copyright notice

Privacy & Data Protection
Contact form includes privacy notice

Links to university privacy policy

No cookies or tracking by default (add if needed)

GDPR-compliant data handling via Web3Forms

🛠️ Customization Guide
Update University Logo
xml
<!-- In header section of all HTML files -->
<div class="logo">
    <a href="index.html">
        <!-- Option 1: Text logo (current) -->
        <span class="logo-text">AI Career Hub</span>
        <span class="logo-subtitle">Hochschule Wismar</span>

        <!-- Option 2: Image logo -->
        <!-- <img src="logo.png" alt="AI Career Hub - Hochschule Wismar" height="60"> -->
    </a>
</div>
Add Team Members / Credits
Add a new section to index.html before the footer:

xml
<section class="section section-gray">
    <div class="container">
        <h2>Project Team</h2>
        <p>This project was developed by:</p>
        <ul>
            <li>Student Name 1</li>
            <li>Student Name 2</li>
            <li>Student Name 3</li>
            <li>Student Name 4</li>
            <li>Student Name 5</li>
        </ul>
        <p>Supervised by: [Professor Name]</p>
    </div>
</section>
Add Analytics (Optional)
In script.js, uncomment and add your analytics code:

javascript
// Google Analytics Example
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-GA-ID');
📱 Browser Compatibility
Fully tested and compatible with:

✅ Chrome/Edge (latest)

✅ Firefox (latest)

✅ Safari (latest)

✅ Mobile browsers (iOS Safari, Chrome Android)

Minimum supported versions:

Chrome 90+

Firefox 88+

Safari 14+

Edge 90+

🐛 Troubleshooting
Issue: Accordion not working
Solution: Ensure script.js is loaded correctly

xml
<!-- Check this line is at the bottom of all pages before </body> -->
<script src="script.js"></script>
Issue: Contact form not sending
Solution: Verify Web3Forms API key is correct

xml
<!-- Check line 72 in contact.html -->
<input type="hidden" name="access_key" value="YOUR_ACTUAL_KEY">
Issue: Mobile menu not closing
Solution: Clear browser cache and reload

Issue: Styles not loading
Solution: Ensure styles.css is in the same folder

xml
<!-- Check this line is in <head> of all pages -->
<link rel="stylesheet" href="styles.css">
🔄 Future Enhancements
Potential additions:

 Search functionality for prompts

 Filter tools by category

 Success stories section

 Video tutorials

 Downloadable PDF prompt book

 Multi-language support (German/English toggle)

 Dark mode option

 Progressive Web App (PWA) features

📄 License & Usage
Academic Project - Hochschule Wismar

This project was created for educational purposes as part of the Master's in International Management program.

Usage:

✅ Free to use for Hochschule Wismar students

✅ Can be referenced in academic work

✅ Can be adapted for similar educational projects

⚠️ Must maintain attribution to Hochschule Wismar

⚠️ Cannot be used commercially without permission

📞 Support & Contact
For technical issues or suggestions:

Email: fakultaet-wf@hs-wismar.de

Phone: +49 3841 753-0

Address: Philipp-Müller-Straße 14, 23966 Wismar, Germany

Project Team:
Master's in International Management
Faculty of Economics
Hochschule Wismar, University of Applied Sciences

Built with ❤️ by Master's students at Hochschule Wismar

Last Updated: January 2026
