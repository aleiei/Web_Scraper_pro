# Web Scraper Pro - Chrome Extension

## What is Web Scraper Pro?

Web Scraper Pro is a professional Google Chrome extension that lets you extract data from websites in just a few clicks.

### Features

- Custom Scraper — Define your own CSS selectors
- Quick Scrape — Extract links, titles, emails, phones, images, and tables
- Data Export — Download as CSV or copy to clipboard
- History — Track your scraping sessions
- Dark Theme — Night mode available
- 100% Free — No usage limits

---

## Installation

### Method 1: Developer Mode (Recommended for developers)

1. Clone or download the `Web_Scraper_pro` folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode (top-right switch)
4. Click Load unpacked
5. Select the `Web_Scraper_pro` folder
6. Done — the extension is installed

### Method 2: Load from ZIP

1. Compress the `Web_Scraper_pro` folder into a ZIP
2. Optionally rename it to `web-scraper-pro.crx`
3. Drag the file into `chrome://extensions/`

---

## Quick Guide

### Tab 1: Selectors (Custom Scraper)

To find CSS selectors, open the website you want to scrape, right-click an element, select Inspect, and locate the selector in the HTML.

Example:

```html
<div class="product">
    <h2 class="product-title">Laptop</h2>
    <a href="/product/123">Link</a>
    <span class="price">€999</span>
</div>
```

Configuration:

- Container Selector: `.product`
- Title Selector: `.product-title`
- Link Selector: `a`
- Price Selector: `.price`

Buttons:

- **Preview** — See the first 3 results
- **Scrape** — Extract all matching data

---

### Tab 2: Quick Scrape

Quick extraction for common targets:

| Button | Function | Typical Use |
|--------|----------|-------------|
| All Links | Extracts all URLs | Crawl link sources |
| Titles | Extracts h1-h3 | Article and page headings |
| Emails | Finds emails in text | Contact collection |
| Phones | Extracts phone numbers | Contact pages |
| Images | Extracts image URLs | Media gathering |
| Tables | Detects HTML tables | Structured table data |

---

### Tab 3: History

View past scraping sessions, including scraper type and name, page URL, extracted item count, and date and time.

Action: Clear History

---

### Tab 4: Settings

Options:

- Include URL in results — Add source URL where available
- Trim whitespace — Clean up text output
- Remove duplicates — Eliminate repeated items
- Dark theme — Enable night mode

Result Limit: maximum number of extracted items (default: 1000)

---

## Practical Examples

### Example 1: Scrape articles from a blog

```html
<article class="post">
    <h2 class="post-title">Article Title</h2>
    <p class="post-excerpt">Preview...</p>
    <a href="/article" class="read-more">Read more</a>
</article>
```

Configuration:

- Container: `.post`
- Title: `.post-title`
- Description: `.post-excerpt`
- Link: `.read-more`

---

### Example 2: Track prices on e-commerce pages

```html
<div class="product-card">
    <h3 class="product-name">Product</h3>
    <span class="product-price">€99.99</span>
    <a href="/product">View</a>
</div>
```

Configuration:

- Container: `.product-card`
- Title: `.product-name`
- Price: `.product-price`
- Link: `a`

Export to CSV and track prices over time.

---

### Example 3: Extract contacts from directories

Use Quick Scrape → Emails and Quick Scrape → Phones. Useful for public business directories, contact listing websites, and company profile pages.

---

## Export Results

### CSV format

```csv
title,link,price,description
Laptop,https://example.com/1,€999,Powerful notebook
Monitor,https://example.com/2,€299,4K monitor
```

To download: run any scrape, click Download CSV, then open in Excel or Google Sheets.

### Copy to clipboard

Run a scrape, click Copy Text, then paste anywhere (email, docs, notes).

---

## Advanced Tips

### Complex CSS selectors

Multiple classes:

```css
.product.featured.sale
```

Child selectors:

```css
.product > .title
```

Attribute selectors:

```css
a[href*="amazon"]
a[data-id]
```

Nth child:

```css
.product:nth-child(2n)  /* every 2nd element */
```

### Regex for emails and phones

The extension uses automatic regex patterns for emails (`[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`) and international-like phone number patterns.

---

## Ethics and Legal Use

Generally acceptable: public pages without login, non-sensitive public information, small to moderate extraction volume, sites that allow scraping.

Avoid: personal or private data collection, reuse of copyright-protected content, massive scraping that overloads servers, websites that explicitly forbid scraping.

Always check `robots.txt` at `https://example.com/robots.txt`. If it contains restrictive rules for your target paths, do not scrape those paths.

### OSINT Usage

With proper care and legal/ethical attention, Web Scraper Pro can also be used for OSINT (Open Source Intelligence) on publicly available sources. Target only public information, avoid privacy violations and unlawful profiling, comply with local laws, platform rules, and internal procedures, and preserve source references with clear audit trails.

---

## Troubleshooting

If you cannot find CSS selectors, right-click the element, click Inspect, locate the element in the HTML, and copy the class or ID selectors.

If you get no results, the likely causes are wrong selectors, dynamic page rendering, or elements loaded after the initial page load. Inspect the elements again and start with broader selectors before refining.

If the extension does not run, reload the page (F5), go back to `chrome://extensions`, disable and re-enable the extension, then reopen the popup.

If too much data slows the browser, reduce the result limit in settings, scrape smaller page sections, or run extraction in smaller batches.

---

## Ideal Use Cases

| Use Case | How to apply |
|----------|--------------|
| Lead Generation | Extract public emails from business directories |
| Price Monitoring | Run quick scrape on product pages |
| News Aggregation | Use custom selectors on article cards |
| Market Research | Collect competitor data points |
| Real Estate | Scrape public property listings |
| Job Hunting | Extract public job posts |

---

## Development / Customization

### File Structure

```text
Web_Scraper_pro/
├── manifest.json       # Extension config
├── popup.html          # Main UI
├── popup.js            # Popup logic
├── styles.css          # Styles
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

Edit `styles.css` to update colors, fonts, and layout. To add new features, edit `popup.js` by adding new button listeners, extraction logic, and any new render or export format as needed.

---

## Support

If something is not working, check console logs (DevTools → Console), reload the extension, clear browser cache if needed, then reinstall the extension.

---

## Publish to Chrome Web Store

To release publicly, create a Google Developer account, pay the one-time developer fee ($5), upload a ZIP package, and wait for review (typically 1–3 days).

Official docs: https://developer.chrome.com/docs/webstore/

---

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
Copyright © Alessandro Orlando.

---

Made for people who practice responsible web scraping.

v1.0.0 • 2024
