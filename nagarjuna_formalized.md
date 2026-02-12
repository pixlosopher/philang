# Nagarjuna's Mūlamadhyamakakārikā: Formalized

## A Stress-Test of the Philosophical Language

This document presents Nagarjuna's *Mūlamadhyamakakārikā* (Fundamental Verses on the Middle Way) formalized in our philosophical language. It demonstrates the language's capacity to handle non-Western, non-Boolean logic.

---

## The Core Identity

```
प्र ≡ śū ≡ Middle_Way

// Dependent origination = Emptiness = The Middle Way
// This single equation contains all of Madhyamaka
```

---

## Foundational Concepts

### Emptiness (Śūnyatā)

```
śū := ¬svā
// Emptiness is the absence of inherent existence

svā := ε where {
    ¬(produced)                    // not made
    ¬(dependent)                   // not relying on other
    unchanging                     // constant
}
// Svabhāva is independent, uncaused, unchanging essence

// Critical: Emptiness of emptiness
śū(śū) := true
// Emptiness itself lacks inherent existence

// What emptiness is NOT:
śū ≢ ∅                             // not nothingness
śū ≢ ¬∃                            // not non-existence
śū ≢ svā                           // not a "thing"
```

### Dependent Origination (Pratītyasamutpāda)

```
प्र(X) := X ⇠ (Causes ⊛ Conditions)
// X arises dependently

// The identity with emptiness:
प्र(X) ≡ śū(X)
// Dependent arising IS emptiness
// What arises dependently lacks inherent existence
```

### Two Truths (Satyadvaya)

```
Tc := Conventional truth (saṃvṛti-satya)
Tu := Ultimate truth (paramārtha-satya)

@ c := at conventional level
@ u := at ultimate level

// Simultaneous truths:
(X exists) @c ∧ śū(X) @u
// Not contradiction—different levels

// The truths intertwine:
Tc ⋈ Tu
```

### The Tetralemma (Catuṣkoṭi)

```
◈{X} := {
    ◈₁(X) := X                     // affirmation
    ◈₂(X) := ¬X                    // negation
    ◈₃(X) := X ∧ ¬X                // both
    ◈₄(X) := ¬(X ∨ ¬X)             // neither
}

◈₀(X) := ¬◈₁(X) ∧ ¬◈₂(X) ∧ ¬◈₃(X) ∧ ¬◈₄(X)
// Transcendence—none of the four applies
```

---

## Chapter 1: Examination of Conditions (Pratyayaparīkṣā)

### The Opening Verse (MMK 1.1)

```
na svato nāpi parato na dvābhyāṃ nāpy ahetutaḥ |
utpannā jātu vidyante bhāvāḥ kvacana kecana ||

// Never anywhere do any entities arise:
// Not from self, not from other, 
// not from both, not from no cause.

◈{Arising}:
    ¬(X ⇠ X)                       // not from self
    ∧ ¬(X ⇠ Other)                 // not from other
    ∧ ¬(X ⇠ (X ∧ Other))           // not from both
    ∧ ¬(X ⇠ ¬(X ∨ Other))          // not from neither/no cause

∴ ◈₀(Arising with svā)
// Arising with inherent existence transcends all four
```

### Analysis of the Four Conditions

```
Traditional_Pratyayas := {
    Hetu         := cause condition
    Ālambana     := object condition
    Samanantara  := immediately preceding condition
    Adhipati     := dominant condition
}

// Nagarjuna's critique:
If Effect ∈ Cause:
    Effect := already present
    ∴ ¬(Arising) — nothing new arises
    
If Effect ∉ Cause:
    ¬(Connection between Cause and Effect)
    ∴ ¬(Causal relation) — no causation

∴ Causation @u := śū
// Causation is empty of inherent existence

// But conventionally:
Causation @c := functional
// Causes and effects operate conventionally
```

---

## Chapter 2: Examination of Motion (Gatiparīkṣā)

### MMK 2.1

```
gataṃ na gamyate tāvad agataṃ naiva gamyate |
gatāgatavinirmuktaṃ gamyamānaṃ na gamyate ||

// The traversed is not being traversed.
// The not-yet-traversed is not being traversed.
// Apart from traversed and not-yet-traversed,
// the being-traversed is not being traversed.

Space := {Traversed, Being_Traversed, Not_Yet_Traversed}

◈{Motion}:
    Motion in Traversed?
        ¬(Motion) — already done
        
    Motion in Not_Yet_Traversed?
        ¬(Motion) — not yet reached
        
    Motion in Being_Traversed?
        Being_Traversed ⊃ Motion (presupposes it)
        ∴ Circular — cannot establish motion

∴ śū(Motion) @u
∴ Motion @c := functional
```

### The Mover Problem (MMK 2.8)

```
◈{Mover}:
    Mover who moves?
        Mover already ⊃ Motion
        ∴ Redundant (motion twice)
        
    Mover who doesn't move?
        ¬Mover by definition
        ∴ Contradiction

∴ śū(Mover) ∧ śū(Motion) ∧ śū(Path)
// All three are empty of inherent existence
// Yet conventionally, movers move on paths
```

---

## Chapter 15: Examination of Svabhāva

### MMK 15.1-2

```
na saṃbhavaḥ svabhāvasya yuktaḥ pratyayahetubhiḥ |
hetupratyayasaṃbhūtaḥ svabhāvaḥ kṛtako bhavet ||

// The arising of svabhāva through causes and conditions is not possible.
// A svabhāva arising from causes and conditions would be "made."

svā ⊃ ¬(produced)                  // by definition
If svā(X) ⇠ Conditions:
    svā(X) := produced
    ∴ Contradiction
∴ ¬(svā arises)

// And:
svā ⊃ ¬(dependent)                 // by definition
If svā(X) ⊛ Other:
    svā(X) := dependent
    ∴ Contradiction
∴ ¬(svā depends)

∴ ¬∃(svā) in any conditioned phenomenon
∴ ∀X(conditioned): śū(X)
```

### MMK 15.7 — Emptiness of Emptiness

```
// If emptiness had inherent existence:
If svā(śū):
    śū := a "thing"
    śū := findable, graspable
    ∴ Reification of emptiness
    ∴ New attachment

// Nagarjuna's move:
śū(śū)
// Emptiness is empty of inherent existence

// Therefore:
śū := ¬(view)
śū := ¬(position)
śū := medicine that dissolves itself
```

---

## Chapter 18: Examination of Self (Ātmaparīkṣā)

### Tetralemma of Self

```
◈{Ātman}:

◈₁: Self ≡ Skandhas
    If Self ≡ Skandhas:
        Self := arising ∧ ceasing (skandhas do)
        ∴ Self := impermanent
        ∴ ¬(Self as permanent entity)
    Problems: eternalism refuted, but is there continuity?

◈₂: Self ≢ Skandhas
    If Self ≢ Skandhas:
        Self := findable apart from skandhas?
        Search yields nothing
        ∴ Self := unfindable
    Problems: nihilism threatens

◈₃: Self ≡ Skandhas ∧ Self ≢ Skandhas
    Contradiction
    
◈₄: Self neither ≡ nor ≢ Skandhas
    No third option coherent
    
∴ ◈₀(Self) @u
// Self transcends all four positions ultimately

// But conventionally:
Self @c := functional designation
Self @c := प्र(Skandhas, Continuity, Convention)
// Conventional self operates without inherent existence
```

### MMK 18.6

```
ātmety api prajñapitam anātmety api deśitam |
buddhair nātmā na cānātmā kaścid ity api deśitam ||

// "Self" is designated, "non-self" is also taught,
// But Buddhas also taught: neither self nor non-self.

◈₁(Ātman) taught @c         // conventional self, for practice
◈₂(Ātman) taught @c         // non-self, to counter attachment
◈₄(Ātman) taught @u         // neither, as ultimate teaching

// Pedagogical progression:
Stage_1: Self exists → attachment arises
Stage_2: Non-self taught → attachment to self dissolves
Stage_3: Neither self nor non-self → attachment to views dissolves
```

---

## Chapter 24: Examination of the Four Noble Truths

### The Objection (MMK 24.1-6)

```
Opponent := {
    If śū(All):
        ¬∃(Four_Noble_Truths)
        ¬∃(Practice)
        ¬∃(Attainment)
        ¬∃(Buddha, Dharma, Sangha)
    ∴ śū destroys Buddhism
}
```

### Nagarjuna's Response (MMK 24.7)

```
// You don't understand:
¬⊨full(śū)                         // You don't understand emptiness
¬⊨full(Purpose(śū))                // You don't understand its purpose
¬⊨full(Meaning(śū))                // You don't understand its meaning
∴ Your objection fails
```

### MMK 24.14 — The Counter-Argument

```
sarvam ca yujyate tasya śūnyatā yasya yujyate |
sarvam na yujyate tasya śūnyam yasya na yujyate ||

// For whom emptiness works, everything works.
// For whom emptiness doesn't work, nothing works.

// If things had svabhāva:
If svā(X):
    X := unchangeable
    ∴ ¬◇(Transformation)
    ∴ ¬◇(Path)
    ∴ ¬◇(Liberation)
svā destroys Buddhism, not śū

// Because things are empty:
śū(X) → ◇(Change)
śū(X) → ◇(Practice)
śū(X) → ◇(Liberation)
śū enables Buddhism
```

### MMK 24.18-19 — The Core Statement

```
yaḥ pratītyasamutpādaḥ śūnyatāṃ tāṃ pracakṣmahe |
sā prajñaptir upādāya pratipat saiva madhyamā ||

// What is dependent origination, that we call emptiness.
// That is dependent designation; that itself is the middle way.

प्र ≡ śū ≡ Dependent_Designation ≡ Middle_Way

// All four are identical:
Dependent_Origination
    ≡ Emptiness
    ≡ Conventional_Designation  
    ≡ Middle_Way

// The middle way avoids:
¬(Eternalism) := ¬svā           // things don't inherently exist
¬(Nihilism) := ∃ @c             // things conventionally exist
Middle := śū ∧ (∃ @c)           // empty yet conventionally real
```

---

## Chapter 25: Examination of Nirvāṇa

### Tetralemma of Nirvāṇa (MMK 25.4-16)

```
◈{Nirvāṇa}:

◈₁: Nirvāṇa := ∃ (existent)
    If Nirvāṇa ∃:
        Nirvāṇa := conditioned (all existents are)
        Conditioned := arising ∧ ceasing
        ∴ Nirvāṇa := impermanent
        Contradiction with "unconditioned"
    ∴ ¬◈₁(Nirvāṇa)

◈₂: Nirvāṇa := ¬∃ (non-existent)
    If Nirvāṇa ¬∃:
        Nirvāṇa := nothing
        Nothing := not a goal
        ∴ Path meaningless
    ∴ ¬◈₂(Nirvāṇa)

◈₃: Nirvāṇa := ∃ ∧ ¬∃ (both)
    Contradiction
    ∴ ¬◈₃(Nirvāṇa)

◈₄: Nirvāṇa := ¬∃ ∧ ¬¬∃ (neither)
    If neither existent nor non-existent:
        ¬(Cognizable)
        ¬(Establishable)
    ∴ ¬◈₄(Nirvāṇa) as position

∴ ◈₀(Nirvāṇa)
// Nirvāṇa transcends all four corners
```

### MMK 25.19-20 — Identity of Saṃsāra and Nirvāṇa

```
na saṃsārasya nirvāṇāt kiṃcid asti viśeṣaṇam |
na nirvāṇasya saṃsārāt kiṃcid asti viśeṣaṇam ||

// There is nothing distinguishing saṃsāra from nirvāṇa.
// There is nothing distinguishing nirvāṇa from saṃsāra.

(Saṃsāra ≡ Nirvāṇa) @u
// At ultimate level, no difference

// How?
Saṃsāra := Experience + Grasping(svā)
Nirvāṇa := Experience + ¬Grasping(svā)

// Same experience, different grasping:
Saṃsāra @c ≢ Nirvāṇa @c            // conventionally different
Saṃsāra @u ≡ Nirvāṇa @u            // ultimately identical

// Liberation:
Liberation := Saṃsāra where Grasping(svā) → 0
// Not going somewhere else
// Seeing what's already here without grasping
```

### MMK 25.24 — The Final Word

```
sarvopalambhopaśamaḥ prapañcopaśamaḥ śivaḥ |
na kvacit kasyacit kaścid dharmo buddhena deśitaḥ ||

// The cessation of all grasping,
// the cessation of proliferation, is peace.
// Nowhere was any dharma taught by Buddha to anyone.

Liberation := {
    prapañca → 0                   // proliferation ceases
    Grasping → 0                   // grasping ceases
    = śivaḥ (peace)
}

// The ultimate teaching:
Buddha_Teaching @u := ...          // silence
¬∃(Dharma with svā taught)
// No doctrine with inherent existence was ever taught

// Why?
All_Teachings := upāya             // skillful means
All_Teachings := @c                // conventional
All_Teachings := śū                // empty

// The finger pointing at the moon:
Teaching → Liberation
Teaching ≢ Liberation
śū(Teaching) — don't grasp the teaching itself
```

---

## The Complete System

```
MADHYAMAKA := {

    // THE CORE IDENTITY
    प्र ≡ śū ≡ Middle_Way
    
    // EMPTINESS
    śū := ¬svā                     // absence of inherent existence
    śū(śū)                         // emptiness of emptiness
    śū ≢ ∅                         // not nothingness
    śū → ◇(Change)                 // enables transformation
    
    // DEPENDENT ORIGINATION
    प्र(X) := X ⇠ Conditions       // everything arises dependently
    प्र(X) ↔ śū(X)                 // dependent = empty
    
    // TWO TRUTHS
    Tc ⋈ Tu                        // intertwined, not separate
    (∃ @c) ∧ (śū @u)              // both simultaneously true
    
    // TETRALEMMA
    ◈{X} → ◈₀(X) for ultimate analysis
    // Transcend all four positions
    
    // NON-ARISING
    अ(X) := ¬(X arises with svā)
    // Nothing truly arises (with inherent existence)
    
    // IDENTITY OF OPPOSITES
    (Saṃsāra ≡ Nirvāṇa) @u
    // Same reality, different grasping
    
    // LIBERATION
    Liberation := prapañca → 0
    Liberation := Grasping(svā) → 0
    Liberation := ◈₀(All_Views)
    
    // THE TEACHING
    All_Dharma := upāya @c         // skillful means, conventional
    Ultimate_Teaching := ...        // silence
}
```

---

## Comparison: Spinoza vs. Nagarjuna

| Aspect | Spinoza | Nagarjuna |
|--------|---------|-----------|
| **Core move** | Monism (one substance) | Emptiness (no substance) |
| **Essence** | ε exists, = power | svā doesn't exist |
| **Causation** | Immanent, necessary | Empty, conventional |
| **Logic** | Classical (Boolean) | Tetralemma (non-Boolean) |
| **Liberation** | Understanding God | Releasing grasping |
| **Two levels** | Eternity / Time | Ultimate / Conventional |
| **Identity claim** | God = Nature | Saṃsāra = Nirvāṇa |
| **Final state** | Beatitude (Joy) | Śiva (Peace) |

### In Our Language

```
// Spinoza:
∃(▣) := unique
ε(▣) → ∃(▣)
Beatitude := π+↑ through K₃ @ Eternity

// Nagarjuna:
¬∃(svā)
प्र(X) ≡ śū(X)
Liberation := prapañca → 0 @ ◈₀
```

Both use level-distinction (`@ Eternity` / `@ u`) but for opposite purposes:
- Spinoza: to ground eternal truth in substance
- Nagarjuna: to show ultimate truth is emptiness of substance

---

## New Primitives Added

| Primitive | Symbol | Why Needed |
|-----------|--------|------------|
| EMPTINESS | `śū` | Specific negation of inherent existence |
| SVABHĀVA | `svā` | Independent essence (what's negated) |
| DEPENDENT_ORIGINATION | `प्र` | Non-linear, mutual arising |
| ARISES_DEPENDENTLY | `⇠` | Different from linear causation |
| CO_DEPENDENT | `⇠⇢` | Mutual conditioning |
| CONDITIONS | `⊛` | Pratyaya relation |
| TETRALEMMA | `◈{X}` | Non-Boolean four-cornered logic |
| TRANSCENDENCE | `◈₀` | Beyond all four positions |
| NON_ARISING | `अ` | Nothing arises with svā |
| PROLIFERATION | `prapañca` | Conceptual elaboration |
| LEVEL_MARKERS | `@c @u` | Conventional / Ultimate (via generalized @) |

---

*Document Version: 1.0*
*Stress-test of Philosophical Language against Nagarjuna's MMK*
