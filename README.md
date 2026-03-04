# 🕷️ Web Scraper Pro — Chrome Extension (Free)

Web Scraper Pro is a Chrome extension that helps you extract structured data from web pages quickly.
It supports both:

- **Custom CSS selector scraping** for precise extraction
- **One-click Quick Scrape modes** for common data types

The extension runs locally in your browser and stores history in Chrome local storage.

---

## 🚀 Installation (Developer Mode)

1. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked**.
4. Select this project folder: `chrome_extension_free`.
5. Pin the extension if you want quick access from the toolbar.

---

## 📁 Project Structure

```text
chrome_extension_free/
├── manifest.json     # Extension manifest (MV3)
├── popup.html        # Popup UI
├── popup.js          # Main scraping logic
├── styles.css        # Additional styles
├── GUIDE.md          # Detailed user guide (English)
└── icons/            # Extension icons
```

---

## ✨ Detailed Features

### 1) Custom Scraper (CSS Selectors)

Use your own selectors to extract repeated records from a page.

**Fields available in the UI:**

- Scraper name
- Container selector (required)
- Title selector
- Link selector
- Price selector (optional)
- Description selector (optional)

**Useful actions:**

- **Auto-Detect**: tries to suggest selectors from the current page
- **Preview**: runs a small extraction preview
- **Scrape**: executes full extraction

This mode is ideal for product cards, blog article lists, directories, and similar repeated layouts.

---

### 2) Quick Scrape (One-Click Modes)

You can extract common data types instantly:

- **Links** (`a[href]`) with text + URL
- **Titles** (`h1`, `h2`, `h3`)
- **Emails** (regex-based scan on page text)
- **Phone numbers** (regex-based scan)
- **Images** (`img` source URLs)
- **Tables** (HTML table rows overview)

This is useful when you need fast exploration before building custom selectors.

---

### 3) Results Handling

After each scraping run, results can be:

- **Copied to clipboard** as plain text
- **Downloaded as CSV**

CSV generation supports both:

- simple lists (single-column output)
- object-based records (auto header from keys)

---

### 4) History

The extension saves recent scraping sessions in local storage, including:

- scraping type
- page URL (trimmed)
- extracted item count
- localized date/time
- extracted data snapshot

You can:

- view individual history items
- clear history
- export history (if enabled in your version UI/actions)

---

### 5) Download Settings

Configurable options include:

- target folder under Chrome downloads
- automatic download behavior (with or without Save As dialog)

These settings are persisted in `chrome.storage.local`.

---

## 🧭 How to Use (Step-by-Step)

## Quick Start (2 minutes)

1. Open the target webpage.
2. Click the extension icon.
3. Go to **Quick Scrape**.
4. Choose a mode (for example: **Titles**).
5. Wait for extraction.
6. Click **Copy** or **Download CSV**.

---

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

- Container: `.product-card`
- Title: `.product-name`
- Price: `.product-price`
- Link: `a`

---

## ⚠️ Troubleshooting

### Extension popup does not work

- Reload the current tab
- Reload the extension from `chrome://extensions`
- Check permission warnings in extension details
- Open DevTools Console in the popup for runtime errors

### No data extracted

- Verify selectors against the live DOM
- Ensure elements are present (some pages lazy-load content)
- Try broader selectors first, then narrow them
- Use Quick Scrape to confirm the page is accessible for extraction

### CSV is empty or incomplete

- Confirm results are visible before exporting
- Check if the website changes content after interaction (scroll/click)
- Retry after the page fully loads

---

## 🔐 Permissions Summary

From `manifest.json`:

- `activeTab`: run scripts on the active tab
- `scripting`: inject scraping code
- `storage`: persist settings/history
- `downloads`: save CSV files
- `host_permissions: <all_urls>`: allow scraping on visited websites

---

## ✅ Best Practices

- Respect website Terms of Service and robots policies
- Avoid collecting personal/sensitive data
- Scrape responsibly (reasonable volume/frequency)
- Validate extracted data before downstream usage

### OSINT Usage (Responsible Use)

With proper care and legal/ethical attention, this web scraper can also support
OSINT (Open Source Intelligence) workflows on publicly available sources.

When using it for OSINT:

- collect only publicly accessible information
- avoid personal data misuse and privacy violations
- follow local laws, platform terms, and investigation policies
- document sources and keep evidence handling transparent

---

## 📦 Compatibility

- Google Chrome (Manifest V3 compatible versions)
- Chromium-based browsers with extension support (Edge, Brave, Opera)

---

## 🛠️ Development Notes

- Main runtime logic is in `popup.js`.
- UI is defined in `popup.html` (English labels).
- This `README` is in English for documentation and onboarding.

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.
Copyright © Alessandro Orlando.
