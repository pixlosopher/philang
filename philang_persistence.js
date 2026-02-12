/**
 * PhiLang Persistence Layer
 * IndexedDB-based storage for sessions, embeddings, and derivations
 */

const PhiLangPersistence = (function() {
    'use strict';

    const DB_NAME = 'PhiLangDB';
    const DB_VERSION = 1;

    // Store names
    const STORES = {
        SESSIONS: 'sessions',           // Socratic Counsel conversations
        EMBEDDINGS: 'embeddings',       // Trained embedding models
        DERIVATIONS: 'derivations',     // Saved derivation chains
        DIALOGUES: 'dialogues',         // Dialectical dialogue history
        SETTINGS: 'settings'            // User preferences
    };

    let db = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // DATABASE INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialize the database
     * @returns {Promise<IDBDatabase>}
     */
    async function init() {
        if (db) return db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                if (typeof PhiLangConfig !== 'undefined') {
                    PhiLangConfig.error('persistence', 'Failed to open database', request.error);
                }
                reject(request.error);
            };

            request.onsuccess = () => {
                db = request.result;
                if (typeof PhiLangConfig !== 'undefined') {
                    PhiLangConfig.log('persistence', 'Database initialized');
                }
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const database = event.target.result;

                // Sessions store - for Socratic Counsel
                if (!database.objectStoreNames.contains(STORES.SESSIONS)) {
                    const sessionStore = database.createObjectStore(STORES.SESSIONS, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sessionStore.createIndex('tradition', 'tradition', { unique: false });
                    sessionStore.createIndex('createdAt', 'createdAt', { unique: false });
                    sessionStore.createIndex('title', 'title', { unique: false });
                }

                // Embeddings store - for trained models
                if (!database.objectStoreNames.contains(STORES.EMBEDDINGS)) {
                    const embeddingStore = database.createObjectStore(STORES.EMBEDDINGS, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    embeddingStore.createIndex('name', 'name', { unique: false });
                    embeddingStore.createIndex('createdAt', 'createdAt', { unique: false });
                    embeddingStore.createIndex('epochs', 'epochs', { unique: false });
                }

                // Derivations store - for saved derivation chains
                if (!database.objectStoreNames.contains(STORES.DERIVATIONS)) {
                    const derivationStore = database.createObjectStore(STORES.DERIVATIONS, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    derivationStore.createIndex('createdAt', 'createdAt', { unique: false });
                    derivationStore.createIndex('title', 'title', { unique: false });
                }

                // Dialogues store - for dialectical debates
                if (!database.objectStoreNames.contains(STORES.DIALOGUES)) {
                    const dialogueStore = database.createObjectStore(STORES.DIALOGUES, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    dialogueStore.createIndex('topic', 'topic', { unique: false });
                    dialogueStore.createIndex('createdAt', 'createdAt', { unique: false });
                    dialogueStore.createIndex('traditions', 'traditions', { unique: false, multiEntry: true });
                }

                // Settings store - for user preferences
                if (!database.objectStoreNames.contains(STORES.SETTINGS)) {
                    database.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
                }

                if (typeof PhiLangConfig !== 'undefined') {
                    PhiLangConfig.log('persistence', 'Database schema created/upgraded');
                }
            };
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GENERIC CRUD OPERATIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Add an item to a store
     */
    async function add(storeName, item) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            // Add timestamp if not present
            if (!item.createdAt) {
                item.createdAt = new Date().toISOString();
            }
            item.updatedAt = new Date().toISOString();

            const request = store.add(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Update an item in a store
     */
    async function update(storeName, item) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            item.updatedAt = new Date().toISOString();

            const request = store.put(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get an item by ID
     */
    async function get(storeName, id) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all items from a store
     */
    async function getAll(storeName, limit = 100) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll(null, limit);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get items by index
     */
    async function getByIndex(storeName, indexName, value) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete an item by ID
     */
    async function remove(storeName, id) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear all items from a store
     */
    async function clear(storeName) {
        await init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SESSION-SPECIFIC METHODS (Socratic Counsel)
    // ═══════════════════════════════════════════════════════════════════════════

    const Sessions = {
        /**
         * Save a new counseling session
         */
        async save(session) {
            const sessionData = {
                title: session.title || generateSessionTitle(session),
                tradition: session.tradition,
                messages: session.messages || [],
                insights: session.insights || {
                    beliefs: [],
                    assumptions: [],
                    tensions: [],
                    questions: []
                },
                phase: session.phase || 'opening',
                domain: session.domain || 'general'
            };
            return add(STORES.SESSIONS, sessionData);
        },

        /**
         * Update an existing session
         */
        async update(session) {
            return update(STORES.SESSIONS, session);
        },

        /**
         * Get a session by ID
         */
        async get(id) {
            return get(STORES.SESSIONS, id);
        },

        /**
         * Get all sessions
         */
        async getAll(limit = 50) {
            const sessions = await getAll(STORES.SESSIONS, limit);
            // Sort by most recent first
            return sessions.sort((a, b) =>
                new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
            );
        },

        /**
         * Get sessions by tradition
         */
        async getByTradition(tradition) {
            return getByIndex(STORES.SESSIONS, 'tradition', tradition);
        },

        /**
         * Delete a session
         */
        async delete(id) {
            return remove(STORES.SESSIONS, id);
        },

        /**
         * Get recent sessions (last 7 days)
         */
        async getRecent() {
            const all = await this.getAll();
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return all.filter(s => new Date(s.createdAt) > weekAgo);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // EMBEDDINGS-SPECIFIC METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    const Embeddings = {
        /**
         * Save a trained embedding model
         */
        async save(model) {
            const embeddingData = {
                name: model.name || `Model ${new Date().toLocaleDateString()}`,
                embeddings: model.embeddings,
                contextEmbeddings: model.contextEmbeddings,
                traditionEmbeddings: model.traditionEmbeddings,
                featureEmbeddings: model.featureEmbeddings,
                epochs: model.epoch || model.epochs,
                loss: model.loss,
                config: {
                    embeddingDim: model.embeddingDim,
                    semanticWeight: model.semanticWeight,
                    relationWeight: model.relationWeight,
                    traditionWeight: model.traditionWeight
                }
            };
            return add(STORES.EMBEDDINGS, embeddingData);
        },

        /**
         * Load an embedding model
         */
        async get(id) {
            return get(STORES.EMBEDDINGS, id);
        },

        /**
         * Get all saved models
         */
        async getAll(limit = 20) {
            const models = await getAll(STORES.EMBEDDINGS, limit);
            return models.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
        },

        /**
         * Delete a model
         */
        async delete(id) {
            return remove(STORES.EMBEDDINGS, id);
        },

        /**
         * Get the most recently trained model
         */
        async getLatest() {
            const all = await this.getAll(1);
            return all[0] || null;
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // DERIVATIONS-SPECIFIC METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    const Derivations = {
        /**
         * Save a derivation chain
         */
        async save(derivation) {
            const derivationData = {
                title: derivation.title || 'Untitled Derivation',
                steps: derivation.steps || [],
                concepts: derivation.concepts || [],
                expression: derivation.expression || '',
                traditions: derivation.traditions || [],
                notes: derivation.notes || ''
            };
            return add(STORES.DERIVATIONS, derivationData);
        },

        /**
         * Update a derivation
         */
        async update(derivation) {
            return update(STORES.DERIVATIONS, derivation);
        },

        /**
         * Get a derivation by ID
         */
        async get(id) {
            return get(STORES.DERIVATIONS, id);
        },

        /**
         * Get all derivations
         */
        async getAll(limit = 50) {
            const derivations = await getAll(STORES.DERIVATIONS, limit);
            return derivations.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
        },

        /**
         * Delete a derivation
         */
        async delete(id) {
            return remove(STORES.DERIVATIONS, id);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // DIALOGUES-SPECIFIC METHODS (Dialectical Debates)
    // ═══════════════════════════════════════════════════════════════════════════

    const Dialogues = {
        /**
         * Save a dialectical dialogue
         */
        async save(dialogue) {
            const dialogueData = {
                topic: dialogue.topic,
                traditions: dialogue.traditions || [],
                mode: dialogue.mode || 'dialectical',
                entries: dialogue.entries || [],
                synthesis: dialogue.synthesis || [],
                insights: dialogue.insights || {
                    concepts: [],
                    tensions: [],
                    bridges: [],
                    moves: []
                },
                rounds: dialogue.rounds || 0,
                completed: dialogue.completed || false
            };
            return add(STORES.DIALOGUES, dialogueData);
        },

        /**
         * Update a dialogue
         */
        async update(dialogue) {
            return update(STORES.DIALOGUES, dialogue);
        },

        /**
         * Get a dialogue by ID
         */
        async get(id) {
            return get(STORES.DIALOGUES, id);
        },

        /**
         * Get all dialogues
         */
        async getAll(limit = 50) {
            const dialogues = await getAll(STORES.DIALOGUES, limit);
            return dialogues.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
        },

        /**
         * Get dialogues by topic
         */
        async getByTopic(topic) {
            return getByIndex(STORES.DIALOGUES, 'topic', topic);
        },

        /**
         * Delete a dialogue
         */
        async delete(id) {
            return remove(STORES.DIALOGUES, id);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // SETTINGS METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    const Settings = {
        /**
         * Set a setting
         */
        async set(key, value) {
            await init();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORES.SETTINGS, 'readwrite');
                const store = transaction.objectStore(STORES.SETTINGS);
                const request = store.put({ key, value, updatedAt: new Date().toISOString() });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        },

        /**
         * Get a setting
         */
        async get(key, defaultValue = null) {
            await init();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORES.SETTINGS, 'readonly');
                const store = transaction.objectStore(STORES.SETTINGS);
                const request = store.get(key);
                request.onsuccess = () => {
                    resolve(request.result ? request.result.value : defaultValue);
                };
                request.onerror = () => reject(request.error);
            });
        },

        /**
         * Delete a setting
         */
        async delete(key) {
            return remove(STORES.SETTINGS, key);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITY FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generate a title for a session based on its content
     */
    function generateSessionTitle(session) {
        if (session.messages && session.messages.length > 0) {
            // Use first user message as title basis
            const firstUserMsg = session.messages.find(m => m.role === 'user');
            if (firstUserMsg) {
                const content = firstUserMsg.content;
                // Truncate to first 50 chars
                return content.length > 50 ? content.substring(0, 47) + '...' : content;
            }
        }
        return `${session.tradition || 'Socratic'} Session - ${new Date().toLocaleDateString()}`;
    }

    /**
     * Export all data as JSON (for backup)
     */
    async function exportAll() {
        const data = {
            version: DB_VERSION,
            exportedAt: new Date().toISOString(),
            sessions: await Sessions.getAll(1000),
            embeddings: await Embeddings.getAll(100),
            derivations: await Derivations.getAll(1000),
            dialogues: await Dialogues.getAll(1000)
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import data from JSON backup
     */
    async function importAll(jsonString) {
        const data = JSON.parse(jsonString);

        // Import sessions
        if (data.sessions) {
            for (const session of data.sessions) {
                delete session.id; // Remove old ID to generate new one
                await add(STORES.SESSIONS, session);
            }
        }

        // Import embeddings
        if (data.embeddings) {
            for (const embedding of data.embeddings) {
                delete embedding.id;
                await add(STORES.EMBEDDINGS, embedding);
            }
        }

        // Import derivations
        if (data.derivations) {
            for (const derivation of data.derivations) {
                delete derivation.id;
                await add(STORES.DERIVATIONS, derivation);
            }
        }

        // Import dialogues
        if (data.dialogues) {
            for (const dialogue of data.dialogues) {
                delete dialogue.id;
                await add(STORES.DIALOGUES, dialogue);
            }
        }

        return true;
    }

    /**
     * Get storage statistics
     */
    async function getStats() {
        return {
            sessions: (await Sessions.getAll(10000)).length,
            embeddings: (await Embeddings.getAll(1000)).length,
            derivations: (await Derivations.getAll(10000)).length,
            dialogues: (await Dialogues.getAll(10000)).length
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Initialize
        init,

        // Domain-specific APIs
        Sessions,
        Embeddings,
        Derivations,
        Dialogues,
        Settings,

        // Utilities
        exportAll,
        importAll,
        getStats,

        // Store names (for custom queries)
        STORES
    };
})();

// Auto-initialize on load
if (typeof window !== 'undefined') {
    window.PhiLangPersistence = PhiLangPersistence;
    // Initialize database on page load
    document.addEventListener('DOMContentLoaded', () => {
        PhiLangPersistence.init().catch(err => {
            if (typeof PhiLangConfig !== 'undefined') {
                PhiLangConfig.error('persistence', 'Auto-init failed', err);
            }
        });
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangPersistence;
}
