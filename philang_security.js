/**
 * PhiLang Security Module
 * Provides input validation, sanitization, and secure DOM manipulation
 */

const PhiLangSecurity = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════════

    // Allowed color formats (hex colors only)
    const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

    // Whitelist of safe CSS properties for inline styles
    const SAFE_CSS_PROPERTIES = new Set([
        'color', 'background', 'background-color', 'border', 'border-color',
        'border-radius', 'padding', 'margin', 'font-size', 'font-weight',
        'opacity', 'transform', 'transition', 'width', 'height', 'max-width',
        'max-height', 'min-width', 'min-height', 'display', 'flex', 'gap',
        'align-items', 'justify-content', 'text-align', 'box-shadow'
    ]);

    // Dangerous patterns to remove from any user input
    const DANGEROUS_PATTERNS = [
        /javascript\s*:/gi,
        /data\s*:/gi,
        /vbscript\s*:/gi,
        /expression\s*\(/gi,
        /behavior\s*:/gi,
        /on\w+\s*=/gi,
        /<script/gi,
        /<\/script/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /<link/gi,
        /<style/gi
    ];

    // ═══════════════════════════════════════════════════════════════════════════
    // HTML ESCAPING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Escape HTML entities to prevent XSS
     * @param {string} text - Raw text to escape
     * @returns {string} Escaped HTML-safe string
     */
    function escapeHtml(text) {
        if (text == null) return '';
        if (typeof text !== 'string') text = String(text);

        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Escape HTML attribute value
     * @param {string} value - Attribute value to escape
     * @returns {string} Escaped attribute-safe string
     */
    function escapeAttribute(value) {
        if (value == null) return '';
        if (typeof value !== 'string') value = String(value);

        return value
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '&#10;')
            .replace(/\r/g, '&#13;');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // COLOR VALIDATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Validate and sanitize a color value
     * @param {string} color - Color value to validate
     * @param {string} fallback - Fallback color if invalid
     * @returns {string} Valid hex color
     */
    function sanitizeColor(color, fallback = '#999999') {
        if (!color || typeof color !== 'string') {
            return fallback;
        }

        // Remove whitespace
        color = color.trim();

        // Check if valid hex color
        if (HEX_COLOR_REGEX.test(color)) {
            return color;
        }

        // Try to parse CSS named colors by creating a temp element
        const testEl = document.createElement('div');
        testEl.style.color = '';
        testEl.style.color = color;

        if (testEl.style.color) {
            // Color was accepted by the browser, but we still prefer hex
            // Return the fallback for safety
            console.warn(`Color "${color}" may not be a safe hex value, using fallback`);
        }

        return fallback;
    }

    /**
     * Create a CSS color with alpha channel
     * @param {string} color - Hex color
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} rgba color string
     */
    function colorWithAlpha(color, alpha = 1) {
        const sanitized = sanitizeColor(color);

        // Convert hex to RGB
        let hex = sanitized.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Clamp alpha
        alpha = Math.max(0, Math.min(1, alpha));

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CSS VALIDATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Validate and sanitize CSS text
     * @param {string} cssText - CSS text to validate
     * @returns {string} Sanitized CSS text
     */
    function sanitizeCSS(cssText) {
        if (!cssText || typeof cssText !== 'string') {
            return '';
        }

        // Remove dangerous patterns
        let sanitized = cssText;
        for (const pattern of DANGEROUS_PATTERNS) {
            sanitized = sanitized.replace(pattern, '');
        }

        // Parse and validate individual properties
        const properties = sanitized.split(';').filter(Boolean);
        const validProperties = [];

        for (const prop of properties) {
            const [name, ...valueParts] = prop.split(':');
            if (!name || valueParts.length === 0) continue;

            const propName = name.trim().toLowerCase();
            const propValue = valueParts.join(':').trim();

            // Only allow whitelisted properties
            if (SAFE_CSS_PROPERTIES.has(propName)) {
                validProperties.push(`${propName}: ${propValue}`);
            }
        }

        return validProperties.join('; ');
    }

    /**
     * Create safe inline style from object
     * @param {Object} styles - Style object {property: value}
     * @returns {string} Safe CSS text
     */
    function createSafeStyle(styles) {
        if (!styles || typeof styles !== 'object') {
            return '';
        }

        const parts = [];

        for (const [key, value] of Object.entries(styles)) {
            // Convert camelCase to kebab-case
            const propName = key.replace(/([A-Z])/g, '-$1').toLowerCase();

            if (SAFE_CSS_PROPERTIES.has(propName) && value != null) {
                // Special handling for color values
                if (propName.includes('color') || propName === 'background') {
                    if (typeof value === 'string' && value.startsWith('#')) {
                        parts.push(`${propName}: ${sanitizeColor(value)}`);
                        continue;
                    }
                }
                parts.push(`${propName}: ${escapeAttribute(String(value))}`);
            }
        }

        return parts.join('; ');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // URL VALIDATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Validate URL is safe (no javascript:, data:, etc.)
     * @param {string} url - URL to validate
     * @returns {boolean} True if URL is safe
     */
    function isUrlSafe(url) {
        if (!url || typeof url !== 'string') {
            return false;
        }

        const trimmed = url.trim().toLowerCase();

        // Block dangerous protocols
        if (trimmed.startsWith('javascript:') ||
            trimmed.startsWith('data:') ||
            trimmed.startsWith('vbscript:')) {
            return false;
        }

        return true;
    }

    /**
     * Sanitize URL for use in href attributes
     * @param {string} url - URL to sanitize
     * @param {string} fallback - Fallback URL if invalid
     * @returns {string} Safe URL
     */
    function sanitizeUrl(url, fallback = '#') {
        if (!isUrlSafe(url)) {
            console.warn(`Blocked potentially dangerous URL: ${url}`);
            return fallback;
        }
        return url;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SAFE DOM MANIPULATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Create an element safely with validated attributes
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Attributes to set
     * @param {string|Node|Array} children - Children to append
     * @returns {HTMLElement} Created element
     */
    function createElement(tag, attributes = {}, children = null) {
        // Validate tag name
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(tag)) {
            throw new Error(`Invalid tag name: ${tag}`);
        }

        const el = document.createElement(tag);

        // Set attributes safely
        for (const [key, value] of Object.entries(attributes)) {
            if (value == null) continue;

            const keyLower = key.toLowerCase();

            // Skip event handlers (they should be added via addEventListener)
            if (keyLower.startsWith('on')) {
                console.warn(`Skipping event handler attribute: ${key}. Use addEventListener instead.`);
                continue;
            }

            // Special handling for different attribute types
            switch (keyLower) {
                case 'style':
                    if (typeof value === 'string') {
                        el.style.cssText = sanitizeCSS(value);
                    } else if (typeof value === 'object') {
                        el.style.cssText = createSafeStyle(value);
                    }
                    break;

                case 'class':
                case 'classname':
                    el.className = escapeAttribute(String(value));
                    break;

                case 'href':
                case 'src':
                    el.setAttribute(keyLower, sanitizeUrl(String(value)));
                    break;

                case 'data':
                    // Handle data-* attributes from an object
                    if (typeof value === 'object') {
                        for (const [dataKey, dataVal] of Object.entries(value)) {
                            el.dataset[dataKey] = escapeAttribute(String(dataVal));
                        }
                    }
                    break;

                default:
                    el.setAttribute(key, escapeAttribute(String(value)));
            }
        }

        // Add children
        if (children != null) {
            if (Array.isArray(children)) {
                children.forEach(child => appendSafe(el, child));
            } else {
                appendSafe(el, children);
            }
        }

        return el;
    }

    /**
     * Safely append content to an element
     * @param {HTMLElement} parent - Parent element
     * @param {string|Node} child - Content to append
     */
    function appendSafe(parent, child) {
        if (child == null) return;

        if (child instanceof Node) {
            parent.appendChild(child);
        } else {
            // Treat as text content (not HTML)
            parent.appendChild(document.createTextNode(String(child)));
        }
    }

    /**
     * Set text content safely (preferred over innerHTML)
     * @param {HTMLElement} element - Target element
     * @param {string} text - Text to set
     */
    function setTextContent(element, text) {
        if (element && typeof element.textContent !== 'undefined') {
            element.textContent = text != null ? String(text) : '';
        }
    }

    /**
     * Set HTML content with sanitization (use sparingly)
     * @param {HTMLElement} element - Target element
     * @param {string} html - HTML to set
     */
    function setHtmlContent(element, html) {
        if (!element) return;

        // Sanitize HTML
        let sanitized = String(html || '');

        // Remove dangerous patterns
        for (const pattern of DANGEROUS_PATTERNS) {
            sanitized = sanitized.replace(pattern, '');
        }

        element.innerHTML = sanitized;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INPUT VALIDATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Validate that a value is a safe string
     * @param {*} value - Value to check
     * @param {number} maxLength - Maximum allowed length
     * @returns {boolean} True if valid
     */
    function isValidString(value, maxLength = 10000) {
        return typeof value === 'string' && value.length <= maxLength;
    }

    /**
     * Validate that a value is a safe integer
     * @param {*} value - Value to check
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {boolean} True if valid
     */
    function isValidInteger(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
        return Number.isInteger(value) && value >= min && value <= max;
    }

    /**
     * Validate object has expected shape (basic type checking)
     * @param {*} obj - Object to validate
     * @param {Object} schema - Schema {key: 'string'|'number'|'boolean'|'object'|'array'}
     * @returns {boolean} True if valid
     */
    function validateObject(obj, schema) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
            return false;
        }

        for (const [key, expectedType] of Object.entries(schema)) {
            const value = obj[key];

            if (expectedType === 'array') {
                if (!Array.isArray(value)) return false;
            } else if (typeof value !== expectedType) {
                return false;
            }
        }

        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STORAGE SECURITY
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Safely parse JSON from storage (prevents prototype pollution)
     * @param {string} json - JSON string
     * @returns {*} Parsed value or null if invalid
     */
    function safeJsonParse(json) {
        if (!json || typeof json !== 'string') {
            return null;
        }

        try {
            const parsed = JSON.parse(json);

            // Prevent prototype pollution
            if (parsed && typeof parsed === 'object') {
                if ('__proto__' in parsed || 'constructor' in parsed || 'prototype' in parsed) {
                    console.warn('Blocked potential prototype pollution attempt');
                    return null;
                }
            }

            return parsed;
        } catch (e) {
            console.error('JSON parse error:', e);
            return null;
        }
    }

    /**
     * Get item from localStorage safely
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    function getStorageItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            if (item == null) return defaultValue;
            return safeJsonParse(item) ?? defaultValue;
        } catch (e) {
            console.error('Storage read error:', e);
            return defaultValue;
        }
    }

    /**
     * Set item in localStorage safely
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} True if successful
     */
    function setStorageItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage write error:', e);
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // HTML escaping
        escapeHtml,
        escapeAttribute,

        // Color validation
        sanitizeColor,
        colorWithAlpha,

        // CSS validation
        sanitizeCSS,
        createSafeStyle,

        // URL validation
        isUrlSafe,
        sanitizeUrl,

        // Safe DOM manipulation
        createElement,
        appendSafe,
        setTextContent,
        setHtmlContent,

        // Input validation
        isValidString,
        isValidInteger,
        validateObject,

        // Storage
        safeJsonParse,
        getStorageItem,
        setStorageItem,

        // Constants (for external use)
        SAFE_CSS_PROPERTIES
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangSecurity = PhiLangSecurity;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangSecurity;
}
