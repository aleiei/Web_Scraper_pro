# Web Scraper Pro — Chrome Extension (Free)

Web Scraper Pro is a Chrome extension that helps you extract structured data from web pages quickly. It supports both custom CSS selector workflows and one-click quick scraping modes. The extension runs locally in your browser and stores history in Chrome local storage.

---

## Installation (Developer Mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable Developer mode (top-right corner)
3. Click Load unpacked
4. Select this project folder: `Web_Scraper_pro`
5. Pin the extension for quick access from the toolbar

---

## Project Structure

```text
Web_Scraper_pro/
├── manifest.json     # Extension manifest (MV3)
├── popup.html        # Popup UI
├── popup.js          # Main scraping logic
├── styles.css        # Additional styles
├── GUIDE.md          # Detailed user guide (English)
└── icons/            # Extension icons
```

---

## Features

### 1) Custom Scraper (CSS Selectors)

Use your own selectors to extract repeated records from a page. Available fields in the UI are container, title, link, price, and description. Use Preview to validate selectors before running a full extraction. This mode is ideal for product cards, blog article lists, directories, and similar repeated layouts.

### 2) Quick Scrape (One-Click Modes)

Extracts common data types instantly: links, titles, emails, phones, images, and tables. Useful for fast exploration before building custom selectors.

### 3) Results Handling

After each scraping run, results can be exported as CSV or copied to clipboard. CSV generation supports both custom and quick scrape modes.

### 4) History

The extension saves recent scraping sessions in local storage, including scraper type and name, page URL, extracted item count, and timestamp. History can be viewed in detail or cleared entirely.

### 5) Download Settings

Configurable options include target folder, auto-download behavior, whitespace trimming, duplicate removal, and URL inclusion. These settings are persisted in `chrome.storage.local`.

---

## How to Use

### Quick Start (2 minutes)

1. Open the target webpage
2. Click the extension icon
3. Go to Quick Scrape
4. Choose a mode (for example: Titles)
5. Wait for extraction
6. Click Copy or Download CSV

### Custom Extraction Workflow

1. Open the page you want to scrape
2. Inspect an element (right-click → Inspect)
3. Identify a repeated container (example: `.product-card`)
4. Add inner selectors (title, link, price, description)
5. Click **Preview** to validate selectors
6. Click **Scrape** to extract all matching records
7. Export to CSV or copy results

Example HTML:

```html
<div class="product-card">
  <h3 class="product-name">Laptop Pro</h3>
  <span class="product-price">€999</span>
  <a href="/products/laptop-pro">View product</a>
</div>
```

Example selectors: container `.product-card`, title `.product-name`, price `.product-price`, link `a`.

---

## Troubleshooting

If the extension popup does not work, reload the page and reopen the popup, or disable and re-enable the extension from `chrome://extensions/`.

If no data is extracted, check that the selectors are correct and that the page is not dynamically rendered. Try broader selectors first, then refine.

If the CSV is empty or incomplete, verify that the scrape returned results before exporting, and check the download settings.

---

## Permissions Summary

From `manifest.json`: `activeTab`, `scripting`, `storage`, `downloads`.

---

## Best Practices

Target only public pages without login requirements. Keep extraction volumes moderate and respect `robots.txt` rules. Avoid collecting personal or private data, and do not reuse copyright-protected content.

### OSINT Usage

With proper care and legal/ethical attention, this extension can also support OSINT (Open Source Intelligence) workflows on publicly available sources. Target only public information, avoid privacy violations and unlawful profiling, comply with local laws and platform rules, and maintain clear audit trails with source references.

---

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
Copyright © Alessandro Orlando.
