# Web Scraper Pro - Chrome Extension

## 📋 What is Web Scraper Pro?

Web Scraper Pro is a **professional Google Chrome extension** that lets you extract data from websites in just a few clicks.

### ✨ Features

✅ **Custom Scraper** — Define your own CSS selectors  
✅ **Quick Scrape** — Extract links, titles, emails, phones, images, and tables  
✅ **Data Export** — Download as CSV or copy to clipboard  
✅ **History** — Track your scraping sessions  
✅ **Dark Theme** — Night mode available  
✅ **100% Free** — No usage limits

---

## 🚀 Installation

### Method 1: Developer Mode (Recommended for developers)

1. **Clone or download the `chrome_extension_free` folder**
2. Open Chrome and go to: `chrome://extensions/`
3. Enable **Developer mode** (top-right switch)
4. Click **Load unpacked**
5. Select the `chrome_extension_free` folder
6. Done! The extension is installed

### Method 2: Load from ZIP

1. Compress the `chrome_extension_free` folder into a ZIP
2. (Optional) rename it to `web-scraper-pro.crx`
3. Drag the file into `chrome://extensions/`

---

## 📖 Quick Guide

### Tab 1: Selectors (Custom Scraper)

**How to find CSS selectors:**

1. Open the website you want to scrape
2. Right-click an element
3. Select **Inspect**
4. Find the selector in the HTML

**Example:**

```html
<div class="product">
    <h2 class="product-title">Laptop</h2>
    <a href="/product/123">Link</a>
    <span class="price">€999</span>
</div>
```

Configuration:

- **Container Selector**: `.product`
- **Title Selector**: `.product-title`
- **Link Selector**: `a`
- **Price Selector**: `.price`

**Buttons:**

- 👁️ **Preview** — See the first 3 results
- 🚀 **Scrape** — Extract all matching data

---

### Tab 2: Quick Scrape

Quick extraction for common targets:

| Button | Function | Typical Use |
|--------|----------|-------------|
| 🔗 All Links | Extracts all URLs | Crawl link sources |
| 📝 Titles | Extracts h1-h3 | Article and page headings |
| ✉️ Emails | Finds emails in text | Contact collection |
| ☎️ Phones | Extracts phone numbers | Contact pages |
| 🖼️ Images | Extracts image URLs | Media gathering |
| 📊 Tables | Detects HTML tables | Structured table data |

---

### Tab 3: History

View past scraping sessions:

- scraper type/name
- page URL
- extracted item count
- date and time

**Action:** 🗑️ Clear History

---

### Tab 4: Settings

**Options:**

- ☑️ **Include URL in results** — Add source URL where available
- ☑️ **Trim whitespace** — Clean up text output
- ☑️ **Remove duplicates** — Eliminate repeated items
- ☑️ **Dark theme** — Enable night mode

**Result Limit**: Maximum number of extracted items (default: 1000)

---

## 💡 Practical Examples

### Example 1: Scrape articles from a blog

**Page type:** News Blog

```html
<article class="post">
    <h2 class="post-title">Article Title</h2>
    <p class="post-excerpt">Preview...</p>
    <a href="/article" class="read-more">Read more</a>
</article>
```

**Configuration:**

- Container: `.post`
- Title: `.post-title`
- Description: `.post-excerpt`
- Link: `.read-more`

---

### Example 2: Track prices on e-commerce pages

**Page type:** Online Shop

```html
<div class="product-card">
    <h3 class="product-name">Product</h3>
    <span class="product-price">€99.99</span>
    <a href="/product">View</a>
</div>
```

**Configuration:**

- Container: `.product-card`
- Title: `.product-name`
- Price: `.product-price`
- Link: `a`

Export to CSV and track prices over time.

---

### Example 3: Extract contacts from directories

Use **Quick Scrape → Emails** and **Quick Scrape → Phones**.

Useful for:

- public business directories
- contact listing websites
- company profile pages

---

## 📊 Export Results

### CSV format

```csv
title,link,price,description
Laptop,https://example.com/1,€999,Powerful notebook
Monitor,https://example.com/2,€299,4K monitor
```

**How to download:**

1. Run any scrape
2. Click **⬇️ Download CSV**
3. Open in Excel or Google Sheets

### Copy to clipboard

1. Run a scrape
2. Click **📋 Copy Text**
3. Paste anywhere (email, docs, notes)

---

## ⚙️ Advanced Tips

### Complex CSS selectors

**Multiple classes:**

```css
.product.featured.sale
```

**Child selectors:**

```css
.product > .title
```

**Attribute selectors:**

```css
a[href*="amazon"]
a[data-id]
```

**Nth child:**

```css
.product:nth-child(2n)  /* every 2nd element */
```

### Regex for emails and phones

The extension uses automatic regex patterns for:

- **Emails**: `[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- **Phones**: international-like number patterns

---

## ⚠️ Ethics and Legal Use

### ✅ Usually acceptable

- public pages without login
- non-sensitive public information
- small to moderate extraction volume
- sites that allow scraping

### ❌ Avoid

- personal/private data collection
- copyrighted protected content reuse
- massive scraping that overloads servers
- websites that explicitly forbid scraping

Always check `robots.txt`:

```text
https://example.com/robots.txt
```

If it contains restrictive rules for your target paths, do not scrape those paths.

---

## 🐛 Troubleshooting

### Problem: “I can’t find CSS selectors”

**Solution:**

1. Right-click the element
2. Click **Inspect**
3. Locate the element in HTML
4. Copy class or ID selectors

### Problem: “No results”

**Possible causes:**

- wrong selectors
- dynamic page rendering
- elements loaded after initial page load

**Solution:**

- inspect elements again
- start with broader selectors, then refine

### Problem: “Extension does not run”

**Solution:**

1. Reload page (F5)
2. Go back to `chrome://extensions`
3. Disable and re-enable extension
4. Reopen popup

### Problem: “Too much data, browser slows down”

**Solution:**

1. Reduce result limit in settings
2. Scrape smaller page sections
3. Run extraction in smaller batches

---

## 🎯 Ideal Use Cases

| Use Case | How to apply |
|----------|--------------|
| **Lead Generation** | Extract public emails from business directories |
| **Price Monitoring** | Run quick scrape on product pages |
| **News Aggregation** | Use custom selectors on article cards |
| **Market Research** | Collect competitor data points |
| **Real Estate** | Scrape public property listings |
| **Job Hunting** | Extract public job posts |

---

## 🔧 Development / Customization

### File Structure

```text
chrome_extension_free/
├── manifest.json       # Extension config
├── popup.html          # Main UI
├── popup.js            # Popup logic
├── styles.css          # Styles
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Change the design

Edit `styles.css` to update colors, fonts, and layout.

### Add new features

Edit `popup.js` and:

1. add new button listeners
2. add extraction logic
3. render/export new data format if needed

---

## 📞 Support

If something is not working:

1. Check console logs (DevTools → Console)
2. Reload the extension
3. Clear browser cache if needed
4. Reinstall extension

---

## 🚀 Publish to Chrome Web Store

To release publicly:

1. Create a Google Developer account
2. Pay the one-time developer fee ($5)
3. Upload a ZIP package
4. Wait for review (typically 1–3 days)

Official docs: https://developer.chrome.com/docs/webstore/

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL v3)**.
Copyright © Alessandro Orlando.

---

Made with ❤️ for people who practice responsible web scraping.

**v1.0.0** • 2024
