/**
 * PhiLang UI Utilities
 * Shared UI components and utilities across all PhiLang pages
 */

const PhiLangUI = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize mobile menu functionality
     * @param {Object} options - Configuration options
     */
    function initMobileMenu(options = {}) {
        const {
            menuBtnId = 'mobile-menu-btn',
            navId = 'mobile-nav',
            closeBtnId = 'mobile-menu-close',
            bodyOverflow = true
        } = options;

        const menuBtn = document.getElementById(menuBtnId);
        const mobileNav = document.getElementById(navId);
        const closeBtn = document.getElementById(closeBtnId);

        if (!menuBtn || !mobileNav) {
            return;
        }

        function openMenu() {
            mobileNav.classList.remove('hidden');
            mobileNav.classList.add('active');
            menuBtn.classList.add('active');
            if (bodyOverflow) {
                document.body.style.overflow = 'hidden';
            }
        }

        function closeMenu() {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
            if (bodyOverflow) {
                document.body.style.overflow = '';
            }
        }

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileNav.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
                closeMenu();
            }
        });

        // Close when clicking outside
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMenu();
            }
        });

        // Close on navigation link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        return { openMenu, closeMenu };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DROPDOWNS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize a dropdown component
     * @param {Object} options - Configuration options
     */
    function initDropdown(options) {
        const {
            buttonId,
            dropdownId,
            closeOnSelect = true,
            onOpen = null,
            onClose = null
        } = options;

        const button = document.getElementById(buttonId);
        const dropdown = document.getElementById(dropdownId);

        if (!button || !dropdown) {
            return null;
        }

        function open() {
            dropdown.classList.remove('hidden');
            button.setAttribute('aria-expanded', 'true');
            if (onOpen) onOpen();
        }

        function close() {
            dropdown.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
            if (onClose) onClose();
        }

        function toggle() {
            if (dropdown.classList.contains('hidden')) {
                open();
            } else {
                close();
            }
        }

        function isOpen() {
            return !dropdown.classList.contains('hidden');
        }

        // Button click toggles dropdown
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                close();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) {
                close();
            }
        });

        // Close on item selection if configured
        if (closeOnSelect) {
            dropdown.addEventListener('click', (e) => {
                if (e.target.closest('[data-dropdown-item]')) {
                    close();
                }
            });
        }

        return { open, close, toggle, isOpen };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // API INDICATOR
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize the API status indicator
     * @param {string} containerId - Container element ID
     */
    function initAPIIndicator(containerId = 'api-indicator') {
        const container = document.getElementById(containerId);
        if (!container) return;

        function render() {
            const isConfigured = typeof PhiLangAPI !== 'undefined' && PhiLangAPI.isConfigured();

            container.innerHTML = `
                <div class="philang-api-indicator" id="philang-api-indicator-main">
                    <div class="dot ${isConfigured ? 'active' : 'inactive'}"></div>
                    <span>${isConfigured ? 'Claude API' : 'Configure API'}</span>
                </div>
            `;

            // Add click handler
            const indicator = document.getElementById('philang-api-indicator-main');
            if (indicator) {
                indicator.addEventListener('click', () => {
                    if (typeof PhiLangAPI !== 'undefined' && PhiLangAPI.showConfigModal) {
                        PhiLangAPI.showConfigModal();
                    }
                });
            }
        }

        function update() {
            const dot = container.querySelector('.dot');
            const span = container.querySelector('span');

            if (dot && span) {
                const isConfigured = typeof PhiLangAPI !== 'undefined' && PhiLangAPI.isConfigured();
                dot.className = 'dot ' + (isConfigured ? 'active' : 'inactive');
                span.textContent = isConfigured ? 'Claude API' : 'Configure API';
            }
        }

        // Initial render
        if (typeof PhiLangAPI !== 'undefined') {
            render();
        } else {
            container.innerHTML = `
                <div class="philang-api-indicator inactive">
                    <div class="dot inactive"></div>
                    <span>No API</span>
                </div>
            `;
        }

        // Listen for API configuration changes
        window.addEventListener('philang-api-configured', update);

        return { render, update };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DATE FORMATTING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Format a date as relative time
     * @param {Date|string} date - Date to format
     * @returns {string} Relative time string
     */
    function formatRelativeDate(date) {
        if (!date) return '';

        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return '';

        const now = new Date();
        const diff = now - d;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (seconds < 60) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        if (days < 30) return `${Math.floor(days / 7)}w ago`;

        return d.toLocaleDateString();
    }

    /**
     * Format a date for display
     * @param {Date|string} date - Date to format
     * @param {Object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date string
     */
    function formatDate(date, options = {}) {
        if (!date) return '';

        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return '';

        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...options
        };

        return d.toLocaleDateString(undefined, defaultOptions);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HISTORY LIST MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Render a history list with common structure
     * @param {Object} options - Configuration options
     */
    function renderHistoryList(options) {
        const {
            items,
            listId,
            emptyMessage = 'No items yet.',
            renderItem,
            onSelect,
            onDelete
        } = options;

        const list = document.getElementById(listId);
        if (!list) return;

        // Use security module for escaping if available
        const escapeHtml = typeof PhiLangSecurity !== 'undefined'
            ? PhiLangSecurity.escapeHtml
            : (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };

        if (!items || items.length === 0) {
            list.innerHTML = `<div class="text-center text-gray-500 text-sm py-4">${escapeHtml(emptyMessage)}</div>`;
            return;
        }

        // Render items using provided render function
        list.innerHTML = items.map(item => renderItem(item, escapeHtml)).join('');

        // Attach event listeners
        if (onSelect) {
            list.querySelectorAll('[data-item-id]').forEach(el => {
                el.addEventListener('click', (e) => {
                    // Don't trigger select on delete button click
                    if (!e.target.closest('.delete-item')) {
                        const id = parseInt(el.dataset.itemId);
                        onSelect(id, items.find(i => i.id === id));
                    }
                });
            });
        }

        if (onDelete) {
            list.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const id = parseInt(btn.dataset.itemId);
                    const item = items.find(i => i.id === id);

                    if (confirm('Delete this item?')) {
                        await onDelete(id, item);
                    }
                });
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOADING STATES
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Show loading state on an element
     * @param {HTMLElement|string} element - Element or ID
     * @param {boolean} show - Whether to show loading
     * @param {string} message - Optional loading message
     */
    function setLoading(element, show = true, message = 'Loading...') {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (!el) return;

        // Use security module for escaping if available
        const escapeHtml = typeof PhiLangSecurity !== 'undefined'
            ? PhiLangSecurity.escapeHtml
            : (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };

        if (show) {
            el.dataset.originalContent = el.innerHTML;
            el.disabled = true;
            el.classList.add('loading');

            // If it's a button, show spinner
            if (el.tagName === 'BUTTON') {
                el.innerHTML = `
                    <span class="loading-spinner"></span>
                    <span>${escapeHtml(message)}</span>
                `;
            }
        } else {
            el.disabled = false;
            el.classList.remove('loading');
            if (el.dataset.originalContent) {
                el.innerHTML = el.dataset.originalContent;
                delete el.dataset.originalContent;
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIRMATION DIALOGS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Show a confirmation dialog
     * @param {Object} options - Dialog options
     * @returns {Promise<boolean>} True if confirmed
     */
    async function confirm(options) {
        const {
            title = 'Confirm',
            message = 'Are you sure?',
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            dangerous = false
        } = typeof options === 'string' ? { message: options } : options;

        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'philang-confirm-modal';
            modal.innerHTML = `
                <div class="confirm-backdrop"></div>
                <div class="confirm-content">
                    <div class="confirm-header">
                        <h3>${PhiLangSecurity?.escapeHtml(title) || title}</h3>
                    </div>
                    <div class="confirm-body">
                        <p>${PhiLangSecurity?.escapeHtml(message) || message}</p>
                    </div>
                    <div class="confirm-footer">
                        <button class="btn-cancel">${PhiLangSecurity?.escapeHtml(cancelText) || cancelText}</button>
                        <button class="btn-confirm ${dangerous ? 'btn-danger' : ''}">${PhiLangSecurity?.escapeHtml(confirmText) || confirmText}</button>
                    </div>
                </div>
            `;

            function close(result) {
                modal.remove();
                resolve(result);
            }

            modal.querySelector('.confirm-backdrop').addEventListener('click', () => close(false));
            modal.querySelector('.btn-cancel').addEventListener('click', () => close(false));
            modal.querySelector('.btn-confirm').addEventListener('click', () => close(true));

            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    document.removeEventListener('keydown', handler);
                    close(false);
                }
            });

            document.body.appendChild(modal);

            // Inject styles if not present
            if (!document.getElementById('philang-confirm-styles')) {
                const styles = document.createElement('style');
                styles.id = 'philang-confirm-styles';
                styles.textContent = `
                    .philang-confirm-modal {
                        position: fixed;
                        inset: 0;
                        z-index: 10002;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .confirm-backdrop {
                        position: absolute;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.7);
                        backdrop-filter: blur(4px);
                    }
                    .confirm-content {
                        position: relative;
                        background: var(--obsidian, #16141c);
                        border: 1px solid var(--stone, #3d3750);
                        border-radius: 12px;
                        max-width: 400px;
                        width: 90%;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    }
                    .confirm-header {
                        padding: 1rem 1.5rem;
                        border-bottom: 1px solid var(--stone, #3d3750);
                    }
                    .confirm-header h3 {
                        margin: 0;
                        color: var(--pearl, #f5f5f0);
                        font-size: 1.1rem;
                    }
                    .confirm-body {
                        padding: 1.5rem;
                    }
                    .confirm-body p {
                        margin: 0;
                        color: var(--silver, #9992a8);
                    }
                    .confirm-footer {
                        padding: 1rem 1.5rem;
                        border-top: 1px solid var(--stone, #3d3750);
                        display: flex;
                        gap: 0.75rem;
                        justify-content: flex-end;
                    }
                    .confirm-footer button {
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        font-size: 0.875rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .btn-cancel {
                        background: transparent;
                        border: 1px solid var(--stone, #3d3750);
                        color: var(--silver, #9992a8);
                    }
                    .btn-cancel:hover {
                        background: rgba(61, 55, 80, 0.3);
                    }
                    .btn-confirm {
                        background: var(--gold, #d4af37);
                        border: none;
                        color: var(--void, #0a0a0f);
                    }
                    .btn-confirm:hover {
                        background: #c9a227;
                    }
                    .btn-confirm.btn-danger {
                        background: #ef4444;
                        color: white;
                    }
                    .btn-confirm.btn-danger:hover {
                        background: #dc2626;
                    }
                `;
                document.head.appendChild(styles);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION HELPER
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Common page initialization
     * @param {Object} options - Initialization options
     */
    function initPage(options = {}) {
        const {
            mobileMenu = true,
            apiIndicator = true,
            offlineIndicator = true,
            shortcuts = [],
            onReady = null
        } = options;

        // Initialize mobile menu
        if (mobileMenu) {
            initMobileMenu();
        }

        // Initialize API indicator
        if (apiIndicator) {
            initAPIIndicator();
        }

        // Initialize offline indicator
        if (offlineIndicator) {
            initOfflineIndicator();
        }

        // Initialize keyboard shortcuts
        if (shortcuts.length > 0 && typeof PhiLangShortcuts !== 'undefined') {
            PhiLangShortcuts.init(shortcuts);

            // Show hint for new users
            if (PhiLangShortcuts.shouldShowHint()) {
                setTimeout(() => PhiLangShortcuts.showHint(), 2000);
            }
        }

        // Call custom ready handler
        if (onReady) {
            onReady();
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // OFFLINE STATUS INDICATOR
    // ═══════════════════════════════════════════════════════════════════════════

    let offlineIndicator = null;
    let isOffline = !navigator.onLine;

    /**
     * Initialize offline status indicator
     * Shows a banner when the user goes offline
     */
    function initOfflineIndicator() {
        // Create the indicator element
        if (!offlineIndicator) {
            offlineIndicator = document.createElement('div');
            offlineIndicator.id = 'philang-offline-indicator';
            offlineIndicator.setAttribute('role', 'alert');
            offlineIndicator.setAttribute('aria-live', 'polite');
            offlineIndicator.innerHTML = `
                <div class="offline-content">
                    <span class="offline-icon">📡</span>
                    <span class="offline-text">You're offline. Some features may be unavailable.</span>
                    <button class="offline-dismiss" aria-label="Dismiss">×</button>
                </div>
            `;

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                #philang-offline-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                    color: #1a1a2e;
                    padding: 0.75rem 1rem;
                    z-index: 99999;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease-out;
                    font-family: 'Crimson Pro', Georgia, serif;
                }

                #philang-offline-indicator.visible {
                    transform: translateY(0);
                }

                #philang-offline-indicator .offline-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                }

                #philang-offline-indicator .offline-icon {
                    font-size: 1.2rem;
                }

                #philang-offline-indicator .offline-text {
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                #philang-offline-indicator .offline-dismiss {
                    background: rgba(0, 0, 0, 0.1);
                    border: none;
                    color: inherit;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: auto;
                    transition: background 0.2s;
                }

                #philang-offline-indicator .offline-dismiss:hover {
                    background: rgba(0, 0, 0, 0.2);
                }

                /* Online toast notification */
                #philang-online-toast {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%) translateY(100px);
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-family: 'Crimson Pro', Georgia, serif;
                    z-index: 99999;
                    opacity: 0;
                    transition: all 0.3s ease-out;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                #philang-online-toast.visible {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(offlineIndicator);

            // Add dismiss handler
            const dismissBtn = offlineIndicator.querySelector('.offline-dismiss');
            dismissBtn.addEventListener('click', hideOfflineIndicator);
        }

        // Set initial state
        if (!navigator.onLine) {
            showOfflineIndicator();
        }

        // Listen for online/offline events
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    }

    /**
     * Show the offline indicator
     */
    function showOfflineIndicator() {
        isOffline = true;
        if (offlineIndicator) {
            offlineIndicator.classList.add('visible');
        }

        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('philang-offline', {
            detail: { offline: true }
        }));
    }

    /**
     * Hide the offline indicator
     */
    function hideOfflineIndicator() {
        if (offlineIndicator) {
            offlineIndicator.classList.remove('visible');
        }
    }

    /**
     * Handle coming back online
     */
    function handleOnline() {
        isOffline = false;
        hideOfflineIndicator();

        // Show "back online" toast
        showOnlineToast();

        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('philang-online', {
            detail: { offline: false }
        }));
    }

    /**
     * Handle going offline
     */
    function handleOffline() {
        showOfflineIndicator();
    }

    /**
     * Show "back online" toast notification
     */
    function showOnlineToast() {
        let toast = document.getElementById('philang-online-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'philang-online-toast';
            toast.innerHTML = '<span>✓</span><span>You\'re back online</span>';
            document.body.appendChild(toast);
        }

        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 3000);
    }

    /**
     * Get current offline status
     */
    function getOfflineStatus() {
        return {
            isOffline: !navigator.onLine,
            indicatorVisible: offlineIndicator?.classList.contains('visible') || false
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Mobile menu
        initMobileMenu,

        // Dropdowns
        initDropdown,

        // API indicator
        initAPIIndicator,

        // Offline indicator
        initOfflineIndicator,
        getOfflineStatus,

        // Date formatting
        formatRelativeDate,
        formatDate,

        // History lists
        renderHistoryList,

        // Loading states
        setLoading,

        // Dialogs
        confirm,

        // Page initialization
        initPage
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangUI = PhiLangUI;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangUI;
}
