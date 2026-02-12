/**
 * PhiLang Feature Flags
 * Enable/disable features dynamically without code changes
 */

const PhiLangFeatures = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // DEFAULT FEATURE FLAGS
    // ═══════════════════════════════════════════════════════════════════════════

    const DEFAULT_FLAGS = {
        // Core features
        offlineMode: {
            enabled: true,
            description: 'Enable offline mode with service worker caching'
        },
        darkMode: {
            enabled: true,
            description: 'Enable dark mode theme (default)'
        },

        // API features
        apiStreaming: {
            enabled: true,
            description: 'Enable streaming responses from Claude API'
        },
        apiRateLimiting: {
            enabled: true,
            description: 'Enable client-side API rate limiting'
        },

        // UI features
        keyboardShortcuts: {
            enabled: true,
            description: 'Enable keyboard shortcuts (?)'
        },
        offlineIndicator: {
            enabled: true,
            description: 'Show offline status indicator'
        },
        toastNotifications: {
            enabled: true,
            description: 'Enable toast notifications'
        },

        // Module features
        socraticCounsel: {
            enabled: true,
            description: 'Enable Socratic Counsel module'
        },
        dialecticalDialogue: {
            enabled: true,
            description: 'Enable Dialectical Dialogue module'
        },
        derivationGraph: {
            enabled: true,
            description: 'Enable Derivation Graph visualization'
        },
        embeddings: {
            enabled: true,
            description: 'Enable Embeddings explorer'
        },
        embeddingsAdvanced: {
            enabled: true,
            description: 'Enable Advanced Embeddings with training'
        },

        // Export features
        exportLatex: {
            enabled: true,
            description: 'Enable LaTeX export'
        },
        exportPdf: {
            enabled: true,
            description: 'Enable PDF export (requires jsPDF)'
        },
        exportJson: {
            enabled: true,
            description: 'Enable JSON export'
        },

        // Experimental features
        aiSuggestions: {
            enabled: false,
            description: '[Experimental] AI-powered concept suggestions'
        },
        voiceInput: {
            enabled: false,
            description: '[Experimental] Voice input for queries'
        },
        collaborativeMode: {
            enabled: false,
            description: '[Experimental] Real-time collaboration'
        },

        // Debug features
        debugMode: {
            enabled: false,
            description: 'Enable debug logging'
        },
        performanceMonitoring: {
            enabled: true,
            description: 'Enable performance monitoring'
        },
        errorReporting: {
            enabled: true,
            description: 'Enable error reporting'
        }
    };

    // Storage key
    const STORAGE_KEY = 'philang_feature_flags';

    // Current flags (merged with defaults)
    let flags = {};

    // Event listeners
    const listeners = new Map();

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize feature flags
     */
    function init() {
        // Load saved flags
        const saved = loadFromStorage();

        // Merge with defaults (saved values take precedence)
        flags = {};
        Object.keys(DEFAULT_FLAGS).forEach(key => {
            flags[key] = {
                ...DEFAULT_FLAGS[key],
                enabled: saved[key] !== undefined ? saved[key] : DEFAULT_FLAGS[key].enabled
            };
        });

        // Check URL overrides (e.g., ?feature_debugMode=true)
        applyUrlOverrides();

        log('Feature flags initialized', flags);
    }

    /**
     * Load flags from localStorage
     */
    function loadFromStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    /**
     * Save flags to localStorage
     */
    function saveToStorage() {
        try {
            const toSave = {};
            Object.keys(flags).forEach(key => {
                toSave[key] = flags[key].enabled;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (e) {
            console.error('Failed to save feature flags:', e);
        }
    }

    /**
     * Apply URL parameter overrides
     * Example: ?feature_debugMode=true&feature_aiSuggestions=true
     */
    function applyUrlOverrides() {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            if (key.startsWith('feature_')) {
                const flagName = key.replace('feature_', '');
                if (flags[flagName]) {
                    const enabled = value === 'true' || value === '1';
                    flags[flagName].enabled = enabled;
                    log(`URL override: ${flagName} = ${enabled}`);
                }
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FEATURE FLAG API
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Check if a feature is enabled
     * @param {string} feature - Feature name
     * @returns {boolean}
     */
    function isEnabled(feature) {
        return flags[feature]?.enabled ?? false;
    }

    /**
     * Enable a feature
     * @param {string} feature - Feature name
     */
    function enable(feature) {
        if (flags[feature]) {
            const wasEnabled = flags[feature].enabled;
            flags[feature].enabled = true;
            saveToStorage();

            if (!wasEnabled) {
                notifyListeners(feature, true);
            }
        }
    }

    /**
     * Disable a feature
     * @param {string} feature - Feature name
     */
    function disable(feature) {
        if (flags[feature]) {
            const wasEnabled = flags[feature].enabled;
            flags[feature].enabled = false;
            saveToStorage();

            if (wasEnabled) {
                notifyListeners(feature, false);
            }
        }
    }

    /**
     * Toggle a feature
     * @param {string} feature - Feature name
     * @returns {boolean} New state
     */
    function toggle(feature) {
        if (flags[feature]) {
            flags[feature].enabled = !flags[feature].enabled;
            saveToStorage();
            notifyListeners(feature, flags[feature].enabled);
            return flags[feature].enabled;
        }
        return false;
    }

    /**
     * Set multiple features at once
     * @param {Object} features - { featureName: boolean }
     */
    function setMultiple(features) {
        Object.keys(features).forEach(key => {
            if (flags[key]) {
                const wasEnabled = flags[key].enabled;
                flags[key].enabled = Boolean(features[key]);

                if (wasEnabled !== flags[key].enabled) {
                    notifyListeners(key, flags[key].enabled);
                }
            }
        });
        saveToStorage();
    }

    /**
     * Reset all flags to defaults
     */
    function resetToDefaults() {
        Object.keys(DEFAULT_FLAGS).forEach(key => {
            flags[key] = { ...DEFAULT_FLAGS[key] };
        });
        saveToStorage();
        log('Feature flags reset to defaults');
    }

    /**
     * Get all feature flags
     * @returns {Object} All flags with their states
     */
    function getAll() {
        return { ...flags };
    }

    /**
     * Get enabled features
     * @returns {string[]} Names of enabled features
     */
    function getEnabled() {
        return Object.keys(flags).filter(key => flags[key].enabled);
    }

    /**
     * Get disabled features
     * @returns {string[]} Names of disabled features
     */
    function getDisabled() {
        return Object.keys(flags).filter(key => !flags[key].enabled);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CONDITIONAL EXECUTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Run code only if feature is enabled
     * @param {string} feature - Feature name
     * @param {Function} fn - Function to run
     * @param {Function} fallback - Optional fallback function
     */
    function when(feature, fn, fallback = null) {
        if (isEnabled(feature)) {
            return fn();
        } else if (fallback) {
            return fallback();
        }
        return undefined;
    }

    /**
     * Run code only if ALL features are enabled
     * @param {string[]} features - Feature names
     * @param {Function} fn - Function to run
     */
    function whenAll(features, fn, fallback = null) {
        if (features.every(f => isEnabled(f))) {
            return fn();
        } else if (fallback) {
            return fallback();
        }
        return undefined;
    }

    /**
     * Run code only if ANY feature is enabled
     * @param {string[]} features - Feature names
     * @param {Function} fn - Function to run
     */
    function whenAny(features, fn, fallback = null) {
        if (features.some(f => isEnabled(f))) {
            return fn();
        } else if (fallback) {
            return fallback();
        }
        return undefined;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENT LISTENERS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Subscribe to feature flag changes
     * @param {string} feature - Feature name (or '*' for all)
     * @param {Function} callback - Called with (featureName, enabled)
     * @returns {Function} Unsubscribe function
     */
    function subscribe(feature, callback) {
        if (!listeners.has(feature)) {
            listeners.set(feature, new Set());
        }
        listeners.get(feature).add(callback);

        // Return unsubscribe function
        return () => {
            listeners.get(feature)?.delete(callback);
        };
    }

    /**
     * Notify listeners of flag change
     */
    function notifyListeners(feature, enabled) {
        // Notify feature-specific listeners
        listeners.get(feature)?.forEach(cb => {
            try {
                cb(feature, enabled);
            } catch (e) {
                console.error('Feature flag listener error:', e);
            }
        });

        // Notify wildcard listeners
        listeners.get('*')?.forEach(cb => {
            try {
                cb(feature, enabled);
            } catch (e) {
                console.error('Feature flag listener error:', e);
            }
        });

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('philang-feature-changed', {
            detail: { feature, enabled }
        }));
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DEBUG UI
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Show feature flags debug panel
     */
    function showDebugPanel() {
        let panel = document.getElementById('philang-features-debug');

        if (panel) {
            panel.remove();
            return;
        }

        panel = document.createElement('div');
        panel.id = 'philang-features-debug';
        panel.innerHTML = `
            <style>
                #philang-features-debug {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border: 1px solid #4a9eff;
                    border-radius: 12px;
                    padding: 1.5rem;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow-y: auto;
                    z-index: 100000;
                    font-family: 'Crimson Pro', Georgia, serif;
                    color: #f5f5f0;
                    box-shadow: 0 20px 60px rgba(74, 158, 255, 0.3);
                }

                #philang-features-debug h3 {
                    color: #4a9eff;
                    margin: 0 0 1rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                #philang-features-debug .close-btn {
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 1.5rem;
                    cursor: pointer;
                }

                #philang-features-debug .close-btn:hover {
                    color: #fff;
                }

                #philang-features-debug .feature-item {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #333;
                }

                #philang-features-debug .feature-item:last-child {
                    border-bottom: none;
                }

                #philang-features-debug .feature-toggle {
                    width: 48px;
                    height: 24px;
                    background: #333;
                    border-radius: 12px;
                    position: relative;
                    cursor: pointer;
                    transition: background 0.2s;
                    flex-shrink: 0;
                }

                #philang-features-debug .feature-toggle.enabled {
                    background: #10b981;
                }

                #philang-features-debug .feature-toggle::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.2s;
                }

                #philang-features-debug .feature-toggle.enabled::after {
                    transform: translateX(24px);
                }

                #philang-features-debug .feature-info {
                    margin-left: 1rem;
                    flex: 1;
                }

                #philang-features-debug .feature-name {
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                #philang-features-debug .feature-desc {
                    font-size: 0.8rem;
                    color: #888;
                }

                #philang-features-debug .actions {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #333;
                    display: flex;
                    gap: 0.5rem;
                }

                #philang-features-debug .actions button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.85rem;
                }

                #philang-features-debug .btn-reset {
                    background: #333;
                    color: white;
                }

                #philang-features-debug .btn-reset:hover {
                    background: #444;
                }
            </style>
            <h3>
                Feature Flags
                <button class="close-btn" aria-label="Close">&times;</button>
            </h3>
            <div class="feature-list">
                ${Object.entries(flags).map(([key, flag]) => `
                    <div class="feature-item">
                        <div class="feature-toggle ${flag.enabled ? 'enabled' : ''}" data-feature="${key}"></div>
                        <div class="feature-info">
                            <div class="feature-name">${key}</div>
                            <div class="feature-desc">${flag.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="actions">
                <button class="btn-reset">Reset to Defaults</button>
            </div>
        `;

        document.body.appendChild(panel);

        // Close button
        panel.querySelector('.close-btn').addEventListener('click', () => panel.remove());

        // Toggle handlers
        panel.querySelectorAll('.feature-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const feature = toggle.dataset.feature;
                const newState = PhiLangFeatures.toggle(feature);
                toggle.classList.toggle('enabled', newState);
            });
        });

        // Reset button
        panel.querySelector('.btn-reset').addEventListener('click', () => {
            resetToDefaults();
            panel.remove();
            showDebugPanel();
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Debug logging
     */
    function log(message, data) {
        if (typeof PhiLangConfig !== 'undefined' && PhiLangConfig.isDebugEnabled()) {
            PhiLangConfig.log('features', message, data);
        }
    }

    // Initialize on load
    init();

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Initialization
        init,

        // Feature flag API
        isEnabled,
        enable,
        disable,
        toggle,
        setMultiple,
        resetToDefaults,

        // Getters
        getAll,
        getEnabled,
        getDisabled,

        // Conditional execution
        when,
        whenAll,
        whenAny,

        // Events
        subscribe,

        // Debug
        showDebugPanel
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangFeatures = PhiLangFeatures;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangFeatures;
}
