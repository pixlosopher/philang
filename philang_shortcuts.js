/**
 * PhiLang Keyboard Shortcuts System
 * Provides consistent keyboard navigation across all PhiLang pages
 */

const PhiLangShortcuts = (function() {
    'use strict';

    // Registered shortcuts
    let shortcuts = [];
    let helpModal = null;
    let isEnabled = true;

    // Default global shortcuts
    const GLOBAL_SHORTCUTS = [
        { key: '?', description: 'Show keyboard shortcuts', action: showHelp },
        { key: 'Escape', description: 'Close modal/dialog', action: closeModals },
        { key: 'g h', description: 'Go to home', action: () => navigateTo('index.html') },
        { key: 'g d', description: 'Go to derivations', action: () => navigateTo('derivation_graph.html') },
        { key: 'g s', description: 'Go to Socratic counsel', action: () => navigateTo('socratic_counsel.html') },
        { key: 'g i', description: 'Go to dialectical dialogue', action: () => navigateTo('dialectical_dialogue.html') },
        { key: 'g e', description: 'Go to embeddings', action: () => navigateTo('philang_embeddings.html') },
    ];

    // Key sequence tracking
    let keySequence = [];
    let sequenceTimer = null;
    const SEQUENCE_TIMEOUT = 1000; // ms

    /**
     * Initialize the shortcuts system
     */
    function init(pageShortcuts = []) {
        // Combine global and page-specific shortcuts
        shortcuts = [...GLOBAL_SHORTCUTS, ...pageShortcuts];

        // Set up event listener
        document.addEventListener('keydown', handleKeyDown);

        // Inject help modal styles
        injectStyles();

        return PhiLangShortcuts;
    }

    /**
     * Handle keydown events
     */
    function handleKeyDown(e) {
        if (!isEnabled) return;

        // Ignore if user is typing in an input
        if (isInputFocused()) return;

        const key = getKeyString(e);

        // Add to sequence
        keySequence.push(key);

        // Clear previous timer
        if (sequenceTimer) clearTimeout(sequenceTimer);

        // Set new timer to reset sequence
        sequenceTimer = setTimeout(() => {
            keySequence = [];
        }, SEQUENCE_TIMEOUT);

        // Check for matching shortcuts
        const sequenceString = keySequence.join(' ');

        for (const shortcut of shortcuts) {
            if (shortcut.key === sequenceString || shortcut.key === key) {
                e.preventDefault();
                shortcut.action(e);
                keySequence = [];
                return;
            }
        }

        // Check if current sequence could potentially match
        const couldMatch = shortcuts.some(s => s.key.startsWith(sequenceString));
        if (!couldMatch) {
            keySequence = [];
        }
    }

    /**
     * Get a string representation of the key pressed
     */
    function getKeyString(e) {
        const parts = [];

        if (e.ctrlKey) parts.push('Ctrl');
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey && e.key.length > 1) parts.push('Shift');
        if (e.metaKey) parts.push('Cmd');

        // Get the actual key
        let key = e.key;
        if (key === ' ') key = 'Space';
        if (key.length === 1) key = key.toLowerCase();

        parts.push(key);

        return parts.join('+');
    }

    /**
     * Check if user is focused on an input element
     */
    function isInputFocused() {
        const active = document.activeElement;
        if (!active) return false;

        const tagName = active.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
            return true;
        }

        return active.isContentEditable;
    }

    /**
     * Navigate to a page
     */
    function navigateTo(url) {
        // Check if we're already on this page
        if (window.location.pathname.endsWith(url)) {
            if (typeof PhiLangToast !== 'undefined') {
                PhiLangToast.info('Already on this page');
            }
            return;
        }
        window.location.href = url;
    }

    /**
     * Close any open modals
     */
    function closeModals() {
        // Close help modal
        if (helpModal && !helpModal.classList.contains('hidden')) {
            helpModal.classList.add('hidden');
            return true;
        }

        // Try to close any page-specific modals
        const modals = document.querySelectorAll('.modal:not(.hidden), [role="dialog"]:not(.hidden), .dropdown:not(.hidden)');
        modals.forEach(m => m.classList.add('hidden'));

        // Close mobile menu if open
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && !mobileNav.classList.contains('hidden')) {
            mobileNav.classList.add('hidden');
            document.body.style.overflow = '';
        }

        return modals.length > 0;
    }

    /**
     * Show the help modal
     */
    function showHelp() {
        if (!helpModal) {
            createHelpModal();
        }

        helpModal.classList.remove('hidden');
        helpModal.querySelector('.shortcuts-content').focus();
    }

    /**
     * Create the help modal
     */
    function createHelpModal() {
        helpModal = document.createElement('div');
        helpModal.id = 'shortcuts-help';
        helpModal.className = 'shortcuts-modal hidden';
        helpModal.innerHTML = `
            <div class="shortcuts-backdrop" id="shortcuts-backdrop"></div>
            <div class="shortcuts-content" tabindex="-1">
                <div class="shortcuts-header">
                    <h2>Keyboard Shortcuts</h2>
                    <button class="shortcuts-close" id="shortcuts-close-btn" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="shortcuts-body">
                    ${renderShortcutGroups()}
                </div>
                <div class="shortcuts-footer">
                    Press <kbd>?</kbd> to toggle this help
                </div>
            </div>
        `;

        document.body.appendChild(helpModal);

        // Add event listeners
        document.getElementById('shortcuts-backdrop').addEventListener('click', closeHelp);
        document.getElementById('shortcuts-close-btn').addEventListener('click', closeHelp);
    }

    /**
     * Render shortcuts grouped by category
     */
    function renderShortcutGroups() {
        // Group shortcuts
        const globalShortcuts = shortcuts.filter(s => GLOBAL_SHORTCUTS.includes(s));
        const pageShortcuts = shortcuts.filter(s => !GLOBAL_SHORTCUTS.includes(s));

        let html = '';

        if (pageShortcuts.length > 0) {
            html += `
                <div class="shortcut-group">
                    <h3>Page Shortcuts</h3>
                    ${pageShortcuts.map(renderShortcut).join('')}
                </div>
            `;
        }

        html += `
            <div class="shortcut-group">
                <h3>Navigation</h3>
                ${globalShortcuts.filter(s => s.key.startsWith('g ')).map(renderShortcut).join('')}
            </div>
            <div class="shortcut-group">
                <h3>General</h3>
                ${globalShortcuts.filter(s => !s.key.startsWith('g ')).map(renderShortcut).join('')}
            </div>
        `;

        return html;
    }

    /**
     * Render a single shortcut
     */
    function renderShortcut(shortcut) {
        const keys = shortcut.key.split(' ').map(k => `<kbd>${formatKey(k)}</kbd>`).join(' ');
        return `
            <div class="shortcut-item">
                <span class="shortcut-keys">${keys}</span>
                <span class="shortcut-desc">${shortcut.description}</span>
            </div>
        `;
    }

    /**
     * Format a key for display
     */
    function formatKey(key) {
        const replacements = {
            'Ctrl': '⌃',
            'Alt': '⌥',
            'Shift': '⇧',
            'Cmd': '⌘',
            'Enter': '↵',
            'Escape': 'Esc',
            'Space': '␣',
            'ArrowUp': '↑',
            'ArrowDown': '↓',
            'ArrowLeft': '←',
            'ArrowRight': '→'
        };

        return replacements[key] || key;
    }

    /**
     * Close the help modal
     */
    function closeHelp() {
        if (helpModal) {
            helpModal.classList.add('hidden');
        }
    }

    /**
     * Register a new shortcut
     */
    function register(key, description, action) {
        shortcuts.push({ key, description, action });
    }

    /**
     * Unregister a shortcut
     */
    function unregister(key) {
        shortcuts = shortcuts.filter(s => s.key !== key);
    }

    /**
     * Enable/disable shortcuts
     */
    function setEnabled(enabled) {
        isEnabled = enabled;
    }

    /**
     * Inject CSS styles
     */
    function injectStyles() {
        if (document.getElementById('philang-shortcuts-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'philang-shortcuts-styles';
        styles.textContent = `
            .shortcuts-modal {
                position: fixed;
                inset: 0;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .shortcuts-modal.hidden {
                display: none;
            }

            .shortcuts-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(4px);
            }

            .shortcuts-content {
                position: relative;
                background: var(--obsidian, #16141c);
                border: 1px solid var(--stone, #3d3750);
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }

            .shortcuts-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--stone, #3d3750);
            }

            .shortcuts-header h2 {
                margin: 0;
                font-family: var(--font-display, 'Cinzel', serif);
                font-size: 1.25rem;
                color: var(--gold, #d4af37);
            }

            .shortcuts-close {
                background: none;
                border: none;
                color: var(--silver, #9992a8);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                transition: color 0.2s;
            }

            .shortcuts-close:hover {
                color: var(--pearl, #f5f5f0);
            }

            .shortcuts-body {
                padding: 1rem 1.5rem;
                overflow-y: auto;
                flex: 1;
            }

            .shortcut-group {
                margin-bottom: 1.5rem;
            }

            .shortcut-group:last-child {
                margin-bottom: 0;
            }

            .shortcut-group h3 {
                margin: 0 0 0.75rem 0;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--silver, #9992a8);
            }

            .shortcut-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(61, 55, 80, 0.3);
            }

            .shortcut-item:last-child {
                border-bottom: none;
            }

            .shortcut-keys {
                display: flex;
                gap: 0.25rem;
            }

            .shortcut-keys kbd {
                display: inline-block;
                padding: 0.2rem 0.5rem;
                background: var(--void, #0a0a0f);
                border: 1px solid var(--stone, #3d3750);
                border-radius: 4px;
                font-family: var(--font-mono, 'JetBrains Mono', monospace);
                font-size: 0.75rem;
                color: var(--pearl, #f5f5f0);
                min-width: 1.5rem;
                text-align: center;
            }

            .shortcut-desc {
                color: var(--pearl, #f5f5f0);
                font-size: 0.875rem;
            }

            .shortcuts-footer {
                padding: 0.75rem 1.5rem;
                border-top: 1px solid var(--stone, #3d3750);
                text-align: center;
                font-size: 0.75rem;
                color: var(--silver, #9992a8);
            }

            .shortcuts-footer kbd {
                display: inline-block;
                padding: 0.1rem 0.4rem;
                background: var(--void, #0a0a0f);
                border: 1px solid var(--stone, #3d3750);
                border-radius: 3px;
                font-family: var(--font-mono, 'JetBrains Mono', monospace);
                font-size: 0.7rem;
            }

            @media (max-width: 480px) {
                .shortcuts-content {
                    width: 95%;
                    max-height: 85vh;
                }

                .shortcuts-header,
                .shortcuts-body,
                .shortcuts-footer {
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Show a keyboard hint badge in the UI
     */
    function showHint() {
        // Don't show on mobile
        if (window.innerWidth < 768) return;

        // Don't show if already visible
        if (document.getElementById('shortcuts-hint')) return;

        const hint = document.createElement('div');
        hint.id = 'shortcuts-hint';
        hint.className = 'shortcuts-hint';
        hint.innerHTML = `
            Press <kbd>?</kbd> for keyboard shortcuts
            <button class="hint-dismiss" id="shortcuts-hint-dismiss" aria-label="Dismiss">&times;</button>
        `;
        document.body.appendChild(hint);

        // Add event listener for dismiss button
        document.getElementById('shortcuts-hint-dismiss').addEventListener('click', dismissHint);

        // Add hint styles if not present
        if (!document.getElementById('shortcuts-hint-styles')) {
            const hintStyles = document.createElement('style');
            hintStyles.id = 'shortcuts-hint-styles';
            hintStyles.textContent = `
                .shortcuts-hint {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    padding: 0.5rem 1rem;
                    background: var(--obsidian, #16141c);
                    border: 1px solid var(--stone, #3d3750);
                    border-radius: 8px;
                    font-size: 0.8125rem;
                    color: var(--silver, #9992a8);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: hint-fade-in 0.3s ease-out;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }

                @keyframes hint-fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .shortcuts-hint kbd {
                    display: inline-block;
                    padding: 0.1rem 0.4rem;
                    background: var(--void, #0a0a0f);
                    border: 1px solid var(--stone, #3d3750);
                    border-radius: 3px;
                    font-family: var(--font-mono, 'JetBrains Mono', monospace);
                    font-size: 0.75rem;
                    color: var(--gold, #d4af37);
                }

                .hint-dismiss {
                    background: none;
                    border: none;
                    color: var(--stone, #3d3750);
                    cursor: pointer;
                    font-size: 1rem;
                    line-height: 1;
                    padding: 0 0.25rem;
                    margin-left: 0.5rem;
                    transition: color 0.2s;
                }

                .hint-dismiss:hover {
                    color: var(--pearl, #f5f5f0);
                }

                @media (max-width: 768px) {
                    .shortcuts-hint {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(hintStyles);
        }

        // Auto-dismiss after 10 seconds or on first shortcut use
        setTimeout(dismissHint, 10000);
    }

    /**
     * Dismiss the hint badge
     */
    function dismissHint() {
        const hint = document.getElementById('shortcuts-hint');
        if (hint) {
            hint.style.animation = 'hint-fade-in 0.2s ease-out reverse';
            setTimeout(() => hint.remove(), 200);
        }
        // Remember dismissal
        try {
            localStorage.setItem('philang-shortcuts-hint-dismissed', 'true');
        } catch (e) {}
    }

    /**
     * Check if hint should be shown
     */
    function shouldShowHint() {
        try {
            return !localStorage.getItem('philang-shortcuts-hint-dismissed');
        } catch (e) {
            return true;
        }
    }

    // Public API
    return {
        init,
        register,
        unregister,
        setEnabled,
        showHelp,
        closeHelp,
        navigateTo,
        showHint,
        dismissHint,
        shouldShowHint
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangShortcuts;
}
