/**
 * PhiLang Config Module Tests
 */

describe('PhiLangConfig', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('init', () => {
        it('should be defined', () => {
            assert.defined(PhiLangConfig);
        });

        it('should have init method', () => {
            assert.type(PhiLangConfig.init, 'function');
        });

        it('should initialize without errors', () => {
            PhiLangConfig.init();
            assert.truthy(true); // No error thrown
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION GET/SET TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('get', () => {
        it('should get default values', () => {
            const version = PhiLangConfig.get('version');
            assert.truthy(version);
        });

        it('should get nested values with dot notation', () => {
            const offlineSupport = PhiLangConfig.get('features.offlineSupport');
            assert.type(offlineSupport, 'boolean');
        });

        it('should return default for missing keys', () => {
            const result = PhiLangConfig.get('nonexistent.key', 'default');
            assert.equal(result, 'default');
        });
    });

    describe('set', () => {
        it('should set values', () => {
            PhiLangConfig.set('test.key', 'test-value');
            const result = PhiLangConfig.get('test.key');
            assert.equal(result, 'test-value');
        });

        it('should create nested paths', () => {
            PhiLangConfig.set('deep.nested.value', 42);
            const result = PhiLangConfig.get('deep.nested.value');
            assert.equal(result, 42);
        });
    });

    describe('getAll', () => {
        it('should return configuration object', () => {
            const config = PhiLangConfig.getAll();
            assert.type(config, 'object');
            assert.truthy(config.version);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // VERSION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('VERSION', () => {
        it('should have a version string', () => {
            const version = PhiLangConfig.VERSION;
            assert.truthy(version);
            assert.type(version, 'string');
        });

        it('should follow semver format', () => {
            const version = PhiLangConfig.VERSION;
            assert.match(version, /^\d+\.\d+\.\d+/);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // ENVIRONMENT DETECTION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('isDev', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.isDev();
            assert.type(result, 'boolean');
        });
    });

    describe('hasServiceWorker', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.hasServiceWorker();
            assert.type(result, 'boolean');
        });
    });

    describe('hasIndexedDB', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.hasIndexedDB();
            assert.type(result, 'boolean');
        });

        it('should be true in modern browsers', () => {
            // IndexedDB should be available in test environment
            assert.true(PhiLangConfig.hasIndexedDB());
        });
    });

    describe('isMobile', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.isMobile();
            assert.type(result, 'boolean');
        });
    });

    describe('isTouchDevice', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.isTouchDevice();
            assert.type(result, 'boolean');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE LOADING TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('registerModule', () => {
        it('should register a module', () => {
            PhiLangConfig.registerModule('test-module');
            assert.true(PhiLangConfig.isModuleLoaded('test-module'));
        });
    });

    describe('isModuleLoaded', () => {
        it('should return true for loaded modules', () => {
            PhiLangConfig.registerModule('loaded-module');
            assert.true(PhiLangConfig.isModuleLoaded('loaded-module'));
        });

        it('should return false for unloaded modules', () => {
            assert.false(PhiLangConfig.isModuleLoaded('never-loaded-module'));
        });
    });

    describe('getLoadedModules', () => {
        it('should return array of module names', () => {
            const modules = PhiLangConfig.getLoadedModules();
            assert.truthy(Array.isArray(modules));
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // DEBUG LOGGING TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('logging', () => {
        it('should have log function', () => {
            assert.type(PhiLangConfig.log, 'function');
        });

        it('should have info function', () => {
            assert.type(PhiLangConfig.info, 'function');
        });

        it('should have warn function', () => {
            assert.type(PhiLangConfig.warn, 'function');
        });

        it('should have error function', () => {
            assert.type(PhiLangConfig.error, 'function');
        });

        it('log should not throw', () => {
            PhiLangConfig.log('test', 'test message');
            assert.truthy(true);
        });

        it('warn should not throw', () => {
            PhiLangConfig.warn('test', 'test warning');
            assert.truthy(true);
        });

        it('error should not throw', () => {
            PhiLangConfig.error('test', 'test error');
            assert.truthy(true);
        });
    });

    describe('isDebugEnabled', () => {
        it('should return boolean', () => {
            const result = PhiLangConfig.isDebugEnabled();
            assert.type(result, 'boolean');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // ERROR BOUNDARY TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('logError', () => {
        it('should log errors', () => {
            const result = PhiLangConfig.logError('test', new Error('Test error'));
            assert.truthy(result);
            assert.equal(result.module, 'test');
            assert.contains(result.message, 'Test error');
        });

        it('should accept string errors', () => {
            const result = PhiLangConfig.logError('test', 'String error');
            assert.equal(result.message, 'String error');
        });

        it('should include timestamp', () => {
            const result = PhiLangConfig.logError('test', 'Error');
            assert.truthy(result.timestamp);
        });
    });

    describe('withErrorBoundary', () => {
        it('should wrap async functions', async () => {
            const fn = async () => 'success';
            const wrapped = PhiLangConfig.withErrorBoundary('test', fn);
            const result = await wrapped();
            assert.equal(result, 'success');
        });

        it('should catch errors and return fallback', async () => {
            const fn = async () => { throw new Error('Fail'); };
            const wrapped = PhiLangConfig.withErrorBoundary('test', fn, {
                fallback: 'fallback-value',
                silent: true
            });
            const result = await wrapped();
            assert.equal(result, 'fallback-value');
        });

        it('should rethrow when configured', async () => {
            const fn = async () => { throw new Error('Rethrow test'); };
            const wrapped = PhiLangConfig.withErrorBoundary('test', fn, {
                rethrow: true,
                silent: true
            });

            let threw = false;
            try {
                await wrapped();
            } catch (e) {
                threw = true;
            }
            assert.true(threw);
        });
    });

    describe('getErrorState', () => {
        it('should return error state object', () => {
            const state = PhiLangConfig.getErrorState();
            assert.type(state, 'object');
            assert.truthy(Array.isArray(state.errors));
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // CRITICAL ERROR UI TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('showCriticalErrorOverlay', () => {
        afterEach(() => {
            const overlay = document.getElementById('philang-critical-error');
            if (overlay) overlay.remove();
        });

        it('should create error overlay', () => {
            PhiLangConfig.showCriticalErrorOverlay('Test error');
            const overlay = document.getElementById('philang-critical-error');
            assert.truthy(overlay);
        });

        it('should display error message', () => {
            PhiLangConfig.showCriticalErrorOverlay('Custom error message');
            const overlay = document.getElementById('philang-critical-error');
            assert.contains(overlay.innerHTML, 'Custom error message');
        });

        it('should have reload button', () => {
            PhiLangConfig.showCriticalErrorOverlay('Test');
            const reloadBtn = document.getElementById('philang-error-reload');
            assert.truthy(reloadBtn);
        });

        it('should have continue button', () => {
            PhiLangConfig.showCriticalErrorOverlay('Test');
            const continueBtn = document.getElementById('philang-error-continue');
            assert.truthy(continueBtn);
        });

        it('continue button should remove overlay', () => {
            PhiLangConfig.showCriticalErrorOverlay('Test');
            const continueBtn = document.getElementById('philang-error-continue');
            continueBtn.click();
            const overlay = document.getElementById('philang-critical-error');
            assert.null(overlay);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SAFE INIT MODULE TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('safeInitModule', () => {
        it('should call init function', async () => {
            let called = false;
            await PhiLangConfig.safeInitModule('test-safe', () => { called = true; });
            assert.true(called);
        });

        it('should return true on success', async () => {
            const result = await PhiLangConfig.safeInitModule('test-success', () => {});
            assert.true(result);
        });

        it('should return false on failure', async () => {
            const result = await PhiLangConfig.safeInitModule('test-fail', () => {
                throw new Error('Init failed');
            }, { silent: true });
            assert.false(result);
        });

        it('should register module on success', async () => {
            await PhiLangConfig.safeInitModule('registered-module', () => {});
            assert.true(PhiLangConfig.isModuleLoaded('registered-module'));
        });
    });
});
