<div align="center">

# φ PhiLang

### A Philosophical Programming Language

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://pixlosopher.github.io/philang/)
[![GitHub Stars](https://img.shields.io/github/stars/pixlosopher/philang?style=for-the-badge)](https://github.com/pixlosopher/philang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-blueviolet?style=for-the-badge)](https://anthropic.com)

*Bridging formal systems and philosophical discourse*

[**Live Demo**](https://pixlosopher.github.io/philang/) · [**Features**](#features) · [**Traditions**](#philosophical-traditions) · [**Operators**](#operators) · [**Contributing**](#contributing)

</div>

---

## What is PhiLang?

PhiLang is an experimental programming language and visualization system for exploring philosophical concepts. It provides a formal grammar for expressing relationships between ideas from the great philosophical traditions—from Buddhist emptiness to Hegelian dialectics, from Phenomenology to Process Philosophy.

```
emptiness ⊗ dep-orig → ¬substance
```
*"Emptiness synthesized with dependent origination derives the negation of substance"*

---

## Features

### 🔮 Derivation Graph
Visualize concept relationships through magnetic force-directed networks. Drag concepts to build derivations, watch semantic affinity reveal philosophical connections.

### ⚔️ Dialectical Dialogue
Simulate debates between 10 philosophical traditions. Watch Phenomenology argue with Buddhism, Hegelianism confront Poststructuralism—powered by Claude AI for genuine philosophical reasoning.

### 🧘 Socratic Counsel
Philosophical therapy sessions. Engage in Socratic dialogue, receive Stoic counsel, practice Buddhist mindful inquiry, or face existential confrontation.

### 🧠 Semantic Embeddings
Train neural embeddings on PhiLang concepts. Explore 32D/64D vector spaces with PCA visualization, k-means clustering, and philosophical analogy discovery.

---

## Philosophical Traditions

PhiLang includes 150+ concepts from 14 philosophical traditions:

| Tradition | Key Concepts | Thinkers |
|-----------|--------------|----------|
| **Phenomenology** | Intentionality, Horizon, Flesh, Lifeworld | Husserl, Merleau-Ponty |
| **Buddhism** | Emptiness (śūnyatā), Dependent Origination, Non-self | Nāgārjuna, Candrakīrti |
| **Hegelianism** | Aufhebung, Dialectic, Absolute Spirit, Negation | Hegel, Žižek |
| **Process Philosophy** | Concrescence, Prehension, Creativity, Actual Occasions | Whitehead, Hartshorne |
| **Poststructuralism** | Différance, Fold, Rhizome, Deterritorialization | Deleuze, Derrida |
| **Spinozism** | Substance, Modes, Conatus, Attributes | Spinoza, Deleuze (early) |
| **Early Wittgenstein** | Logical Form, Picture Theory, Saying/Showing | Wittgenstein (Tractatus) |
| **Late Wittgenstein** | Language-games, Family Resemblance, Forms of Life | Wittgenstein (Investigations) |
| **Kantian** | Categories, Transcendental Unity, Thing-in-itself | Kant |
| **Aristotelian** | Substance, Essence, Four Causes, Eudaimonia | Aristotle |
| **Platonic** | Forms, Participation, Allegory of the Cave | Plato |
| **Computational Complexity** | P, NP, 3-SAT, Solver, Verifier, Prehensive Gap | Whitehead, Cook, Turing |

---

## Operators

The grammar of philosophical transformation:

| Symbol | Name | Meaning | Example |
|--------|------|---------|---------|
| `→` | Derivation | A leads to B | `thesis → antithesis` |
| `⊗` | Synthesis | A combined with B | `being ⊗ nothing → becoming` |
| `¬` | Negation | Dialectical negation | `¬substance` |
| `⟨ ⟩` | Epoché | Phenomenological bracket | `⟨natural-attitude⟩` |
| `∘` | Composition | A composed with B | `time ∘ consciousness` |
| `↺` | Recursion | Self-reference | `self ↺` |
| `∅` | Emptiness | Void, absence | `∅ → dependent-origination` |
| `Δ` | Difference | Change, becoming | `identity Δ difference` |

---

## Quick Start

1. **Visit the live demo**: [pixlosopher.github.io/philang](https://pixlosopher.github.io/philang/)
2. **Configure Claude API** (optional): Click "Configure" and add your [Anthropic API key](https://console.anthropic.com/) for AI-powered features
3. **Explore**:
   - Try the **Derivation Graph** to visualize concept relationships
   - Start a **Dialectical Dialogue** between traditions
   - Begin a **Socratic Counsel** session

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 |
| **Styling** | Tailwind CSS |
| **Visualization** | D3.js (force-directed graphs, embeddings) |
| **AI Integration** | Claude API (Anthropic) |
| **Storage** | IndexedDB (local persistence) |
| **Hosting** | GitHub Pages |

### Why No Framework?

PhiLang is intentionally minimal. Philosophy shouldn't require a 500KB framework to explore. The entire codebase is ~40KB of JavaScript that runs entirely client-side.

---

## Philosophy

> *"The limits of my language mean the limits of my world."* — Wittgenstein

PhiLang emerged from a simple question: *What if we could compute with philosophical concepts the way we compute with numbers?*

Philosophy has always had formal structures—syllogisms, dialectics, phenomenological reductions. PhiLang makes these structures explicit and interactive, allowing for:

- **Exploration**: Discover unexpected connections between traditions
- **Education**: Learn philosophical concepts through interaction
- **Creativity**: Generate novel philosophical syntheses
- **Dialogue**: Engage with AI that reasons philosophically

This is not an attempt to *reduce* philosophy to algorithms, but to *explore* it in new ways.

---

## Project Structure

```
philang/
├── index.html                 # Landing page
├── derivation_graph.html      # Concept visualization
├── dialectical_dialogue.html  # AI debates
├── socratic_counsel.html      # Philosophical therapy
├── philang_embeddings.html    # Basic embeddings
├── philang_embeddings_advanced.html  # Advanced embeddings
├── philang_*.js               # Core modules
│   ├── philang_config.js      # Configuration
│   ├── philang_security.js    # Input validation
│   ├── philang_api.js         # Claude integration
│   ├── philang_ontology.js    # Concept definitions
│   ├── philang_persistence.js # IndexedDB storage
│   └── ...
├── tests/                     # Test suite
└── sw.js                      # Service worker
```

---

## Contributing

Contributions are welcome! Areas of particular interest:

- **New Traditions**: Daoism, Confucianism, African philosophy, Indian schools
- **Concept Refinement**: Better definitions, more nuanced relationships
- **AI Prompts**: Improving philosophical reasoning quality
- **Visualization**: New ways to display philosophical relationships
- **Documentation**: Tutorials, examples, educational content

### Development

```bash
# Clone the repository
git clone https://github.com/pixlosopher/philang.git

# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve
```

Open `http://localhost:8000` in your browser.

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Built with [Claude AI](https://anthropic.com) by Anthropic
- Visualization powered by [D3.js](https://d3js.org)
- Typography: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

<div align="center">

*"The unexamined life is not worth living."* — Socrates

<br/>

### [**Try PhiLang Now →**](https://pixlosopher.github.io/philang/)

<br/>

Made with φ by [pixlosopher](https://github.com/pixlosopher)

</div>
