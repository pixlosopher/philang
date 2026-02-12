# Spinoza's Ethics: Formalized

## A Stress-Test of the Philosophical Language

This document presents Spinoza's *Ethics* formalized in our philosophical language. It serves both as a demonstration of the language's expressive power and as a reference for rationalist metaphysics.

---

## Part I: Concerning God (De Deo)

### Definitions

```
D1: Causa_sui := ∃(X) where ε(X)→∃(X)
    // cause of itself: essence involves existence

D2: Finite := X where X <: Y ∧ (Y limits X)
    // finite when limited by another of same nature

D3: Substance := ▣ where {
        ∃(▣) within ¬(Other)
        and ▣ ⊨full ▣
    }
    // in itself, conceived through itself

D4: Attribute := φ(▣) where {
        Intellect ⊢ ε(▣) through φ
    }
    // what intellect perceives as constituting essence

D5: Mode := ◇(▣) where {
        ◇ within ▣
        and ◇ ⊨ ▣
    }
    // affection of substance, conceived through it

D6: God := ▣ where {
        φ(▣) → ∞
        and ∀φ: ε(φ) := ∞
    }
    // substance with infinite attributes, each infinite

D7: Free := X where {
        ∃(X) ← ε(X) alone
        and X → Action ← ε(X) alone
    }
    // exists and acts from necessity of own nature

D8: Eternity := ∃ where {
        ∃ ≡ ε
        and ∃ @ ¬(τ)
    }
    // existence as following from essence, not temporal
```

### Axioms

```
A1: ∃(X) → (X within X) ∨ (X within Other)
    // everything in itself or in another

A2: ¬(X ⊨ Other) → (X ⊨ X)
    // what can't be conceived through another, conceived through itself

A3: Cause → Effect (determinately)
    // from given cause, effect follows necessarily

A4: Knowledge(Effect) ← Knowledge(Cause) ∧ (Knowledge(Effect) ⊃ Knowledge(Cause))
    // knowledge of effect depends on and involves knowledge of cause

A5: ¬(X ~ Y) → ¬(X ⊨ Y) ∧ ¬(Y ⊨ X)
    // nothing in common → can't understand through each other

A6: Idea_vera ≡ Ideatum
    // true idea agrees with its object

A7: ◇(¬∃(X)) → ε(X) ⊃ ¬∃(X)
    // if conceivable as not existing, essence doesn't involve existence
```

### Key Propositions

#### P1: Substance is prior to its modes
```
P1: ▣ > ◇

DEMONSTRATION:
    ◇ := within ▣ ∧ (◇ ⊨ ▣)        // D5
    ▣ := within ¬(Other) ∧ (▣ ⊨ ▣)  // D3
    (◇ ⊨ ▣) ∧ ¬(▣ ⊨ ◇)
    ∴ ▣ > ◇                         // QED
```

#### P2: Substances with different attributes have nothing in common
```
P2: (▣₁ ≢ ▣₂) where (φ(▣₁) ≢ φ(▣₂)) → ¬(▣₁ ~ ▣₂)

DEMONSTRATION:
    ▣ ⊨ ▣                           // D3
    ▣ ⊢ through φ                   // D4
    φ(▣₁) ≢ φ(▣₂)                   // given
    ∴ ¬(▣₁ ~ ▣₂)                    // QED
```

#### P3: No common nature → no causal relation
```
P3: ¬(X ~ Y) → ¬(X → Y) ∧ ¬(Y → X)

DEMONSTRATION:
    ¬(X ~ Y) → ¬(X ⊨ Y)             // A5
    Knowledge(Effect) ⊃ Knowledge(Cause)  // A4
    ∴ ¬(X → Y)                      // QED
```

#### P5: No two substances of same attribute
```
P5: ¬(∃(▣₁, ▣₂) where φ(▣₁) ≡ φ(▣₂) ∧ ▣₁ ≢ ▣₂)

DEMONSTRATION:
    Suppose ▣₁ ≢ ▣₂ with φ(▣₁) ≡ φ(▣₂)
    Distinguish by: φ or ◇
    ¬(by φ)                          // given
    If by ◇: ▣ > ◇ (P1)
    [▣ setting aside ◇] → ▣₁ ≡ ▣₂
    Contradiction
    ∴ ¬(∃(▣₁, ▣₂)...)               // QED
```

#### P7: Existence belongs to nature of substance
```
P7: ε(▣) ⊃ ∃(▣)

DEMONSTRATION:
    ▣ := ¬(produced by Other)        // P6
    ▣ := Causa_sui
    Causa_sui := ε→∃                 // D1
    ∴ ε(▣)→∃(▣)                     // QED
```

#### P11: God necessarily exists
```
P11: □(∃(God))

DEMONSTRATION:
    God := ▣ with φ → ∞              // D6
    ε(▣)→∃(▣)                        // P7
    ∴ ε(God)→∃(God)
    ∴ □(∃(God))                     // QED

ALTERNATIVE (reductio):
    Suppose ◇(¬∃(God))
    → ε(God) ⊃ ¬∃(God)               // A7
    But ε(God) := π+ → ∞
    π+ → ∞ contradicts ε ⊃ ¬∃
    ∴ ¬◇(¬∃(God))
    ∴ □(∃(God))                     // QED
```

#### P14: Besides God, no substance can be or be conceived
```
P14: ¬(∃(▣) where ▣ ≢ God)

DEMONSTRATION:
    God := ▣ with φ → ∞              // all attributes
    ▣ ⊢ through φ
    ∀φ: φ ∈ God
    ∴ ∀▣: ▣ ∈ God ∨ ¬∃(▣)
    ∴ MONISM: ∃(▣) → ▣ ≡ God        // QED
```

#### P15: Whatever is, is in God
```
P15: ∀X: X within God

DEMONSTRATION:
    ∃(X) → (X := ▣) ∨ (X := ◇)       // A1
    ¬(∃(▣ ≢ God))                    // P14
    ∴ X := ◇ within God ∨ X ≡ God
    ∴ ∀X: X within God              // QED
```

#### P16: Infinite things follow from God's nature
```
P16: ε(God) → (◇ → ∞) in (φ → ∞)

DEMONSTRATION:
    God := π+ → ∞
    π+ → Effects
    π+ → ∞ → Effects → ∞
    ∴ ◇ → ∞ in each φ               // QED
```

### Part I Summary: The Monist Structure

```
SPINOZIST_ONTOLOGY := {
    ∃(▣) := unique                   // one substance
    ▣ ≡ God ≡ Nature                // Deus sive Natura
    φ(▣) → ∞                        // infinite attributes
    ◇ within ▣                       // modes in substance
    ε(▣)→∃(▣)                       // necessary existence
    ▣_N → ▣_n                       // naturans produces naturata
    ∀X: X within ▣                  // radical immanence
}
```

---

## Part II: The Mind (De Mente)

### The Attribute Parallelism

```
PARALLELISM := {
    φ_Thought ∥ φ_Extension
    ¬(φ_T → φ_E) ∧ ¬(φ_E → φ_T)     // no causal crossing
    ◇_T ≈ ◇_E                        // modes correspond
    Order(◇_T) ≡ Order(◇_E)          // same order and connection
}

P7(II): Order(Ideas) ≡ Order(Things)
    // ordo et connexio idearum idem est ac ordo et connexio rerum
```

### Mind-Body Identity

```
Mind := Idea(Body)
Body := Object(Mind)

MIND_BODY := {
    Mind ∥ Body within ▣
    Mind ≢ → Body                    // no mental causation
    Body ≢ → Mind                    // no physical causation
    Mind ⋈ Body through ▣            // united through substance
}

Human := (Mind ∥ Body) where {
    Mind := ◇(φ_Thought)
    Body := ◇(φ_Extension)
    Mind ≈ Body                      // correspondence
    Mind := Idea(Body)               // mind is idea of body
}
```

### Knowledge of Body

```
P12(II): Mind knows Body through Ideas(Affections)
    Mind ⊢ Body through ◇(Body_affected)

P13(II): Object of Mind is Body
    ∀Idea(Mind) → about Body (first)

P19(II): Mind knows itself only through Ideas(Body_Affections)
    Mind ⊢ Mind through Mind ⊢ Body
    // self-knowledge mediated through body
```

---

## Part III: The Affects (De Affectibus)

### Conatus

```
P6(III): κ+(X) := ε(X)
    // conatus IS the actual essence

κ+ := {
    Striving to persist in ∃
    π+(X)                            // identical with power
    ε(X)                             // identical with essence
    @ δ(indefinite)                  // for indefinite time
}

P7(III): κ+ := Foundation(Virtue)
    // striving to preserve being is first virtue
```

### The Primary Affects

```
AFFECT := Δι(π+)
    // affect is change in power intensity

Joy := π+↑
    // transition to greater perfection

Sadness := π+↓
    // transition to lesser perfection

Desire := κ+ where Mind ⊢ κ+
    // conatus with consciousness

PRIMARY_AFFECTS := ✧{Desire, Joy, Sadness}
```

### Derived Affects

```
Love := Joy ← Idea(External_Cause)
Hate := Sadness ← Idea(External_Cause)

Hope := Joy(uncertain) ⊳ Future
Fear := Sadness(uncertain) ⊳ Future

Confidence := Hope where uncertainty → 0
Despair := Fear where uncertainty → 0

Pride := Joy ← Idea(Self) (excessive)
Humility := Sadness ← Idea(Self)

Pity := Sadness ← Idea(Sadness(Ω~Σ))
    // sadness from seeing similar other's sadness

Emulation := Desire ← 👁(Desire(Ω~Σ))
    // desiring what similar other desires

Ambition := Desire → Recognition(Ω)
    // striving for others' approval

Envy := Hate ← 👁(Joy(Ω))
    // sadness at another's fortune
```

### Imitation of Affects

```
P27(III): Affect(Σ) ← 👁(Affect(Ω)) where (Ω ~ Σ)
    // affects spread through similarity

AFFECTIVE_CONTAGION := {
    👁(Joy(Ω)) → Joy(Σ) where Ω ~ Σ
    👁(Sadness(Ω)) → Sadness(Σ) where Ω ~ Σ
}
```

### Ambivalence

```
Vacillatio_Animi := (Love ⋈ Hate) toward same X
    // fluctuation of mind
    
    := (Joy ⋈ Sadness) ← same Idea
    // same object causes contrary affects
```

---

## Part IV: Human Bondage (De Servitute)

### The Structure of Bondage

```
BONDAGE := π-(Passions) > π+(Reason)
    // passive affects overpower active understanding

Passion := Affect where (Σ := ⊨partial Cause)
    // we are partial cause

Action := Affect where (Σ := ⊨full Cause)
    // we are adequate cause

Bondage := ⇊(⊨partial) → φ↓(Σ)
    // sedimented inadequate ideas diminish power
```

### Why We Are in Bondage

```
P3(IV): φ(Passion) > φ(Reason) (often)
    // force of passion exceeds reason

P4(IV): ¬(Passion eliminated except by stronger Affect)
    // only affect overcomes affect

P7(IV): ¬(Reason alone → ¬Passion)
    // reason alone insufficient

EXPLANATION := {
    Passion := ι(present, imagined)
    Reason := ι(absent, understood)
    ι(present) > ι(absent)           // by nature
    ∴ Passion > Reason (by default)
}
```

### The Path Out

```
P7(IV): Affect(Passion) → Affect(Action)
    when Idea(Affect) := ⊨full
    // passion → action through adequate understanding

THERAPY := {
    ⊨partial → ⊨full                 // increase adequacy
    Passion → Action                 // transform affect
    Bondage → Freedom                // result
}

Freedom := π+(Reason) > π-(Passions)
```

---

## Part V: Human Freedom (De Libertate)

### Power of Intellect over Affects

```
P3(V): Affect(Passion) loses force when ⊨full(Affect)
    // understanding diminishes passion

P4(V): ¬(∃ Affect) without ⊨full possible
    // every affect can be understood

P6(V): Mind ⊢ (All within □) → diminished Affect
    // understanding necessity reduces affect

P7(V): Affects ← ⊨full > Affects ← ⊨partial
    // adequate affects stronger than inadequate
```

### The Three Kinds of Knowledge

```
K₁ := Imagination := {
    Knowledge through Sensation
    ⊨partial(Cause)
    Random, confused
    Source of error
}

K₂ := Reason := {
    Knowledge through 𝒞 (Common Notions)
    ⊨full(Cause)
    Universal, necessary
    Source of adequate ideas
}

K₃ := Intuition := {
    Knowledge through ε(God) → ε(Singular)
    ⊨full(Singular_in_God)
    Direct insight
    Source of highest joy
}

HIERARCHY: K₁ < K₂ < K₃
```

### Intellectual Love of God

```
P15(V): Mind ⊢ (Self ∧ Body) @ Eternity
    // mind conceives self and body under eternity

P25(V): κ+(Mind) := K₃
    // highest striving is third kind knowledge

P32(V): Joy ← K₃ → Amor_Dei_Intellectualis
    // joy from intuition is intellectual love of God

Amor_Dei_Intellectualis := {
    Love(God) through ⊨full
    Joy ← Idea(God) @ Eternity
    π+↑ through Understanding(▣)
}

P33(V): Amor_Dei_Intellectualis := Eternal
    // this love cannot perish
```

### God's Love

```
P35(V): God loves Self with infinite Love
    // Deus se ipsum Amore intellectuali infinito amat

P36(V): Amor_Dei_Intellectualis(Mind) ∈ Amor(God → Self)
    // our love of God is part of God's self-love

IDENTITY := {
    Mind ⊢ God with Love
    ≡ God ⊢ Self through Mind with Love
    // same love from two perspectives
}
```

### Eternity of Mind

```
P23(V): Mind @ Eternity (partially)
    // mind is eternal insofar as conceives body under eternity

Mind_Eternal := {
    Mind ⊢ Body @ Eternity
    Mind ⊢ ε(Body) within ε(▣)
    ¬@ τ                             // not in time
}

P38(V): More K₂ ∧ K₃ → More Eternal
    // the more adequate knowledge, the more eternity

P39(V): More π+(Body) → More Mind_Eternal
    // active body → more eternal mind
```

### The Final Formula

```
BEATITUDE := {
    Amor_Dei_Intellectualis
    through K₃
    @ Eternity
    where π+ → maximum
    and Bondage → 0
    and Virtue ≡ Beatitude           // not reward FOR virtue
}

P42(V): Beatitude ≢ Reward(Virtue)
    Beatitude ≡ Virtue
    
    // Unpacked:
    π+(Understanding) ≡ Joy ≡ Freedom ≡ Beatitude ≡ Virtue
    
    // In our notation:
    Beatitude := π+↑(Σ) through ⊢(ε(Σ) within ε(▣)) @ ¬τ
        where ⊢ := K₃
        and ℜ(Σ) ≡ 𝒫(Σ) ≡ π+(Σ) → maximum
```

---

## Complete System Summary

```
SPINOZA_ETHICS := {

    // ONTOLOGY (Part I)
    ▣ := unique                      // one substance
    ▣ ≡ God ≡ Nature
    φ(▣) → ∞                        // infinite attributes
    ◇ within ▣                       // modes immanent
    ε(▣)→∃(▣)                       // necessary existence
    ▣_N ⋈ ▣_n                       // active = expressed

    // MIND-BODY (Part II)
    φ_Thought ∥ φ_Extension          // parallel
    Mind := Idea(Body)
    Order(Ideas) ≡ Order(Things)

    // AFFECTS (Part III)
    κ+ := ε(X) := π+(X)             // conatus = essence = power
    Joy := π+↑
    Sadness := π+↓
    Desire := κ+(conscious)

    // BONDAGE (Part IV)
    Bondage := ⊨partial > ⊨full
    Passion := Affect(⊨partial)
    Action := Affect(⊨full)
    Therapy := ⊨partial → ⊨full

    // FREEDOM (Part V)
    K₁ < K₂ < K₃
    Amor_Dei_Intellectualis := Joy ← K₃(God)
    Beatitude := Virtue := π+ → max through K₃ @ Eternity
    
    // THE FUNDAMENTAL EQUATION
    ℜ ≡ 𝒫 ≡ π+ ≡ ε ≡ κ+
    // reality = perfection = power = essence = striving
}
```

---

## Appendix: New Primitives Required

The Spinoza stress-test revealed need for these primitives, now added to Domain 17:

| Primitive | Symbol | Use |
|-----------|--------|-----|
| Essence-involves-existence | `ε→∃` | Causa sui, necessary being |
| Adequate conception | `⊨full` | Clear and distinct ideas |
| Inadequate conception | `⊨partial` | Confused ideas |
| Shared property | `~shared` | Basis for common notions |
| Common notion | `𝒞` | Always adequate ideas |
| Natura naturans | `▣_N` | God as active |
| Natura naturata | `▣_n` | God as expressed |
| Reality-perfection-power | `ℜ≡𝒫≡π+` | The Spinozist equation |
| Kinds of knowledge | `K₁ K₂ K₃` | Imagination, reason, intuition |

---

*Document Version: 1.0*
*Stress-test of Philosophical Language against Spinoza's Ethics*
