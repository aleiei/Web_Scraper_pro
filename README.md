# 🕷️ Web Scraper Pro — Chrome Extension (Free)

Web Scraper Pro is a Chrome extension that helps you extract structured data from web pages quickly.
It supports both:


The extension runs locally in your browser and stores history in Chrome local storage.


## 🚀 Installation (Developer Mode)

1. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked**.
4. Select this project folder: `Web_Scraper_pro`.
5. Pin the extension if you want quick access from the toolbar.


## 📁 Project Structure

```text
Web_Scraper_pro/
├── manifest.json     # Extension manifest (MV3)
├── popup.html        # Popup UI
├── popup.js          # Main scraping logic
├── styles.css        # Additional styles
├── GUIDE.md          # Detailed user guide (English)
└── icons/            # Extension icons
```


## ✨ Detailed Features

### 1) Custom Scraper (CSS Selectors)

Use your own selectors to extract repeated records from a page.

**Fields available in the UI:**


**Useful actions:**


This mode is ideal for product cards, blog article lists, directories, and similar repeated layouts.


### 2) Quick Scrape (One-Click Modes)

You can extract common data types instantly:


This is useful when you need fast exploration before building custom selectors.


### 3) Results Handling

After each scraping run, results can be:


CSV generation supports both:



### 4) History

The extension saves recent scraping sessions in local storage, including:


You can:



### 5) Download Settings

Configurable options include:


These settings are persisted in `chrome.storage.local`.


## 🧭 How to Use (Step-by-Step)

## Quick Start (2 minutes)

1. Open the target webpage.
2. Click the extension icon.
3. Go to **Quick Scrape**.
4. Choose a mode (for example: **Titles**).
5. Wait for extraction.
6. Click **Copy** or **Download CSV**.


## Custom Extraction Workflow

1. Open the page you want to scrape.
2. Inspect an element (`Right click` → `Inspect`).
3. Identify a repeated container (example: `.product-card`).
4. Add inner selectors (title/link/price/description).
5. Click **Preview** to validate selectors.
6. Click **Scrape** to extract all matching records.
7. Export to CSV or copy results.

### Example HTML

```html
<div class="product-card">
  <h3 class="product-name">Laptop Pro</h3>
  <span class="product-price">€999</span>
  <a href="/products/laptop-pro">View product</a>
</div>
```

Example selectors:



## ⚠️ Troubleshooting

### Extension popup does not work


### No data extracted


### CSV is empty or incomplete



## 🔐 Permissions Summary

From `manifest.json`:



## ✅ Best Practices


### OSINT Usage (Responsible Use)

With proper care and legal/ethical attention, this web scraper can also support
OSINT (Open Source Intelligence) workflows on publicly available sources.

When using it for OSINT:



## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.
Copyright © Alessandro Orlando.
