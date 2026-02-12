/**
 * PhiLang Test Framework
 * Minimal test framework for browser-based testing
 */

const PhiLangTests = (function() {
    'use strict';

    const suites = {};
    let currentSuite = null;
    let results = {
        suites: {},
        passed: 0,
        failed: 0,
        total: 0
    };

    /**
     * Define a test suite
     */
    function describe(name, fn) {
        suites[name] = {
            name,
            tests: [],
            beforeAll: null,
            afterAll: null,
            beforeEach: null,
            afterEach: null
        };
        currentSuite = suites[name];
        fn();
        currentSuite = null;
    }

    /**
     * Define a test
     */
    function it(name, fn) {
        if (!currentSuite) {
            throw new Error('it() must be called inside describe()');
        }
        currentSuite.tests.push({ name, fn });
    }

    /**
     * Run before all tests in suite
     */
    function beforeAll(fn) {
        if (currentSuite) currentSuite.beforeAll = fn;
    }

    /**
     * Run after all tests in suite
     */
    function afterAll(fn) {
        if (currentSuite) currentSuite.afterAll = fn;
    }

    /**
     * Run before each test
     */
    function beforeEach(fn) {
        if (currentSuite) currentSuite.beforeEach = fn;
    }

    /**
     * Run after each test
     */
    function afterEach(fn) {
        if (currentSuite) currentSuite.afterEach = fn;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ASSERTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    const assert = {
        equal(actual, expected, message) {
            if (actual !== expected) {
                throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
            }
        },

        deepEqual(actual, expected, message) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
            }
        },

        notEqual(actual, expected, message) {
            if (actual === expected) {
                throw new Error(message || `Expected values to be different, both were ${JSON.stringify(actual)}`);
            }
        },

        true(value, message) {
            if (value !== true) {
                throw new Error(message || `Expected true, got ${JSON.stringify(value)}`);
            }
        },

        false(value, message) {
            if (value !== false) {
                throw new Error(message || `Expected false, got ${JSON.stringify(value)}`);
            }
        },

        truthy(value, message) {
            if (!value) {
                throw new Error(message || `Expected truthy value, got ${JSON.stringify(value)}`);
            }
        },

        falsy(value, message) {
            if (value) {
                throw new Error(message || `Expected falsy value, got ${JSON.stringify(value)}`);
            }
        },

        null(value, message) {
            if (value !== null) {
                throw new Error(message || `Expected null, got ${JSON.stringify(value)}`);
            }
        },

        notNull(value, message) {
            if (value === null) {
                throw new Error(message || 'Expected non-null value');
            }
        },

        undefined(value, message) {
            if (value !== undefined) {
                throw new Error(message || `Expected undefined, got ${JSON.stringify(value)}`);
            }
        },

        defined(value, message) {
            if (value === undefined) {
                throw new Error(message || 'Expected defined value');
            }
        },

        contains(haystack, needle, message) {
            if (typeof haystack === 'string') {
                if (!haystack.includes(needle)) {
                    throw new Error(message || `Expected "${haystack}" to contain "${needle}"`);
                }
            } else if (Array.isArray(haystack)) {
                if (!haystack.includes(needle)) {
                    throw new Error(message || `Expected array to contain ${JSON.stringify(needle)}`);
                }
            } else {
                throw new Error('contains() requires string or array');
            }
        },

        notContains(haystack, needle, message) {
            if (typeof haystack === 'string' && haystack.includes(needle)) {
                throw new Error(message || `Expected "${haystack}" to not contain "${needle}"`);
            }
            if (Array.isArray(haystack) && haystack.includes(needle)) {
                throw new Error(message || `Expected array to not contain ${JSON.stringify(needle)}`);
            }
        },

        throws(fn, expectedError, message) {
            let threw = false;
            let error = null;
            try {
                fn();
            } catch (e) {
                threw = true;
                error = e;
            }
            if (!threw) {
                throw new Error(message || 'Expected function to throw');
            }
            if (expectedError && !error.message.includes(expectedError)) {
                throw new Error(message || `Expected error "${expectedError}", got "${error.message}"`);
            }
        },

        async rejects(promise, expectedError, message) {
            let rejected = false;
            let error = null;
            try {
                await promise;
            } catch (e) {
                rejected = true;
                error = e;
            }
            if (!rejected) {
                throw new Error(message || 'Expected promise to reject');
            }
            if (expectedError && !error.message.includes(expectedError)) {
                throw new Error(message || `Expected error "${expectedError}", got "${error.message}"`);
            }
        },

        type(value, expectedType, message) {
            const actualType = typeof value;
            if (actualType !== expectedType) {
                throw new Error(message || `Expected type ${expectedType}, got ${actualType}`);
            }
        },

        instanceof(value, constructor, message) {
            if (!(value instanceof constructor)) {
                throw new Error(message || `Expected instance of ${constructor.name}`);
            }
        },

        lengthOf(value, length, message) {
            if (!value || value.length !== length) {
                throw new Error(message || `Expected length ${length}, got ${value?.length}`);
            }
        },

        greaterThan(actual, expected, message) {
            if (actual <= expected) {
                throw new Error(message || `Expected ${actual} > ${expected}`);
            }
        },

        lessThan(actual, expected, message) {
            if (actual >= expected) {
                throw new Error(message || `Expected ${actual} < ${expected}`);
            }
        },

        match(value, regex, message) {
            if (!regex.test(value)) {
                throw new Error(message || `Expected "${value}" to match ${regex}`);
            }
        },

        notMatch(value, regex, message) {
            if (regex.test(value)) {
                throw new Error(message || `Expected "${value}" to not match ${regex}`);
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // TEST RUNNER
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Run all test suites
     */
    async function runAll(onProgress) {
        results = { suites: {}, passed: 0, failed: 0, total: 0 };

        const suiteNames = Object.keys(suites);
        let completed = 0;

        for (const suiteName of suiteNames) {
            const suite = suites[suiteName];
            results.suites[suiteName] = { tests: [] };

            // Run beforeAll
            if (suite.beforeAll) {
                try {
                    await suite.beforeAll();
                } catch (e) {
                    console.error(`beforeAll failed in ${suiteName}:`, e);
                }
            }

            // Run tests
            for (const test of suite.tests) {
                results.total++;
                const testResult = {
                    name: test.name,
                    passed: false,
                    time: 0,
                    error: null
                };

                const start = performance.now();

                try {
                    // Run beforeEach
                    if (suite.beforeEach) await suite.beforeEach();

                    // Run test
                    await test.fn();

                    // Run afterEach
                    if (suite.afterEach) await suite.afterEach();

                    testResult.passed = true;
                    results.passed++;
                } catch (e) {
                    testResult.error = e.message || String(e);
                    results.failed++;
                }

                testResult.time = Math.round(performance.now() - start);
                results.suites[suiteName].tests.push(testResult);
            }

            // Run afterAll
            if (suite.afterAll) {
                try {
                    await suite.afterAll();
                } catch (e) {
                    console.error(`afterAll failed in ${suiteName}:`, e);
                }
            }

            completed++;
            if (onProgress) {
                onProgress((completed / suiteNames.length) * 100);
            }
        }

        return results;
    }

    /**
     * Run a single suite
     */
    async function runSuite(suiteName) {
        const suite = suites[suiteName];
        if (!suite) throw new Error(`Suite not found: ${suiteName}`);

        // Similar to runAll but for single suite
        // Implementation omitted for brevity
    }

    /**
     * Get test results
     */
    function getResults() {
        return results;
    }

    /**
     * Clear all suites
     */
    function clear() {
        Object.keys(suites).forEach(key => delete suites[key]);
        results = { suites: {}, passed: 0, failed: 0, total: 0 };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        describe,
        it,
        beforeAll,
        afterAll,
        beforeEach,
        afterEach,
        assert,
        runAll,
        runSuite,
        getResults,
        clear
    };
})();

// Global exports for convenience
const { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } = PhiLangTests;
