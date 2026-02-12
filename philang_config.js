/**
 * PhiLang Configuration Module
 * Centralized configuration and initialization for all PhiLang pages
 */

const PhiLangConfig = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // VERSION & METADATA
    // ═══════════════════════════════════════════════════════════════════════════

    const VERSION = '1.0.0';
    const BUILD_DATE = '2026-02-12';

    // ═══════════════════════════════════════════════════════════════════════════
    // DEFAULT CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const DEFAULTS = {
        // API settings
        api: {
            defaultModel: 'claude-sonnet-4-20250514',
            maxRetries: 3,
            retryDelay: 1000,
            timeout: 30000
        },

        // UI settings
        ui: {
            theme: 'dark',
            toastPosition: 'bottom-right',
            toastDuration: 3000,
            animationDuration: 300,
            mobileBreakpoint: 768
        },

        // Persistence settings
        persistence: {
            maxSessions: 100,
            maxDialogues: 100,
            maxDerivations: 100,
            maxEmbeddings: 20,
            autoSaveInterval: 30000
        },

        // Feature flags
        features: {
            offlineSupport: true,
            keyboardShortcuts: true,
            exportEnabled: true,
            shareEnabled: true
        },

        // Debug settings
        debug: {
            enabled: false,  // Set to true to enable verbose logging
            logLevel: 'warn' // 'error', 'warn', 'info', 'debug'
        }
    };

    // Current configuration (merged with user preferences)
    let config = { ...DEFAULTS };

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize configuration from localStorage
     */
    function init() {
        try {
            const stored = localStorage.getItem('philang_config');
            if (stored) {
                const parsed = JSON.parse(stored);
                config = deepMerge(DEFAULTS, parsed);
            }
        } catch (e) {
            console.warn('Failed to load config:', e);
        }

        return config;
    }

    /**
     * Get a configuration value
     * @param {string} path - Dot-notation path (e.g., 'api.maxRetries')
     * @param {*} defaultValue - Default if not found
     */
    function get(path, defaultValue = undefined) {
        const parts = path.split('.');
        let value = config;

        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                return defaultValue;
            }
        }

        return value;
    }

    /**
     * Set a configuration value
     * @param {string} path - Dot-notation path
     * @param {*} value - Value to set
     */
    function set(path, value) {
        const parts = path.split('.');
        let obj = config;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!(part in obj) || typeof obj[part] !== 'object') {
                obj[part] = {};
            }
            obj = obj[part];
        }

        obj[parts[parts.length - 1]] = value;
        save();
    }

    /**
     * Save configuration to localStorage
     */
    function save() {
        try {
            localStorage.setItem('philang_config', JSON.stringify(config));
        } catch (e) {
            console.warn('Failed to save config:', e);
        }
    }

    /**
     * Reset configuration to defaults
     */
    function reset() {
        config = { ...DEFAULTS };
        save();
    }

    /**
     * Deep merge objects
     */
    function deepMerge(target, source) {
        const result = { ...target };

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DEBUG LOGGING
    // ═══════════════════════════════════════════════════════════════════════════

    const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

    /**
     * Check if debug logging is enabled
     */
    function isDebugEnabled() {
        return get('debug.enabled', false) || isDev();
    }

    /**
     * Get current log level
     */
    function getLogLevel() {
        return LOG_LEVELS[get('debug.logLevel', 'warn')] || LOG_LEVELS.warn;
    }

    /**
     * Debug log - only outputs in development or when debug is enabled
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    function log(module, message, ...args) {
        if (getLogLevel() >= LOG_LEVELS.debug && isDebugEnabled()) {
            console.log(`[PhiLang/${module}]`, message, ...args);
        }
    }

    /**
     * Info log
     */
    function info(module, message, ...args) {
        if (getLogLevel() >= LOG_LEVELS.info && isDebugEnabled()) {
            console.info(`[PhiLang/${module}]`, message, ...args);
        }
    }

    /**
     * Warning log - always outputs in development
     */
    function warn(module, message, ...args) {
        if (getLogLevel() >= LOG_LEVELS.warn || isDev()) {
            console.warn(`[PhiLang/${module}]`, message, ...args);
        }
    }

    /**
     * Error log - always outputs
     */
    function error(module, message, ...args) {
        console.error(`[PhiLang/${module}]`, message, ...args);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE LOADING
    // ═══════════════════════════════════════════════════════════════════════════

    // Track loaded modules
    const loadedModules = new Set();

    /**
     * Register a module as loaded
     * @param {string} moduleName - Module name
     */
    function registerModule(moduleName) {
        loadedModules.add(moduleName);
        log('config', `Module loaded: ${moduleName}`);
    }

    /**
     * Check if a module is loaded
     * @param {string} moduleName - Module name
     */
    function isModuleLoaded(moduleName) {
        return loadedModules.has(moduleName);
    }

    /**
     * Get list of loaded modules
     */
    function getLoadedModules() {
        return Array.from(loadedModules);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ENVIRONMENT DETECTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Check if running in development mode
     */
    function isDev() {
        return window.location.hostname === 'localhost' ||
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    /**
     * Check if service worker is supported
     */
    function hasServiceWorker() {
        return 'serviceWorker' in navigator;
    }

    /**
     * Check if IndexedDB is available
     */
    function hasIndexedDB() {
        return 'indexedDB' in window;
    }

    /**
     * Check if running on mobile device
     */
    function isMobile() {
        return window.innerWidth < get('ui.mobileBreakpoint', 768);
    }

    /**
     * Check if touch device
     */
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SERVICE WORKER MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Register service worker
     */
    async function registerServiceWorker() {
        if (!hasServiceWorker() || !get('features.offlineSupport', true)) {
            return null;
        }

        try {
            const registration = await navigator.serviceWorker.register('./sw.js');
            log('config', 'Service Worker registered:', registration.scope);
            return registration;
        } catch (err) {
            warn('config', 'Service Worker registration failed:', err);
            return null;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ERROR BOUNDARY SYSTEM
    // ═══════════════════════════════════════════════════════════════════════════

    const errorState = {
        errors: [],
        criticalFailure: false
    };

    /**
     * Log an error and optionally show user notification
     * @param {string} module - Module name where error occurred
     * @param {Error|string} error - The error
     * @param {Object} options - Options for error handling
     */
    function logError(module, error, options = {}) {
        const { silent = false, critical = false, context = {} } = options;

        const errorInfo = {
            module,
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
            timestamp: new Date().toISOString(),
            context
        };

        errorState.errors.push(errorInfo);

        // Always log to console in development
        if (isDev()) {
            console.error(`[PhiLang/${module}]`, error);
        }

        // Mark critical failure
        if (critical) {
            errorState.criticalFailure = true;
        }

        // Show user notification unless silent
        if (!silent && typeof PhiLangToast !== 'undefined') {
            const message = critical
                ? `Critical error in ${module}. Some features may not work.`
                : `Error in ${module}: ${errorInfo.message}`;

            PhiLangToast.error(message, { duration: critical ? 6000 : 4000 });
        }

        return errorInfo;
    }

    /**
     * Wrap an async function with error handling
     * @param {string} module - Module name for error attribution
     * @param {Function} fn - Async function to wrap
     * @param {Object} options - Error handling options
     */
    function withErrorBoundary(module, fn, options = {}) {
        return async function(...args) {
            try {
                return await fn.apply(this, args);
            } catch (error) {
                logError(module, error, options);
                if (options.rethrow) throw error;
                return options.fallback !== undefined ? options.fallback : null;
            }
        };
    }

    /**
     * Safe module initialization wrapper
     * @param {string} moduleName - Name of the module
     * @param {Function} initFn - Initialization function
     * @param {Object} options - Options
     */
    async function safeInitModule(moduleName, initFn, options = {}) {
        const { required = false, fallbackMessage = null } = options;

        try {
            await initFn();
            registerModule(moduleName);
            return true;
        } catch (error) {
            logError(moduleName, error, {
                critical: required,
                silent: !required
            });

            if (fallbackMessage && !required) {
                console.warn(`[PhiLang/${moduleName}] ${fallbackMessage}`);
            }

            return false;
        }
    }

    /**
     * Show critical error overlay for unrecoverable failures
     */
    function showCriticalErrorOverlay(message) {
        // Remove any existing overlay
        const existing = document.getElementById('philang-critical-error');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'philang-critical-error';
        overlay.innerHTML = `
            <div style="
                position: fixed;
                inset: 0;
                background: rgba(10, 10, 15, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                font-family: 'Crimson Pro', Georgia, serif;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border: 1px solid #ef4444;
                    border-radius: 12px;
                    padding: 2rem;
                    max-width: 500px;
                    text-align: center;
                    color: #f5f5f0;
                ">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
                    <h2 style="color: #ef4444; margin-bottom: 1rem; font-size: 1.25rem;">
                        Something went wrong
                    </h2>
                    <p style="color: #9992a8; margin-bottom: 1.5rem; line-height: 1.6;">
                        ${message || 'PhiLang encountered an error and some features may not work correctly.'}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button id="philang-error-reload" style="
                            background: #ef4444;
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-family: inherit;
                        ">Reload Page</button>
                        <button id="philang-error-continue" style="
                            background: transparent;
                            color: #9992a8;
                            border: 1px solid #3d3750;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-family: inherit;
                        ">Continue Anyway</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Add event listeners
        document.getElementById('philang-error-reload').addEventListener('click', () => location.reload());
        document.getElementById('philang-error-continue').addEventListener('click', () => overlay.remove());
    }

    /**
     * Get error state for debugging
     */
    function getErrorState() {
        return { ...errorState };
    }

    /**
     * Set up global error handlers
     */
    function setupGlobalErrorHandlers() {
        // Catch unhandled errors
        window.addEventListener('error', (event) => {
            logError('global', event.error || event.message, {
                context: {
                    filename: event.filename,
                    lineno: event.lineno
                },
                silent: true // Don't spam user with every error
            });
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            logError('promise', event.reason, {
                silent: true
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GLOBAL INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize all PhiLang modules
     * Call this once when the page loads
     */
    async function initializeAll() {
        // Set up global error handlers first
        setupGlobalErrorHandlers();

        // Load configuration
        init();

        // Register service worker
        if (get('features.offlineSupport', true)) {
            await registerServiceWorker();
        }

        // Initialize persistence with error boundary
        if (typeof PhiLangPersistence !== 'undefined') {
            await safeInitModule('persistence',
                () => PhiLangPersistence.init(),
                { required: false, fallbackMessage: 'Data will not be saved between sessions' }
            );
        }

        // Initialize toast system with error boundary
        if (typeof PhiLangToast !== 'undefined') {
            await safeInitModule('toast', () => {
                PhiLangToast.init({
                    position: get('ui.toastPosition'),
                    duration: get('ui.toastDuration')
                });
            }, { required: false });
        }

        // Check for other modules
        if (typeof PhiLangAPI !== 'undefined') registerModule('api');
        if (typeof PhiLangOntology !== 'undefined') registerModule('ontology');
        if (typeof PhiLangShortcuts !== 'undefined') registerModule('shortcuts');
        if (typeof PhiLangSecurity !== 'undefined') registerModule('security');
        if (typeof PhiLangUI !== 'undefined') registerModule('ui');
        if (typeof PhiLangExport !== 'undefined') registerModule('export');
        if (typeof PhiLangURLState !== 'undefined') registerModule('urlstate');
        if (typeof PhiLangSkeleton !== 'undefined') registerModule('skeleton');

        // Log initialization (only in dev/debug mode)
        info('config', `Initialized v${VERSION} with modules:`, getLoadedModules());

        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('philang-ready', {
            detail: {
                version: VERSION,
                modules: getLoadedModules(),
                config,
                errors: errorState.errors.length
            }
        }));
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Metadata
        VERSION,
        BUILD_DATE,
        DEFAULTS,

        // Configuration
        init,
        get,
        set,
        save,
        reset,

        // Module management
        registerModule,
        isModuleLoaded,
        getLoadedModules,

        // Environment
        isDev,
        hasServiceWorker,
        hasIndexedDB,
        isMobile,
        isTouchDevice,

        // Service Worker
        registerServiceWorker,

        // Debug logging
        log,
        info,
        warn,
        error,
        isDebugEnabled,

        // Error boundaries
        logError,
        withErrorBoundary,
        safeInitModule,
        showCriticalErrorOverlay,
        getErrorState,

        // Global init
        initializeAll
    };
})();

// Auto-initialize configuration
PhiLangConfig.init();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangConfig = PhiLangConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangConfig;
}
