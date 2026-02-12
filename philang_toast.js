/**
 * PhiLang Toast Notification System
 * Provides non-intrusive feedback for user actions
 */

const PhiLangToast = (function() {
    'use strict';

    // Toast types with their styling
    const TOAST_TYPES = {
        success: {
            icon: '✓',
            className: 'toast-success'
        },
        error: {
            icon: '✕',
            className: 'toast-error'
        },
        warning: {
            icon: '⚠',
            className: 'toast-warning'
        },
        info: {
            icon: 'ℹ',
            className: 'toast-info'
        },
        philosophy: {
            icon: 'φ',
            className: 'toast-philosophy'
        }
    };

    // Default configuration
    const DEFAULT_CONFIG = {
        duration: 3000,
        position: 'bottom-right',
        maxToasts: 5,
        animationDuration: 300
    };

    let config = { ...DEFAULT_CONFIG };
    let container = null;
    let toastQueue = [];

    /**
     * Initialize the toast container
     */
    function init(userConfig = {}) {
        config = { ...DEFAULT_CONFIG, ...userConfig };

        // Remove existing container if any
        const existing = document.getElementById('philang-toast-container');
        if (existing) {
            existing.remove();
        }

        // Create container
        container = document.createElement('div');
        container.id = 'philang-toast-container';
        container.className = `toast-container toast-${config.position}`;
        document.body.appendChild(container);

        // Inject styles if not already present
        if (!document.getElementById('philang-toast-styles')) {
            injectStyles();
        }

        return PhiLangToast;
    }

    /**
     * Inject toast CSS styles
     */
    function injectStyles() {
        const styles = document.createElement('style');
        styles.id = 'philang-toast-styles';
        styles.textContent = `
            .toast-container {
                position: fixed;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                pointer-events: none;
                max-width: 400px;
                width: calc(100% - 2rem);
            }

            .toast-top-right {
                top: 1rem;
                right: 1rem;
            }

            .toast-top-left {
                top: 1rem;
                left: 1rem;
            }

            .toast-bottom-right {
                bottom: 1rem;
                right: 1rem;
            }

            .toast-bottom-left {
                bottom: 1rem;
                left: 1rem;
            }

            .toast-top-center {
                top: 1rem;
                left: 50%;
                transform: translateX(-50%);
            }

            .toast-bottom-center {
                bottom: 1rem;
                left: 50%;
                transform: translateX(-50%);
            }

            .toast {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                padding: 0.875rem 1rem;
                background: var(--void, #0a0a0f);
                border: 1px solid var(--gold, #d4af37);
                border-radius: 4px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                pointer-events: auto;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: var(--font-body, 'Crimson Text', Georgia, serif);
                color: var(--pearl, #f5f5f0);
            }

            .toast-top-left .toast,
            .toast-bottom-left .toast {
                transform: translateX(-100%);
            }

            .toast-top-center .toast,
            .toast-bottom-center .toast {
                transform: translateY(-20px);
            }

            .toast.toast-visible {
                opacity: 1;
                transform: translateX(0) translateY(0);
            }

            .toast.toast-hiding {
                opacity: 0;
                transform: translateX(100%) scale(0.95);
            }

            .toast-top-left .toast.toast-hiding,
            .toast-bottom-left .toast.toast-hiding {
                transform: translateX(-100%) scale(0.95);
            }

            .toast-top-center .toast.toast-hiding,
            .toast-bottom-center .toast.toast-hiding {
                transform: translateY(-20px) scale(0.95);
            }

            .toast-icon {
                font-size: 1.25rem;
                line-height: 1;
                flex-shrink: 0;
                width: 1.5rem;
                text-align: center;
            }

            .toast-content {
                flex: 1;
                min-width: 0;
            }

            .toast-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
                font-size: 0.95rem;
            }

            .toast-message {
                font-size: 0.875rem;
                opacity: 0.9;
                line-height: 1.4;
            }

            .toast-close {
                background: none;
                border: none;
                color: var(--pearl, #f5f5f0);
                cursor: pointer;
                padding: 0;
                font-size: 1rem;
                opacity: 0.5;
                transition: opacity 0.2s;
                flex-shrink: 0;
            }

            .toast-close:hover {
                opacity: 1;
            }

            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--gold, #d4af37);
                border-radius: 0 0 4px 4px;
                transition: width linear;
            }

            /* Type-specific styles */
            .toast-success {
                border-color: #4caf50;
            }
            .toast-success .toast-icon {
                color: #4caf50;
            }
            .toast-success .toast-progress {
                background: #4caf50;
            }

            .toast-error {
                border-color: #f44336;
            }
            .toast-error .toast-icon {
                color: #f44336;
            }
            .toast-error .toast-progress {
                background: #f44336;
            }

            .toast-warning {
                border-color: #ff9800;
            }
            .toast-warning .toast-icon {
                color: #ff9800;
            }
            .toast-warning .toast-progress {
                background: #ff9800;
            }

            .toast-info {
                border-color: #2196f3;
            }
            .toast-info .toast-icon {
                color: #2196f3;
            }
            .toast-info .toast-progress {
                background: #2196f3;
            }

            .toast-philosophy {
                border-color: var(--gold, #d4af37);
            }
            .toast-philosophy .toast-icon {
                color: var(--gold, #d4af37);
                font-family: var(--font-display, 'Cinzel', serif);
            }
            .toast-philosophy .toast-progress {
                background: var(--gold, #d4af37);
            }

            /* Mobile adjustments */
            @media (max-width: 480px) {
                .toast-container {
                    left: 0.5rem !important;
                    right: 0.5rem !important;
                    width: auto;
                    max-width: none;
                    transform: none !important;
                }

                .toast-top-center,
                .toast-bottom-center {
                    left: 0.5rem !important;
                }

                .toast {
                    padding: 0.75rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Show a toast notification
     * @param {Object} options - Toast options
     * @returns {Object} Toast instance with dismiss method
     */
    function show(options) {
        if (!container) {
            init();
        }

        const {
            type = 'info',
            title = '',
            message = '',
            duration = config.duration,
            showProgress = true,
            closable = true,
            onClick = null
        } = typeof options === 'string' ? { message: options } : options;

        const typeConfig = TOAST_TYPES[type] || TOAST_TYPES.info;

        // Enforce max toasts
        while (toastQueue.length >= config.maxToasts) {
            const oldest = toastQueue.shift();
            if (oldest) dismissToast(oldest);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${typeConfig.className}`;
        toast.style.position = 'relative';
        toast.innerHTML = `
            <span class="toast-icon">${typeConfig.icon}</span>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            ${closable ? '<button class="toast-close" aria-label="Dismiss">×</button>' : ''}
            ${showProgress && duration > 0 ? '<div class="toast-progress"></div>' : ''}
        `;

        // Add click handler
        if (onClick) {
            toast.style.cursor = 'pointer';
            toast.addEventListener('click', (e) => {
                if (!e.target.classList.contains('toast-close')) {
                    onClick();
                }
            });
        }

        // Add close button handler
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => dismissToast(toast));
        }

        // Add to container
        container.appendChild(toast);
        toastQueue.push(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('toast-visible');

            // Start progress animation
            if (showProgress && duration > 0) {
                const progress = toast.querySelector('.toast-progress');
                if (progress) {
                    progress.style.width = '100%';
                    progress.style.transitionDuration = `${duration}ms`;
                    requestAnimationFrame(() => {
                        progress.style.width = '0%';
                    });
                }
            }
        });

        // Auto-dismiss
        let timeoutId = null;
        if (duration > 0) {
            timeoutId = setTimeout(() => dismissToast(toast), duration);
        }

        // Return toast instance
        return {
            element: toast,
            dismiss: () => {
                if (timeoutId) clearTimeout(timeoutId);
                dismissToast(toast);
            }
        };
    }

    /**
     * Dismiss a toast
     */
    function dismissToast(toast) {
        if (!toast || !toast.parentNode) return;

        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hiding');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            const index = toastQueue.indexOf(toast);
            if (index > -1) {
                toastQueue.splice(index, 1);
            }
        }, config.animationDuration);
    }

    /**
     * Dismiss all toasts
     */
    function dismissAll() {
        [...toastQueue].forEach(dismissToast);
    }

    // Convenience methods for each type
    function success(message, options = {}) {
        return show({ ...options, type: 'success', message });
    }

    function error(message, options = {}) {
        return show({ ...options, type: 'error', message, duration: options.duration || 5000 });
    }

    function warning(message, options = {}) {
        return show({ ...options, type: 'warning', message });
    }

    function info(message, options = {}) {
        return show({ ...options, type: 'info', message });
    }

    function philosophy(message, options = {}) {
        return show({ ...options, type: 'philosophy', message });
    }

    // PhiLang-specific toasts
    function saved(itemType = 'item') {
        return success(`${itemType} saved successfully`);
    }

    function loaded(itemType = 'item') {
        return info(`${itemType} loaded`);
    }

    function deleted(itemType = 'item') {
        return warning(`${itemType} deleted`);
    }

    function exported(itemType = 'data') {
        return success(`${itemType} exported to clipboard`);
    }

    function apiError(errorMessage = 'API request failed') {
        return error(errorMessage, { title: 'Connection Error' });
    }

    function validationError(message) {
        return warning(message, { title: 'Validation' });
    }

    // Public API
    return {
        init,
        show,
        success,
        error,
        warning,
        info,
        philosophy,
        dismissAll,
        // PhiLang-specific
        saved,
        loaded,
        deleted,
        exported,
        apiError,
        validationError
    };
})();

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PhiLangToast.init());
} else {
    PhiLangToast.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangToast;
}
