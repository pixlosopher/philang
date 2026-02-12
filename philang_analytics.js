/**
 * PhiLang Analytics
 * Privacy-respecting telemetry hooks for understanding usage patterns
 *
 * IMPORTANT: This module is designed to be privacy-respecting:
 * - All data stays local by default
 * - No external tracking services
 * - No PII collection
 * - User must opt-in for any data export
 */

const PhiLangAnalytics = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const CONFIG = {
        enabled: true,
        storageKey: 'philang_analytics',
        maxEvents: 500,
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        anonymizeData: true // Remove any potential identifiers
    };

    // Event categories
    const CATEGORIES = {
        NAVIGATION: 'navigation',
        INTERACTION: 'interaction',
        API: 'api',
        ERROR: 'error',
        FEATURE: 'feature',
        SESSION: 'session'
    };

    // Analytics storage
    let events = [];
    let sessionId = null;
    let sessionStart = null;
    let lastActivity = null;

    // Custom event handlers
    const handlers = new Map();

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize analytics
     */
    function init() {
        if (!CONFIG.enabled) return;

        // Load stored events
        loadEvents();

        // Start new session
        startSession();

        // Track page view
        trackPageView();

        // Setup automatic tracking
        setupAutoTracking();

        log('Analytics initialized');
    }

    /**
     * Load events from storage
     */
    function loadEvents() {
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            if (stored) {
                events = JSON.parse(stored);
                trimEvents();
            }
        } catch (e) {
            events = [];
        }
    }

    /**
     * Save events to storage
     */
    function saveEvents() {
        try {
            trimEvents();
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(events));
        } catch (e) {
            // Storage full or disabled
        }
    }

    /**
     * Trim events to max size
     */
    function trimEvents() {
        if (events.length > CONFIG.maxEvents) {
            events = events.slice(-CONFIG.maxEvents);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SESSION MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Start or resume session
     */
    function startSession() {
        const now = Date.now();

        // Check if we should resume existing session
        if (sessionId && lastActivity && (now - lastActivity) < CONFIG.sessionTimeout) {
            // Resume session
            lastActivity = now;
            return;
        }

        // Start new session
        sessionId = generateSessionId();
        sessionStart = now;
        lastActivity = now;

        track(CATEGORIES.SESSION, 'start', {
            referrer: document.referrer ? anonymizeUrl(document.referrer) : null,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            touch: 'ontouchstart' in window
        });
    }

    /**
     * End current session
     */
    function endSession() {
        if (!sessionId) return;

        const duration = Date.now() - sessionStart;

        track(CATEGORIES.SESSION, 'end', {
            duration,
            pageViews: events.filter(e =>
                e.sessionId === sessionId && e.action === 'pageView'
            ).length
        });

        sessionId = null;
        sessionStart = null;
    }

    /**
     * Generate anonymous session ID
     */
    function generateSessionId() {
        return 'sess_' + Math.random().toString(36).substring(2, 15);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENT TRACKING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Track an event
     * @param {string} category - Event category
     * @param {string} action - Action name
     * @param {Object} data - Event data
     */
    function track(category, action, data = {}) {
        if (!CONFIG.enabled) return;

        // Update session activity
        lastActivity = Date.now();

        const event = {
            category,
            action,
            data: CONFIG.anonymizeData ? anonymizeData(data) : data,
            timestamp: Date.now(),
            sessionId,
            page: window.location.pathname
        };

        events.push(event);
        saveEvents();

        // Notify custom handlers
        notifyHandlers(category, action, data);

        log('Event tracked', event);
    }

    /**
     * Track page view
     */
    function trackPageView() {
        track(CATEGORIES.NAVIGATION, 'pageView', {
            title: document.title,
            path: window.location.pathname
        });
    }

    /**
     * Track feature usage
     * @param {string} feature - Feature name
     * @param {Object} data - Additional data
     */
    function trackFeature(feature, data = {}) {
        track(CATEGORIES.FEATURE, feature, data);
    }

    /**
     * Track API call
     * @param {string} endpoint - API endpoint
     * @param {number} duration - Call duration
     * @param {boolean} success - Success status
     */
    function trackApiCall(endpoint, duration, success) {
        track(CATEGORIES.API, 'call', {
            endpoint: anonymizeEndpoint(endpoint),
            duration,
            success
        });
    }

    /**
     * Track error
     * @param {string} type - Error type
     * @param {string} message - Error message (anonymized)
     */
    function trackError(type, message) {
        track(CATEGORIES.ERROR, type, {
            message: anonymizeError(message)
        });
    }

    /**
     * Track interaction
     * @param {string} element - Element identifier
     * @param {string} action - Action type (click, submit, etc.)
     */
    function trackInteraction(element, action) {
        track(CATEGORIES.INTERACTION, action, {
            element
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // AUTOMATIC TRACKING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Setup automatic event tracking
     */
    function setupAutoTracking() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                track(CATEGORIES.SESSION, 'hidden');
            } else {
                track(CATEGORIES.SESSION, 'visible');
            }
        });

        // Track before unload
        window.addEventListener('beforeunload', () => {
            endSession();
        });

        // Track history changes (SPA navigation)
        window.addEventListener('popstate', () => {
            trackPageView();
        });

        // Track feature flag changes
        window.addEventListener('philang-feature-changed', (e) => {
            trackFeature(e.detail.feature, {
                enabled: e.detail.enabled
            });
        });

        // Track offline/online
        window.addEventListener('philang-offline', () => {
            track(CATEGORIES.SESSION, 'offline');
        });

        window.addEventListener('philang-online', () => {
            track(CATEGORIES.SESSION, 'online');
        });

        // Track API throttling
        window.addEventListener('philang-api-throttled', (e) => {
            track(CATEGORIES.API, 'throttled', {
                waitTime: e.detail.waitTime
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CUSTOM HANDLERS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Register a custom event handler
     * @param {string} category - Category to listen to (or '*' for all)
     * @param {Function} handler - Handler function(category, action, data)
     * @returns {Function} Unsubscribe function
     */
    function onEvent(category, handler) {
        if (!handlers.has(category)) {
            handlers.set(category, new Set());
        }
        handlers.get(category).add(handler);

        return () => {
            handlers.get(category)?.delete(handler);
        };
    }

    /**
     * Notify registered handlers
     */
    function notifyHandlers(category, action, data) {
        // Category-specific handlers
        handlers.get(category)?.forEach(h => {
            try {
                h(category, action, data);
            } catch (e) {
                // Ignore handler errors
            }
        });

        // Wildcard handlers
        handlers.get('*')?.forEach(h => {
            try {
                h(category, action, data);
            } catch (e) {
                // Ignore handler errors
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ANALYTICS DATA
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Get all events
     */
    function getEvents() {
        return [...events];
    }

    /**
     * Get events by category
     */
    function getEventsByCategory(category) {
        return events.filter(e => e.category === category);
    }

    /**
     * Get session events
     */
    function getSessionEvents() {
        return events.filter(e => e.sessionId === sessionId);
    }

    /**
     * Get analytics summary
     */
    function getSummary() {
        const now = Date.now();
        const last24h = events.filter(e => now - e.timestamp < 86400000);
        const last7d = events.filter(e => now - e.timestamp < 604800000);

        return {
            totalEvents: events.length,
            last24h: last24h.length,
            last7d: last7d.length,
            currentSession: {
                id: sessionId,
                duration: sessionStart ? now - sessionStart : 0,
                events: getSessionEvents().length
            },
            byCategory: Object.values(CATEGORIES).reduce((acc, cat) => {
                acc[cat] = events.filter(e => e.category === cat).length;
                return acc;
            }, {}),
            topFeatures: getTopFeatures(),
            errorRate: calculateErrorRate()
        };
    }

    /**
     * Get top used features
     */
    function getTopFeatures() {
        const featureEvents = events.filter(e => e.category === CATEGORIES.FEATURE);
        const counts = {};

        featureEvents.forEach(e => {
            counts[e.action] = (counts[e.action] || 0) + 1;
        });

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([feature, count]) => ({ feature, count }));
    }

    /**
     * Calculate error rate
     */
    function calculateErrorRate() {
        const totalApi = events.filter(e =>
            e.category === CATEGORIES.API && e.action === 'call'
        ).length;

        const failedApi = events.filter(e =>
            e.category === CATEGORIES.API &&
            e.action === 'call' &&
            e.data?.success === false
        ).length;

        return totalApi > 0 ? (failedApi / totalApi * 100).toFixed(2) : 0;
    }

    /**
     * Clear all analytics data
     */
    function clearData() {
        events = [];
        localStorage.removeItem(CONFIG.storageKey);
        log('Analytics data cleared');
    }

    /**
     * Export analytics data
     */
    function exportData() {
        return JSON.stringify({
            exported: new Date().toISOString(),
            summary: getSummary(),
            events
        }, null, 2);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ANONYMIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Anonymize data object
     */
    function anonymizeData(data) {
        const anonymized = { ...data };

        // Remove any potential identifiers
        delete anonymized.ip;
        delete anonymized.userId;
        delete anonymized.email;
        delete anonymized.name;

        // Anonymize URLs
        if (anonymized.url) {
            anonymized.url = anonymizeUrl(anonymized.url);
        }

        return anonymized;
    }

    /**
     * Anonymize URL (remove query params, hash)
     */
    function anonymizeUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.pathname;
        } catch (e) {
            return '[invalid-url]';
        }
    }

    /**
     * Anonymize API endpoint
     */
    function anonymizeEndpoint(endpoint) {
        // Remove any IDs or dynamic segments
        return endpoint.replace(/\/[a-f0-9-]{36}/gi, '/:id')
                       .replace(/\/\d+/g, '/:id');
    }

    /**
     * Anonymize error message
     */
    function anonymizeError(message) {
        // Remove potential PII from error messages
        return message
            .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email]')
            .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[card]')
            .replace(/sk-[a-zA-Z0-9-]+/g, '[api-key]');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Debug logging
     */
    function log(message, data) {
        if (typeof PhiLangConfig !== 'undefined' && PhiLangConfig.isDebugEnabled()) {
            PhiLangConfig.log('analytics', message, data);
        }
    }

    /**
     * Enable/disable analytics
     */
    function setEnabled(enabled) {
        CONFIG.enabled = enabled;
        if (!enabled) {
            endSession();
        }
    }

    /**
     * Check if analytics is enabled
     */
    function isEnabled() {
        return CONFIG.enabled;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Initialization
        init,

        // Tracking
        track,
        trackPageView,
        trackFeature,
        trackApiCall,
        trackError,
        trackInteraction,

        // Custom handlers
        onEvent,

        // Data access
        getEvents,
        getEventsByCategory,
        getSessionEvents,
        getSummary,

        // Data management
        clearData,
        exportData,

        // Control
        setEnabled,
        isEnabled,

        // Constants
        CATEGORIES
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangAnalytics = PhiLangAnalytics;

    // Auto-initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', PhiLangAnalytics.init);
    } else {
        PhiLangAnalytics.init();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangAnalytics;
}
