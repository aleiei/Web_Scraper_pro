// Web Scraper Pro - GPL v3

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Web Scraper Pro - GPL v3 - Loaded');
    
    // TAB NAVIGATION
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });

    // QUICK SCRAPE BUTTONS
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type;
            console.log('Clicked:', type);
            quickScrape(type);
        });
    });

    // COPY
    const copyBtn = document.getElementById('copyResultsBtn');
    if (copyBtn) copyBtn.addEventListener('click', copyResults);

    // DOWNLOAD
    const downloadBtn = document.getElementById('downloadResultsBtn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCSV);

    // CUSTOM SELECTORS - SCRAPE
    const scrapeBtn = document.getElementById('scrapeBtn');
    if (scrapeBtn) {
        scrapeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrapeWithSelectors();
        });
    }

    // PREVIEW BUTTON
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            previewWithSelectors();
        });
    }

    // AUTO DETECT SELECTORS
    const autoDetectBtn = document.getElementById('autoDetectBtn');
    if (autoDetectBtn) {
        autoDetectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            autoDetectSelectors();
        });
    }

    // USE AUTO DETECTED SELECTORS
    const useAutoDetectBtn = document.getElementById('useAutoDetectBtn');
    if (useAutoDetectBtn) {
        useAutoDetectBtn.addEventListener('click', useDetectedSelectors);
    }

    // CANCEL AUTO DETECT
    const cancelAutoDetectBtn = document.getElementById('cancelAutoDetectBtn');
    if (cancelAutoDetectBtn) {
        cancelAutoDetectBtn.addEventListener('click', () => {
            document.getElementById('autoDetectResults').classList.add('hidden');
            document.getElementById('autoDetectResults').style.display = 'none';
        });
    }

    // CLEAR HISTORY
    const clearBtn = document.getElementById('clearHistoryBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearHistory);

    // EXPORT HISTORY
    const exportBtn = document.getElementById('exportHistoryBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportHistory);

    loadHistory();
});

// ====== DOWNLOAD SETTINGS ======
let downloadSettings = {
    folder: 'Downloads',
    autoDownload: false
};

chrome.storage.local.get(['downloadSettings'], (result) => {
    if (result.downloadSettings) {
        downloadSettings = result.downloadSettings;
        const folderSelect = document.getElementById('downloadFolder');
        const autoCheckbox = document.getElementById('autoDownload');
        if (folderSelect) folderSelect.value = downloadSettings.folder;
        if (autoCheckbox) autoCheckbox.checked = downloadSettings.autoDownload;
    }
});

document.addEventListener('change', (e) => {
    if (e.target.id === 'downloadFolder') {
        downloadSettings.folder = e.target.value;
        chrome.storage.local.set({ downloadSettings });
        showToast(`Folder: ${e.target.value}`, 'success');
    }
    if (e.target.id === 'autoDownload') {
        downloadSettings.autoDownload = e.target.checked;
        chrome.storage.local.set({ downloadSettings });
        showToast(e.target.checked ? '✅ Automatic download' : '❌ Download with dialog', 'info');
    }
});

let currentResults = [];

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const tab = document.getElementById(tabName);
    const btn = document.querySelector(`[data-tab="${tabName}"]`);
    
    if (tab) tab.classList.add('active');
    if (btn) btn.classList.add('active');
}

function quickScrape(type) {
    showToast('⏳ Scraping...', 'info');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) {
            showToast('No active tab', 'error');
            return;
        }
        
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: scrapeFunction,
            args: [type]
        }, (results) => {
            if (chrome.runtime.lastError) {
                showToast('Error: ' + chrome.runtime.lastError.message, 'error');
                return;
            }
            
            if (results && results[0] && results[0].result) {
                const data = results[0].result;
                currentResults = data;
                displayResults(data, type);
                addToHistory(type, tabs[0].url, data.length);
                showToast(`✅ ${data.length} items!`, 'success');
            }
        });
    });
}

function scrapeFunction(type) {
    let data = [];
    
    try {
        if (type === 'links') {
            document.querySelectorAll('a[href]').forEach(a => {
                const href = a.href;
                const text = a.textContent.trim().substring(0, 100) || 'Link';
                if (href && !data.some(d => d.url === href)) {
                    data.push({ text: text, url: href });
                }
            });
        } else if (type === 'titles') {
            document.querySelectorAll('h1, h2, h3').forEach(h => {
                const text = h.textContent.trim();
                if (text && !data.includes(text)) {
                    data.push(text);
                }
            });
        } else if (type === 'emails') {
            const emails = document.body.innerText.match(/[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
            data = [...new Set(emails)].map(e => ({ email: e }));
        } else if (type === 'phones') {
            const phones = document.body.innerText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{4,5}/g) || [];
            data = [...new Set(phones)].map(p => ({ phone: p.trim() }));
        } else if (type === 'images') {
            document.querySelectorAll('img').forEach(img => {
                if (img.src && !data.some(d => d.src === img.src)) {
                    data.push({ src: img.src, alt: img.alt || 'No alt' });
                }
            });
        } else if (type === 'table') {
            document.querySelectorAll('table').forEach((table, idx) => {
                const rows = [];
                table.querySelectorAll('tr').forEach(tr => {
                    const cols = [];
                    tr.querySelectorAll('td, th').forEach(cell => {
                        cols.push(cell.textContent.trim());
                    });
                    if (cols.length > 0) rows.push(cols);
                });
                if (rows.length > 0) {
                    data.push({ table: 'Table ' + (idx + 1), rowCount: rows.length });
                }
            });
        }
    } catch (e) {
        console.error('Error:', e);
    }
    
    return data;
}

function displayResults(data, type) {
    const resultsBox = document.getElementById('quickResults');
    const resultsContent = document.getElementById('resultsContent');
    const resultsTitle = document.getElementById('resultsTitle');

    if (!resultsBox || !resultsContent) return;

    resultsTitle.textContent = `Results ${type} (${data.length})`;
    resultsContent.innerHTML = '';

    if (data.length === 0) {
        resultsContent.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No results</p>';
    } else {
        data.slice(0, 100).forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            
            let text = '';
            if (typeof item === 'string') {
                text = item;
            } else if (item.url) {
                text = item.text + ' → ' + item.url;
            } else if (item.email) {
                text = item.email;
            } else if (item.phone) {
                text = item.phone;
            } else if (item.src) {
                text = item.src;
            } else {
                text = JSON.stringify(item);
            }
            
            div.textContent = text.substring(0, 500);
            resultsContent.appendChild(div);
        });
    }

    resultsBox.classList.remove('hidden');
    switchTab('quick');
}

function copyResults() {
    if (currentResults.length === 0) {
        showToast('No results', 'error');
        return;
    }

    const text = currentResults.map(item => {
        if (typeof item === 'string') return item;
        return JSON.stringify(item);
    }).join('\n');

    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied!', 'success');
    }).catch(() => {
        showToast('❌ Error', 'error');
    });
}

function downloadCSV() {
    if (currentResults.length === 0) {
        showToast('No results', 'error');
        return;
    }

    let csv = '';
    const isObj = typeof currentResults[0] === 'object' && !Array.isArray(currentResults[0]);

    if (isObj) {
        const keys = Object.keys(currentResults[0]);
        csv = keys.join(',') + '\n';
        csv += currentResults.map(obj => 
            keys.map(k => `"${(obj[k] || '').toString().replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    } else {
        csv = 'data\n' + currentResults.map(item => `"${item.toString().replace(/"/g, '""')}"`).join('\n');
    }

    const filename = `scraper_${new Date().toISOString().slice(0, 10)}.csv`;
    const filepath = `${downloadSettings.folder}/${filename}`;

    chrome.downloads.download({
        url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv),
        filename: filepath,
        saveAs: !downloadSettings.autoDownload
    });
    
    showToast(`✅ Saved in ${downloadSettings.folder}!`, 'success');
}

// HISTORY
let history = [];

function loadHistory() {
    chrome.storage.local.get(['scraperHistory'], (result) => {
        history = result.scraperHistory || [];
        renderHistory();
    });
}

function addToHistory(type, url, count) {
    const item = {
        type: type,
        url: url.substring(0, 100),
        count: count,
        date: new Date().toLocaleString('en-US'),
        data: currentResults
    };
    
    history.unshift(item);
    history = history.slice(0, 50);
    
    chrome.storage.local.set({ scraperHistory: history }, () => {
        renderHistory();
    });
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    if (history.length === 0) {
        historyList.innerHTML = '<p style="color: #999; text-align: center; padding: 30px;">📋 No scraping yet</p>';
        return;
    }

    historyList.innerHTML = history.map((item, i) => `
        <div style="background: #f0f0f0; padding: 12px; margin: 8px 0; border-radius: 5px; border-left: 3px solid #6366f1;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <strong style="font-size: 14px;">${i + 1}. ${item.type}</strong><br>
                    <small>📊 ${item.count} items • ${item.date}</small>
                </div>
                <button class="btn btn-secondary" data-index="${i}" style="padding: 6px 12px; font-size: 12px; white-space: nowrap;">👁️ View</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('[data-index]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showJsonViewer(history[index]);
        });
    });
}

function showJsonViewer(item) {
    const viewer = document.getElementById('jsonViewer');
    const content = document.getElementById('jsonViewerContent');
    const closeBtn = document.getElementById('closeJsonViewerBtn');
    
    let formatted = `📌 TYPE: ${item.type}\n`;
    formatted += `📅 DATE: ${item.date}\n`;
    formatted += `📊 ITEMS: ${item.count}\n`;
    formatted += `🔗 URL: ${item.url}\n\n`;
    formatted += `📄 EXTRACTED DATA:\n`;
    formatted += `─────────────────────────────\n\n`;
    
    if (item.data && item.data.length > 0) {
        item.data.forEach((record, idx) => {
            formatted += `${idx + 1}. `;
            if (record.title) formatted += `TITLE: "${record.title}"\n   `;
            if (record.link) formatted += `LINK: ${record.link}\n   `;
            if (record.price) formatted += `PRICE: ${record.price}\n   `;
            if (record.description) formatted += `DESC: ${record.description}\n   `;
            formatted += '\n';
        });
    } else {
        formatted += 'No data available\n';
    }
    
    content.textContent = formatted;
    viewer.classList.remove('hidden');
    viewer.style.display = 'block';
    
    closeBtn.onclick = () => {
        viewer.classList.add('hidden');
        viewer.style.display = 'none';
    };
}

function clearHistory() {
    if (confirm('Clear history?')) {
        history = [];
        chrome.storage.local.set({ scraperHistory: [] }, () => {
            renderHistory();
            showToast('✅ Cleared', 'success');
        });
    }
}

function exportHistory() {
    if (history.length === 0) {
        showToast('No history', 'warning');
        return;
    }

    const json = JSON.stringify(history, null, 2);
    const filename = `history_${new Date().toISOString().slice(0, 10)}.json`;
    const filepath = `${downloadSettings.folder}/${filename}`;

    chrome.downloads.download({
        url: 'data:application/json;charset=utf-8,' + encodeURIComponent(json),
        filename: filepath,
        saveAs: !downloadSettings.autoDownload
    });
    
    showToast(`✅ Saved in ${downloadSettings.folder}!`, 'success');
}

// ====== CUSTOM SELECTORS SCRAPING ======

function scrapeWithSelectors() {
    const scraperName = document.getElementById('scraperName')?.value || 'Custom Scraper';
    const selectors = getCustomSelectors();
    
    if (!selectors.container) {
        showToast('❌ Enter a Container Selector!', 'error');
        return;
    }

    showToast('⏳ Scraping...', 'info');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
            showToast('❌ No active tab', 'error');
            return;
        }
        
        const tabId = tabs[0].id;
        const url = tabs[0].url;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: scrapeWithSelectorsFunction,
            args: [selectors, 10000]
        }, (results) => {
            if (chrome.runtime.lastError) {
                showToast('❌ Error: ' + chrome.runtime.lastError.message, 'error');
                return;
            }
            
            if (results && results[0] && results[0].result) {
                const data = results[0].result;
                currentResults = data;
                displayResults(data, scraperName);
                addToHistory(scraperName, url, data.length);
                switchTab('quick');
                showToast(`✅ ${data.length} items!`, 'success');
            } else {
                showToast('❌ No items found', 'warning');
            }
        });
    });
}

function getCustomSelectors() {
    return {
        container: document.getElementById('containerSelector')?.value || '',
        title: document.getElementById('titleSelector')?.value || '',
        link: document.getElementById('linkSelector')?.value || '',
        price: document.getElementById('priceSelector')?.value || '',
        description: document.getElementById('descSelector')?.value || ''
    };
}

function scrapeWithSelectorsFunction(selectors, limit) {
    let data = [];
    
    try {
        const containers = document.querySelectorAll(selectors.container);
        
        containers.forEach((container) => {
            if (data.length >= limit) return;
            
            const item = {};
            
            if (selectors.title) {
                const el = container.querySelector(selectors.title);
                item.title = el ? el.textContent.trim() : null;
            }
            
            if (selectors.link) {
                const el = container.querySelector(selectors.link);
                item.link = el ? (el.href || el.textContent.trim()) : null;
            }
            
            if (selectors.price) {
                const el = container.querySelector(selectors.price);
                item.price = el ? el.textContent.trim() : null;
            }
            
            if (selectors.description) {
                const el = container.querySelector(selectors.description);
                item.description = el ? el.textContent.trim().substring(0, 100) : null;
            }
            
            if (item.title || item.link) {
                data.push(item);
            }
        });
    } catch (e) {
        console.error('Error:', e);
    }
    
    return data;
}

function previewWithSelectors() {
    const selectors = getCustomSelectors();
    
    if (!selectors.container) {
        showToast('❌ Enter a Container Selector!', 'error');
        return;
    }

    showToast('👁️ Preview (max 3 items)...', 'info');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
            showToast('❌ No active tab', 'error');
            return;
        }
        
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: scrapeWithSelectorsFunction,
            args: [selectors, 3]
        }, (results) => {
            if (chrome.runtime.lastError) {
                showToast('❌ Error: ' + chrome.runtime.lastError.message, 'error');
                return;
            }
            
            if (results && results[0] && results[0].result) {
                const data = results[0].result;
                
                if (data.length === 0) {
                    showToast('❌ No data found! Selectors may be incorrect.', 'error');
                    return;
                }
                
                let preview = '📊 PREVIEW (first 3 items):\n\n';
                data.forEach((item, i) => {
                    preview += `${i+1}. `;
                    if (item.title) preview += `Title: "${item.title}"\n   `;
                    if (item.link) preview += `Link: ${item.link}\n   `;
                    if (item.price) preview += `Price: ${item.price}\n`;
                    preview += '\n';
                });
                
                alert(preview);
                showToast(`✅ ${data.length} items! Selectors OK ✓`, 'success');
            }
        });
    });
}

// ====== AUTO-DETECT SELECTORS ======
let detectedSelectors = null;

function autoDetectSelectors() {
    showToast('🤖 Smart detection...', 'info');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
            showToast('❌ No active tab', 'error');
            return;
        }
        
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: intelligentAutoDetect
        }, (results) => {
            if (chrome.runtime.lastError) {
                showToast('❌ Error: ' + chrome.runtime.lastError.message, 'error');
                return;
            }
            
            if (results && results[0] && results[0].result) {
                detectedSelectors = results[0].result;
                console.log('Detected:', detectedSelectors);
                displayDetectedSelectors(detectedSelectors);
            } else {
                showToast('❌ Detection failed', 'warning');
            }
        });
    });
}

function displayDetectedSelectors(selectors) {
    const resultsDiv = document.getElementById('autoDetectResults');
    const contentDiv = document.getElementById('autoDetectContent');
    
    if (!selectors || !selectors.container) {
        showToast('❌ No repeated elements found', 'warning');
        return;
    }
    
    let html = `
        <strong>🔹 Container:</strong> <code style="background: #f5f5f5; padding: 3px 6px; border-radius: 3px; font-family: monospace;">${selectors.container}</code><br><br>
        <strong>🔹 Title:</strong> <code style="background: #f5f5f5; padding: 3px 6px; border-radius: 3px; font-family: monospace;">${selectors.title || 'None'}</code><br><br>
        <strong>🔹 Link:</strong> <code style="background: #f5f5f5; padding: 3px 6px; border-radius: 3px; font-family: monospace;">${selectors.link || 'None'}</code><br><br>
        <strong>🔹 Price:</strong> <code style="background: #f5f5f5; padding: 3px 6px; border-radius: 3px; font-family: monospace;">${selectors.price || 'None'}</code><br><br>
        <strong style="color: #6366f1; font-size: 14px; display: block; margin-top: 8px;">✅ Found: ${selectors.count} items</strong>
    `;
    
    contentDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
    resultsDiv.style.display = 'block';
    console.log('✅ Panel shown');
    showToast(`✅ Detected ${selectors.count} items!`, 'success');
}

function useDetectedSelectors() {
    if (!detectedSelectors) {
        showToast('No detection available', 'error');
        return;
    }
    
    document.getElementById('containerSelector').value = detectedSelectors.container;
    document.getElementById('titleSelector').value = detectedSelectors.title || '';
    document.getElementById('linkSelector').value = detectedSelectors.link || '';
    document.getElementById('priceSelector').value = detectedSelectors.price || '';
    document.getElementById('descSelector').value = detectedSelectors.description || '';
    document.getElementById('scraperName').value = 'Auto-Detect';
    
    document.getElementById('autoDetectResults').classList.add('hidden');
    document.getElementById('autoDetectResults').style.display = 'none';
    
    showToast('✅ Selectors loaded! Click "👁️ Preview" to verify before scraping.', 'success');
}

function intelligentAutoDetect() {
    console.log('intelligentAutoDetect v2 - started');
    
    try {
        const ignoreTags = ['input', 'button', 'script', 'style', 'meta', 'link', 'svg', 'path', 'g', 'rect'];
        const ignoreClasses = ['hidden', 'display-none', 'no-display', 'sr-only', 'invisible'];
        
        const elementCounts = {};
        document.querySelectorAll('*').forEach(el => {
            const tag = el.tagName.toLowerCase();
            
            if (ignoreTags.includes(tag)) return;
            
            const classList = el.className ? el.className.toString() : '';
            if (ignoreClasses.some(ig => classList.includes(ig))) return;
            
            const text = el.textContent ? el.textContent.trim() : '';
            if (text.length < 3) return;
            
            const classStr = classList ? '.' + classList.split(' ').slice(0, 2).join('.') : '';
            const key = tag + classStr;
            elementCounts[key] = (elementCounts[key] || 0) + 1;
        });
        
        console.log('Element counts:', elementCounts);
        
        let bestSelector = null;
        let bestCount = 0;
        
        for (const [selector, count] of Object.entries(elementCounts)) {
            if (count > 100) continue;
            
            if (count >= 3 && count <= 100 && count > bestCount) {
                bestCount = count;
                bestSelector = selector;
            }
        }
        
        let containerSelector = 'div';
        if (bestSelector) {
            const parts = bestSelector.split('.');
            containerSelector = parts[0];
            if (parts.length > 1) {
                const cls = parts[1].trim();
                if (cls && cls.length > 2) {
                    containerSelector = '.' + cls;
                }
            }
        }
        
        const containers = document.querySelectorAll(containerSelector);
        console.log('Final container:', containerSelector, 'count:', containers.length);
        
        let titleSelector = '';
        let linkSelector = '';
        let priceSelector = '';
        
        if (containers.length >= 3) {
            const sample = containers[0];
            
            const headings = sample.querySelectorAll('h1, h2, h3, h4, h5, h6');
            for (const el of headings) {
                const text = el && el.textContent ? el.textContent.trim() : '';
                if (text.length > 3 && text.length < 200) {
                    titleSelector = el.tagName.toLowerCase();
                    console.log('Title found:', titleSelector);
                    break;
                }
            }
            
            if (!titleSelector) {
                const textElements = sample.querySelectorAll('span, strong, em, a, div');
                for (const el of textElements) {
                    const text = el && el.textContent ? el.textContent.trim() : '';
                    if (text.length > 5 && text.length < 150 && !text.includes('\n')) {
                        const tag = el.tagName.toLowerCase();
                        if (tag === 'a') {
                            titleSelector = 'a';
                            linkSelector = 'a';
                            console.log('Link/Title found: a');
                            break;
                        } else if (tag === 'span' || tag === 'strong') {
                            titleSelector = tag;
                            console.log('Title found:', tag);
                            break;
                        }
                    }
                }
            }
            
            if (!linkSelector) {
                const link = sample.querySelector('a[href]');
                if (link) {
                    linkSelector = 'a';
                    console.log('Link found: a');
                }
            }
            
            const allElements = sample.querySelectorAll('*');
            for (const el of allElements) {
                try {
                    const text = el && el.textContent ? el.textContent.trim() : '';
                    
                    const pricePatterns = [
                        /\d+[.,]\d{2}/,
                        /\d+\s*€/,
                        /€\s*\d+/,
                        /\d+\s*\$/,
                        /\$\s*\d+/,
                        /\d+\s*£/,
                        /£\s*\d+/,
                        /\d{3,}/
                    ];
                    
                    const isPrice = pricePatterns.some(p => p.test(text));
                    
                    if (isPrice && text.length < 25 && text.length > 1) {
                        const cls = el.className ? el.className.toString().split(' ')[0] : '';
                        
                        if (cls && cls.length > 2 && !cls.includes('display') && !cls.includes('hidden')) {
                            priceSelector = '.' + cls;
                            console.log('Price found (class):', priceSelector, 'text:', text);
                            break;
                        } else if (!priceSelector) {
                            const tag = el.tagName.toLowerCase();
                            if (!['div', 'span', 'body', 'html'].includes(tag) || tag === 'span') {
                                priceSelector = tag;
                                console.log('Price found (tag):', priceSelector, 'text:', text);
                            }
                        }
                    }
                } catch (e) {
                    console.log('Skip price:', e);
                }
            }
        }
        
        console.log('RISULTATI:', { container: containerSelector, title: titleSelector, link: linkSelector, price: priceSelector, count: containers.length });
        
        return {
            container: containerSelector,
            title: titleSelector || '',
            link: linkSelector || '',
            price: priceSelector || '',
            description: '',
            count: containers.length
        };
    } catch (error) {
        console.error('intelligentAutoDetect error:', error);
        return {
            container: 'div',
            title: '',
            link: '',
            price: '',
            description: '',
            count: 0
        };
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

console.log('✅ popup.js loaded - GPL v3');
