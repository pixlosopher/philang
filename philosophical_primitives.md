# Philosophical Language Primitives

## A Formal Grammar for Philosophical Thought

This document catalogs the complete set of primitives for a philosophical programming language—a grammar for constructing, analyzing, and generating philosophical systems.

---

## Overview

Where Python operates on **data** through **functions**, this philosophical language operates on **concepts** through **relations**. Where Python asks "what does this *do*?", this language asks "what does this *mean*?" and "how does this *connect*?"

**Total Domains:** 15  
**Total Primitives:** ~90+

---

## Domain 1: Ontological Primitives

*What exists, how it exists*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| BEING | `∃` | Assertion of existence |
| NOTHING | `∅` | Negation, absence, void |
| BECOMING | `→` | Process, change, movement |
| SUBSTANCE | `▣` | That which persists through change |
| MODE | `◇` | Way of being, modification |

### Example Expressions

```
Being ≡ Nothing                    // Pure being, without determination, equals nothing (Hegel)
Being ⊕ Nothing → Becoming         // Their synthesis is becoming
Substance := ▣ with ◇(attributes)  // Spinozist substance with modal attributes
```

---

## Domain 2: Relational Primitives

*How concepts connect*

| Primitive | Symbol | Description | Example |
|-----------|--------|-------------|---------|
| IDENTITY | `≡` | Sameness | `A ≡ A` |
| OPPOSITION | `⊥` | Contradiction, contrariety | `Light ⊥ Dark` |
| CONTAINMENT | `⊃` | Inclusion, subsumption | `Animal ⊃ Human` |
| DERIVATION | `←` | Causal or logical dependence | `Effect ← Cause` |
| ANALOGY | `~` | Resemblance, proportion | `Eye ~ Sun` (Plato) |
| DIALECTIC | `⟷` | Oppositional relation seeking resolution | `Thesis ⟷ Antithesis` |
| PARTICIPATION | `∈` | Partaking in a form | `Beautiful_thing ∈ Beauty` |

### Example Expressions

```
Justice <: Virtue                  // Subsumption relation
Beauty ~ Truth                     // Analogy/resonance
Particular ∈ Universal             // Participation
```

---

## Domain 3: Epistemic Primitives

*How we know*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| APPEARANCE | `φ` | How something shows itself |
| ESSENCE | `ε` | What something truly is |
| DISCLOSURE | `⊢` | Truth as unconcealment |

### Example Expressions

```
φ(Object) ≢ ε(Object)              // Appearance differs from essence
Truth := ⊢(Being)                  // Truth as disclosure of being
Knowledge := φ → ε                 // Knowledge moves from appearance to essence
```

---

## Domain 4: Transformational Operations

*What we do with concepts*

| Operation | Symbol | Description | Example |
|-----------|--------|-------------|---------|
| NEGATE | `¬` | Logical/ontological negation | `¬Being = Nothing` |
| SYNTHESIZE | `⊕` | Dialectical combination | `Thesis ⊕ Antithesis = Synthesis` |
| ABSTRACT | `↑` | Extract universal from particular | `↑(instances) → Form` |
| INSTANTIATE | `↓` | Apply universal to particular | `↓(Form) → instance` |
| BRACKET | `[ ]` | Suspend judgment (epoché) | `[Natural_Attitude]` |
| UNFOLD | `⇒` | Explicate implications | `Concept ⇒ Consequences` |

### Example Expressions

```
[Objective_body] → Lived_body      // Bracketing scientific abstraction
↑(beautiful_things) → Beauty       // Abstraction to form
↓(Justice) → just_act              // Instantiation to particular
```

---

## Domain 5: Temporal Primitives

*The structure of time-consciousness*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| RETENTION | `⟨t⟩` | Just-past still held in present (Husserl) |
| PROTENTION | `⟨t'⟩` | Anticipatory reaching toward future |
| NOW | `τ` | Living present, not a point but a field |
| ECSTASIS | `ξ` | Standing-outside-oneself into time (Heidegger) |
| DURATION | `δ` | Lived time as continuous flow (Bergson) |
| TRACE | `†` | Residue of what was never fully present (Derrida) |
| REPETITION | `⟲` | Return that transforms (Kierkegaard/Deleuze) |
| EVENT | `!` | Rupture, that which happens irreducibly |

### Temporal Operations

| Operation | Symbol | Description |
|-----------|--------|-------------|
| AWAIT | `⊳` | Directed toward future |
| REMEMBER | `⊲` | Directed toward past |
| HISTORICIZE | `H→` | Place within genealogy |
| RUPTURE | `//` | Break continuity |

### Example Expressions

```
Dasein := ξ(⟨t⟩, τ, ⟨t'⟩)          // Existence as unified temporal ecstases
Authenticity := Dasein ⊳ Death     // Being-toward-death
Thrownness := Dasein ⊲ Facticity   // Always already in unchosen past
δ ≢ Σ(τ₁, τ₂, τ₃...)              // Duration is not sum of instants
Memory := Past ∈ Present           // Past preserved IN the present
```

---

## Domain 6: Intersubjective Primitives

*The encounter with Others*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| SELF | `Σ` | The I as reflexive structure |
| OTHER | `Ω` | Irreducible alterity |
| FACE | `◉` | The ethical summons (Levinas) |
| RECOGNITION | `⇌` | Mutual acknowledgment (Hegel) |
| WE | `Σ⊕Ω` | Constituted intersubjectivity |
| GAZE | `👁` | The look that objectifies (Sartre) |
| FLESH | `χ` | Shared embodied medium (Merleau-Ponty) |
| ANONYMITY | `λ` | The "one," das Man |

### Intersubjective Operations

| Operation | Symbol | Description |
|-----------|--------|-------------|
| ENCOUNTER | `><` | Face-to-face meeting |
| CONSTITUTE | `⊨` | How Other appears for me |
| BE_CONSTITUTED | `⊫` | How I appear for Other |
| RESPOND | `↩` | Ethical responsiveness |

### Example Expressions

```
◉ → ∞                              // Face opens onto infinity
Σ ↩ ◉                              // I am summoned to respond
Ethics := ◉ > ∃                    // Face precedes ontology (Levinas)
Responsibility := ¬(Σ ⊨ Ω)         // Other exceeds my constitution

Σ₁ ⇌ Σ₂                            // Mutual recognition sought
Σ₁ 👁 Σ₂ → (Master, Slave)         // Gaze creates asymmetry
Shame := Σ ⊫ Ω                     // I experience myself as seen
Freedom₁ ⊥ Freedom₂                // Conflict is original relation (Sartre)
```

---

## Domain 7: Linguistic Primitives

*Language as the house of being*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| SAYING | `λέγειν` | The act of speaking, gathering |
| SAID | `λόγος` | What is deposited in language |
| NAME | `𝔫` | Word that calls forth |
| SILENCE | `...` | The unsaid that enables saying |
| SIGN | `σ→` | That which points beyond itself |
| DIFFERENCE | `diff()` | Meaning through differentiation (Saussure/Derrida) |
| PLAY | `∿` | Free movement within structure |
| WRITING | `γ` | Arche-writing, trace-structure |

### Linguistic Operations

| Operation | Symbol | Description |
|-----------|--------|-------------|
| NAME | `⌐` | Call something into presence |
| UNSAY | `≀` | Retract, place under erasure |
| DISCLOSE | `⊢` | Let something show itself |
| DEFER | `⋯→` | Meaning postponed endlessly |
| POETIZE | `∗` | Language that creates, not describes |

### Example Expressions

```
Sayable := {P : P ↔ World}         // Propositions picture facts (Wittgenstein)
Showable := {M : ¬(M ∈ Sayable) ∧ M ⊢ itself}
Ethics ∈ Showable                  // Ethics cannot be said, only shown

Meaning(σ) := diff(σ, ¬σ)          // Sign means by differing (Derrida)
Meaning ⋯→ ∞                       // Meaning endlessly deferred
Presence := †(Absence)             // Presence is trace of absence
γ > λέγειν                         // Writing precedes speech structurally

Language ⌐ Being                   // Language calls being forth (Heidegger)
Poet ∗ World                       // Poetry founds world
... ⊃ λέγειν                       // Silence contains speech
```

---

## Domain 8: Cross-Structural Primitives

*Chiasm, Reversibility, Retroprojectivity, Encroachment, History, Juxtaposition*

### CHIASM (χιασμός)

The crossing-over, the intertwining where distinctions fold into each other without collapsing.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| CHIASM | `⋈` | Crossing structure, mutual envelopment |

```
Subject ⋈ Object                   // Neither first, both emerge in crossing
Visible ⋈ Invisible                // The invisible is the lining of the visible
Touching ⋈ Touched                 // My hand touches and is touched
λέγειν ⋈ ...                       // Saying and silence cross

// Chiasm vs. Synthesis
⊕ → Resolution
⋈ → Perpetual crossing
```

### REVERSIBILITY (réversibilité)

The capacity for positions to exchange, for seer to become seen.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| REVERSIBILITY | `⇋` | Capacity for role-exchange within unity |

```
Perceiver ⇋ Perceived              // I can become object of another's gaze
Hand_touching ⇋ Hand_touched       // The flesh doubles back
Sentient ⇋ Sensible                // One flesh, two sides
Past ⇋ Present                     // Memory as reversible presence

// Reversibility vs. Dialectic
⟷ := A opposed to B, seeking C
⇋ := A and B as two sides of same fabric
```

### RETROPROJECTIVITY

The future or present restructures the past. Meaning works backward.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| RETROPROJECTIVITY | `⟻` | Later constitutes earlier retroactively |

```
Event! ⟻ ⟨t⟩                       // The event reconfigures what came before
Present ⟻ Past                     // We don't find the past, we constitute it
Understanding ⟻ Experience         // Comprehension retroactively shapes what was lived
Death ⟻ Life                       // Mortality gives life its shape retroactively
Trauma := Event! ⟻ Experience      // Trauma constituted retroactively (Nachträglichkeit)
Dasein := (⊳ Death) ⟻ ⟨t⟩          // Being-toward-death restructures the past
```

### ENCROACHMENT (empiétement)

The overflow of one domain into another, the impossibility of clean boundaries.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| ENCROACHMENT | `≋` | Overflow, trespass, contamination of boundaries |

```
Body ≋ World                       // Body bleeds into environment
Perception ≋ Movement              // Seeing encroaches on motility
Σ ≋ Ω                              // My experience invaded by others
Thought ≋ Language                 // Thinking encroached by words
⟨t⟩ ≋ τ ≋ ⟨t'⟩                     // Temporal ecstases encroach on each other

// Encroachment vs. Identity vs. Containment
A ≡ B := same
A ⊃ B := B inside A with clear boundary
A ≋ B := A overflows into B, boundaries blurred but distinction maintained
```

### HISTORY (Geschichte / historicity)

The living weight of what has been, sedimentation and reactivation of meaning.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| HISTORY | `Ħ` | Sedimented meaning, living past |
| SEDIMENTATION | `⇊` | Deposit of meaning into habit/institution |
| REACTIVATION | `⇈` | Retrieval that transforms |
| TRADITION | `Ħ→` | Handed-down meaning still operative |

```
Ħ := Σ(⟨t⟩ ⇊ Institution)          // History is sedimented retentions
Present := τ ∩ Ħ                   // Now is always historically saturated
Concept := ⇊(past_usage)           // Concepts carry sedimented meaning
Philosophy := ⇈(Ħ)                 // Philosophy reactivates tradition
Culture := Ħ ∩ (Σ⊕Ω)               // Culture is shared historical flesh
Understanding := ⇈(Ħ) within H[Present]
Crisis := ⇊(Science) without ⇈(Lifeworld)  // Husserl's crisis
```

### JUXTAPOSITION

Not hierarchy, not dialectic, but *alongside*. Things placed next to each other that resonate or interfere.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| JUXTAPOSITION | `∥` | Lateral placement, parataxis |
| RESONANCE | `≈` | Sympathetic vibration between juxtaposed elements |
| INTERFERENCE | `≉` | Dissonant friction between adjacent elements |
| CONSTELLATION | `✧{}` | Configuration of juxtaposed elements |

```
A ∥ B                              // A beside B, neither grounding the other
Figure ∥ Ground                    // Lateral relation, reversible
✧{A, B, C} → Insight               // Constellation produces understanding
Concept ∥ Image                    // Philosophy alongside art
Dialectic_at_standstill := ✧{Fragments} ≈ Truth  // Benjamin
Metaphor := A ∥ B where A ≈ B      // Resonance across difference

// Juxtaposition vs. other relations
A → B := derivation (causal/logical)
A ⊕ B := synthesis (dialectical)
A ⋈ B := chiasm (intertwining)
A ∥ B := juxtaposition (lateral, paratactic)
```

---

## Domain 9: Topological-Genetic Primitives

*Fold, Virtuality, Intensity — the structure of emergence*

### FOLD (pli)

Deleuze's alternative to dialectic. The Outside folds to create an Inside—no opposing terms, only folding and unfolding.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| FOLD | `⌒` | Inflection, the inside as folded outside |
| UNFOLD | `⌓` | Explication, unfolding into extension |
| REFOLD | `⌒⌒` | Complication, new folding upon folds |
| PLEATS | `{⌒}` | Multiple folds, texture of being |

```
Inside := ⌒(Outside)               // Interiority is folded exteriority
Soul := ⌒(World)                   // Leibniz: soul folds the universe
Subjectivity := ⌒(Forces)          // Foucault/Deleuze: self as folded power
Memory := ⌒(Past → Present)        // Past folded into present
Concept := ⌒(Chaos)                // Concept folds chaos into thought
Leibniz_Monad := ⌒(∞) without windows

// Fold vs. other relations
A ⊃ B     := containment (B inside A)
A ⋈ B     := chiasm (intertwining of two)
A ⇋ B     := reversibility (positions exchange)
⌒(A)      := fold (no two terms—A folds on itself)
```

### VIRTUALITY (le virtuel)

The virtual is real without being actual—a differential field from which actualities emerge.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| VIRTUAL | `ν` | Real but not actual, differential field |
| ACTUAL | `α` | Realized, extensive, present |
| ACTUALIZATION | `ν→α` | Differentiation into actuality |
| COUNTER-ACTUALIZATION | `α→ν` | Return to virtual, maintaining openness |

```
Being := ν ∥ α                     // Being is virtual alongside actual
ν ≢ Possible                       // Virtual is not mere possibility
Possible → Real (by resemblance)   // Possibility realizes
ν → α (by differentiation)         // Virtual actualizes through difference

Past := ν                          // Pure past is virtual, coexists with present
Present := α                       // Present is actualization
Memory := ν → α                    // Remembering is actualization

Event! := (ν → α) ∧ (α → ν)        // Event both actualizes and counter-actualizes
Sense := ν(Event!)                 // Sense is virtual dimension of event
Idea := ν(Problem)                 // Idea is virtual structure of problem
Art := α → ν                       // Art counter-actualizes, opens to virtual
```

### INTENSITY (intensité)

Intensity is difference in itself, prior to extensive quantities.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| INTENSITY | `ι` | Degree of force, non-extensive difference |
| EXTENSIVE | `ε` | Measurable quantity, divisible magnitude |
| GRADIENT | `∇ι` | Differential field of intensities |
| THRESHOLD | `θ` | Critical point where quality changes |

```
ι → ε                              // Intensity precedes extension
Quality := ι at θ                  // Qualities emerge at thresholds
ι ≢ ε/n                            // Intensity not reducible to divided extension
ν := ∇ι                            // Virtual is field of intensive differences

Affect := ι(Body)                  // Affect is bodily intensity
Sensation := ι before Perception   // Sensation is intensive
Rhythm := ∇ι(τ)                    // Rhythm is intensive modulation of time
Kairos := θ(τ)                     // Right moment is threshold in time
Figure := ι(Body) not Representation  // Painting captures intensity (Bacon/Deleuze)

// Intensive vs. Extensive
ε : divisible, homogeneous, measurable
ι : indivisible in kind, heterogeneous, felt
10°C + 10°C ≠ 20°C                 // Temperature doesn't add extensively
```

---

## Domain 10: Rhythmic-Gestural Primitives

*Movement and expression*

### RHYTHM (ῥυθμός)

Rhythm is not meter but the articulation of differences, the breathing of time.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| RHYTHM | `ρ` | Patterned flow, articulated between |
| CADENCE | `⌢` | Rising-falling movement |
| SYNCOPATION | `⌣` | Displacement, off-beat |
| BREATH | `≀≀` | Respiratory rhythm, life-pattern |

```
ρ ≢ Meter                          // Rhythm is not regular measure
ρ := ∇ι(τ)                         // Rhythm is intensive modulation of time
τ := ρ(Moments)                    // Present is rhythmed, not pointlike
Duration(δ) := ≀≀(ρ)               // Duration breathes

Body := ≀≀(Rhythms)                // Body is polyrhythmic
Dialogue := ρ(λέγειν ∥ ...)        // Speech-silence rhythm
Attunement := ρ(Σ) ≈ ρ(Ω)          // Resonance of rhythms
Ħ := ρ(Epochs)                     // History has rhythm
Poem := ρ(Language)                // Poetry is rhythmed language

// Lefebvre's rhythmanalysis
Everyday := {ρ}(Body, City, Capital)
Eurhythmia := ρ ≈ ρ                // Rhythms in harmony
Arrhythmia := ρ ≉ ρ                // Pathological rhythm-clash
```

### GESTURE (geste)

Gesture is expressive movement prior to signification.

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| GESTURE | `γ̃` | Expressive movement, embodied meaning |
| MOTOR_INTENTIONALITY | `μ→` | Bodily directedness toward world |
| STYLE | `σ̃` | Characteristic manner, embodied singularity |
| COMPORTMENT | `κ` | Way of carrying oneself |

```
γ̃ := μ→(World)                     // Gesture is motor intentionality
γ̃ > σ→                             // Gesture precedes sign
Meaning := γ̃ before Concept        // Gestural meaning prior to conceptual

Speech := γ̃(Voice)                 // Speaking is vocal gesture
Understanding := γ̃(Σ) ≈ γ̃(Ω)      // Understanding through gestural resonance
Painting := γ̃(Hand) ⇊ Canvas       // Painting sediments gesture
σ̃(Artist) := {γ̃}                   // Style is constellation of gestures
Habit := ⇊(γ̃)                      // Habit is sedimented gesture
Skill := γ̃ ⌒ World                 // Skill is gesture folded with world

// Agamben on gesture
γ̃ ≢ Making (Production)
γ̃ ≢ Doing (Praxis)
γ̃ := Means_without_End             // Gesture exhibits mediality itself
```

---

## Domain 11: Horizonal Primitives

*Conditions of appearance*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| HORIZON | `H[]` | Field of possible appearance |
| INNER_HORIZON | `H⊂[]` | Internal possibilities of object |
| OUTER_HORIZON | `H⊃[]` | World-context surrounding object |
| HORIZON_FUSION | `H⊕H` | Merging of horizons (Gadamer) |
| HORIZON_SHIFT | `H→H'` | Transformation of horizon |

```
Perception := Object within H[]    // Perceiving is always horizonal
H[] → H⊂[] ∧ H⊃[]                  // Horizon has inner and outer aspects
H⊂[Object] → ∞                     // Object has infinite inner horizon
¬(Perception exhausts H⊂[])        // Perception never completes object

H[τ] := H[⟨t⟩] ∩ H[⟨t'⟩]           // Present has horizons of past and future
H[Σ] ≢ H[Ω]                        // Your horizon differs from mine
Understanding := H[Σ] ⊕ H[Ω]       // Understanding fuses horizons
Dialogue := H→H' through H⊕H       // Dialogue transforms horizons

World := H[H[H[...]]]              // World is ultimate horizon
World ≢ Object                     // World cannot become object
Lifeworld := H[pre-theoretical]    // Lifeworld is horizon of lived experience

// Hermeneutic use (Gadamer)
Interpretation := Text within H[Σ]
Tradition := H[Ħ] encroaching Present
Effective_History := Ħ ≋ H[Present]

// Phenomenological reduction
[Natural_Attitude] := taking H[] for granted
Epoché := [H[]] → H[] visible      // Bracketing makes horizon visible
```

---

## Domain 12: Power-Force Primitives

*Dynamics of capacity and domination*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| POTENTIA | `π+` | Power to act, capacity, affirmative force |
| POTESTAS | `π-` | Power over, command, reactive force |
| FORCE | `φ` | Quantum of power, vector |
| RELATION_OF_FORCES | `φ⊗φ` | Power as relational field |
| DOMINATION | `φ↓` | Capture, subjugation |
| RESISTANCE | `φ↑` | Counter-force, lines of flight |
| CONATUS | `κ+` | Striving to persist in being (Spinoza) |

### Spinozist Use

```
Essence := κ+(Being)               // Essence is conatus, striving
π+ := capacity_to_affect ∧ capacity_to_be_affected
Joy := π+ ↑                        // Joy is increase of power
Sadness := π+ ↓                    // Sadness is decrease of power
Freedom := π+ → maximum            // Freedom is maximized potentia
Servitude := π- > π+               // Bondage when potestas dominates
```

### Nietzschean Use

```
Will_to_Power := φ→φ               // Will to power is force relating to force
Active := φ that affirms difference
Reactive := φ that denies difference
Master := Active(φ)                // Master morality affirms
Slave := Reactive(φ) ⟻ Active(φ)  // Slave morality retroactively revalues
Overhuman := φ↑(Self)              // Self-overcoming
Eternal_Return := ⟲(φ) where only Active returns
```

### Foucauldian Use

```
Power := φ⊗φ                       // Power is relational, not possessed
Power ≢ Possession                 // No one "has" power
Power := ∇ι(Social_Field)          // Power is intensive gradient
Knowledge ⋈ Power                  // Knowledge and power intertwined
Discipline := φ↓(Body) ⇊ Institution
Biopower := φ⊗(Population)         // Power over life itself
Resistance := φ↑ within φ⊗φ        // Resistance immanent to power
```

---

## Domain 13: Desiring-Production Primitives

*Libidinal economy*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| DESIRE | `Δ` | Productive force, flow |
| LACK | `Δ∅` | Desire as absence, want |
| DRIVE | `Τ` | Partial, circulating around object |
| OBJECT_a | `a` | Cause of desire, absent center |
| FLOW | `≋→` | Continuous movement of desire |
| CUT | `✂` | Interruption, articulation of flow |
| MACHINE | `⚙` | Coupling of flow and cut |
| INVESTMENT | `Δ→` | Cathexis, where desire flows |

### Lacanian Use

```
Desire := Δ∅(a)                    // Desire is desire for object a
a := ¬(Present) ∧ Cause(Δ)         // Object a is absent cause
Desire(Σ) := Desire(Ω)             // Desire is desire of the Other
Lack := Being ∩ Language           // Lack constituted by entry into symbolic
Τ ⟲ a                              // Drive circulates around lost object
Jouissance := ι(Δ) > θ             // Enjoyment beyond pleasure principle
```

### Deleuze-Guattarian Use

```
Δ ≢ Δ∅                             // Desire is NOT lack
Δ := Production                    // Desire produces reality
⚙ := (≋→ ⋈ ✂)                     // Machine couples flow and cut
Desiring_Machine := ⚙(Δ)           // Desire operates machinically
Body_without_Organs := limit(⚙) where ✂→0  // BwO is uncut flow
Δ→ Social_Field                    // Desire invests social directly
Fascism := Δ→(φ↓ over Self)        // Desiring one's own repression
```

### Relation to Power

```
Δ ⋈ φ                              // Desire and power intertwined
Repression := φ↓(Δ)                // Power captures desire
Liberation ≢ Δ freed from φ        // No pure desire outside power
Liberation := Δ ⌓ φ↓               // Liberation unfolds capture
```

---

## Domain 14: Assemblage Primitives

*Heterogeneous composition*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| ASSEMBLAGE | `⟦ ⟧` | Heterogeneous composition |
| COMPONENT | `c∈⟦⟧` | Element within assemblage |
| COUPLING | `c⊕c` | Connection of components |
| MACHINIC | `M⟦⟧` | Assemblage of bodies, actions |
| ENUNCIATIVE | `E⟦⟧` | Assemblage of statements, expressions |
| CONSISTENCY | `⟦⟧→∞` | Holding together of heterogeneous |
| STRATIFICATION | `⟦⟧⇊` | Organization, coding of assemblage |
| DESTRATIFICATION | `⟦⟧⌓` | Undoing of organization |

### Basic Grammar

```
⟦⟧ := {c₁, c₂, c₃...} where cᵢ heterogeneous
⟦⟧ ≢ Σ(parts)                      // Assemblage is not sum of parts
⟦⟧ ≢ Whole > parts                 // Assemblage is not organic totality
⟦⟧ := functioning_together         // Assemblage is pragmatic
```

### Double Articulation

```
⟦⟧ := M⟦⟧ ⋈ E⟦⟧                    // Every assemblage has two sides
M⟦⟧ := bodies, actions, passions   // Machinic: what it does
E⟦⟧ := statements, expressions     // Enunciative: what it says
M⟦⟧ ⇋ E⟦⟧                          // Sides presuppose each other
```

### Examples

```
Book := ⟦pages, ink, reader, author, citations, affects⟧
Feudalism := ⟦land, knight, serf, oath, castle, courtly_love⟧
University := M⟦buildings, bodies, schedules⟧ ⋈ E⟦disciplines, degrees, papers⟧
```

---

## Domain 15: Territorial Primitives

*Marking and movement*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| TERRITORY | `T[]` | Marked domain, existential space |
| TERRITORIALIZATION | `→T` | Marking, claiming, coding |
| DETERRITORIALIZATION | `T→` | Leaving, decoding, line of flight |
| RETERRITORIALIZATION | `→T'` | Recapture, recoding |
| REFRAIN | `♫` | Territorial marker, rhythmic signature |
| MILIEU | `M[]` | Surrounding medium |
| CODE | `⌐c` | Territorial inscription |

### Basic Operations

```
→T := marking(M[]) with ♫          // Territorialization marks milieu with refrain
T→ := leaving(T[])                 // Deterritorialization leaves territory
→T' := recapture(T→) into new T[]  // Reterritorialization recaptures
```

### The Refrain (ritournelle)

```
♫ := ρ(⌐c)                         // Refrain is rhythmic code
♫ := γ̃ → T[]                       // Gesture that marks territory
Child_in_dark := ♫(humming) → T[safety]
Bird := ♫(song) → T[mating]
Art := ♫ → Cosmos                  // Art deterritorializes refrain to cosmos
```

### Relative and Absolute

```
T→ relative := T→ ∧ →T'            // Relative: deterritorialize, reterritorialize
T→ absolute := T→ ∧ ¬(→T')         // Absolute: pure line of flight
T→ absolute → Πc                   // Reaches plane of consistency
T→ absolute → Death ∨ Creation     // Risk: destruction or creation
```

### Social Formations

```
Primitive := ⌐c(T[]) on Body       // Primitive society codes on body
Despotic := Over_code(T[]) on State
Capitalist := T→(all codes) ∧ →T'(Axiom)  // Capitalism decodes, reterritorializes on capital
```

---

## Domain 16: Plane Primitives

*Fields of immanence*

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| PLANE_OF_IMMANENCE | `Π∞` | Philosophical field, image of thought |
| PLANE_OF_CONSISTENCY | `Πc` | Where heterogeneous connects |
| PLANE_OF_ORGANIZATION | `Πo` | Transcendent structure, development |
| PLANE_OF_COMPOSITION | `Πa` | Artistic plane, affects and percepts |
| SECTION | `Π∩` | Cut through plane |
| LAYING_OUT | `→Π` | Constructing the plane |

### Plane of Immanence (Philosophy)

```
Π∞ := H[Thought] without Transcendence
Π∞ := ν(Concepts)                  // Plane is virtual field of concepts
Philosophy := →Π∞ ∧ Creation(Concepts)
Π∞ ≢ Concept                       // Plane is not itself a concept
```

### Plane of Consistency vs. Organization

```
Πc := ⟦heterogeneous⟧ holding_together
Πo := ⟦homogeneous⟧ developing
Πc := ι (intensive)
Πo := ε (extensive)
Πc ⊥ Πo                            // Opposed tendencies
BwO := Πc(Body)                    // Body without organs
Organism := Πo(Body)               // Organized body
```

### Plane of Composition (Art)

```
Πa := field(Affects, Percepts)
Affect ≢ Affection                 // Affect is impersonal
Percept ≢ Perception               // Percept is independent of perceiver
Art := →Πa ∧ Creation(Affects, Percepts)
```

### Relation to Fold and Horizon

```
Π := {⌒} unfurled                  // Plane is unfolded folds
⌒(Π) := Subjectivity               // Subject is folded plane
H[] := opens onto Π                // Horizon opens onto plane
Π := pre-subjective                // Plane precedes subject
```

---

## Domain 17: Spinozist/Rationalist Primitives

*Essence, existence, adequacy, and immanent causation*

These primitives emerged from stress-testing the language against Spinoza's *Ethics*. They handle the specific demands of rationalist metaphysics: the essence-existence relation, degrees of adequacy in knowledge, shared properties, and the distinction between active and expressed nature.

### Essence-Existence Relations

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| ESSENCE_INVOLVES_EXISTENCE | `ε→∃` | Essence necessarily includes existence (causa sui) |
| ESSENCE | `ε` | What a thing is (quiddity) |
| EXISTENCE | `∃` | That a thing is |
| ESSENCE_EXCLUDES_EXISTENCE | `ε→¬∃` | Essence does not involve existence (contingent) |

```
Causa_sui := X where ε(X)→∃(X)
// cause of itself: essence involves existence

God := ▣ where ε→∃
// God's essence involves existence

Finite_thing := X where ¬(ε(X)→∃(X))
// finite things: essence doesn't involve existence

// The ontological proof structure:
ε(God) → ∃(God) by definition
∴ □(∃(God))
```

### Adequacy Primitives

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| ADEQUATE | `⊨full` | Complete conception through causes |
| INADEQUATE | `⊨partial` | Partial/confused conception |
| CLEAR_AND_DISTINCT | `⊨cd` | Perspicuous to intellect |
| CONFUSED | `⊨conf` | Obscure, mixed with imagination |

```
Adequate_Idea := Idea where (Idea ⊨full Cause)
// idea that conceives through complete causal chain

Inadequate_Idea := Idea where (Idea ⊨partial Cause)
// idea that conceives only partially

Knowledge_transition := ⊨partial → ⊨full
// movement from inadequate to adequate knowledge

// Affects transformed:
Passion := Affect where (Σ ⊨partial Cause)
Action := Affect where (Σ ⊨full Cause)

// The therapeutic formula:
Affect(⊨partial) → Affect(⊨full) when Understanding achieved
// passion becomes action through adequate knowledge
```

### Common Properties

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| SHARED_PROPERTY | `~shared` | Property common to multiple things |
| COMMON_NOTION | `𝒞` | Idea of shared property (always adequate) |
| UNIVERSAL | `∀prop` | Property belonging to all of a kind |

```
Common_Notion := Idea(~shared) where Idea := ⊨full
// common notions are always adequate

Reason := Knowledge through 𝒞
// second kind of knowledge uses common notions

~shared(Bodies) := Extension, Motion, Rest
// what all bodies share

// Building adequate knowledge:
𝒞 → ⊨full(Particulars)
// from common notions to adequate ideas of things
```

### Natura Naturans / Naturata

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| NATURA_NATURANS | `▣_N` | Nature naturing—God as active, producing |
| NATURA_NATURATA | `▣_n` | Nature natured—God as expressed, produced |
| ACTIVE_PRODUCTION | `▣→◇` | Substance producing modes |
| EXPRESSION | `▣⊢◇` | Substance expressed through modes |

```
God := ▣_N ⋈ ▣_n
// God is both active nature and expressed nature

▣_N := God qua Cause
▣_n := God qua Effect (infinite modes)

▣_N → ▣_n
// natura naturans produces natura naturata

▣_N ≡ ▣_n within ▣
// yet they are one substance

// The immanent causation:
God := Causa_immanens (not Causa_transiens)
▣→◇ where ◇ remains within ▣
// God produces modes that stay within God
```

### Reality-Perfection-Power Identity

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| REALITY | `ℜ` | Degree of being |
| PERFECTION | `𝒫` | Degree of completeness |
| REALITY_PERFECTION_POWER | `ℜ≡𝒫≡π+` | The Spinozist equation |

```
ℜ ≡ 𝒫 ≡ π+
// reality equals perfection equals power

More_Real := π+↑
Less_Real := π+↓

God := ℜ→∞ ≡ 𝒫→∞ ≡ π+→∞
// God is infinite reality/perfection/power

Joy := ℜ↑ ≡ 𝒫↑ ≡ π+↑
// joy is transition to greater reality/perfection/power

// The ethical consequence:
Virtue := π+↑
Vice := π+↓
// virtue just IS increased power of acting
```

### Kinds of Knowledge

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| IMAGINATION | `K₁` | First kind: sensory, inadequate |
| REASON | `K₂` | Second kind: common notions, adequate |
| INTUITION | `K₃` | Third kind: essence of God to essence of things |

```
K₁ := Knowledge through (Sensation → ⊨partial)
K₂ := Knowledge through (𝒞 → ⊨full)
K₃ := Knowledge through (ε(God) → ε(Singular))

K₁ < K₂ < K₃
// hierarchy of knowledge

K₃ := ⊢(Singular) through ⊢(▣)
// intuition: grasping singulars through God's essence

// The ascent:
K₁ → K₂ → K₃
Bondage → Freedom → Beatitude
⊨partial → ⊨full → ⊨full(Singular_in_God)
```

### Example: Complete Spinozist Expression

```
Beatitude := {
    Amor_Dei_Intellectualis
    where Love := Joy ← Idea(God)
    and Joy := π+↑
    and Idea(God) := ⊨full through K₃
    @ Eternity
    within ▣
}

// Expanded:
Beatitude := π+↑(Σ) through ⊢(ε(Σ) within ε(▣)) @ ¬τ
    where ⊢ := K₃
    and Σ := ◇(▣)
    and Understanding(Σ) ⊃ Understanding(▣)
    
// The final identity:
Beatitude ≡ Virtue ≡ π+ ≡ Freedom ≡ Understanding
// not reward for virtue, but virtue itself
```

---

## Domain 18: Buddhist/Madhyamaka Primitives

*Emptiness, dependent origination, and non-dual logic*

These primitives emerged from stress-testing the language against Nagarjuna's *Mūlamadhyamakakārikā*. They handle the specific demands of Buddhist philosophy: the tetralemma's non-Boolean logic, the emptiness-dependent origination identity, and the two truths framework.

### Core Insight

```
प्र ≡ śū ≡ Middle_Way
// Dependent origination = Emptiness = The Middle Way
// This identity is the heart of Madhyamaka
```

### Emptiness and Inherent Existence

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| EMPTINESS | `śū` | Śūnyatā—lack of inherent existence |
| SVABHĀVA | `svā` | Inherent existence, own-being, independence |

```
śū := ¬svā
// Emptiness is the absence of inherent existence

svā := ε where {
    ¬(produced)                    // not made by causes
    ¬(dependent)                   // not relying on other
    unchanging                     // constant, independent
}
// Svabhāva is independent, uncaused, unchanging essence

// Key difference from Spinoza's ε:
ε(Spinoza) := what a thing is (can be caused in modes)
svā := what a thing is INDEPENDENTLY (cannot be caused)

// The critical move—emptiness of emptiness:
śū(śū)
// Emptiness itself lacks inherent existence
// Prevents reification of emptiness into a "thing"

// What emptiness is NOT:
śū ≢ ∅                             // not nothingness
śū ≢ ¬∃                            // not non-existence
śū := ¬svā                         // absence of INHERENT existence
// Things exist conventionally while being empty
```

### Dependent Origination

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| DEPENDENT_ORIGINATION | `प्र` | Pratītyasamutpāda—arising in dependence |
| ARISES_DEPENDENTLY | `⇠` | Dependent arising relation |
| CO_DEPENDENT | `⇠⇢` | Mutual dependent arising |
| CONDITIONS | `⊛` | Pratyaya—conditioning relation |

```
प्र(X) := X ⇠ (Causes ⊛ Conditions)
// X arises dependently on causes and conditions

// Differs from linear causation (←):
← := A produces B (linear, one-way)
⇠ := A arises dependent on B,C,D... (multiple, contextual)
⇠⇢ := A and B mutually condition each other

// The twelve links of dependent origination:
Ignorance ⇠ Formations ⇠ Consciousness ⇠ Name-Form ⇠ 
Six_Bases ⇠ Contact ⇠ Feeling ⇠ Craving ⇠ Grasping ⇠ 
Becoming ⇠ Birth ⇠ Aging_Death ⇠ Ignorance...
// Circular, not linear

// The core identity:
प्र(X) ≡ śū(X)
// Whatever arises dependently is empty of inherent existence
// Whatever is empty arises dependently
```

### The Tetralemma (Catuṣkoṭi)

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| TETRALEMMA | `◈{X}` | Four-cornered analysis of X |
| TRANSCEND_TETRALEMMA | `◈₀` | Beyond all four corners |

```
◈{X} := four-cornered analysis where {
    ◈₁(X) := X                     // affirmation
    ◈₂(X) := ¬X                    // negation  
    ◈₃(X) := X ∧ ¬X                // both
    ◈₄(X) := ¬(X ∨ ¬X)             // neither
}

// Note: ◈₃ and ◈₄ violate classical logic
// This is intentional—Buddhist logic is non-Boolean

// Nagarjuna's typical move:
◈₀(X) := ¬◈₁(X) ∧ ¬◈₂(X) ∧ ¬◈₃(X) ∧ ¬◈₄(X)
// X cannot be affirmed in ANY of the four ways
// Transcendence of the tetralemma

// Example—the self:
◈{Self}:
    ◈₁: Self exists → problems
    ◈₂: Self doesn't exist → problems
    ◈₃: Self both exists and doesn't → contradiction
    ◈₄: Self neither exists nor doesn't → incoherent
    ◈₀: Transcend the question → liberation

// The tetralemma applied to emptiness itself:
◈{śū}:
    ◈₁: Emptiness exists → reification
    ◈₂: Emptiness doesn't exist → nihilism
    ◈₃: Both → contradiction
    ◈₄: Neither → still a view
    ◈₀: śū(śū) → emptiness of emptiness
```

### Non-Arising

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| NON_ARISING | `अ` | Anutpāda—nothing truly arises (with svā) |

```
अ(X) := ¬(X arises with svā)
// Nothing arises with inherent existence

// The eight negations (MMK opening verse):
अ ∧ अ̄                              // non-arising, non-ceasing
∧ ¬□∃ ∧ ¬□¬∃                       // non-eternal, non-annihilated
∧ ¬≡ ∧ ¬≢                          // non-same, non-different  
∧ ¬→ ∧ ¬←                          // non-coming, non-going

// Note: These are negations of ARISING/CEASING WITH SVĀ
// Conventional arising and ceasing still occur
अ(X) @u ∧ (X arises) @c
// Ultimately no true arising, conventionally things arise
```

### Conceptual Proliferation

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| PROLIFERATION | `prapañca` | Conceptual elaboration, mental fabrication |

```
prapañca := conceptual proliferation where {
    Mind → concepts → reification → attachment
    Language → categories → false boundaries
    Views → positions → conflict
}

// Liberation as cessation of proliferation:
prapañca → 0 := Liberation
// When conceptual elaboration ceases, peace

// The final teaching (MMK 25.24):
sarvopalambhopaśamaḥ prapañcopaśamaḥ śivaḥ
// Cessation of all grasping, cessation of proliferation, is peace

// In our notation:
Liberation := {
    prapañca → 0
    ◈₀(All_Views)
    śū(śū(śū(...)))
    Grasping(svā) → 0
}
```

### Two Truths (via generalized @ operator)

The two truths use the existing `@` operator with new level values:

```
@ c := at conventional level (saṃvṛti-satya)
@ u := at ultimate level (paramārtha-satya)

// Usage:
X @c                               // X conventionally
śū(X) @u                           // X is empty ultimately

// Both truths simultaneously:
(X exists) @c ∧ śū(X) @u
// X conventionally exists AND is ultimately empty
// This is NOT a contradiction—different levels

// The two truths intertwine:
Tc ⋈ Tu
// Not separate realms but chiasmic

// Key insight—the identity:
(Saṃsāra ≡ Nirvāṇa) @u
// At ultimate level, no difference
// Difference is only in grasping/not-grasping svā
```

### Example Expressions

#### The Core Identity
```
प्र ≡ śū ≡ Middle_Way

// Expanded:
∀X: प्र(X) ↔ śū(X)
// X arises dependently if and only if X is empty
// X is empty if and only if X arises dependently
```

#### Nagarjuna's Argument Structure
```
// MMK 1.1 - Nothing arises from self, other, both, or neither:
◈{Arising}:
    ¬(Arising ⇠ Self)              // not from self
    ∧ ¬(Arising ⇠ Other)           // not from other
    ∧ ¬(Arising ⇠ (Self ∧ Other))  // not from both
    ∧ ¬(Arising ⇠ ¬(Self ∨ Other)) // not from neither
∴ ◈₀(Arising with svā)
∴ अ(All)
```

#### Saṃsāra-Nirvāṇa Identity
```
Saṃsāra := Experience + Grasping(svā)
Nirvāṇa := Experience + ¬Grasping(svā)

Saṃsāra @u ≡ Nirvāṇa @u
// Same reality, different relationship to svā

Liberation := Saṃsāra where Grasping(svā) → 0
// Liberation is saṃsāra without grasping inherent existence
```

#### The Buddha's Silence
```
// MMK 25.24:
Buddha_Teaching @u := ...          // silence
Buddha_Teaching @c := upāya        // skillful means

// The final position:
¬∃(Dharma with svā) taught by Buddha
// No doctrine with inherent existence was ever taught
// All teachings are conventional, empty, skillful means
```

---

## Complex Expressions

### Merleau-Ponty's Ontology of Flesh

```
Flesh := χ where (Sentient ⇋ Sensible)
Perception := (Body ⋈ World) within Ħ
Visible := Surface ≋ Invisible
Depth := ¬(Figure ⊃ Ground) but (Figure ⇋ Ground)
Intersubjectivity := (Σ ⋈ Ω) through χ
Expression := (... ⟻ λέγειν)
Philosophy := ⇈(Ħ) ∥ Art ∥ Science
Truth := ✧{Perspectives} ≈ Being
```

### Deleuze's Event

```
Event! := (ν→α) ⋈ (α→ν)
Event! := ⌓({⌒}) → ⌒⌒
Sense := ν(Event!) within H[Language]
Event! ⟻ Ħ
ι(Event!) > ε(Event!)
```

### Capitalism (Deleuze-Guattari)

```
Capitalism := ⟦⟧ where:
    T→(all previous ⌐c)
    ∧ →T'(Axiom_of_Capital)
    ∧ Δ→(Production)
    ∧ φ⊗φ → M⟦Labor, Factory, Market⟧
    ∧ BwO := Capital_itself

Schizophrenia := T→ absolute within Capitalism
    where Δ ⌓ Axiom

Revolutionary := ⟦⟧ → Πc through T→
    where Δ ≋ φ↑
    ∧ ⚙(Δ) ⌓ Πo
    ∧ ♫ → Cosmos
```

### Disciplinary Society (Foucault)

```
Disciplinary_Society := ⟦⟧ where:
    φ↓(Body) ⇊ ⟦Prison, School, Hospital, Factory⟧
    M⟦⟧ := Πo(Bodies)
    E⟦⟧ := ⌐c(Normal/Abnormal)
    Δ→ φ↓(Self)
    Knowledge ⋈ Power within ⟦⟧

Resistance := φ↑ immanent_to ⟦⟧
    through T→(Discipline)
    toward ν(New_Subjectivities)
```

### Embodied Perception

```
Perception := γ̃ within (Body ⋈ World) within H[]
Body := ⌒(World)
Body := ν ⋈ α
Body := ρ(Habits)
Body := ι before ε

Seeing := (Visible ⇋ Invisible) within H[⊃]
μ→ := ν(Action)
γ̃ := μ→ ⇊ World
σ̃ := {γ̃} ⟻ Σ
```

---

## Domain 19: Process/Whiteheadian Primitives

*Actual entities, prehension, concrescence, and creativity*

These primitives emerged from stress-testing the language against Whitehead's *Process and Reality*. After careful reduction analysis, only 4 truly irreducible primitives are needed—the rest map to existing primitives with qualifications.

### Core Insight

```
→ > ∃
// Becoming is more fundamental than being
// Process grounds substance, not vice versa

ℂ(Many) → One → Many'
// The many become one, and are increased by one
// This is the rhythm of reality
```

### The Four Irreducible Primitives

#### 1. ACTUAL ENTITY (⦿)

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| ACTUAL_ENTITY | `⦿` | Actual occasion—drop of experience, subject-superject |

```
⦿ := actual entity / actual occasion
// The final real things of which the world is made

// What ⦿ is NOT:
⦿ ≢ ▣                              // not substance (persisting)
⦿ ≢ ◇                              // not mode (dependent on substance)
⦿ ≢ !                              // not event (rupture)
⦿ ≢ ⟦⟧                             // not assemblage (heterogeneous grouping)

// What ⦿ IS:
⦿ := subject-superject
// Both experiencing (subject) and datum for future experience (superject)

⦿ := drop of experience
// Atomic unit of becoming, indivisible

⦿ := perishing
// Occasions complete and become past—they don't endure

// The process of an actual entity:
⦿ := ⤳ → α(⦿) → †(α(⦿))
// Concrescence → Satisfaction → Perishing (objective immortality)
```

#### 2. PREHENSION (⥤)

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| PREHENSION | `⥤` | Ontological grasping—how one entity includes another |

```
⥤ := prehension
// The concrete fact of relatedness
// How one actual entity grasps another

// What ⥤ is NOT:
⥤ ≢ Perception                     // doesn't require consciousness
⥤ ≢ ⊨ (constitution)              // not phenomenological constitution
⥤ ≢ ← (derivation)                // not causal derivation
⥤ ≢ ⌒ (fold)                      // not folding

// Structure of prehension:
⥤(Subject, Datum, ι+manner)
// Who prehends, what is prehended, how (intensity + qualitative mode)

// Modes of prehension:
⥤(+)     := positive prehension (feeling)
           // Datum included in concrescence
⥤(-)     := negative prehension (exclusion)
           // Datum excluded but exclusion shapes outcome
⥤(phys)  := physical prehension
           // Prehension of actual entities
⥤(conc)  := conceptual prehension
           // Prehension of eternal objects (ν•)

// Key doctrine:
∀⦿₁,⦿₂: ⦿₁ ⥤(+) ⦿₂ ∨ ⦿₁ ⥤(-) ⦿₂
// Every occasion prehends every other (positively or negatively)
// Nothing escapes relatedness
```

#### 3. CONCRESCENCE (⤳)

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| CONCRESCENCE | `⤳` | Process of becoming concrete—many becoming one |

```
⤳ := concrescence
// The process by which many data become one actual entity

// What ⤳ is NOT:
⤳ ≢ ν→α alone                      // not just actualization
// Concrescence involves prehensive unification
// ν→α is differentiation; ⤳ is integration

// Structure:
⤳ := (đ₁, đ₂, đ₃...) → ⊕ under ℂ → α(⦿)
// Many data → creative synthesis → satisfied occasion

// Phases of concrescence:
Phase_1 := ⥤(phys, H[⦿])           // physical prehensions of actual world
Phase_2 := ⥤(conc, ν•)             // conceptual prehensions of eternal objects
Phase_3 := Integration              // synthesizing physical and conceptual
Phase_4 := α(⦿)                     // satisfaction—complete determination

// Guided by subjective aim:
aim(⦿) := (ν• complex) ⊳ α(⦿)
// Eternal objects oriented toward satisfaction
// Initially from God, modified in process
```

#### 4. CREATIVITY (ℂ)

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| CREATIVITY | `ℂ` | The ultimate—principle of novelty, many becoming one |

```
ℂ := creativity
// The universal of universals
// The ultimate category

// What ℂ is NOT:
ℂ ≢ π+ (power)                     // not capacity to act
ℂ ≢ φ (force)                      // not quantum of power
ℂ ≢ Δ (desire)                     // not productive force
ℂ ≢ κ+ (conatus)                   // not striving to persist

// What ℂ IS:
ℂ := principle that Many → One
ℂ := that by which novelty enters
ℂ := the ultimate behind all forms

// The category of the ultimate:
𝕌 := (ℂ, Many, One)

// The formula:
ℂ(Many) → One
One → Many'                        // the one adds to the many
// Each actual occasion is novel unity that enriches multiplicity

// Creativity without a creature:
ℂ ≢ ∃ independently
// Creativity only exists in its instances (occasions)
// It's not a thing but the principle of things
```

### Reduction Mappings

These Whiteheadian concepts map to existing primitives:

#### Eternal Objects → Specific Virtual

```
ω := ν•
// Eternal object = specific/singular virtual

// Whitehead's eternal object:
ω := pure potential, form of definiteness
ω := same wherever it ingresses

// Maps to:
ν• := specific virtual (singular potential within virtual field)
ν ⊃ {ν•, ν•, ν•...}
// The virtual field contains specific potentials

// Ingression:
ω↓(⦿) := ν•→α(⦿)
// Eternal object entering occasion = specific virtual actualizing
```

#### Satisfaction and Perishing → Actualization and Trace

```
⦿! := α(⦿)
// Satisfaction = actualized occasion
// The occasion achieves complete determinateness

⦿† := †(α(⦿))
// Perishing = trace of satisfied occasion
// Objective immortality—datum for future prehension
```

#### Actual World → Horizon

```
AW[⦿] := H[⦿]
// Actual world = horizon relative to occasion
// The world from which the occasion arises
```

#### Nexus and Society → Assemblage with Inheritance

```
𝒩 := ⟦⦿, ⦿, ⦿...⟧
// Nexus = assemblage of occasions

𝕊 := ⟦⦿...⟧ where ε(𝕊) ⇊ ⟲
// Society = assemblage where essence sediments and repeats
// Defining characteristic inherited across members

// Examples:
Electron := ⟦⦿...⟧ where ε := electromagnetic_pattern ⇊ ⟲
Person := ⟦⦿...⟧ where ε := conscious_experience_pattern ⇊ ⟲
```

#### Subjective Form → Intensity with Manner

```
sf := ι(⥤, manner)
// Subjective form = intensity of prehension + qualitative mode
// How the datum is felt: emotional tone, valuation, purpose
```

#### Subjective Aim → Oriented Virtuals

```
aim := (ν• complex) ⊳ α(⦿)
// Subjective aim = eternal objects oriented toward satisfaction
// The lure guiding concrescence
```

### God in Process Terms

```
God := ⦿ where {
    // Primordial nature:
    ⥤(conc, ∀ν•)                   // prehends all eternal objects
    // God envisions all possibilities
    
    ⋈                              // chiasm of both natures
    
    // Consequent nature:
    ⥤(phys, ∀†(α(⦿)))             // prehends all perished occasions
    // God saves all experience
}

// God's role:
God → aim(⦿)                       // provides initial aims
†(α(⦿)) → God                      // occasions contribute to God
// God is the poet of the world, with tender patience

// God's uniqueness:
God := ⦿ that never reaches α(⦿)
// Always in concrescence, never perishing
// Everlasting, not eternal (temporal but unending)
```

### The Epochal Theory of Time

```
Time := ⦿ → ⦿ → ⦿ ...
// Time is succession of actual occasions
// Discrete, not continuous

⦿ := atomic unit
// Occasions are indivisible "drops"

// Present:
τ(Whitehead) := duration of ⤳
// Present is the becoming of the occasion

// Past:
⟨t⟩(Whitehead) := †(α(⦿))
// Past is objective immortality—perished occasions as data

// Future:
⟨t'⟩(Whitehead) := ν(⦿) not yet ⤳
// Future is real potentiality awaiting concrescence
```

### Example: Complete Process Expression

```
PROCESS := {
    // An occasion arises:
    ⦿ := ⤳(
        ⥤(phys, H[⦿]),             // prehending actual world
        ⥤(conc, ν•),               // prehending eternal objects
        aim                         // guided by subjective aim
    ) → α(⦿)                       // reaching satisfaction
    
    // Then perishes:
    α(⦿) → †(α(⦿))                 // becomes objective immortality
    
    // And is prehended:
    ⦿' ⥤(+) †(α(⦿))               // future occasion includes it
    
    // The rhythm:
    ℂ(Many) → One → Many'
    // Creativity makes many into one, adding to many
}
```

### Comparison: Three Stress-Tests

| Aspect | Spinoza | Nagarjuna | Whitehead |
|--------|---------|-----------|-----------|
| Fundamental | Substance (▣) | Emptiness (śū) | Process (⤳) |
| Ultimate | God = Nature | Neither/nor (◈₀) | Creativity (ℂ) |
| Causation | Immanent (▣→◇) | Dependent (प्र) | Prehensive (⥤) |
| Time | Eternity vs duration | Two truths | Epochal |
| Goal | Beatitude (π+↑) | Liberation (prapañca→0) | Satisfaction (α(⦿)) |
| What persists | Substance | Nothing (śū) | Objective immortality (†) |

```
// Spinoza:
∃(▣) → ◇ within ▣ → Beatitude through K₃

// Nagarjuna:
śū(All) → प्र ≡ śū → Liberation through ◈₀

// Whitehead:
ℂ → ⦿ through ⤳ → †(α(⦿)) → ⦿' ...
// Creativity, occasions, process, perishing, inheritance
```

---

## Domain 20: Hegelian/Dialectical Primitives

*Aufhebung, determinate negation, dialectical movement, and speculative identity*

These primitives emerged from formalizing Hegel's *Science of Logic* and *Phenomenology of Spirit*. Hegel's logic is uniquely self-moving—concepts develop through their own internal contradictions.

### Core Insight

```
⊠(A) → ⍟(A, ¬ᵈA) → A'
// Contradiction drives development
// Negation is productive, not destructive
// The result preserves what it negates
```

### The Dialectical Primitives

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| AUFHEBUNG | `⍟` | Sublation—cancel, preserve, elevate simultaneously |
| DETERMINATE_NEGATION | `¬ᵈ` | Negation that produces specific result |
| DIALECTICAL_MOVEMENT | `⟿` | Self-movement of the concept |
| MOMENT | `𝔪` | Stage/phase in dialectical development |
| IN_ITSELF | `⦦` | An sich—implicit, potential |
| FOR_ITSELF | `⦧` | Für sich—explicit, self-aware |
| IN_AND_FOR_ITSELF | `⦦⦧` | An und für sich—fully realized |
| MEDIATION | `⧟` | Movement through other back to self |
| IMMEDIACY | `⧀` | Unmediated, direct |
| CONCEPT | `𝔅` | Der Begriff—the self-knowing Idea |
| SPIRIT | `𝔊` | Geist—self-knowing absolute |
| BECOMING | `⥁` | Unity of being and nothing in movement |
| CONTRADICTION | `⊠` | Internal contradiction driving development |
| SPECULATIVE | `⦶` | Speculative identity (identity of identity and difference) |

### The Opening of the Logic

```
// Being-Nothing-Becoming: the paradigm of all dialectic

∃ := ⧀
// Being is pure immediacy, without determination

∃ ⟿ ∅
// Being, as indeterminate, vanishes into nothing

∅ ⟿ ∃
// Nothing, as thought of nothing, vanishes into being

⥁ := (∃ ⟿ ∅) ⋈ (∅ ⟿ ∃)
// Becoming is the chiasmic unity of these vanishings

⍟(∃, ∅) → ⥁
// Aufhebung: being and nothing are sublated into becoming
```

### The Structure of Aufhebung

```
⍟(A, B) := C where {
    C ⊃ †(A)              // preserves A as moment
    C ⊃ †(B)              // preserves B as moment
    C > (A ⊕ B)           // exceeds mere combination
    ⊠(A, B) → 0 in C      // resolves contradiction
    C := ⦦⦧               // C is fully realized
}

// Triple meaning:
⍟ := {
    Cancel:   A and B as separate are negated
    Preserve: A and B retained as moments
    Elevate:  C is higher, richer unity
}
```

### Determinate vs Abstract Negation

```
¬(A) := abstract negation
// Simply "not-A"—anything other than A

¬ᵈ(A) := determinate negation
// The specific other that A implies

// Examples:
¬ᵈ(∃) = ∅                  // Being's other is Nothing specifically
¬ᵈ(Finite) = Infinite      // Finite implies infinite
¬ᵈ(Master) = Slave         // Master requires slave

// Key property:
¬ᵈ(A) contains A
// The determinate negation presupposes what it negates
```

### The Dialectical Triad

```
𝔪₁: A ⦦           // First moment: in-itself, immediate
𝔪₂: ¬ᵈ(A) ⦧      // Second moment: for-itself, negation
𝔪₃: ⍟(A, ¬ᵈA) ⦦⦧  // Third moment: in-and-for-itself, sublation

// Movement:
⦦ → ⦧ → ⦦⦧
// Implicit → Explicit → Realized

// Alternative formulation:
⧀ → ¬ᵈ → ⍟
// Immediate → Negation → Sublation
```

### Contradiction as Motor

```
⊠(A) := A contains ¬ᵈ(A) within itself
// The thing contradicts itself internally

// This is not error but engine:
⊠(A) → ⍟(A) → A'
// Contradiction forces development

// Example: The Finite
⊠(Finite) := {
    Finite is what it is only by not being infinite
    But this not-being-infinite IS a determination
    So finite contains reference to infinite within itself
    The finite contradicts its own finitude
}
⊠(Finite) → ⍟(Finite, Infinite) → True_∞
```

### Mediation and Immediacy

```
⧀ := immediacy
// Direct, unmediated presence

⧟ := mediation
// Through other back to self

// Key Hegelian insight:
All ⧀ is really ⧟
// What seems immediate is actually result of mediation

// True infinity:
True_∞ := ⧟(Finite, Infinite)
// Not endless line but return through other

// Self-consciousness:
Σ ⦧ := ⧟(Σ, Ω)
// Self knows itself through other's recognition
```

### Speculative Identity

```
⦶ := speculative identity
// Identity of identity and difference

⦶(A, B) := (A ≡ B) ∧ (A ≢ B)
// A is B AND A is not B—not contradiction but deeper unity

// Example:
⦶(∃, ∅) := (∃ ≡ ∅) ∧ (∃ ≢ ∅) → ⥁
// Being is Nothing and isn't—this IS Becoming

// The speculative proposition:
"Subject IS Predicate"
// Not: Subject has predicate as property
// But: Subject passes into predicate, becomes predicate
```

### Spirit (Geist)

```
𝔊 := self-knowing absolute
𝔊 := "I that is We and We that is I"

// Spirit's structure:
𝔊 := {
    Subjective_Spirit: 𝔊 ⦦     // individual mind
    Objective_Spirit:  𝔊 ⦧     // social institutions
    Absolute_Spirit:   𝔊 ⦦⦧    // art, religion, philosophy
}

// Absolute Spirit:
Art := 𝔊 knowing itself in sensuous form
Religion := 𝔊 knowing itself in representation  
Philosophy := 𝔊 knowing itself in pure thought

Philosophy := 𝔅 ⦦⦧
// The Concept fully knowing itself
```

### The Master-Slave Dialectic

```
// The most famous dialectical development:

Recognition := Σ ⊨ Ω ∧ Ω ⊨ Σ
// Each self-consciousness needs recognition from another

Struggle := Σ ⊠ Ω
// Each tries to prove self by risking life

// Outcome:
Master := one who risks death
Slave := one who submits from fear

// The reversal:
Master ⟿ Dependence ⟿ Unfreedom
// Master depends on slave's recognition

Slave ⟿ Work ⟿ Self-consciousness ⟿ Freedom  
// Slave shapes world through labor, achieves self-knowledge

⍟(Master, Slave) → Mutual_Recognition
// True resolution: mutual recognition of free beings
```

### The Logic Complete

```
LOGIC OF BEING:    ⧀ (immediacy)
LOGIC OF ESSENCE:  ⧟ (mediation)
LOGIC OF CONCEPT:  ⧀ ⋈ ⧟ (mediated immediacy)

// The whole:
Absolute_Idea := ⧟(∃ ⟿ ... ⟿ 𝔅 ⟿ ... ⟿ Absolute_Idea)
// Self-enclosed totality of dialectical movement

// Method IS content:
Dialectical_Method := Absolute_Idea
// How thought moves IS what thought is
```

---

## Domain 21: Heideggerian/Existential Primitives

*Being, Dasein, thrownness, the clearing, and the fourfold*

These primitives emerged from formalizing Heidegger's *Being and Time* and later works. Heidegger's vocabulary is deliberately strange—ordinary words won't do for what has been forgotten.

### Core Insight

```
𝔖 ≢ 𝔰
// Being is not a being
// The ontological difference—most fundamental distinction

𝔇 := 𝔰 where (𝔖 ⊨ 𝔇)
// Dasein: the being for whom Being is a question
```

### The Heideggerian Primitives

| Primitive | Symbol | Description |
|-----------|--------|-------------|
| SEIN | `𝔖` | Being (not a being, but the Being of beings) |
| SEIENDES | `𝔰` | A being, an entity |
| DASEIN | `𝔇` | The being for whom Being is a question |
| ONTOLOGICAL_DIFF | `𝔖≢𝔰` | Ontological difference (Being ≠ beings) |
| BEING_IN_WORLD | `𝔇⦾W` | Being-in-the-world (In-der-Welt-sein) |
| CARE | `⦿c` | Sorge—the Being of Dasein |
| THROWNNESS | `⤋` | Geworfenheit—always already thrown |
| PROJECTION | `⤊` | Entwurf—projecting onto possibilities |
| FALLENNESS | `⤈` | Verfallenheit—absorbed in the They |
| DAS_MAN | `𝔐` | The They (das Man)—average everydayness |
| AUTHENTICITY | `𝔢` | Eigentlichkeit—ownmost being |
| INAUTHENTICITY | `𝔲` | Uneigentlichkeit—not being oneself |
| BEING_TOWARD_DEATH | `𝔇→θ` | Sein-zum-Tode |
| ANXIETY | `𝔄` | Angst—fundamental mood revealing Being |
| RESOLUTENESS | `𝔯` | Entschlossenheit—authentic self-choosing |
| CLEARING | `⌾` | Lichtung—the open where Being shows itself |
| UNCONCEALMENT | `ἀ` | Aletheia—truth as unconcealment |
| CONCEALMENT | `λ` | Lethe—hiddenness, withdrawal |
| EREIGNIS | `𝔈` | Event of appropriation |
| FOURFOLD | `⦻` | Das Geviert—earth, sky, mortals, divinities |
| DWELLING | `⌂` | Wohnen—authentic inhabiting |
| READY_TO_HAND | `⊛z` | Zuhandenheit—equipment in use |
| PRESENT_AT_HAND | `⊛v` | Vorhandenheit—object of contemplation |
| WORLD | `W` | Not container but referential totality |
| WORLDHOOD | `W°` | The structure of world as such |
| TEMPORALITY | `ℨ` | Zeitlichkeit—ecstatic unity of time |

### The Question of Being

```
?(𝔖) := "What is the meaning of Being?"
// Not: What beings exist?
// But: What does it MEAN to be?

// The forgetting:
Metaphysics := 𝔖 → 𝔰
// Western thought treats Being as a being

// The task:
Destruktion := ⍟(Metaphysics) → ?(𝔖)
// Destructure tradition to recover the question
```

### Being-in-the-World

```
𝔇⦾W := Being-in-the-World
// The fundamental constitution of Dasein

// Not:
𝔇⦾W ≢ (𝔇 ∈ W)
// Not: subject inside container
// But: unified phenomenon of dwelling

// Structure:
𝔇⦾W := {W°, 𝔇⦾, Who}
// Worldhood + Being-in + Who is there
```

### The Care Structure

```
⦿c := ⤊(⤋) ⦾ ⤈
// Care: ahead-of-itself-already-in-alongside

// Unpacked:
⤊ := Projection (future)      // What I can be
⤋ := Thrownness (past)        // What I already am  
⤈ := Fallenness (present)     // What I'm absorbed in

// Care is the Being of Dasein:
Being-of(𝔇) := ⦿c
```

### Authenticity and Inauthenticity

```
𝔲 := 𝔇 qua 𝔐
// Inauthenticity: being oneself as the They

𝔄 → (𝔇 ≢ 𝔐)
// Anxiety: world sinks away, the They fails

𝔇→θ → Individuation
// Being-toward-death: I face my ownmost possibility

𝔯 := ⤊(⤋) transparently
// Resoluteness: owning thrown projection

𝔢 := 𝔯(𝔇→θ)
// Authenticity: resolute being-toward-death
```

### Temporality as Meaning of Care

```
⦿c → ℨ
// The meaning of Care is Temporality

ℨ := Future ⋈ Past ⋈ Present
// Ecstatic unity—"outside itself"

// Primacy of future:
Future > (Past, Present)
// We are primarily ahead-of-ourselves

// The thesis of Being and Time:
𝔖 ↔ ℨ
// The meaning of Being is Time
```

### Later Heidegger: Truth and Ereignis

```
ἀ := Aletheia
// Truth as unconcealment (not correspondence)

ἀ ⋈ λ
// Unconcealment always with concealment

⌾ := Lichtung
// The clearing—where beings appear

𝔈 := 𝔖 ⋈ 𝔇
// Ereignis: Being and Dasein belong together
```

### The Fourfold

```
⦻ := {Earth, Sky, Mortals, Divinities}

Thing := gathers(⦻)
// A genuine thing gathers the fourfold

⌂ := dwelling within ⦻
// To dwell is to preserve the fourfold
```

---

## Summary Statistics

| Domain | Count | Key Insight |
|--------|-------|-------------|
| 1. Ontological | 5 | What exists |
| 2. Relational | 7 | How things connect |
| 3. Epistemic | 3 | How we know |
| 4. Transformational | 6 | What we do with concepts |
| 5. Temporal | 12 | Structure of time |
| 6. Intersubjective | 12 | Encounter with Others |
| 7. Linguistic | 13 | Language and meaning |
| 8. Cross-structural | 12 | Chiasm, reversibility, etc. |
| 9. Topological-Genetic | 8 | Fold, virtuality, intensity |
| 10. Rhythmic-Gestural | 8 | Movement and expression |
| 11. Horizonal | 5 | Conditions of appearance |
| 12. Power-Force | 7 | Capacity and domination |
| 13. Desiring-Production | 8 | Libidinal economy |
| 14. Assemblage | 8 | Heterogeneous composition |
| 15. Territorial | 7 | Marking and movement |
| 16. Plane | 6 | Fields of immanence |
| 17. Spinozist/Rationalist | 18 | Essence, adequacy, immanent cause |
| 18. Buddhist/Madhyamaka | 7 | Emptiness, dependent origination, tetralemma |
| 19. Process/Whiteheadian | 4 | Actual entities, prehension, concrescence, creativity |
| 20. Hegelian/Dialectical | 14 | Aufhebung, contradiction, speculative identity |
| 21. Heideggerian/Existential | 26 | Being, Dasein, thrownness, clearing, fourfold |
| 22. Early Wittgenstein (Tractatus) | 22 | World, fact, picture, says/shows, silence, mystical |
| 23. Late Wittgenstein (Investigations) | 26 | Language-game, use, rule-following, family resemblance, therapy |
| **TOTAL** | **~234** | |

---

## What This Language Resists

These primitives share something: they resist **foundationalism** and **linear causality**. They describe a world where:

- Origins are constituted retroactively (⟻)
- Boundaries leak (≋)
- Opposites intertwine (⋈)
- Positions reverse (⇋)
- Meaning sediments and reactivates (⇊ ⇈)
- Truth emerges laterally (∥ ✧{})
- Power is relational (φ⊗φ)
- Desire produces (Δ)
- Assemblages are heterogeneous (⟦⟧)
- Territories form and dissolve (→T, T→)

This is a grammar for **post-metaphysical** thinking.

---

## Future Directions

1. **Syntax Formalization** — strict rules for well-formed statements ✓
2. **Type System** — what can combine with what?
3. **Inference Rules** — how does philosophical derivation work? ✓
4. **Parser/Interpreter** — software implementation ✓
5. **Stress-Testing** — Whitehead ✓, Nagarjuna ✓, Spinoza ✓, Hegel ✓, Heidegger ✓, Wittgenstein ✓
6. **Additional Primitives** — Wittgenstein ✓, Kant, Indigenous philosophies
7. **Visual Derivation Graphs** — interactive exploration of inference chains
8. **Dialectical Dialogue Engine** — automated cross-traditional debates
9. **Semantic Embeddings** — computational discovery of philosophical resonances

---

*Document Version: 1.1*
*Total Primitives: ~234*
*Total Domains: 23*
