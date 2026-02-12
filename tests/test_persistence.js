/**
 * PhiLang Persistence Module Tests
 */

describe('PhiLangPersistence', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('init', () => {
        it('should be defined', () => {
            assert.defined(PhiLangPersistence);
        });

        it('should have init method', () => {
            assert.type(PhiLangPersistence.init, 'function');
        });

        it('should initialize database', async () => {
            const db = await PhiLangPersistence.init();
            assert.truthy(db);
        });

        it('should return same instance on multiple calls', async () => {
            const db1 = await PhiLangPersistence.init();
            const db2 = await PhiLangPersistence.init();
            assert.equal(db1, db2);
        });
    });

    describe('STORES', () => {
        it('should have sessions store', () => {
            assert.equal(PhiLangPersistence.STORES.SESSIONS, 'sessions');
        });

        it('should have embeddings store', () => {
            assert.equal(PhiLangPersistence.STORES.EMBEDDINGS, 'embeddings');
        });

        it('should have derivations store', () => {
            assert.equal(PhiLangPersistence.STORES.DERIVATIONS, 'derivations');
        });

        it('should have dialogues store', () => {
            assert.equal(PhiLangPersistence.STORES.DIALOGUES, 'dialogues');
        });

        it('should have settings store', () => {
            assert.equal(PhiLangPersistence.STORES.SETTINGS, 'settings');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SESSIONS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Sessions', () => {
        const testSession = {
            title: 'Test Session',
            tradition: 'socratic',
            messages: [
                { role: 'user', content: 'Test question' },
                { role: 'assistant', content: 'Test response' }
            ]
        };

        let savedSessionId = null;

        describe('save', () => {
            it('should save a session', async () => {
                const id = await PhiLangPersistence.Sessions.save(testSession);
                savedSessionId = id;
                assert.truthy(id);
                assert.type(id, 'number');
            });

            it('should auto-generate timestamps', async () => {
                const id = await PhiLangPersistence.Sessions.save({
                    tradition: 'stoic',
                    messages: []
                });
                const session = await PhiLangPersistence.Sessions.get(id);
                assert.truthy(session.createdAt);
                assert.truthy(session.updatedAt);

                // Clean up
                await PhiLangPersistence.Sessions.delete(id);
            });
        });

        describe('get', () => {
            it('should retrieve saved session', async () => {
                const session = await PhiLangPersistence.Sessions.get(savedSessionId);
                assert.equal(session.title, 'Test Session');
                assert.equal(session.tradition, 'socratic');
            });

            it('should return undefined for non-existent id', async () => {
                const session = await PhiLangPersistence.Sessions.get(99999);
                assert.undefined(session);
            });
        });

        describe('getAll', () => {
            it('should return array of sessions', async () => {
                const sessions = await PhiLangPersistence.Sessions.getAll();
                assert.truthy(Array.isArray(sessions));
            });

            it('should sort by most recent first', async () => {
                const sessions = await PhiLangPersistence.Sessions.getAll();
                if (sessions.length >= 2) {
                    const date1 = new Date(sessions[0].updatedAt || sessions[0].createdAt);
                    const date2 = new Date(sessions[1].updatedAt || sessions[1].createdAt);
                    assert.truthy(date1 >= date2);
                }
            });

            it('should respect limit parameter', async () => {
                const sessions = await PhiLangPersistence.Sessions.getAll(1);
                assert.truthy(sessions.length <= 1);
            });
        });

        describe('getByTradition', () => {
            it('should filter by tradition', async () => {
                const sessions = await PhiLangPersistence.Sessions.getByTradition('socratic');
                assert.truthy(Array.isArray(sessions));
                sessions.forEach(s => {
                    assert.equal(s.tradition, 'socratic');
                });
            });
        });

        describe('update', () => {
            it('should update session', async () => {
                const session = await PhiLangPersistence.Sessions.get(savedSessionId);
                session.title = 'Updated Title';
                await PhiLangPersistence.Sessions.update(session);

                const updated = await PhiLangPersistence.Sessions.get(savedSessionId);
                assert.equal(updated.title, 'Updated Title');
            });

            it('should update timestamp', async () => {
                const before = await PhiLangPersistence.Sessions.get(savedSessionId);
                const beforeTime = before.updatedAt;

                // Wait a bit to ensure different timestamp
                await new Promise(r => setTimeout(r, 10));

                before.title = 'Another Update';
                await PhiLangPersistence.Sessions.update(before);

                const after = await PhiLangPersistence.Sessions.get(savedSessionId);
                assert.notEqual(after.updatedAt, beforeTime);
            });
        });

        describe('delete', () => {
            it('should delete session', async () => {
                await PhiLangPersistence.Sessions.delete(savedSessionId);
                const session = await PhiLangPersistence.Sessions.get(savedSessionId);
                assert.undefined(session);
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SETTINGS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Settings', () => {
        const testKey = 'test_setting';
        const testValue = { enabled: true, count: 42 };

        describe('set', () => {
            it('should save a setting', async () => {
                await PhiLangPersistence.Settings.set(testKey, testValue);
                // No error means success
                assert.truthy(true);
            });
        });

        describe('get', () => {
            it('should retrieve saved setting', async () => {
                const result = await PhiLangPersistence.Settings.get(testKey);
                assert.deepEqual(result, testValue);
            });

            it('should return default for missing key', async () => {
                const result = await PhiLangPersistence.Settings.get('nonexistent_key', 'default');
                assert.equal(result, 'default');
            });
        });

        describe('delete', () => {
            it('should delete setting', async () => {
                await PhiLangPersistence.Settings.delete(testKey);
                const result = await PhiLangPersistence.Settings.get(testKey);
                assert.null(result);
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // EMBEDDINGS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Embeddings', () => {
        let savedEmbeddingId = null;

        describe('save', () => {
            it('should save embedding model', async () => {
                const model = {
                    name: 'Test Model',
                    embeddings: { 'Dasein': [0.1, 0.2, 0.3] },
                    epochs: 100,
                    loss: 0.05,
                    embeddingDim: 64
                };
                savedEmbeddingId = await PhiLangPersistence.Embeddings.save(model);
                assert.truthy(savedEmbeddingId);
            });
        });

        describe('get', () => {
            it('should retrieve embedding model', async () => {
                const model = await PhiLangPersistence.Embeddings.get(savedEmbeddingId);
                assert.equal(model.name, 'Test Model');
                assert.equal(model.epochs, 100);
            });
        });

        describe('getAll', () => {
            it('should return array of models', async () => {
                const models = await PhiLangPersistence.Embeddings.getAll();
                assert.truthy(Array.isArray(models));
            });
        });

        describe('getLatest', () => {
            it('should return most recent model', async () => {
                const latest = await PhiLangPersistence.Embeddings.getLatest();
                if (latest) {
                    assert.truthy(latest.createdAt);
                }
            });
        });

        describe('delete', () => {
            it('should delete embedding model', async () => {
                await PhiLangPersistence.Embeddings.delete(savedEmbeddingId);
                const model = await PhiLangPersistence.Embeddings.get(savedEmbeddingId);
                assert.undefined(model);
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // DERIVATIONS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Derivations', () => {
        let savedDerivationId = null;

        describe('save', () => {
            it('should save derivation', async () => {
                const derivation = {
                    title: 'Test Derivation',
                    expression: 'Dasein → being-in-world',
                    concepts: ['Dasein', 'being-in-world'],
                    traditions: ['heideggerian']
                };
                savedDerivationId = await PhiLangPersistence.Derivations.save(derivation);
                assert.truthy(savedDerivationId);
            });
        });

        describe('get', () => {
            it('should retrieve derivation', async () => {
                const derivation = await PhiLangPersistence.Derivations.get(savedDerivationId);
                assert.equal(derivation.title, 'Test Derivation');
            });
        });

        describe('getAll', () => {
            it('should return array of derivations', async () => {
                const derivations = await PhiLangPersistence.Derivations.getAll();
                assert.truthy(Array.isArray(derivations));
            });
        });

        describe('update', () => {
            it('should update derivation', async () => {
                const derivation = await PhiLangPersistence.Derivations.get(savedDerivationId);
                derivation.title = 'Updated Derivation';
                await PhiLangPersistence.Derivations.update(derivation);

                const updated = await PhiLangPersistence.Derivations.get(savedDerivationId);
                assert.equal(updated.title, 'Updated Derivation');
            });
        });

        describe('delete', () => {
            it('should delete derivation', async () => {
                await PhiLangPersistence.Derivations.delete(savedDerivationId);
                const derivation = await PhiLangPersistence.Derivations.get(savedDerivationId);
                assert.undefined(derivation);
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // DIALOGUES TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Dialogues', () => {
        let savedDialogueId = null;

        describe('save', () => {
            it('should save dialogue', async () => {
                const dialogue = {
                    topic: { name: 'Being vs Becoming' },
                    traditions: ['heideggerian', 'whiteheadian'],
                    mode: 'dialectical',
                    entries: []
                };
                savedDialogueId = await PhiLangPersistence.Dialogues.save(dialogue);
                assert.truthy(savedDialogueId);
            });
        });

        describe('get', () => {
            it('should retrieve dialogue', async () => {
                const dialogue = await PhiLangPersistence.Dialogues.get(savedDialogueId);
                assert.truthy(dialogue.topic);
                assert.equal(dialogue.mode, 'dialectical');
            });
        });

        describe('getAll', () => {
            it('should return array of dialogues', async () => {
                const dialogues = await PhiLangPersistence.Dialogues.getAll();
                assert.truthy(Array.isArray(dialogues));
            });
        });

        describe('delete', () => {
            it('should delete dialogue', async () => {
                await PhiLangPersistence.Dialogues.delete(savedDialogueId);
                const dialogue = await PhiLangPersistence.Dialogues.get(savedDialogueId);
                assert.undefined(dialogue);
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITY TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getStats', () => {
        it('should return storage statistics', async () => {
            const stats = await PhiLangPersistence.getStats();
            assert.type(stats, 'object');
            assert.type(stats.sessions, 'number');
            assert.type(stats.embeddings, 'number');
            assert.type(stats.derivations, 'number');
            assert.type(stats.dialogues, 'number');
        });
    });

    describe('exportAll', () => {
        it('should export data as JSON string', async () => {
            const exported = await PhiLangPersistence.exportAll();
            assert.type(exported, 'string');

            const parsed = JSON.parse(exported);
            assert.truthy(parsed.version);
            assert.truthy(parsed.exportedAt);
            assert.truthy(Array.isArray(parsed.sessions));
        });
    });

    describe('importAll', () => {
        it('should import data from JSON', async () => {
            const importData = {
                sessions: [{
                    title: 'Imported Session',
                    tradition: 'buddhist',
                    messages: []
                }]
            };

            await PhiLangPersistence.importAll(JSON.stringify(importData));

            // Verify import
            const sessions = await PhiLangPersistence.Sessions.getAll();
            const imported = sessions.find(s => s.title === 'Imported Session');
            assert.truthy(imported);

            // Clean up
            if (imported) {
                await PhiLangPersistence.Sessions.delete(imported.id);
            }
        });
    });
});
