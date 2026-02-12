# PhiLang: A Philosophical Language

A formal grammar for philosophical thought—a language where concepts relate through operations, not functions.

## Overview

PhiLang provides ~146 primitives across 19 domains:

| Domain | Examples | Tradition |
|--------|----------|-----------|
| Ontological | ∃, ∅, ▣, ◇ | General |
| Intersubjective | Σ, Ω, ◉, χ, ⋈ | Phenomenology |
| Temporal | τ, ⟨t⟩, ⟨t'⟩, †, ! | Phenomenology |
| Horizonal | H[], Π∞ | Husserl/Deleuze |
| Spinozist | ε, κ+, π+, K₁K₂K₃ | Spinoza |
| Buddhist | śū, svā, प्र, ◈{} | Madhyamaka |
| Process | ⦿, ⤳, ℂ, ⥤ | Whitehead |
| Poststructural | ⌒, ν, α, ι, T→ | Deleuze/Derrida |
| And more... | | |

## Installation

```bash
cd philang/src
python main.py -i  # Interactive mode
```

## Usage

### Interactive REPL

```bash
python main.py -i
```

```
φ> Σ ⋈ Ω within H[τ]

============================================================
EXPRESSION: Σ ⋈ Ω within H[τ]
============================================================

STRUCTURE: Situated Expression

TRADITIONS: Phenomenology

SYMBOLS USED:
  Σ — Self/Subject
  Ω — Other/Alterity
  ⋈ — Chiasm
  H[ — Horizon (Husserl)
  τ — Living Present

INSIGHTS:
  • Expression is contextualized within a field/horizon
  • Chiasmic structure—intertwining without reduction

TENSIONS:
  ⚡ Self-Other dynamic: intersubjective tension present

QUESTIONS RAISED:
  ? How does this appear to consciousness?
  ? What crosses without collapsing in this chiasm?
```

### Single Expression

```bash
python main.py "śū(All) → प्र ≡ śū"
```

### Python API

```python
from interpreter import Interpreter, interpret

# Quick analysis
print(interpret("ℂ(Many) → One"))

# Full control
interp = Interpreter()
result = interp.analyze("⦿ := ⤳ → α(⦿)")
print(interp.format_result(result))
```

## Syntax Examples

### Basic Proposition
```
Σ ⋈ Ω                    # Self chiasms with Other
Being ≡ Nothing          # Hegelian identity
```

### Situated Expression
```
Body within H[τ]         # Body within horizon of living present
Experience within T[Home] # Experience within territory of Home
```

### Definition
```
Flesh := χ where Sentient ⇋ Sensible
```

### Application
```
śū(All)                  # Emptiness of all
ℂ(Many) → One            # Creativity transforms many into one
```

### Temporal Location
```
Event @ τ                # Event at living present
Being @ Eternity         # Being under aspect of eternity
```

### Tetralemma
```
◈{Self}                  # Four-cornered analysis of Self
```

### Assemblage
```
⟦Body, Tool, Task⟧       # Heterogeneous assemblage
```

### Retroactive Constitution
```
Trauma ⟻ Event           # Trauma retroactively constitutes event
```

## Traditions Supported

The interpreter identifies which philosophical traditions are present:

- **Phenomenology** (Husserl, Merleau-Ponty, Levinas)
- **Spinozism** (Spinoza, Deleuze's reading)
- **Buddhism** (Madhyamaka, Nagarjuna)
- **Process Philosophy** (Whitehead)
- **Poststructuralism** (Deleuze, Derrida)
- **Critical Theory** (Foucault)
- **Psychoanalysis** (Lacan)

## Stress-Tested Against

The language has been formalized and tested against:

1. **Spinoza's Ethics** — Rationalist substance metaphysics
2. **Nagarjuna's MMK** — Buddhist emptiness philosophy  
3. **Whitehead's Process and Reality** — Process philosophy

See the `/docs` folder for complete formalizations.

## Project Structure

```
philang/
├── src/
│   ├── lexer.py        # Tokenizer
│   ├── ast_nodes.py    # AST definitions
│   ├── parser.py       # Parser
│   ├── interpreter.py  # Analysis engine
│   └── main.py         # Entry point
└── README.md
```

## Future Development

- [ ] Inference rules for philosophical derivation
- [ ] Generation of unexplored positions
- [ ] Visual graph of tradition relationships
- [ ] Web interface
- [ ] Export to LaTeX

## License

MIT

## Acknowledgments

Built on the shoulders of giants: Spinoza, Nagarjuna, Whitehead, Husserl, Merleau-Ponty, Levinas, Deleuze, Derrida, Foucault, Lacan, and many others whose thought this language attempts to formalize.
