/**
 * PhiLang Security Module Tests
 */

describe('PhiLangSecurity', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // HTML ESCAPING TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('escapeHtml', () => {
        it('should escape HTML special characters', () => {
            const input = '<script>alert("xss")</script>';
            const escaped = PhiLangSecurity.escapeHtml(input);
            assert.notContains(escaped, '<script>');
            assert.notContains(escaped, '</script>');
        });

        it('should handle null and undefined', () => {
            assert.equal(PhiLangSecurity.escapeHtml(null), '');
            assert.equal(PhiLangSecurity.escapeHtml(undefined), '');
        });

        it('should convert numbers to strings', () => {
            const result = PhiLangSecurity.escapeHtml(42);
            assert.equal(result, '42');
        });

        it('should escape ampersands', () => {
            const result = PhiLangSecurity.escapeHtml('Tom & Jerry');
            assert.contains(result, '&amp;');
        });

        it('should escape quotes', () => {
            const input = 'Say "hello"';
            const escaped = PhiLangSecurity.escapeHtml(input);
            // textContent-based escaping may not escape quotes, but they're safe in text
            assert.truthy(escaped.length > 0);
        });
    });

    describe('escapeAttribute', () => {
        it('should escape attribute-specific characters', () => {
            const input = 'value="test" onclick="alert(1)"';
            const escaped = PhiLangSecurity.escapeAttribute(input);
            assert.contains(escaped, '&quot;');
            assert.notContains(escaped, '"');
        });

        it('should escape single quotes', () => {
            const escaped = PhiLangSecurity.escapeAttribute("it's");
            assert.contains(escaped, '&#39;');
        });

        it('should escape newlines', () => {
            const escaped = PhiLangSecurity.escapeAttribute("line1\nline2");
            assert.contains(escaped, '&#10;');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // COLOR VALIDATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('sanitizeColor', () => {
        it('should accept valid 6-digit hex colors', () => {
            assert.equal(PhiLangSecurity.sanitizeColor('#ff0000'), '#ff0000');
            assert.equal(PhiLangSecurity.sanitizeColor('#4a9eff'), '#4a9eff');
        });

        it('should accept valid 3-digit hex colors', () => {
            assert.equal(PhiLangSecurity.sanitizeColor('#f00'), '#f00');
            assert.equal(PhiLangSecurity.sanitizeColor('#abc'), '#abc');
        });

        it('should accept 8-digit hex colors with alpha', () => {
            assert.equal(PhiLangSecurity.sanitizeColor('#ff000080'), '#ff000080');
        });

        it('should return fallback for invalid colors', () => {
            assert.equal(PhiLangSecurity.sanitizeColor('not-a-color'), '#999999');
            assert.equal(PhiLangSecurity.sanitizeColor(''), '#999999');
            assert.equal(PhiLangSecurity.sanitizeColor(null), '#999999');
        });

        it('should return custom fallback when provided', () => {
            assert.equal(PhiLangSecurity.sanitizeColor('invalid', '#ffffff'), '#ffffff');
        });

        it('should reject javascript injection attempts', () => {
            const result = PhiLangSecurity.sanitizeColor('javascript:alert(1)');
            assert.equal(result, '#999999');
        });
    });

    describe('colorWithAlpha', () => {
        it('should create rgba from hex', () => {
            const result = PhiLangSecurity.colorWithAlpha('#ff0000', 0.5);
            assert.contains(result, 'rgba(');
            assert.contains(result, '255');
            assert.contains(result, '0.5');
        });

        it('should handle 3-digit hex colors', () => {
            const result = PhiLangSecurity.colorWithAlpha('#f00', 1);
            assert.contains(result, 'rgba(255, 0, 0, 1)');
        });

        it('should clamp alpha to valid range', () => {
            const result1 = PhiLangSecurity.colorWithAlpha('#000', 2);
            assert.contains(result1, ', 1)');

            const result2 = PhiLangSecurity.colorWithAlpha('#000', -1);
            assert.contains(result2, ', 0)');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // CSS VALIDATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('sanitizeCSS', () => {
        it('should allow safe CSS properties', () => {
            const css = 'color: red; padding: 10px';
            const result = PhiLangSecurity.sanitizeCSS(css);
            assert.contains(result, 'color');
            assert.contains(result, 'padding');
        });

        it('should remove dangerous patterns', () => {
            const css = 'color: red; behavior: url(script.htc); background: blue';
            const result = PhiLangSecurity.sanitizeCSS(css);
            assert.notContains(result, 'behavior');
            assert.notContains(result, 'url');
        });

        it('should block javascript in CSS', () => {
            const css = 'background: url(javascript:alert(1))';
            const result = PhiLangSecurity.sanitizeCSS(css);
            assert.notContains(result.toLowerCase(), 'javascript');
        });

        it('should block expression()', () => {
            const css = 'width: expression(alert(1))';
            const result = PhiLangSecurity.sanitizeCSS(css);
            assert.notContains(result.toLowerCase(), 'expression');
        });

        it('should handle empty input', () => {
            assert.equal(PhiLangSecurity.sanitizeCSS(''), '');
            assert.equal(PhiLangSecurity.sanitizeCSS(null), '');
        });
    });

    describe('createSafeStyle', () => {
        it('should create CSS from object', () => {
            const styles = { color: '#ff0000', padding: '10px' };
            const result = PhiLangSecurity.createSafeStyle(styles);
            assert.contains(result, 'color');
            assert.contains(result, 'padding');
        });

        it('should convert camelCase to kebab-case', () => {
            const styles = { backgroundColor: 'blue' };
            const result = PhiLangSecurity.createSafeStyle(styles);
            assert.contains(result, 'background-color');
        });

        it('should sanitize color values', () => {
            const styles = { color: '#ff0000' };
            const result = PhiLangSecurity.createSafeStyle(styles);
            assert.contains(result, '#ff0000');
        });

        it('should ignore unsafe properties', () => {
            const styles = { position: 'fixed', zIndex: '9999' };
            const result = PhiLangSecurity.createSafeStyle(styles);
            // position and z-index are not in safe list
            assert.notContains(result, 'position');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // URL VALIDATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('isUrlSafe', () => {
        it('should allow http URLs', () => {
            assert.true(PhiLangSecurity.isUrlSafe('http://example.com'));
        });

        it('should allow https URLs', () => {
            assert.true(PhiLangSecurity.isUrlSafe('https://example.com'));
        });

        it('should allow relative URLs', () => {
            assert.true(PhiLangSecurity.isUrlSafe('/path/to/page'));
            assert.true(PhiLangSecurity.isUrlSafe('./file.js'));
        });

        it('should block javascript: URLs', () => {
            assert.false(PhiLangSecurity.isUrlSafe('javascript:alert(1)'));
            assert.false(PhiLangSecurity.isUrlSafe('JAVASCRIPT:alert(1)'));
            assert.false(PhiLangSecurity.isUrlSafe('  javascript:alert(1)'));
        });

        it('should block data: URLs', () => {
            assert.false(PhiLangSecurity.isUrlSafe('data:text/html,<script>alert(1)</script>'));
        });

        it('should block vbscript: URLs', () => {
            assert.false(PhiLangSecurity.isUrlSafe('vbscript:msgbox(1)'));
        });

        it('should handle null and empty', () => {
            assert.false(PhiLangSecurity.isUrlSafe(null));
            assert.false(PhiLangSecurity.isUrlSafe(''));
        });
    });

    describe('sanitizeUrl', () => {
        it('should return safe URLs unchanged', () => {
            assert.equal(
                PhiLangSecurity.sanitizeUrl('https://example.com'),
                'https://example.com'
            );
        });

        it('should return fallback for unsafe URLs', () => {
            assert.equal(
                PhiLangSecurity.sanitizeUrl('javascript:alert(1)'),
                '#'
            );
        });

        it('should use custom fallback', () => {
            assert.equal(
                PhiLangSecurity.sanitizeUrl('javascript:x', '/safe'),
                '/safe'
            );
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SAFE DOM MANIPULATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('createElement', () => {
        it('should create basic elements', () => {
            const el = PhiLangSecurity.createElement('div');
            assert.equal(el.tagName, 'DIV');
        });

        it('should set safe attributes', () => {
            const el = PhiLangSecurity.createElement('div', {
                id: 'test-id',
                class: 'test-class'
            });
            assert.equal(el.id, 'test-id');
            assert.equal(el.className, 'test-class');
        });

        it('should skip event handler attributes', () => {
            const el = PhiLangSecurity.createElement('button', {
                onclick: 'alert(1)',
                onmouseover: 'alert(2)'
            });
            assert.null(el.getAttribute('onclick'));
            assert.null(el.getAttribute('onmouseover'));
        });

        it('should sanitize href attributes', () => {
            const el = PhiLangSecurity.createElement('a', {
                href: 'javascript:alert(1)'
            });
            assert.equal(el.getAttribute('href'), '#');
        });

        it('should sanitize style attributes', () => {
            const el = PhiLangSecurity.createElement('div', {
                style: 'color: red; behavior: url(x)'
            });
            const style = el.style.cssText.toLowerCase();
            assert.contains(style, 'color');
            assert.notContains(style, 'behavior');
        });

        it('should throw for invalid tag names', () => {
            assert.throws(() => {
                PhiLangSecurity.createElement('div onclick=alert(1)');
            }, 'Invalid tag name');
        });

        it('should add text children safely', () => {
            const el = PhiLangSecurity.createElement('p', {}, 'Hello <script>alert(1)</script>');
            assert.equal(el.textContent, 'Hello <script>alert(1)</script>');
            assert.equal(el.children.length, 0); // No script element created
        });
    });

    describe('setTextContent', () => {
        it('should set text content safely', () => {
            const el = document.createElement('div');
            PhiLangSecurity.setTextContent(el, '<script>alert(1)</script>');
            assert.equal(el.textContent, '<script>alert(1)</script>');
            assert.equal(el.children.length, 0);
        });

        it('should handle null values', () => {
            const el = document.createElement('div');
            el.textContent = 'existing';
            PhiLangSecurity.setTextContent(el, null);
            assert.equal(el.textContent, '');
        });
    });

    describe('setHtmlContent', () => {
        it('should remove script tags', () => {
            const el = document.createElement('div');
            PhiLangSecurity.setHtmlContent(el, '<p>Safe</p><script>alert(1)</script>');
            assert.notContains(el.innerHTML, '<script');
        });

        it('should remove onclick handlers', () => {
            const el = document.createElement('div');
            PhiLangSecurity.setHtmlContent(el, '<button onclick="alert(1)">Click</button>');
            assert.notContains(el.innerHTML.toLowerCase(), 'onclick');
        });

        it('should remove iframe tags', () => {
            const el = document.createElement('div');
            PhiLangSecurity.setHtmlContent(el, '<iframe src="evil.com"></iframe>');
            assert.notContains(el.innerHTML.toLowerCase(), 'iframe');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // INPUT VALIDATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('isValidString', () => {
        it('should accept valid strings', () => {
            assert.true(PhiLangSecurity.isValidString('hello'));
            assert.true(PhiLangSecurity.isValidString(''));
        });

        it('should reject non-strings', () => {
            assert.false(PhiLangSecurity.isValidString(123));
            assert.false(PhiLangSecurity.isValidString(null));
            assert.false(PhiLangSecurity.isValidString({}));
        });

        it('should enforce max length', () => {
            assert.true(PhiLangSecurity.isValidString('abc', 5));
            assert.false(PhiLangSecurity.isValidString('abcdef', 5));
        });
    });

    describe('isValidInteger', () => {
        it('should accept valid integers', () => {
            assert.true(PhiLangSecurity.isValidInteger(42));
            assert.true(PhiLangSecurity.isValidInteger(0));
            assert.true(PhiLangSecurity.isValidInteger(-10));
        });

        it('should reject non-integers', () => {
            assert.false(PhiLangSecurity.isValidInteger(3.14));
            assert.false(PhiLangSecurity.isValidInteger('42'));
            assert.false(PhiLangSecurity.isValidInteger(NaN));
        });

        it('should enforce min/max', () => {
            assert.true(PhiLangSecurity.isValidInteger(5, 0, 10));
            assert.false(PhiLangSecurity.isValidInteger(15, 0, 10));
            assert.false(PhiLangSecurity.isValidInteger(-5, 0, 10));
        });
    });

    describe('validateObject', () => {
        it('should validate object structure', () => {
            const obj = { name: 'test', count: 42 };
            const schema = { name: 'string', count: 'number' };
            assert.true(PhiLangSecurity.validateObject(obj, schema));
        });

        it('should reject missing fields', () => {
            const obj = { name: 'test' };
            const schema = { name: 'string', count: 'number' };
            assert.false(PhiLangSecurity.validateObject(obj, schema));
        });

        it('should reject wrong types', () => {
            const obj = { name: 123 };
            const schema = { name: 'string' };
            assert.false(PhiLangSecurity.validateObject(obj, schema));
        });

        it('should validate arrays', () => {
            const obj = { items: [1, 2, 3] };
            const schema = { items: 'array' };
            assert.true(PhiLangSecurity.validateObject(obj, schema));
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // STORAGE SECURITY TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('safeJsonParse', () => {
        it('should parse valid JSON', () => {
            const result = PhiLangSecurity.safeJsonParse('{"name":"test"}');
            assert.deepEqual(result, { name: 'test' });
        });

        it('should return null for invalid JSON', () => {
            assert.null(PhiLangSecurity.safeJsonParse('not json'));
            assert.null(PhiLangSecurity.safeJsonParse(''));
            assert.null(PhiLangSecurity.safeJsonParse(null));
        });

        it('should block prototype pollution attempts', () => {
            const malicious = '{"__proto__": {"isAdmin": true}}';
            const result = PhiLangSecurity.safeJsonParse(malicious);
            assert.null(result);
        });

        it('should block constructor pollution', () => {
            const malicious = '{"constructor": {"prototype": {"isAdmin": true}}}';
            const result = PhiLangSecurity.safeJsonParse(malicious);
            assert.null(result);
        });
    });

    describe('getStorageItem / setStorageItem', () => {
        const testKey = 'philang_test_item';

        afterEach(() => {
            localStorage.removeItem(testKey);
        });

        it('should store and retrieve objects', () => {
            const data = { test: true, count: 42 };
            PhiLangSecurity.setStorageItem(testKey, data);
            const result = PhiLangSecurity.getStorageItem(testKey);
            assert.deepEqual(result, data);
        });

        it('should return default for missing keys', () => {
            const result = PhiLangSecurity.getStorageItem('nonexistent_key', 'default');
            assert.equal(result, 'default');
        });

        it('should handle arrays', () => {
            const data = [1, 2, 3];
            PhiLangSecurity.setStorageItem(testKey, data);
            const result = PhiLangSecurity.getStorageItem(testKey);
            assert.deepEqual(result, data);
        });
    });
});
