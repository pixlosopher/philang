# Contributing to PhiLang

Thank you for your interest in contributing to PhiLang! This document will help you get set up and understand the project architecture.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/pixlosopher/philang.git
cd philang

# Serve locally (no build step required)
python3 -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

No build tools, no bundlers, no transpilers (except Babel for the React-based embeddings pages). Pure vanilla JavaScript.

## Project Architecture

### Module System

PhiLang uses a namespace-based module system. Each module attaches to `window` as a global singleton. **Load order matters** — modules depend on earlier ones being available.

```
philang_config.js       → PhiLangConfig       (error boundaries, debug logging)
philang_security.js     → PhiLangSecurity      (input validation, XSS prevention)
philang_api.js          → PhiLangAPI           (Claude API integration, rate limiting)
philang_persistence.js  → PhiLangPersistence   (IndexedDB storage layer)
philang_toast.js        → PhiLangToast         (toast notifications)
philang_shortcuts.js    → PhiLangShortcuts     (keyboard shortcuts)
philang_ontology.js     → PhiLangOntology      (shared philosophical concepts)
philang_skeleton.js     → PhiLangSkeleton      (loading placeholders)
philang_export.js       → PhiLangExport        (LaTeX/Markdown/BibTeX/PDF export)
philang_urlstate.js     → PhiLangURLState      (shareable URL state encoding)
philang_ui.js           → PhiLangUI            (mobile menu, dropdowns, history lists)
philang_features.js     → PhiLangFeatures      (feature flags)
philang_performance.js  → PhiLangPerformance   (performance monitoring)
philang_analytics.js    → PhiLangAnalytics     (privacy-respecting telemetry)
```

### Pages

| Page | Purpose | Key Dependencies |
|------|---------|-----------------|
| `index.html` | Landing page | Tailwind CSS |
| `socratic_counsel.html` | Philosophical therapy sessions | Claude API |
| `dialectical_dialogue.html` | Multi-tradition debates | Claude API |
| `derivation_graph.html` | Concept visualization | D3.js v7 |
| `philang_embeddings.html` | Embeddings explorer | React 18, D3.js |
| `philang_embeddings_advanced.html` | Advanced embeddings with training | React 18, D3.js |
| `p-vs-np.html` | P vs NP complexity theory explorer | D3.js, Claude API |

### External Dependencies

All loaded via CDN — no `npm install` required:

- **Tailwind CSS** — utility-first styling
- **D3.js v7** — data visualization (derivation graph, embeddings, P vs NP)
- **React 18 + Babel** — embeddings pages only (in-browser JSX transpilation)
- **jsPDF** — PDF export
- **Google Fonts** — Cormorant Garamond, Crimson Pro, JetBrains Mono

### Service Worker

`sw.js` provides offline support:
- **Cache-first** for JS/CSS static assets
- **Network-first** for HTML pages
- **Stale-while-revalidate** for fonts and external resources
- API calls to Anthropic are **never cached**

## Code Patterns

### Error Boundaries
```javascript
const safeFn = PhiLangConfig.withErrorBoundary('module', async () => {
    // risky operation
}, { fallback: defaultValue });
```

### Safe DOM Manipulation
```javascript
// Always use PhiLangSecurity for user-facing content
const safeText = PhiLangSecurity.escapeHtml(userInput);
const safeColor = PhiLangSecurity.sanitizeColor(input, '#999');
```

### Feature Flags
```javascript
PhiLangFeatures.when('debugMode', () => {
    console.log('Debug info');
});
```

### Persistence
```javascript
// IndexedDB via PhiLangPersistence
await PhiLangPersistence.save('sessions', { id, data });
const sessions = await PhiLangPersistence.getAll('sessions');
```

## Adding a New Philosophical Tradition

1. Add the tradition to `philang_ontology.js`:
   ```javascript
   { id: 'your-tradition', name: 'Tradition Name', color: '#hexcolor', concepts: [...] }
   ```

2. Add tradition-specific operators (if any) to the operators section

3. Update the landing page card grid in `index.html` if adding a new module

## Testing

Tests run in the browser via `tests/test_runner.html`:

```bash
open tests/test_runner.html
```

Test files follow the pattern `tests/test_<module>.js`. The framework (`philang_test_framework.js`) provides:
- `describe()` / `it()` blocks
- `expect().toBe()`, `.toEqual()`, `.toThrow()`, etc.
- Async test support
- DOM testing utilities

### Current Coverage
- `philang_security.js` — tested
- `philang_config.js` — tested
- `philang_persistence.js` — tested
- `philang_ontology.js` — tested

## Security Considerations

- All user input passes through `PhiLangSecurity` before DOM insertion
- CSP headers restrict script/style sources
- API keys stored in `localStorage` (client-side app — acceptable tradeoff)
- No server-side component — static files only

## Design System

The UI uses a dark philosophical aesthetic:

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#0a0910` | Deepest background |
| `--abyss` | `#0f0e13` | Page background |
| `--obsidian` | `#16141c` | Card backgrounds |
| `--smoke` | `#1e1b26` | Hover states |
| `--gold` | `#c9a227` | Primary accent |
| `--pearl` | `#e8e0d0` | Primary text |
| `--silver` | `#9a9494` | Secondary text |
| `--indigo-glow` | `#6366f1` | Interactive accent |

Fonts: **Cormorant Garamond** (display), **Crimson Pro** (body), **JetBrains Mono** (code)

## Pull Request Guidelines

1. Test your changes locally across all pages
2. Verify mobile responsiveness
3. Run the test suite (`tests/test_runner.html`)
4. Keep commits focused — one logical change per commit
5. Follow existing code patterns (namespace globals, error boundaries, security sanitization)
