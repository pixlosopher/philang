/**
 * PhiLang URL State Manager
 * Enables shareable links with encoded application state
 */

const PhiLangURLState = (function() {
    'use strict';

    /**
     * Encode state to URL-safe base64
     */
    function encodeState(state) {
        try {
            const json = JSON.stringify(state);
            // Use base64url encoding (URL-safe)
            const base64 = btoa(unescape(encodeURIComponent(json)));
            return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        } catch (e) {
            console.error('Failed to encode state:', e);
            return null;
        }
    }

    /**
     * Decode state from URL-safe base64
     */
    function decodeState(encoded) {
        try {
            // Restore base64 format
            let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
            // Add padding if needed
            while (base64.length % 4) base64 += '=';
            const json = decodeURIComponent(escape(atob(base64)));
            return JSON.parse(json);
        } catch (e) {
            console.error('Failed to decode state:', e);
            return null;
        }
    }

    /**
     * Save state to URL hash
     */
    function saveToURL(state, key = 's') {
        const encoded = encodeState(state);
        if (encoded) {
            const url = new URL(window.location.href);
            url.searchParams.set(key, encoded);
            window.history.replaceState(null, '', url.toString());
            return url.toString();
        }
        return null;
    }

    /**
     * Load state from URL
     */
    function loadFromURL(key = 's') {
        const url = new URL(window.location.href);
        const encoded = url.searchParams.get(key);
        if (encoded) {
            return decodeState(encoded);
        }
        return null;
    }

    /**
     * Clear state from URL
     */
    function clearURL(key = 's') {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        window.history.replaceState(null, '', url.toString());
    }

    /**
     * Generate a shareable link
     */
    function generateShareLink(state, key = 's') {
        const encoded = encodeState(state);
        if (encoded) {
            const url = new URL(window.location.href);
            url.searchParams.set(key, encoded);
            return url.toString();
        }
        return null;
    }

    /**
     * Copy shareable link to clipboard
     */
    async function copyShareLink(state, key = 's') {
        const link = generateShareLink(state, key);
        if (link) {
            try {
                await navigator.clipboard.writeText(link);
                if (typeof PhiLangToast !== 'undefined') {
                    PhiLangToast.success('Link copied to clipboard');
                }
                return true;
            } catch (e) {
                console.error('Failed to copy:', e);
                if (typeof PhiLangToast !== 'undefined') {
                    PhiLangToast.error('Failed to copy link');
                }
            }
        }
        return false;
    }

    /**
     * Check if URL has state
     */
    function hasState(key = 's') {
        const url = new URL(window.location.href);
        return url.searchParams.has(key);
    }

    /**
     * Compress state for smaller URLs (for large states)
     * Uses simple run-length encoding for repeated characters
     */
    function compressState(state) {
        const json = JSON.stringify(state);
        // Simple compression: encode long runs of same char
        let compressed = '';
        let count = 1;
        for (let i = 0; i < json.length; i++) {
            if (json[i] === json[i + 1]) {
                count++;
            } else {
                if (count > 3) {
                    compressed += `~${count}${json[i]}`;
                } else {
                    compressed += json[i].repeat(count);
                }
                count = 1;
            }
        }
        return compressed.length < json.length ? 'c:' + compressed : json;
    }

    /**
     * Decompress state
     */
    function decompressState(data) {
        if (!data.startsWith('c:')) return data;
        const compressed = data.slice(2);
        return compressed.replace(/~(\d+)(.)/g, (_, count, char) => char.repeat(parseInt(count)));
    }

    // State change listeners
    const listeners = [];

    /**
     * Listen for URL state changes (back/forward navigation)
     */
    function onStateChange(callback) {
        listeners.push(callback);

        // Set up popstate listener once
        if (listeners.length === 1) {
            window.addEventListener('popstate', () => {
                const state = loadFromURL();
                listeners.forEach(cb => cb(state));
            });
        }

        return () => {
            const index = listeners.indexOf(callback);
            if (index > -1) listeners.splice(index, 1);
        };
    }

    // Public API
    return {
        encode: encodeState,
        decode: decodeState,
        save: saveToURL,
        load: loadFromURL,
        clear: clearURL,
        generateLink: generateShareLink,
        copyLink: copyShareLink,
        hasState,
        onStateChange,
        compress: compressState,
        decompress: decompressState
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangURLState;
}
