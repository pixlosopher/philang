# Wittgenstein Formalized

## A Stress-Test of the Philosophical Language

This document presents both early and late Wittgenstein in PhiLang notation. It is uniquely challenging because Wittgenstein's philosophy concerns **the limits of what can be said**—formalization approaches its own boundary.

---

## Part I: The Tractatus Logico-Philosophicus

### New Primitives for the Tractatus

```
EARLY WITTGENSTEIN PRIMITIVES:

Ontological:
  𝕎     World (die Welt) — totality of facts
  𝔉     Fact (Tatsache) — what is the case
  𝔖𝔞    State of affairs (Sachverhalt) — atomic combination of objects
  𝔬     Object (Gegenstand) — simple, unanalyzable
  𝔣     Form — possibility of structure
  𝔰𝔭    Logical space (logischer Raum)

Linguistic/Logical:
  𝔓     Proposition (Satz) — picture of reality
  𝔑     Name (Name) — stands for object
  𝔖𝔦    Sign (Zeichen) — perceptible symbol
  𝔖𝔶    Symbol — sign + logical syntax
  ⦦𝔓    Elementary proposition (Elementarsatz)
  ⊧     Says/asserts (sagt)
  ↭     Pictures/depicts (abbildet)
  ⧓     Shows (zeigt) — what cannot be said

Logical Operations:
  𝔑(ξ)  General form of proposition: [p̄, ξ̄, N(ξ̄)]
  ⊤     Tautology — says nothing, shows logical form
  ⊥     Contradiction — no possible world
  ⋔     Logical scaffolding (Gerüst)

Metaphilosophical:
  ⌗     Nonsense (Unsinn) — transgresses limits
  ⊘     Silence (Schweigen) — proper response to the unsayable
  ⤒     The mystical (das Mystische) — that the world exists
  ⦵     The ethical/aesthetic — beyond facts
  ⟁     The ladder (die Leiter) — to be thrown away
```

---

### Tractatus Structure

#### 1. The World

```
1    𝕎 := totality(𝔉)
     // The world is all that is the case

1.1  𝕎 := {𝔉₁, 𝔉₂, ..., 𝔉ₙ}
     // The world is the totality of facts, not things

1.2  𝕎 → 𝔉 (decomposes)
     // The world divides into facts

1.21 ∀𝔉: (𝔉 ∈ 𝕎) ∨ (¬𝔉 ∈ 𝕎)
     // Each fact can be the case or not, all else remaining same
```

#### 2. Facts and States of Affairs

```
2    𝔉 := ∃(𝔖𝔞)
     // What is the case—a fact—is the existence of states of affairs

2.01 𝔖𝔞 := combination(𝔬₁, 𝔬₂, ..., 𝔬ₙ)
     // A state of affairs is a combination of objects

2.011 ε(𝔬) ⊃ ◇(𝔖𝔞)
     // Essential to object: possible constituent of states of affairs

2.012 ¬(∃(𝔬)) where ¬(◇(𝔬 ∈ 𝔖𝔞))
     // No object without possibility of combination

2.0123 𝔬 → knows(all ◇(𝔖𝔞))
     // To know object is to know all possible states of affairs

2.013 𝔬 within 𝔰𝔭
     // Each thing is in a space of possible states of affairs

2.02 𝔬 := simple
     // Objects are simple

2.021 𝔬 := ▣(𝕎)
     // Objects make up the substance of the world

2.0211 ¬(∃(𝔬)) → 𝔓 depends on 𝔓'
     // Without objects, truth of one proposition would depend on another

2.023 𝔬 := 𝔣(𝕎) := unalterable
     // Objects = fixed form, configuration = changing

2.024 ▣ := ∃ independent of 𝔉
     // Substance is what subsists independently of what is the case

2.025 ▣ := 𝔣 + content
     // Substance is form and content

2.03 𝔖𝔞: 𝔬 ⋈ 𝔬 (directly)
     // In state of affairs objects hang in one another like chain links

2.04 totality(∃(𝔖𝔞)) := 𝕎
     // Totality of existing states of affairs is the world

2.05 totality(∃(𝔖𝔞)) → ¬(∃(𝔖𝔞'))
     // Existence of states of affairs determines non-existence of others

2.06 ∃(𝔖𝔞) ∧ ¬∃(𝔖𝔞') := Reality
     // Reality is existence and non-existence of states of affairs

2.063 𝕎 := Reality := totality
     // Sum-total of reality is the world
```

#### 2.1 Pictures

```
2.1  𝔓 ↭ 𝔉
     // We picture facts to ourselves

2.11 𝔓 := 𝔖𝔞 within 𝔰𝔭
     // Picture presents situation in logical space

2.12 𝔓 := model(Reality)
     // Picture is a model of reality

2.13 elements(𝔓) ↔ 𝔬
     // Elements of picture stand for objects

2.131 elements(𝔓) := representatives(𝔬)
     // Elements are representatives of objects

2.14 𝔓 := elements ⋈ structure
     // Picture consists of elements related in determinate way

2.141 𝔓 := 𝔉
     // Picture is a fact

2.15 structure(elements) ↭ structure(𝔬)
     // Elements related as picture = objects may be related

2.151 Pictorial_form := ◇(structure)
     // Pictorial form is possibility that things relate as elements do

2.16 𝔉 ↭ 𝔉 requires: shared(𝔣)
     // Fact must share something with what it pictures

2.161 shared(𝔣) := pictorial_form
     // Something identical in picture and depicted

2.17 𝔓 ↭ Reality := pictorial_form
     // What picture must share with reality to depict it

2.172 𝔓 ¬(↭) pictorial_form
     // Picture cannot depict its own pictorial form

2.172 pictorial_form ⧓ itself
     // It displays it—SHOWS rather than says

2.173 𝔓 ↭ subject from_outside
     // Picture represents subject from outside

2.174 𝔓 ¬(↭) 𝔓 from_outside
     // Cannot place itself outside its representational form

2.18 Logical_form := shared(∀𝔓, Reality)
     // What any picture must have in common with reality

2.181 Logical_form → 𝔓 := logical_picture
     // If pictorial form is logical form, picture is logical picture

2.182 ∀𝔓 := logical_picture
     // Every picture is also a logical picture

2.19 Logical_𝔓 ↭ 𝕎
     // Logical pictures can depict the world

2.2  𝔓 shares 𝔣 with ↭(𝔓)
     // Picture has logical form in common with depicted

2.201 𝔓 ↭ Reality by: ◇(∃(𝔖𝔞)) ∨ ◇(¬∃(𝔖𝔞))
     // Picture depicts by presenting possible states of affairs

2.202 𝔓 ↭ ◇(𝔖𝔞) within 𝔰𝔭
     // Picture represents possible situation in logical space

2.203 𝔓 contains ◇(↭(𝔓))
     // Picture contains possibility of situation it represents

2.21 𝔓 ↭ Reality: agrees ∨ ¬agrees
     // Picture agrees or disagrees with reality

2.22 𝔓 ↭ sense through 𝔣
     // Picture depicts what it depicts through pictorial form

2.221 𝔓 ↭ X := sense(𝔓)
     // What picture represents is its sense

2.222 Truth(𝔓) := agrees(sense(𝔓), Reality)
     // Truth or falsity is agreement of sense with reality

2.223 Truth(𝔓) requires comparison(𝔓, Reality)
     // To know if picture true, must compare with reality

2.224 ¬(∃(a_priori(Truth(𝔓))))
     // No picture true a priori
```

#### 3. Thoughts and Propositions

```
3    𝔗 := logical_𝔓(𝔉)
     // A logical picture of facts is a thought

3.001 𝔗 := sense(𝔓)
     // "State of affairs is thinkable" = we can picture it

3.01 totality(True(𝔗)) := 𝕎 picture
     // Totality of true thoughts is picture of world

3.02 𝔗 contains ◇(𝔗)
     // Thought contains possibility of situation thought

3.03 𝔗 ¬(⊧) illogical
     // Cannot think anything illogical

3.031 ¬(∃(illogical_language))
     // Cannot say anything illogical—language prevents

3.032 ¬(↭) contradiction within 𝔰𝔭
     // Cannot represent in language what contradicts logic

3.04 A_priori(True(𝔗)) → ◇(𝔗) → True(𝔗)
     // A priori true thought: possibility guarantees truth

3.05 A_priori(𝔗) only_if recognize(True(𝔗)) from 𝔗_alone
     // Only know a priori if truth recognizable from thought alone

3.1  𝔓 := 𝔗 expressed perceptibly
     // Proposition: thought expressed perceptibly

3.11 𝔓 := ⦦𝔓 projection
     // We use perceptible sign as projection of possible situation

3.12 𝔖𝔦 through_which 𝔗_expressed := 𝔓𝔖𝔦
     // Propositional sign = sign through which thought expressed

3.13 𝔓 contains ◇(sense) ¬(sense_itself)
     // Proposition contains possibility of sense, not sense itself

3.14 𝔓𝔖𝔦 := 𝔉
     // Propositional sign is a fact

3.141 𝔓 ≢ word_mixture; 𝔓 := articulate
     // Proposition is not mixture of words—it is articulate

3.142 𝔉 only ↭ 𝔉
     // Only facts can express a sense

3.143 𝔓𝔖𝔦 := 𝔉 (disguised by writing)
     // Ordinary form disguises fact-nature of proposition

3.1431 𝔓 := ⟦𝔑₁, 𝔑₂, ..., spatial_relation⟧
     // Essence of propositional sign: spatial arrangement of components
```

#### 4. Thought = Significant Proposition

```
4    𝔗 := 𝔓 with sense
     // Thought is proposition with sense

4.001 totality(𝔓) := Language
     // Totality of propositions is language

4.002 Language disguises 𝔗
     // Language disguises thought—surface ≠ logical form

4.003 Most_philosophy := ⌗
     // Most philosophical propositions are nonsense

4.0031 Philosophy := clarify(𝔓)
     // Philosophy: logical clarification of thoughts

4.01 𝔓 := 𝔓(Reality)
     // Proposition is picture of reality

4.011 𝔓 ↭ 𝔉: not_obvious
     // That proposition pictures isn't obvious

4.012 𝔓(aRb) ↭ aRb if sense(𝔓)
     // aRb pictures that a stands in relation to b, if proposition has sense

4.014 𝔓_record := 𝔉 ↭ 𝔉
     // Musical score, phonograph record: all are pictures

4.015 ∃(general_pictorial_form) → ∃(language)
     // Possibility of all pictures is logical form—allows language

4.02 sense(𝔓) := understand(𝔓) without knowing(True(𝔓))
     // We understand sense without knowing if true

4.021 𝔓 := 𝕎 picture
     // Proposition is picture of reality

4.022 𝔓 ⧓ sense; 𝔓 ⊧ agrees_or_not(sense, 𝔉)
     // Proposition SHOWS sense, SAYS that things stand so

4.023 𝔓 ⊧ Reality at: Yes ∨ No
     // Proposition determines reality at one point

4.024 understand(𝔓) := know(𝔉 if True(𝔓))
     // To understand = know what is case if true

4.025 Translation(𝔓₁, 𝔓₂) := try Language₁ then Language₂
     // Translation: express in different language, compare

4.026 𝔬 meanings := explain through ⦦𝔓
     // Meanings of simples explained through elucidations

4.027 𝔓 := ⊧(new_sense)
     // Essential to propositions: communicate new sense

4.03 𝔓 ⊧ through: Old_words → new_sense
     // Proposition says something new using old expressions

4.031 𝔓 := 𝔖𝔞 assembled
     // In proposition, situation assembled experimentally

4.0311 𝔑 ↔ 𝔬; 𝔓 ↔ 𝔖𝔞
     // One name stands for one thing; proposition for state of affairs

4.0312 ◇(𝔓) := ◇(Logic)
     // Possibility of propositions = logic's conventions re: signs

4.032 𝔓 := 𝔓(𝔖𝔞) only_if logical_articulation
     // Proposition pictures only if logically articulated

4.04 𝔓 := 1:1 with ↭(𝔓)
     // In proposition same multiplicity as what it represents

4.041 Multiplicity(𝔓) ¬(↭); ⧓
     // This multiplicity cannot be depicted, shows itself

4.0411 𝔓 + description(𝔓) := 𝔓 of 𝔓
     // Can't express what proposition expresses through description of it
```

#### 4.1-4.2 Propositions and Elementary Propositions

```
4.1  𝔓 ⊧ ∃(𝔖𝔞) ∨ ¬∃(𝔖𝔞)
     // Proposition asserts existence or non-existence of state of affairs

4.11 totality(True(𝔓)) := Natural_Science
     // Totality of true propositions is whole of natural science

4.111 Philosophy ≢ Natural_Science
     // Philosophy is not one of the natural sciences

4.112 Philosophy := activity(clarify(𝔓))
     // Philosophy is activity of logical clarification

4.1121 Psychology ≢ closer to Philosophy
     // Psychology is no more closely related than any other

4.1122 Darwin ≢ more_relevant than Logic
     // Darwinian theory has no more to do with philosophy than physics

4.113 Philosophy := boundary(Natural_Science)
     // Philosophy sets boundary to disputable sphere of natural science

4.114 Philosophy := delimit(Thinkable) through delimit(Unthinkable)
     // Must limit thinkable by working through the unthinkable from inside

4.115 Philosophy ⧓ limit(⊧) through ⊧(what_can_be_said)
     // Signifies unsayable by clearly presenting sayable

4.116 ∀(Thinkable) := ∀(Sayable)
     // Everything that can be thought can be said

4.12 𝔓 ↭ totality(Reality)
     // Propositions can represent whole of reality

4.121 𝔓 ¬(↭) logical_form; ⧓
     // Cannot represent logical form—it mirrors itself in propositions

4.1211 𝔓 "fa" ⧓ that 𝔬(a) occurs
     // Proposition shows object a occurs in its sense

4.1212 ⧓ ¬(⊧)
     // What can be shown cannot be said

4.122 Properties_internal := ⧓ ¬(⊧)
     // Internal properties: unthinkable that object lack them

4.123 Internal_property := 𝔣
     // Internal property of fact = feature/structural property

4.1241 ¬(distinguish) 𝔣 from 𝔣' by properties
     // Cannot distinguish forms by properties

4.125 Internal_relation := 𝔣 relation
     // Internal relation between structures = structural relation

4.126 𝔣_concepts := ⧓ by variables
     // Formal concepts shown by variables, not functions

4.127 𝔓_variable ⧓ 𝔣_concept
     // Propositional variable signifies formal concept

4.128 logical_form := ⌗ to count
     // Logical forms have no number

4.2  sense(𝔓) := comparison(Reality)
     // Sense of proposition is agreement with possibilities

4.21 ⦦𝔓 := simplest(𝔓); ⊧(∃(𝔖𝔞))
     // Elementary proposition asserts existence of state of affairs

4.211 ⦦𝔓 := True → ∃(𝔖𝔞)
     // Sign of elementary proposition being true: state of affairs exists

4.22 ⦦𝔓 := ⟦𝔑₁, 𝔑₂, ..., 𝔑ₙ⟧
     // Elementary proposition consists of names

4.221 Analysis(𝔓) → ⦦𝔓
     // Analysis yields elementary propositions

4.23 𝔑 ⊧ within(⦦𝔓)
     // Name has meaning only in elementary proposition context

4.24 𝔑 := simple_sign
     // Names are simple signs

4.25 ⦦𝔓: atomic; ¬(contradicts) other ⦦𝔓
     // Elementary propositions are independent—none contradicts another

4.26 totality(True(⦦𝔓)) := complete(𝕎 description)
     // Specification of all true elementary propositions describes world

4.27 ⦦𝔓: n possibilities → 2ⁿ truth-possibilities
     // For n states of affairs: 2^n truth-possibilities

4.28 combinations := truth-possibilities
     // These combinations are truth-possibilities of elementary propositions
```

#### 5. Truth-Functions

```
5    𝔓 := Truth_function(⦦𝔓)
     // Proposition is truth-function of elementary propositions

5.01 ⦦𝔓 := Truth_function(itself)
     // Elementary propositions are truth-functions of themselves

5.1  Truth_functions := series
     // Truth-functions can be ordered in series

5.101 Truth_table(𝔓₁, 𝔓₂) :=
      TTTT := ⊤        // Tautology
      TTFF := 𝔓₁
      TFTF := 𝔓₂
      TFFF := 𝔓₁ ∧ 𝔓₂
      TFTT := 𝔓₁ → 𝔓₂
      ...
      FFFF := ⊥        // Contradiction

5.12 True(𝔓₁) + True(𝔓₂) → True(𝔓₁ ∧ 𝔓₂)
     // Truth of one proposition follows from truth of others

5.13 Truth(𝔓₁) follows_from Truth(𝔓₂) ⧓ in structure
     // Truth-connection shows in structure of propositions

5.131 Valid_inference ⧓ in 𝔓s themselves
     // Valid inference is shown by propositions themselves

5.132 𝔓₁ → 𝔓₂: True(𝔓₁) → True(𝔓₂) contained
     // If p follows from q, sense of p contained in sense of q

5.133 All_deduction := a_priori
     // All deduction happens a priori

5.134 ¬(⦦𝔓 → ⦦𝔓')
     // No elementary proposition follows from another

5.135 ¬(infer(∃(𝔖𝔞)) from ∃(𝔖𝔞'))
     // No inference from existence of one state of affairs to another

5.136 ¬(∃(causal_nexus))
     // There is no causal nexus to justify inference

5.1361 future_events ¬(⊧) from present
     // We cannot infer future events from present

5.1362 Free_will := future ¬(knowable)
     // Freedom of will: future actions cannot be known now

5.14 𝔓₁ → 𝔓₂ means: T(𝔓₁) grounds ⊂ T(𝔓₂) grounds
     // If p follows from q: truth-grounds of q contained in p's

5.141 𝔓₁ → 𝔓₂ and 𝔓₂ → 𝔓₁ means: 𝔓₁ ≡ 𝔓₂
     // If p follows from q and q from p, they are same proposition

5.142 ⊤ → from all 𝔓
     // Tautology follows from all propositions

5.143 ⊥ := contained in all 𝔓 (incompatible)
     // Contradiction is what's common to no proposition

5.2  𝔓s := internal_relation
     // Propositions stand in internal relations to one another

5.21 𝔓 relations ⧓ by 𝔓 ⊂ 𝔓' or 𝔓 ∩ 𝔓' = ∅
     // Highlight internal relations by containment or exclusion

5.3  ∀𝔓 := N(⦦𝔓) iterated
     // All propositions: results of truth-operations on elementary propositions

5.4  ¬(∃(logical_objects)) ¬(∃(logical_constants))
     // No logical objects, no logical constants

5.41 N(N(𝔓)) ≢ 𝔓
     // Results of truth-operations on truth-operations are identical

5.42 ∨, →, etc := ¬(relations)
     // Logical connectives are not relations

5.43 ¬(∃(privileged_numbers)) in Logic
     // No privileged numbers in logic

5.44 Truth_functions := ¬(material_functions)
     // Truth-functions are not material functions

5.45 Logical_primitives := interchangeable
     // If there are logical primitives, they must be inter-definable

5.451 Logical_concepts := family_resemblance
     // If logic has fundamental concepts, they must be independent

5.452 New_symbol needs: new_sense
     // Introduction of new symbol must bring new sense

5.453 All_numbers_in_logic := justify
     // All numbers in logic must be justified

5.454 Logic := ¬(coordinate) with World
     // Logic is not coordinate with world

5.46 Logical_signs := adequate → ¬(abbreviations)
     // With adequate logical signs, no need for abbreviations

5.47 ∀(⊧) contains: general_form(𝔓)
     // All that can be said presupposes general propositional form

5.471 General_form(𝔓) := ε(Language)
     // General propositional form is essence of proposition

5.4711 ε(𝔓) := ε(Language) := ε(𝕎)
     // Essence of proposition = essence of language = essence of world

5.5  N(ξ̄) := [p̄, ξ̄, N(ξ̄)]
     // General form: start with p's, apply N repeatedly

5.6  Limit(Language) := Limit(𝕎)
     // Limits of my language mean limits of my world

5.61 Logic_fills_𝕎; Limit(𝕎) := Limit(Logic)
     // Logic fills world; limits of world are limits of logic

5.62 𝕎 := My_𝕎
     // The world is MY world (solipsism)

5.621 𝕎 ≡ Life
     // World and life are one

5.63 Σ := My_𝕎
     // I am my world (the microcosm)

5.631 Thinking_Σ ¬(∃)
     // There is no thinking subject

5.632 Σ ¬(∈) 𝕎; Σ := Limit(𝕎)
     // Subject is not in world but is limit of world

5.633 ?(Σ within 𝕎) := No
     // Where in world is metaphysical subject? Nowhere.

5.634 ∀(experience) ¬(proves) Σ
     // No experience proves existence of subject a priori

5.64 Solipsism → Pure_Realism (strictly_followed)
     // Solipsism, strictly worked out, coincides with pure realism

5.641 Philosophical_Σ := ¬(human); Σ := Limit(𝕎)
     // The philosophical self is not the human being but the world-limit
```

#### 6. The General Form of Proposition

```
6    General_form(𝔓) := [p̄, ξ̄, N(ξ̄)]
     // General form: [elementary propositions, variable, negation operation]

6.001 𝔓 := result(N(ξ̄) iterated)
     // Every proposition is result of successive applications of N

6.002 Given_form(𝔓) → Given_form(∀𝔓)
     // General form of building propositions from elementary ones

6.01 General_form(N) := [ξ̄, N(ξ̄)]
     // General form of truth-operation

6.02 Numbers := exponents of N
     // Numbers are exponents of operations

6.1  𝔓s_of_Logic := ⊤
     // Propositions of logic are tautologies

6.11 ⊤ ⊧ ∅
     // Tautologies say nothing

6.111 Theories_in_Logic := ⌗
     // Theories making logical propositions appear substantive are wrong

6.112 ¬(synthetic_a_priori)
     // No synthetic a priori

6.113 Logic_𝔓 := recognize from 𝔖𝔶 alone
     // Logical proposition recognized from symbol alone

6.12 Logic_𝔓 := ⊤ ⧓ 𝔣(Language) ⧓ 𝔣(𝕎)
     // That logical propositions are tautologies SHOWS formal properties

6.1201 ⊤ ⧓ ∅; ⧓ Logic_form
     // Tautology shows it says nothing

6.1202 ¬(Logic) without ¬(⌗)
     // Clear symbolism makes logic unnecessary

6.121 Logic_𝔓 ⧓ Logic
     // Propositions of logic demonstrate logical properties

6.122 ¬(need(Logic_𝔓)) if adequate_notation
     // With adequate notation, logical propositions unnecessary

6.123 ¬(Logical_laws); 𝔣 ⧓ in every 𝔓
     // No laws of logic; logical form shows in every proposition

6.124 Logic_𝔓 describe ⋔
     // Logical propositions describe scaffolding of world

6.125 Adequate_notation → recognize(⊤) without proof
     // With good notation, recognize tautology by inspection

6.126 Calculate whether 𝔓 := ⊤
     // Can calculate whether proposition is tautology

6.127 Logic_𝔓 := equipollent
     // All propositions of logic have equal status

6.1271 Logic := ¬(hierarchy)
     // Logic has no hierarchy—no primitive propositions

6.13 Logic := ¬(doctrine); Logic := reflection of 𝕎
     // Logic is not doctrine but reflection of world

6.2  Mathematics := logical_method
     // Mathematics is a logical method

6.21 Math_𝔓 := ¬(𝔗)
     // Mathematical propositions express no thoughts

6.211 Math_𝔓 ¬(⊧) life questions
     // Mathematical propositions have no application to life questions

6.22 Math_𝔓 ⧓ Logic of 𝕎
     // Mathematical propositions show logic of world

6.23 Identity in Math := substitute(expressions)
     // Identity in math: intersubstitutability of expressions

6.3  Logic_exploration := method
     // Exploring logic means exploring all regularity

6.31 Induction := psychological; ¬(logical)
     // Induction is psychological, not logically grounded

6.32 Causality_law := ¬(law); := 𝔣
     // Law of causality is form, not law

6.321 "Causality" := ⌗ as law
     // "Law of causality" is a general name, not a law

6.33 ¬(logical_necessity) except logical
     // We don't believe in necessity except logical necessity

6.34 Laws := ¬(about 𝕎); about 𝕎-description
     // Laws like conservation are about form of description

6.341 Newtonian_mechanics := 𝔣 for 𝕎_description
     // Newtonian mechanics provides unified description form

6.342 Logic + Physics ⧓ 𝕎
     // Logic and physics show something about world

6.343 Mechanics := construct(True_𝔓)
     // Mechanics is attempt to construct true propositions

6.35 Lines ≢ 𝕎; lines := describe 𝕎
     // Geometrical lines don't belong to world but to description

6.36 ∃(Natural_law) → contingent
     // If there were law of nature, it would be contingent

6.361 Only_necessity := logical_necessity
     // Only logical necessity exists

6.362 ◇(⊧) → ◇(¬⊧)
     // What can be said can also fail to be said

6.363 Induction := ¬(logical)
     // Process of induction has no logical justification

6.37 ¬(Force) compels events
     // No compulsion making one thing happen because another does

6.371 Modern_physics := illusion(explanation)
     // Modern physics gives illusion of explanation

6.372 Ancients := clearer; knew limit
     // Ancients were clearer—had acknowledged stopping point

6.373 𝕎 independent of Σ will
     // World is independent of my will

6.374 ¬(logical_connection(Σ_will, 𝕎))
     // No logical connection between will and world

6.375 Only_necessity := logical
     // Only logical necessity, only logical impossibility

6.4  ∀(𝔓) := equipollent
     // All propositions are of equal value

6.41 sense(𝕎) := outside(𝕎)
     // Sense of world must lie outside world

6.42 ¬(∃(Ethical_𝔓))
     // No ethical propositions exist

6.421 Ethics := ⌗ to ⊧
     // Ethics cannot be put into words

6.422 Ethical_reward/punishment := in_action_itself
     // Ethical reward is in the action itself

6.423 Will_qua_ethical ¬(⊧)
     // Cannot speak of will as bearer of ethical

6.43 Good/Bad_will → alter(Limit(𝕎)) ¬(𝔉)
     // Good/bad will changes limits of world, not facts

6.431 Death ¬(∈) Life
     // Death is not an event in life

6.4311 Death := ¬(experience)
     // Death is not lived through

6.4312 Immortality ¬(solves) Life
     // Eternal life would not solve riddles of life

6.432 ?(𝕎_arrangement) := indifferent to Higher
     // How world is arranged is indifferent to what is higher

6.4321 𝔉 := only_task; ¬(solve)
     // Facts only pose task, never solve it

6.44 ⤒ := that 𝕎 exists ¬(how)
     // Mystical: not HOW world is, but THAT it is

6.45 𝕎 sub_specie_aeterni := view_as_whole_with_limit
     // Feeling world as limited whole is the mystical

6.5  ¬(⊧(answer)) → ¬(⊧(question))
     // If answer cannot be expressed, question cannot either

6.51 Skepticism := ⌗ if ?_has_no_answer
     // Skepticism is nonsense if question cannot be asked

6.52 ∀(Life_problems) → solved if solved → vanished
     // When all scientific questions answered, life problems untouched

6.521 solution(Life) := disappearance(problem)
     // Solution of life is disappearance of the problem

6.522 ∃(⤒); ⤒ ⧓ ¬(⊧)
     // There is the inexpressible; it SHOWS itself

6.53 correct_method := ⊧(only_natural_science); ⧓(⌗)
     // Right method: say only what can be said; show others' nonsense

6.54 My_𝔓 := ⟁ → throw_away → see(𝕎_correctly)
     // My propositions are ladder; throw away after climbing

7    ¬(⊧) → ⊘
     // Whereof one cannot speak, thereof one must be silent
```

---

## Part II: Philosophical Investigations (Later Wittgenstein)

### New Primitives for Late Wittgenstein

```
LATE WITTGENSTEIN PRIMITIVES:

Language Games & Use:
  𝔖𝔭   Language-game (Sprachspiel)
  ℧     Use (Gebrauch) — meaning is use
  ⟴     Rule (Regel) — guides practice
  ⟴→    Rule-following — practice, not interpretation
  ⧖     Practice/custom (Praxis, Gepflogenheit)
  𝔏     Form of life (Lebensform)

Concepts & Family Resemblance:
  ≋ᶠ    Family resemblance (Familienähnlichkeit)
  ⟨⟩ᵍ   Grammar (Grammatik) — depth grammar
  ⊛ₐ    Aspect (seeing-as)
  ⊛ᵈ    Aspect dawning

Private Language & Inner:
  ⊘ₚ    Private language (impossible)
  𝕊     Sensation — expression, not description
  ⬚     Beetle in a box — drops out
  ⟦Σ⟧   Inner — not hidden, expressed

Philosophical Therapy:
  ⤥     Therapeutic intervention
  ⟲ₚ    Philosophical problem (confusion)
  ⌀     Dissolution (not solution)
  ↩ₒ    Ordinary language return
  ⧉     Perspicuous representation (übersichtliche Darstellung)

Certainty:
  ⊢ₕ    Hinge proposition — must hold fast
  ⦿ₐ    Bedrock — justification stops
  ⊛ₛ    System of beliefs
```

### Key Moves of the Investigations

#### Language-Games and Use

```
PI §1: ℧(word) ≢ 𝔬
       // Meaning is not object standing behind word

PI §7: 𝔖𝔭 := Language + Activity woven
       // Language-game: language interwoven with actions

PI §23: ∃(𝔖𝔭) := ∞
        // Countless kinds of language-games

PI §43: ℧(word) := use within 𝔖𝔭
        // Meaning of word is its use in language-game

PI §65: ¬(∃(ε(𝔖𝔭)))
        // No essence common to all language-games

PI §66: 𝔖𝔭 ≋ᶠ 𝔖𝔭'
        // Games related by family resemblance, not common property

PI §67: ≋ᶠ := overlap + crisscross
        // Family resemblance: overlapping and crisscrossing similarities
```

#### Rule-Following

```
PI §143: ⟴ ¬(interpret) → ⟴→ := do
         // Rule-following is not interpretation but practice

PI §185: ⟴ ¬(determines) all applications
         // No rule determines all its applications in advance

PI §198: ⟴ := ¬(rails); ⟴ := ⧖
         // Rule is not invisible rails; it's custom, practice

PI §201: ¬(⟴) → ¬(⟴→); but: ⟴→ := ¬(interpret)
         // Paradox: no rule determines action; but rule-following isn't interpretation

PI §202: ⟴→ := ⧖
         // Following rule is a custom, institution

PI §217: Justification → ⦿ₐ: "This is simply what I do"
         // Justification comes to an end: this is what I do

PI §219: ⟴→ := blind
         // I obey rule blindly
```

#### Private Language Argument

```
PI §243: ⊘ₚ := 𝕊 ⋈ words known only to Σ
         // Private language: words refer to what only speaker knows

PI §244: Words for 𝕊 := learn through ↩ₒ
         // Words for sensations tied to natural expressions

PI §256: ⊘ₚ → ¬(⟴) for ℧
         // Private language: no criterion for correct use

PI §258: Private_diary(𝕊) → ¬(criteria(correct))
         // Private sensation diary: no criterion for correctness

PI §265: ⊘ₚ: justify by itself := ¬(justify)
         // Justifying by itself is no justification

PI §270: ¬(identify(𝕊)) correctly in ⊘ₚ
         // Cannot correctly identify sensation privately

PI §293: ⬚ := 𝔬 in private box
         // Beetle in box: everyone has box, no one can look in others'

PI §293b: ⬚ → drops_out as 𝔬
          // Whatever is in box drops out of language-game

PI §304: 𝕊 ¬(something) ¬(nothing)
         // Sensation: not a something, but not a nothing either
```

#### Philosophical Therapy

```
PI §109: Philosophy := ⌀(⟲ₚ) ¬(solve)
         // Philosophy: dissolve problems, not solve them

PI §116: ↩ₒ(words) from metaphysical → everyday
         // Bring words back from metaphysical to everyday use

PI §118: Philosophy := ¬(new_facts); := ⧉
         // Philosophy gives no new facts, only perspicuous representation

PI §119: Philosophy := battle against bewitchment
         // Philosophy battles bewitchment of intelligence by language

PI §122: ⧉ := see_connections
         // Perspicuous representation: seeing connections

PI §123: ⟲ₚ := ¬(empirical); := ⟨⟩ᵍ
         // Philosophical problem is grammatical, not empirical

PI §124: Philosophy := leave_everything_as_is
         // Philosophy may in no way interfere—leaves everything as is

PI §127: Philosophy := assemble_reminders
         // Work of philosopher: assemble reminders for particular purpose

PI §128: Theses_in_philosophy → ¬(controversial)
         // If philosophy had theses, everyone would agree

PI §133: ¬(∃(The_method)) := ∃(methods) as therapies
         // No single method—methods like different therapies

PI §255: ⤥ := show_fly way_out of bottle
         // Philosopher's task: show fly the way out of fly-bottle
```

#### Aspects and Seeing-As

```
PI p.194: ⊛ₐ(figure) := duck ∨ rabbit
          // Same figure seen as duck or as rabbit

PI p.195: ⊛ᵈ := "Now I see it as..."
          // Aspect dawns: sudden shift in seeing

PI p.197: ⊛ₐ := see + think intertwined
          // Seeing aspect: sight and thought interwoven

PI p.212: ⊛ₐ := ¬(interpret); := see_directly
          // Aspect is immediate seeing, not interpretation

PI p.214: Aspect_blind := ¬(⊛ᵈ)
          // Aspect-blindness: inability to see aspect change
```

#### On Certainty (Late Late Wittgenstein)

```
OC §94:  ⊢ₕ := 𝔓 that holds fast
         // Hinge: proposition that must stay put for inquiry to proceed

OC §96:  ⊢ₕ := ¬(empirical) ¬(logical); := grammatical
         // Hinges are neither empirical nor logical but grammatical

OC §105: Knowledge := within ⊛ₛ
         // All knowledge rests on acknowledgement of propositions

OC §115: ?(⊢ₕ) → ?(all)
         // If you doubt hinge, you doubt everything

OC §144: Child ¬(learn) ⊢ₕ; learns(⊛ₛ)
         // Child doesn't learn hinges separately; learns whole system

OC §162: ⊢ₕ := inherited_background
         // Hinges: inherited background against which true/false

OC §204: ⦿ₐ: "I learned it"
         // Bedrock: at some point training just takes hold

OC §253: ⟴→(doubt) requires stable(⊢ₕ)
         // Doubt itself requires hinges to stay fixed

OC §341: ?_to_arise → must_be_askable
         // Questions arise only where answers are possible

OC §559: ⟴ := practice ∧ practice
         // "I know" is based on acknowledgement, not grounds
```

---

## Part III: Cross-Traditional Dialogues

### Tractatus meets Madhyamaka

```
DIALOGUE: Wittgenstein-Nagarjuna

W: 𝕎 := totality(𝔉)
   // World is totality of facts

N: śū(𝔉)?
   // Are facts empty of inherent existence?

W: 𝔬 := ▣(𝕎) — simple, unanalyzable
   // Objects are substance of world

N: svā(𝔬) → śū(𝔬)
   // If objects had inherent nature, they'd be empty of it

W: 𝔓 ⧓ cannot_be_said
   // Propositions show what cannot be said

N: ◈₀ → prapañca → 0
   // Transcend tetralemma, cease conceptual proliferation

RESONANCE:
  7: ¬(⊧) → ⊘ ≈ ◈₀(⊧)
  // Both: silence regarding what transcends language

  ⧓ ≈ प्र?
  // Showing ≈ dependent arising? Form reveals emptiness?
```

### Investigations meets Phenomenology

```
DIALOGUE: Wittgenstein-Merleau-Ponty

W: 𝔖𝔭 := Language ⋈ Activity
   // Language-games woven with practices

MP: χ := Body ⋈ World
    // Flesh is intertwining of body and world

W: ℧(word) := use within 𝔏
   // Meaning is use within form of life

MP: sense := expression within H[χ]
    // Meaning emerges through bodily expression in horizon of flesh

RESONANCE:
  𝔏 ≈ H[χ]
  // Form of life ≈ horizon of flesh?

  ⟴→(blind) ≈ habitus
  // Blind rule-following ≈ bodily habituation?

  ⊛ₐ ≈ ⇋(Sentient, Sensible)
  // Seeing aspects ≈ reversibility of seeing/seen?
```

### Certainty meets Process Philosophy

```
DIALOGUE: Wittgenstein-Whitehead

W: ⊢ₕ := background for all inquiry
   // Hinges form background

WH: ⦿ := prehends H[⦿]
    // Each occasion prehends its world

W: ⊛ₛ := inherited, not learned piecemeal
   // Belief system inherited whole

WH: ⤳ := integrate(†(⦿'))
    // Concrescence integrates perished occasions

RESONANCE:
  ⊢ₕ ≈ †(α(⦿))?
  // Hinges ≈ objective immortality of satisfied occasions?

  𝔏 ≈ ℂ(community)?
  // Form of life ≈ creative advance of community?
```

---

## Inference Rules for Wittgenstein

```
EARLY WITTGENSTEIN RULES:

Rule: Picture Theory
  If 𝔓, then 𝔓 ↭ ◇(𝔖𝔞)
  // Propositions picture possible states of affairs

Rule: Say/Show Distinction
  If 𝔣(X), then 𝔣(X) ⧓ (cannot ⊧)
  // Logical form shows itself, cannot be said

Rule: Tautology
  If 𝔓₁ → 𝔓₂ and 𝔓₂ → 𝔓₁, then (𝔓₁ ≡ 𝔓₂) := ⊤-connection
  // Equivalence shows itself in tautological connection

Rule: Nonsense Detection
  If 𝔓 about 𝔓_form, then 𝔓 := ⌗
  // Propositions about propositional form are nonsense

Rule: World-Limit
  Σ ¬(∈) 𝕎; Σ := Limit(𝕎)
  // Subject is not in world but is world's limit

Rule: Silence
  If ¬(⊧(X)), then X → ⊘
  // What cannot be said must be passed over in silence


LATE WITTGENSTEIN RULES:

Rule: Use Theory
  ?(℧(X)) → examine(℧(X) within 𝔖𝔭)
  // To find meaning, look at use in language-games

Rule: Family Resemblance
  ¬(∃(ε(concept))) → ≋ᶠ
  // Concepts have family resemblance, not essences

Rule: Rule-Following
  ⟴ → ⟴→ := ⧖ (not interpretation)
  // Rules are followed through practice, not interpretation

Rule: Private Language Impossibility
  ⊘ₚ → ¬(criteria(correct)) → ¬(Language)
  // Private language has no correctness criteria, so is impossible

Rule: Therapeutic Dissolution
  ⟲ₚ → ⤥ → ⌀ (not solve)
  // Philosophical problems are dissolved, not solved

Rule: Grammar
  ?(necessary(X)) → examine(⟨⟩ᵍ(X))
  // Apparent necessity is often grammatical

Rule: Ordinary Language
  metaphysical(word) → ↩ₒ(word)
  // Return words from metaphysical to ordinary use

Rule: Hinge Propositions
  doubt(X) → requires(⊢ₕ stable)
  // Doubt requires some propositions to be undoubted

Rule: Form of Life
  ℧ within 𝔖𝔭 within 𝔏
  // Meaning exists within language-games within forms of life
```

---

## Summary: Wittgenstein's Two Philosophies

```
EARLY WITTGENSTEIN (Tractatus):
  𝕎 := totality(𝔉)           // World = facts
  𝔓 ↭ 𝔉                       // Propositions picture facts
  ⧓ vs ⊧                       // Show vs say distinction
  Logic := ⊤ (says nothing)    // Logic is tautological
  Ethics/Aesthetics := ⤒       // Beyond facts
  Philosophy := ⌗-detection    // Identifying nonsense
  7: ⊘                        // Silence about the unsayable

LATE WITTGENSTEIN (Investigations):
  ℧ := use within 𝔖𝔭          // Meaning = use in language-game
  𝔖𝔭 ≋ᶠ 𝔖𝔭'                   // Family resemblance
  ⟴→ := ⧖                     // Rule-following = practice
  ⊘ₚ := impossible            // No private language
  Philosophy := ⤥             // Therapy, not theory
  ⟲ₚ → ⌀                      // Dissolve, don't solve
  ↩ₒ                          // Return to ordinary language

CONTINUITY:
  Both: philosophy ≢ doctrine
  Both: ¬(transcendent_standpoint)
  Both: language_limits ≈ thought_limits
  Both: philosophy := ⌀(confusion)

TRANSFORMATION:
  𝔓 ↭ 𝔉 → 𝔖𝔭 ⋈ ⧖            // Picture theory → language-games
  ε(language) → ≋ᶠ            // Essence → family resemblance
  ⊧/⧓ → ℧ within 𝔏            // Say/show → use in form of life
```

---

*Document Version: 1.0*
*Part of the PhiLang project*
*Formalizing the philosopher of the limits of formalization*
