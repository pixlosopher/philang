/**
 * PhiLang Performance Monitoring
 * Tracks page load, API calls, and user interactions
 */

const PhiLangPerformance = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const CONFIG = {
        enabled: true,
        sampleRate: 1.0, // 1.0 = 100% of events
        maxStoredMetrics: 100,
        storageKey: 'philang_performance_metrics'
    };

    // Metrics storage
    const metrics = {
        pageLoads: [],
        apiCalls: [],
        interactions: [],
        errors: [],
        resources: []
    };

    // Timing marks
    const marks = {};

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize performance monitoring
     */
    function init() {
        if (!CONFIG.enabled) return;

        // Track page load performance
        if (document.readyState === 'complete') {
            trackPageLoad();
        } else {
            window.addEventListener('load', trackPageLoad);
        }

        // Track long tasks (if supported)
        if ('PerformanceObserver' in window) {
            try {
                // Long tasks
                const longTaskObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        recordMetric('longTask', {
                            duration: entry.duration,
                            startTime: entry.startTime,
                            name: entry.name
                        });
                    }
                });
                longTaskObserver.observe({ entryTypes: ['longtask'] });

                // Resource timing
                const resourceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (shouldSample()) {
                            metrics.resources.push({
                                name: entry.name,
                                type: entry.initiatorType,
                                duration: entry.duration,
                                size: entry.transferSize,
                                timestamp: Date.now()
                            });
                            trimMetrics('resources');
                        }
                    }
                });
                resourceObserver.observe({ entryTypes: ['resource'] });
            } catch (e) {
                // PerformanceObserver not fully supported
            }
        }

        // Listen for API throttle events
        window.addEventListener('philang-api-throttled', (e) => {
            recordMetric('apiThrottle', {
                waitTime: e.detail.waitTime,
                reason: e.detail.reason
            });
        });

        // Listen for offline events
        window.addEventListener('philang-offline', () => {
            recordMetric('offline', { online: false });
        });

        window.addEventListener('philang-online', () => {
            recordMetric('offline', { online: true });
        });

        log('Performance monitoring initialized');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PAGE LOAD TRACKING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Track page load performance
     */
    function trackPageLoad() {
        if (!CONFIG.enabled || !shouldSample()) return;

        const timing = performance.timing || {};
        const navigation = performance.getEntriesByType('navigation')[0] || {};

        const pageLoadMetrics = {
            page: window.location.pathname,
            timestamp: Date.now(),

            // Navigation timing
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            tcp: timing.connectEnd - timing.connectStart,
            ttfb: timing.responseStart - timing.requestStart,
            download: timing.responseEnd - timing.responseStart,
            domParsing: timing.domInteractive - timing.responseEnd,
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            load: timing.loadEventEnd - timing.navigationStart,

            // Modern metrics (if available)
            fcp: getFirstContentfulPaint(),
            lcp: getLargestContentfulPaint(),

            // Resource counts
            resourceCount: performance.getEntriesByType('resource').length,
            jsCount: performance.getEntriesByType('resource')
                .filter(r => r.initiatorType === 'script').length,
            cssCount: performance.getEntriesByType('resource')
                .filter(r => r.initiatorType === 'link' || r.initiatorType === 'css').length,

            // Memory (if available)
            memory: getMemoryUsage()
        };

        metrics.pageLoads.push(pageLoadMetrics);
        trimMetrics('pageLoads');

        log('Page load tracked', pageLoadMetrics);
    }

    /**
     * Get First Contentful Paint
     */
    function getFirstContentfulPaint() {
        try {
            const entries = performance.getEntriesByName('first-contentful-paint');
            return entries.length > 0 ? entries[0].startTime : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Get Largest Contentful Paint
     */
    function getLargestContentfulPaint() {
        try {
            const entries = performance.getEntriesByType('largest-contentful-paint');
            return entries.length > 0 ? entries[entries.length - 1].startTime : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Get memory usage (Chrome only)
     */
    function getMemoryUsage() {
        if (performance.memory) {
            return {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // API CALL TRACKING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Track an API call
     * @param {string} endpoint - API endpoint called
     * @param {number} duration - Call duration in ms
     * @param {boolean} success - Whether call succeeded
     * @param {Object} metadata - Additional metadata
     */
    function trackApiCall(endpoint, duration, success, metadata = {}) {
        if (!CONFIG.enabled || !shouldSample()) return;

        const apiMetric = {
            endpoint,
            duration,
            success,
            timestamp: Date.now(),
            ...metadata
        };

        metrics.apiCalls.push(apiMetric);
        trimMetrics('apiCalls');

        log('API call tracked', apiMetric);
    }

    /**
     * Create a wrapper for tracking async API calls
     * @param {string} name - Operation name
     * @param {Function} fn - Async function to track
     */
    function trackAsync(name, fn) {
        return async function(...args) {
            const start = performance.now();
            let success = true;
            let error = null;

            try {
                const result = await fn.apply(this, args);
                return result;
            } catch (e) {
                success = false;
                error = e.message;
                throw e;
            } finally {
                const duration = performance.now() - start;
                trackApiCall(name, duration, success, { error });
            }
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // USER INTERACTION TRACKING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Track user interaction
     * @param {string} action - Action name (e.g., 'click', 'submit')
     * @param {string} target - Target element or feature
     * @param {Object} data - Additional data
     */
    function trackInteraction(action, target, data = {}) {
        if (!CONFIG.enabled || !shouldSample()) return;

        const interaction = {
            action,
            target,
            timestamp: Date.now(),
            page: window.location.pathname,
            ...data
        };

        metrics.interactions.push(interaction);
        trimMetrics('interactions');

        log('Interaction tracked', interaction);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CUSTOM TIMING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Start a timing mark
     * @param {string} name - Mark name
     */
    function mark(name) {
        marks[name] = performance.now();
        if (performance.mark) {
            performance.mark(`philang_${name}`);
        }
    }

    /**
     * Measure time since a mark
     * @param {string} name - Mark name
     * @returns {number} Duration in ms
     */
    function measure(name) {
        if (!marks[name]) return null;

        const duration = performance.now() - marks[name];

        if (performance.measure) {
            try {
                performance.measure(`philang_${name}_duration`, `philang_${name}`);
            } catch (e) {
                // Measure may fail if mark doesn't exist
            }
        }

        return duration;
    }

    /**
     * End a mark and record the duration
     * @param {string} name - Mark name
     * @param {Object} metadata - Additional metadata
     */
    function endMark(name, metadata = {}) {
        const duration = measure(name);
        if (duration !== null) {
            recordMetric('timing', {
                name,
                duration,
                ...metadata
            });
            delete marks[name];
        }
        return duration;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // METRICS MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Record a generic metric
     */
    function recordMetric(type, data) {
        if (!CONFIG.enabled) return;

        const metric = {
            type,
            timestamp: Date.now(),
            ...data
        };

        // Store in appropriate bucket or create new one
        if (!metrics[type]) {
            metrics[type] = [];
        }
        metrics[type].push(metric);
        trimMetrics(type);
    }

    /**
     * Trim metrics to max size
     */
    function trimMetrics(type) {
        if (metrics[type] && metrics[type].length > CONFIG.maxStoredMetrics) {
            metrics[type] = metrics[type].slice(-CONFIG.maxStoredMetrics);
        }
    }

    /**
     * Get all metrics
     */
    function getMetrics() {
        return { ...metrics };
    }

    /**
     * Get metrics summary
     */
    function getSummary() {
        const summary = {
            pageLoads: metrics.pageLoads.length,
            apiCalls: {
                total: metrics.apiCalls.length,
                successful: metrics.apiCalls.filter(c => c.success).length,
                failed: metrics.apiCalls.filter(c => !c.success).length,
                avgDuration: average(metrics.apiCalls.map(c => c.duration))
            },
            interactions: metrics.interactions.length,
            resources: metrics.resources.length
        };

        // Latest page load metrics
        if (metrics.pageLoads.length > 0) {
            const latest = metrics.pageLoads[metrics.pageLoads.length - 1];
            summary.latestPageLoad = {
                load: latest.load,
                fcp: latest.fcp,
                lcp: latest.lcp,
                resourceCount: latest.resourceCount
            };
        }

        return summary;
    }

    /**
     * Clear all metrics
     */
    function clearMetrics() {
        Object.keys(metrics).forEach(key => {
            metrics[key] = [];
        });
    }

    /**
     * Export metrics as JSON
     */
    function exportMetrics() {
        return JSON.stringify({
            exported: new Date().toISOString(),
            userAgent: navigator.userAgent,
            metrics
        }, null, 2);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Sampling check
     */
    function shouldSample() {
        return Math.random() < CONFIG.sampleRate;
    }

    /**
     * Calculate average
     */
    function average(arr) {
        if (!arr || arr.length === 0) return 0;
        const valid = arr.filter(n => typeof n === 'number' && !isNaN(n));
        if (valid.length === 0) return 0;
        return valid.reduce((a, b) => a + b, 0) / valid.length;
    }

    /**
     * Debug logging
     */
    function log(message, data) {
        if (typeof PhiLangConfig !== 'undefined' && PhiLangConfig.isDebugEnabled()) {
            PhiLangConfig.log('performance', message, data);
        }
    }

    /**
     * Set configuration
     */
    function configure(options) {
        Object.assign(CONFIG, options);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Initialization
        init,
        configure,

        // Tracking
        trackPageLoad,
        trackApiCall,
        trackAsync,
        trackInteraction,

        // Custom timing
        mark,
        measure,
        endMark,

        // Metrics access
        getMetrics,
        getSummary,
        clearMetrics,
        exportMetrics,
        recordMetric
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangPerformance = PhiLangPerformance;

    // Auto-initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', PhiLangPerformance.init);
    } else {
        PhiLangPerformance.init();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangPerformance;
}
