# PhiLang Inference Rules

## A System for Philosophical Derivation

This document specifies the inference rules that allow derivation of new philosophical positions from existing expressions. The engine implements 34 rules across 5 categories.

---

## Overview

### What Inference Does

Given an expression like `Σ ⋈ Ω`, the inference engine derives what follows:

```
INPUT: Σ ⋈ Ω

STRUCTURAL:
  Ω ⋈ Σ                    ← Chiasm Symmetry
  ¬(Σ ⋈ Ω)                 ← Negation Introduction

TRADITION-SPECIFIC:
  Σ ⋈ Ω within H[τ]        ← Horizonal Constitution [Phenomenology]
  κ+(Σ ⋈ Ω)                ← Conatus Universality [Spinozism]
  śū(Σ ⋈ Ω)                ← Universal Emptiness [Buddhism]
  ◈{Σ ⋈ Ω}                 ← Tetralemma Expansion [Buddhism]

CROSS-TRADITIONAL:
  (none for this input)

GENERATIVE:
  Σ ⋈ Ω within Π∞          ← Field Variation
  ⌒(Σ ⋈ Ω)                 ← Operator Application
```

### Rule Categories

| Category | Purpose | Count |
|----------|---------|-------|
| **Structural** | Pure logical/relational operations | 6 |
| **Tradition-Specific** | Encode philosophical doctrines | 21 |
| **Cross-Traditional** | Generate dialogues between traditions | 4 |
| **Generative** | Explore unexplored combinations | 3 |

---

## Structural Rules

These rules operate on the logical/relational structure of expressions, independent of philosophical tradition.

### 1. Chiasm Symmetry

```
RULE: If A ⋈ B, then B ⋈ A

Chiasm is symmetric—the intertwining works both ways.

EXAMPLE:
  Σ ⋈ Ω  ⊢  Ω ⋈ Σ
  // Self chiasms Other implies Other chiasms Self
```

### 2. Implication Transitivity

```
RULE: If A → B and B → C, then A → C

Implication chains can be collapsed.

EXAMPLE:
  (Σ → Shame) → Withdrawal  ⊢  Σ → Withdrawal
```

### 3. Reversibility Expansion

```
RULE: If A ⇋ B, then ◇(A → B) and ◇(B → A)

Reversibility implies bidirectional possibility.

EXAMPLE:
  Sentient ⇋ Sensible  ⊢  ◇(Sentient → Sensible)
                       ⊢  ◇(Sensible → Sentient)
```

### 4. Negation Introduction

```
RULE: For any A, consider ¬(A)

Every concept has its negation worth examining.

EXAMPLE:
  Being  ⊢  ¬(Being)
  // What is Being not? What does it exclude?
```

### 5. Field Abstraction

```
RULE: If A within F, then examine A and F separately

Situated expressions can be decomposed.

EXAMPLE:
  Σ within H[τ]  ⊢  Σ
                 ⊢  ?(H[τ])
  // Abstract self from its horizon; question the horizon itself
```

### 6. Assemblage Decomposition

```
RULE: If ⟦A, B, C⟧, examine each component and their relations

Assemblages yield their components.

EXAMPLE:
  ⟦Body, Tool, Task⟧  ⊢  Body
                      ⊢  Tool
                      ⊢  Task
                      ⊢  Body ⋈ Tool
```

---

## Tradition-Specific Rules

These rules encode the doctrines of particular philosophical traditions.

### Phenomenology (4 rules)

#### Horizonal Constitution

```
RULE: If A, then A within H[...]

Every appearance requires a horizon (Husserl).

EXAMPLE:
  Perception  ⊢  Perception within H[...]
              ⊢  Perception within H[τ]
  // What horizon makes perception possible?
```

#### Flesh Reversibility

```
RULE: χ implies Sentient ⇋ Sensible

Flesh is the reversibility of sensing and sensed (Merleau-Ponty).

EXAMPLE:
  χ  ⊢  Sentient ⇋ Sensible
     ⊢  Touching ⋈ Touched
```

#### Intersubjective Implication

```
RULE: If Σ, then possible Σ ⋈ Ω

Self implies potential relation to Other.

EXAMPLE:
  Σ  ⊢  Σ ⋈ Ω
     ⊢  Σ 👁 Ω
  // Self can be gazed upon by Other
```

#### Temporal Constitution

```
RULE: τ implies ⟨t⟩ and ⟨t'⟩

The living present is constituted by retention and protention.

EXAMPLE:
  τ  ⊢  ⟨t⟩ → τ → ⟨t'⟩
     ⊢  τ := ⟨t⟩ ⋈ ⟨t'⟩
```

### Spinozism (4 rules)

#### Substance Uniqueness

```
RULE: ∃(▣) → unique

There is only one substance (Ethics I).

EXAMPLE:
  ▣  ⊢  ∃(▣) → unique
     ⊢  ▣ ≡ God ≡ Nature
```

#### Mode Immanence

```
RULE: If ◇, then ◇ within ▣

All modes are in substance.

EXAMPLE:
  ◇  ⊢  ◇ within ▣
     ⊢  ▣ → ◇
  // Substance expresses itself through modes
```

#### Conatus Universality

```
RULE: If ∃(X), then κ+(X)

Everything strives to persist in being (Ethics III).

EXAMPLE:
  Body  ⊢  κ+(Body)
  Mind  ⊢  κ+(Mind)
  // Everything has conatus
```

#### Knowledge Ascent

```
RULE: K₁ → K₂ → K₃

Knowledge ascends from imagination to reason to intuition.

EXAMPLE:
  K₁  ⊢  K₁ → K₂
  K₂  ⊢  K₂ → K₃
  K₃  ⊢  K₃(God) → Beatitude
```

### Buddhism (5 rules)

#### Universal Emptiness

```
RULE: If ∃(X), then śū(X)

All existents are empty of inherent existence (MMK).

EXAMPLE:
  Self   ⊢  śū(Self)
  Cause  ⊢  śū(Cause)
  ▣      ⊢  śū(▣)
  // Even substance is empty
```

#### Emptiness of Emptiness

```
RULE: śū(X) → śū(śū(X))

Emptiness itself is empty—prevents reification.

EXAMPLE:
  śū(Self)  ⊢  śū(śū(Self))
  // Don't cling to emptiness either
```

#### Dependent Origination Identity

```
RULE: प्र ≡ śū

Dependent origination IS emptiness—the core Madhyamaka identity.

EXAMPLE:
  śū(X)  ⊢  प्र ≡ śū
         ⊢  प्र ≡ śū ≡ Middle_Way
```

#### Tetralemma Expansion

```
RULE: For any X, generate ◈{X} with four positions

The four-cornered analysis (catuṣkoṭi).

EXAMPLE:
  Self  ⊢  ◈{Self}
        ⊢  ◈₁: Self exists
        ⊢  ◈₂: Self does not exist
        ⊢  ◈₃: Self both exists and doesn't
        ⊢  ◈₄: Self neither exists nor doesn't
```

#### Tetralemma Transcendence

```
RULE: ◈{X} → ◈₀(X)

Transcend all four positions.

EXAMPLE:
  ◈{Self}  ⊢  ◈₀(Self)
           ⊢  prapañca(Self) → 0
  // Cessation of conceptual proliferation
```

### Process Philosophy (4 rules)

#### Prehensive Universality

```
RULE: If ⦿, then ⦿ ⥤ H[⦿]

Every actual entity prehends its actual world.

EXAMPLE:
  ⦿  ⊢  ⦿ ⥤ H[⦿]
     ⊢  ∀⦿₁,⦿₂: ⦿₁ ⥤(+) ⦿₂ ∨ ⦿₁ ⥤(-) ⦿₂
  // Everything prehends everything (positively or negatively)
```

#### Concrescence Process

```
RULE: ⦿ implies ⤳ → α(⦿)

Occasions arise through concrescence to satisfaction.

EXAMPLE:
  ⦿  ⊢  ⦿ := ⤳ → α(⦿)
     ⊢  ⤳(⥤(phys), ⥤(conc)) → α(⦿)
```

#### Creativity Formula

```
RULE: ℂ(Many) → One → Many'

The many become one and are increased by one.

EXAMPLE:
  ℂ  ⊢  ℂ(Many) → One
     ⊢  One → Many'
     ⊢  Many' > Many
  // Reality grows through creative advance
```

#### Objective Immortality

```
RULE: α(⦿) → †(α(⦿))

Satisfied occasions perish into traces (objective immortality).

EXAMPLE:
  α(⦿)  ⊢  †(α(⦿))
  // After satisfaction, the occasion becomes datum for future prehension
```

### Poststructuralism (4 rules)

#### Fold Operation

```
RULE: Inside := ⌒(Outside)

The interior is the exterior folded (Deleuze).

EXAMPLE:
  Outside  ⊢  Inside := ⌒(Outside)
           ⊢  ⌒(⌒(Outside)) → Outside?
  // Does double-folding return to origin?
```

#### Virtual-Actual Circuit

```
RULE: ν ⇋ α

Virtual and actual exchange.

EXAMPLE:
  ν  ⊢  ν→α (actualization)
     ⊢  ν ⇋ α (reversibility)
  α  ⊢  α→ν (counter-actualization)
```

#### Deterritorialization

```
RULE: T[X] → T→(X)

Any territory can be deterritorialized.

EXAMPLE:
  T[Home]  ⊢  T→(Home)
           ⊢  T→(Home) → →T'(Home)
  // Deterritorialization leads to reterritorialization
```

#### Trace Introduction

```
RULE: Presence implies †(Absence)

Presence bears trace of absence (Derrida).

EXAMPLE:
  Being  ⊢  †(¬(Being))
         ⊢  Being ← †(Origin)
  // Being bears trace of what it is not
```

---

## Cross-Traditional Rules

These rules generate dialogues and tensions between different philosophical traditions.

### Spinoza-Buddhism Tension

```
RULE: ▣ triggers dialogue with śū

Is substance itself empty?

DERIVATIONS:
  ▣  ⊢  śū(▣)?
     // Buddhist challenge: Is substance empty?
     
  śū  ⊢  śū within ▣?
      // Spinozist question: Is emptiness a mode of substance?
```

### Process-Buddhism Dialogue

```
RULE: ⦿ triggers dialogue with śū

Can an actual entity prehend emptiness?

DERIVATIONS:
  ⦿  ⊢  ⦿ ⥤ śū
     // Can an occasion prehend emptiness?
     
  ⦿  ⊢  śū(⦿)?
     // Is an actual entity empty of inherent existence?
     
  śū  ⊢  śū := ⤳?
      // Is emptiness a kind of process?
```

### Phenomenology-Process Bridge

```
RULE: H[τ] resonates with H[⦿]

Horizon of living present ≈ actual world of occasion.

DERIVATIONS:
  τ  ⊢  H[τ] ≈ H[⦿]
  
  ⦿  ⊢  ⦿ ⊨ World?
     // Does actual entity constitute its world phenomenologically?
```

### Deleuze-Whitehead Resonance

```
RULE: ν resonates with ν•

Virtual field ≈ eternal objects.

DERIVATIONS:
  ν   ⊢  ν ≈ {ν•}
      // Virtual field contains eternal objects
      
  ν•  ⊢  ν• := ν(specific)
      // Eternal object is specific virtual
      
  ι   ⊢  ι ≈ sf
      // Intensity ≈ subjective form
```

---

## Generative Rules

These rules systematically explore unexplored philosophical space.

### Relation Exploration

```
RULE: Try untried relations between present entities

Given entities, what relations might connect them?

EXAMPLE:
  Σ  ⊢  Σ ⋈ ?
     ⊢  Σ ≈ ?
     ⊢  Σ ⊥ ?
  // What might Self relate to through chiasm, resonance, opposition?
```

### Operator Application

```
RULE: Apply relevant operators to present concepts

What happens when we transform a concept?

EXAMPLE:
  Body  ⊢  śū(Body)    // Is it empty?
        ⊢  ⌒(Body)     // What if we fold it?
        ⊢  ν→α(Body)   // How does it actualize?
        ⊢  κ+(Body)    // What is its striving?
```

### Field Variation

```
RULE: Place expression in different fields

How does context change meaning?

EXAMPLE:
  Σ ⋈ Ω  ⊢  Σ ⋈ Ω within H[τ]     // in living present
         ⊢  Σ ⋈ Ω within Π∞        // on plane of immanence
         ⊢  Σ ⋈ Ω within H[Ω]      // in horizon of Other
```

---

## Using the Inference Engine

### Command Line

```bash
# Interactive derivation mode
python main.py -d

# Derive from specific expression
python main.py -d "⦿"
python main.py -d "Σ ⋈ Ω"
python main.py -d "śū(Self)"
```

### Python API

```python
from inference import InferenceEngine, derive

# Quick derivation
print(derive("⦿"))

# Full control
engine = InferenceEngine()
derivations = engine.derive("Σ ⋈ Ω", max_depth=2)
print(engine.format_derivations(derivations))

# Filter by tradition
from interpreter import Tradition
filtered = engine.derive_filtered(
    "▣",
    traditions=[Tradition.BUDDHISM, Tradition.SPINOZISM]
)
```

### Example Session

```
∴> ⦿

════════════════════════════════════════════════════════════
DERIVATIONS
════════════════════════════════════════════════════════════

▸ STRUCTURAL
────────────────────────────────────────
  ¬(⦿)
    ← Negation Introduction
    What is ⦿ not? What does it exclude?

▸ TRADITION-SPECIFIC
────────────────────────────────────────
  ⦿ ⥤ H[⦿]
    ← Prehensive Universality [Process Philosophy]
    Every actual entity prehends its actual world

  ⦿ := ⤳ → α(⦿)
    ← Concrescence Process [Process Philosophy]
    Actual entity arises through concrescence to satisfaction

  śū(⦿)
    ← Universal Emptiness [Buddhism]
    Nagarjuna: ⦿ is empty of inherent existence

  ◈{⦿}
    ← Tetralemma Expansion [Buddhism]
    Apply four-cornered analysis to ⦿

▸ CROSS-TRADITIONAL
────────────────────────────────────────
  ⦿ ⥤ śū
    ← Process-Buddhism Dialogue
    Can an actual entity prehend emptiness?

  śū(⦿)?
    ← Process-Buddhism Dialogue
    Is an actual entity empty of inherent existence?
```

---

## Rule Summary Table

| # | Rule Name | Type | Tradition | Pattern |
|---|-----------|------|-----------|---------|
| 1 | Chiasm Symmetry | Structural | — | A ⋈ B → B ⋈ A |
| 2 | Implication Transitivity | Structural | — | A→B, B→C → A→C |
| 3 | Reversibility Expansion | Structural | — | A ⇋ B → ◇(A→B), ◇(B→A) |
| 4 | Negation Introduction | Structural | — | A → ¬(A) |
| 5 | Field Abstraction | Structural | — | A within F → A, ?(F) |
| 6 | Assemblage Decomposition | Structural | — | ⟦A,B,C⟧ → A, B, C |
| 7 | Horizonal Constitution | Tradition | Phenom | A → A within H[...] |
| 8 | Flesh Reversibility | Tradition | Phenom | χ → Sentient ⇋ Sensible |
| 9 | Intersubjective Implication | Tradition | Phenom | Σ → Σ ⋈ Ω |
| 10 | Temporal Constitution | Tradition | Phenom | τ → ⟨t⟩ ⋈ ⟨t'⟩ |
| 11 | Substance Uniqueness | Tradition | Spinoza | ▣ → unique |
| 12 | Mode Immanence | Tradition | Spinoza | ◇ → ◇ within ▣ |
| 13 | Conatus Universality | Tradition | Spinoza | X → κ+(X) |
| 14 | Knowledge Ascent | Tradition | Spinoza | K₁ → K₂ → K₃ |
| 15 | Universal Emptiness | Tradition | Buddhism | X → śū(X) |
| 16 | Emptiness of Emptiness | Tradition | Buddhism | śū(X) → śū(śū(X)) |
| 17 | Dependent Origination | Tradition | Buddhism | śū ↔ प्र |
| 18 | Tetralemma Expansion | Tradition | Buddhism | X → ◈{X} |
| 19 | Tetralemma Transcendence | Tradition | Buddhism | ◈{X} → ◈₀(X) |
| 20 | Prehensive Universality | Tradition | Process | ⦿ → ⦿ ⥤ H[⦿] |
| 21 | Concrescence Process | Tradition | Process | ⦿ → ⤳ → α(⦿) |
| 22 | Creativity Formula | Tradition | Process | ℂ → Many→One→Many' |
| 23 | Objective Immortality | Tradition | Process | α(⦿) → †(α(⦿)) |
| 24 | Fold Operation | Tradition | Post | X → ⌒(X) |
| 25 | Virtual-Actual Circuit | Tradition | Post | ν ⇋ α |
| 26 | Deterritorialization | Tradition | Post | T[X] → T→(X) |
| 27 | Trace Introduction | Tradition | Post | X → †(¬X) |
| 28 | Spinoza-Buddhism Tension | Cross | — | ▣ ↔ śū |
| 29 | Process-Buddhism Dialogue | Cross | — | ⦿ ↔ śū |
| 30 | Phenomenology-Process | Cross | — | H[τ] ≈ H[⦿] |
| 31 | Deleuze-Whitehead | Cross | — | ν ≈ ν• |
| 32 | Relation Exploration | Generative | — | X → X R ? |
| 33 | Operator Application | Generative | — | X → O(X) |
| 34 | Field Variation | Generative | — | X → X within F |

---

## Future Extensions

### Potential Additional Rules

**Hegelian Dialectic:**
```
A ⊥ B → A ⊕ B (Aufhebung)
// Thesis and antithesis yield synthesis
```

**Heideggerian Ontological Difference:**
```
∃(X) → Being(X) ≢ beings(X)
// Being is not a being
```

**Levinasian Ethics:**
```
◉ → ◉ ≷ Σ
// Face exceeds totalization
```

**Lacanian Triad:**
```
Imaginary ⋈ Symbolic ⋈ Real
// The Borromean knot
```

### Multi-Step Proofs

Future versions could support proof chains:
```
THEOREM: Σ within H[τ] → śū(Σ) @ c

PROOF:
  1. Σ within H[τ]               [Given]
  2. Σ                           [Field Abstraction from 1]
  3. śū(Σ)                       [Universal Emptiness from 2]
  4. śū(Σ) @ c                   [Two Truths: emptiness at conventional level]
  QED
```

---

*Document Version: 1.0*
*Part of the PhiLang project*
