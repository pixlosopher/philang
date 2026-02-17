/**
 * PhiLang Ontology - Shared Philosophical Concept Definitions
 *
 * This module provides the core ontological data structures used across
 * all PhiLang applications including concepts, traditions, relationships,
 * and semantic axes.
 */

const PhiLangOntology = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // PHILOSOPHICAL TRADITIONS
    // ═══════════════════════════════════════════════════════════════════════════

    const TRADITIONS = {
        PHENOMENOLOGY: {
            id: 'PHENOMENOLOGY',
            name: 'Phenomenology',
            color: '#6366f1',
            shortName: 'Phen',
            icon: '◉',
            thinkers: ['Husserl', 'Merleau-Ponty', 'Levinas']
        },
        SPINOZISM: {
            id: 'SPINOZISM',
            name: 'Spinozism',
            color: '#f59e0b',
            shortName: 'Spin',
            icon: '▣',
            thinkers: ['Spinoza', 'Deleuze']
        },
        BUDDHISM: {
            id: 'BUDDHISM',
            name: 'Buddhism',
            color: '#10b981',
            shortName: 'Budd',
            icon: '◈',
            thinkers: ['Nagarjuna', 'Vasubandhu', 'Dogen']
        },
        PROCESS: {
            id: 'PROCESS',
            name: 'Process Philosophy',
            color: '#3b82f6',
            shortName: 'Proc',
            icon: '⦿',
            thinkers: ['Whitehead', 'James', 'Bergson']
        },
        POSTSTRUCTURALISM: {
            id: 'POSTSTRUCTURALISM',
            name: 'Poststructuralism',
            color: '#ec4899',
            shortName: 'Post',
            icon: '⌒',
            thinkers: ['Deleuze', 'Derrida', 'Foucault']
        },
        HEGELIANISM: {
            id: 'HEGELIANISM',
            name: 'Hegelianism',
            color: '#8b5cf6',
            shortName: 'Hege',
            icon: '⍟',
            thinkers: ['Hegel', 'Marx', 'Zizek']
        },
        HEIDEGGERIANISM: {
            id: 'HEIDEGGERIANISM',
            name: 'Heideggerianism',
            color: '#ef4444',
            shortName: 'Heid',
            icon: '𝔇',
            thinkers: ['Heidegger', 'Gadamer']
        },
        WITTGENSTEIN_EARLY: {
            id: 'WITTGENSTEIN_EARLY',
            name: 'Early Wittgenstein',
            color: '#06b6d4',
            shortName: 'W.Ea',
            icon: '𝕎',
            thinkers: ['Wittgenstein (Tractatus)']
        },
        WITTGENSTEIN_LATE: {
            id: 'WITTGENSTEIN_LATE',
            name: 'Late Wittgenstein',
            color: '#14b8a6',
            shortName: 'W.La',
            icon: '𝔖𝔭',
            thinkers: ['Wittgenstein (PI)', 'Austin']
        },
        KANTIANISM: {
            id: 'KANTIANISM',
            name: 'Kantianism',
            color: '#a855f7',
            shortName: 'Kant',
            icon: '𝕿',
            thinkers: ['Kant', 'Fichte', 'Schelling']
        },
        PLATONISM: {
            id: 'PLATONISM',
            name: 'Platonism',
            color: '#4f46e5',
            shortName: 'Plat',
            icon: '△',
            thinkers: ['Plato', 'Plotinus', 'Proclus']
        },
        ARISTOTELIANISM: {
            id: 'ARISTOTELIANISM',
            name: 'Aristotelianism',
            color: '#059669',
            shortName: 'Aris',
            icon: '⦰',
            thinkers: ['Aristotle', 'Aquinas', 'Averroes']
        },
        HERACLITEANISM: {
            id: 'HERACLITEANISM',
            name: 'Heracliteanism',
            color: '#dc2626',
            shortName: 'Hera',
            icon: '🔥',
            thinkers: ['Heraclitus', 'Nietzsche', 'Deleuze']
        },
        COMPLEXITY: {
            id: 'COMPLEXITY',
            name: 'Computational Complexity',
            color: '#22d3ee',
            shortName: 'Comp',
            icon: '⊛',
            thinkers: ['Whitehead', 'Cook', 'Turing', 'Gödel']
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // SEMANTIC AXES
    // ═══════════════════════════════════════════════════════════════════════════

    const SEMANTIC_AXES = [
        { id: 'temporal', name: 'Temporality', poles: ['eternal', 'temporal'] },
        { id: 'unity', name: 'Unity', poles: ['multiplicity', 'unity'] },
        { id: 'presence', name: 'Presence', poles: ['absence', 'presence'] },
        { id: 'subject', name: 'Subjectivity', poles: ['objective', 'subjective'] },
        { id: 'activity', name: 'Activity', poles: ['passive', 'active'] },
        { id: 'transcendence', name: 'Transcendence', poles: ['immanent', 'transcendent'] },
        { id: 'knowledge', name: 'Knowledge', poles: ['ineffable', 'articulable'] },
        { id: 'becoming', name: 'Becoming', poles: ['being', 'becoming'] }
    ];

    // ═══════════════════════════════════════════════════════════════════════════
    // PHILOSOPHICAL CONCEPTS
    // ═══════════════════════════════════════════════════════════════════════════

    const CONCEPTS = [
        // ─────────────────────────────────────────────────────────────────────────
        // Phenomenology
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'self', symbol: 'Σ', name: 'Self', tradition: 'PHENOMENOLOGY',
            semantics: { temporal: 0.3, unity: 0.7, presence: 0.8, subject: 0.95, activity: 0.6, transcendence: 0.3, knowledge: 0.6, becoming: 0.4 },
            features: ['subject', 'experience', 'consciousness', 'ego', 'identity']
        },
        {
            id: 'other', symbol: 'Ω', name: 'Other', tradition: 'PHENOMENOLOGY',
            semantics: { temporal: 0.3, unity: 0.3, presence: 0.7, subject: 0.8, activity: 0.5, transcendence: 0.6, knowledge: 0.4, becoming: 0.3 },
            features: ['alterity', 'intersubjectivity', 'ethics', 'face', 'encounter']
        },
        {
            id: 'living_present', symbol: 'τ', name: 'Living Present', tradition: 'PHENOMENOLOGY',
            semantics: { temporal: 0.9, unity: 0.6, presence: 0.95, subject: 0.7, activity: 0.7, transcendence: 0.2, knowledge: 0.5, becoming: 0.8 },
            features: ['time', 'presence', 'retention', 'protention', 'flow']
        },
        {
            id: 'flesh', symbol: 'χ', name: 'Flesh', tradition: 'PHENOMENOLOGY',
            semantics: { temporal: 0.4, unity: 0.5, presence: 0.8, subject: 0.6, activity: 0.5, transcendence: 0.2, knowledge: 0.3, becoming: 0.5 },
            features: ['body', 'embodiment', 'chiasm', 'reversibility', 'touch']
        },
        {
            id: 'horizon', symbol: 'H', name: 'Horizon', tradition: 'PHENOMENOLOGY',
            semantics: { temporal: 0.5, unity: 0.4, presence: 0.6, subject: 0.5, activity: 0.3, transcendence: 0.4, knowledge: 0.4, becoming: 0.6 },
            features: ['context', 'background', 'possibility', 'world', 'fringe']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Spinozism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'substance', symbol: '▣', name: 'Substance', tradition: 'SPINOZISM',
            semantics: { temporal: 0.05, unity: 0.99, presence: 0.9, subject: 0.2, activity: 0.8, transcendence: 0.1, knowledge: 0.7, becoming: 0.1 },
            features: ['monism', 'god', 'nature', 'infinite', 'unity', 'cause']
        },
        {
            id: 'mode', symbol: '◇', name: 'Mode', tradition: 'SPINOZISM',
            semantics: { temporal: 0.7, unity: 0.3, presence: 0.7, subject: 0.4, activity: 0.5, transcendence: 0.1, knowledge: 0.6, becoming: 0.6 },
            features: ['particular', 'finite', 'modification', 'expression', 'affection']
        },
        {
            id: 'conatus', symbol: 'κ', name: 'Conatus', tradition: 'SPINOZISM',
            semantics: { temporal: 0.6, unity: 0.5, presence: 0.7, subject: 0.5, activity: 0.9, transcendence: 0.1, knowledge: 0.5, becoming: 0.7 },
            features: ['striving', 'power', 'persistence', 'desire', 'essence']
        },
        {
            id: 'intuitive_knowledge', symbol: 'K₃', name: 'Intuitive Knowledge', tradition: 'SPINOZISM',
            semantics: { temporal: 0.1, unity: 0.8, presence: 0.9, subject: 0.6, activity: 0.7, transcendence: 0.3, knowledge: 0.95, becoming: 0.2 },
            features: ['knowledge', 'eternity', 'blessedness', 'third_kind', 'adequate']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Buddhism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'emptiness', symbol: 'śū', name: 'Emptiness', tradition: 'BUDDHISM',
            semantics: { temporal: 0.2, unity: 0.5, presence: 0.3, subject: 0.2, activity: 0.3, transcendence: 0.8, knowledge: 0.4, becoming: 0.5 },
            features: ['void', 'no_self', 'dependent', 'liberation', 'sunyata']
        },
        {
            id: 'dependent_origination', symbol: 'प्र', name: 'Dependent Origination', tradition: 'BUDDHISM',
            semantics: { temporal: 0.7, unity: 0.4, presence: 0.5, subject: 0.2, activity: 0.6, transcendence: 0.3, knowledge: 0.6, becoming: 0.8 },
            features: ['causation', 'interdependence', 'arising', 'conditions', 'links']
        },
        {
            id: 'tetralemma', symbol: '◈', name: 'Tetralemma', tradition: 'BUDDHISM',
            semantics: { temporal: 0.2, unity: 0.5, presence: 0.4, subject: 0.3, activity: 0.4, transcendence: 0.9, knowledge: 0.3, becoming: 0.4 },
            features: ['negation', 'logic', 'four_corners', 'transcendence', 'catuskoti']
        },
        {
            id: 'buddha_nature', symbol: '◎', name: 'Buddha Nature', tradition: 'BUDDHISM',
            semantics: { temporal: 0.1, unity: 0.7, presence: 0.6, subject: 0.4, activity: 0.4, transcendence: 0.7, knowledge: 0.5, becoming: 0.3 },
            features: ['potential', 'awakening', 'inherent', 'luminosity', 'tathagatagarbha']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Process Philosophy
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'actual_entity', symbol: '⦿', name: 'Actual Entity', tradition: 'PROCESS',
            semantics: { temporal: 0.8, unity: 0.6, presence: 0.9, subject: 0.7, activity: 0.8, transcendence: 0.2, knowledge: 0.5, becoming: 0.9 },
            features: ['occasion', 'experience', 'becoming', 'drops', 'concrete']
        },
        {
            id: 'prehension', symbol: '⥤', name: 'Prehension', tradition: 'PROCESS',
            semantics: { temporal: 0.7, unity: 0.4, presence: 0.7, subject: 0.6, activity: 0.7, transcendence: 0.2, knowledge: 0.4, becoming: 0.8 },
            features: ['feeling', 'grasping', 'data', 'relation', 'vector']
        },
        {
            id: 'concrescence', symbol: '⤳', name: 'Concrescence', tradition: 'PROCESS',
            semantics: { temporal: 0.9, unity: 0.7, presence: 0.8, subject: 0.6, activity: 0.9, transcendence: 0.2, knowledge: 0.4, becoming: 0.95 },
            features: ['becoming', 'process', 'satisfaction', 'unity', 'phases']
        },
        {
            id: 'creativity', symbol: 'ℂ', name: 'Creativity', tradition: 'PROCESS',
            semantics: { temporal: 0.6, unity: 0.5, presence: 0.7, subject: 0.3, activity: 0.95, transcendence: 0.4, knowledge: 0.3, becoming: 0.9 },
            features: ['novelty', 'ultimate', 'many_one', 'advance', 'category']
        },
        {
            id: 'eternal_object', symbol: '∞ₒ', name: 'Eternal Object', tradition: 'PROCESS',
            semantics: { temporal: 0.05, unity: 0.6, presence: 0.4, subject: 0.2, activity: 0.2, transcendence: 0.6, knowledge: 0.7, becoming: 0.1 },
            features: ['potential', 'form', 'ingression', 'pure', 'abstract']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Poststructuralism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'fold', symbol: '⌒', name: 'Fold', tradition: 'POSTSTRUCTURALISM',
            semantics: { temporal: 0.5, unity: 0.4, presence: 0.5, subject: 0.4, activity: 0.6, transcendence: 0.3, knowledge: 0.4, becoming: 0.7 },
            features: ['inside', 'outside', 'topology', 'deleuze', 'subjectivation']
        },
        {
            id: 'virtual', symbol: 'ν', name: 'Virtual', tradition: 'POSTSTRUCTURALISM',
            semantics: { temporal: 0.4, unity: 0.4, presence: 0.3, subject: 0.3, activity: 0.7, transcendence: 0.5, knowledge: 0.4, becoming: 0.8 },
            features: ['potential', 'differential', 'intensity', 'real', 'actualization']
        },
        {
            id: 'trace', symbol: '†', name: 'Trace', tradition: 'POSTSTRUCTURALISM',
            semantics: { temporal: 0.6, unity: 0.3, presence: 0.2, subject: 0.3, activity: 0.4, transcendence: 0.5, knowledge: 0.3, becoming: 0.6 },
            features: ['absence', 'presence', 'derrida', 'differance', 'mark']
        },
        {
            id: 'plane_immanence', symbol: 'Π∞', name: 'Plane of Immanence', tradition: 'POSTSTRUCTURALISM',
            semantics: { temporal: 0.3, unity: 0.6, presence: 0.6, subject: 0.2, activity: 0.5, transcendence: 0.05, knowledge: 0.5, becoming: 0.6 },
            features: ['immanence', 'concepts', 'field', 'infinite', 'philosophy']
        },
        {
            id: 'rhizome', symbol: '⋔', name: 'Rhizome', tradition: 'POSTSTRUCTURALISM',
            semantics: { temporal: 0.5, unity: 0.2, presence: 0.5, subject: 0.2, activity: 0.7, transcendence: 0.2, knowledge: 0.4, becoming: 0.8 },
            features: ['multiplicity', 'connection', 'heterogeneous', 'rupture', 'map']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Hegelianism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'aufhebung', symbol: '⍟', name: 'Aufhebung', tradition: 'HEGELIANISM',
            semantics: { temporal: 0.7, unity: 0.7, presence: 0.6, subject: 0.5, activity: 0.8, transcendence: 0.5, knowledge: 0.7, becoming: 0.8 },
            features: ['sublation', 'preserve', 'cancel', 'elevate', 'dialectic']
        },
        {
            id: 'determinate_negation', symbol: '¬ᵈ', name: 'Determinate Negation', tradition: 'HEGELIANISM',
            semantics: { temporal: 0.6, unity: 0.5, presence: 0.5, subject: 0.4, activity: 0.8, transcendence: 0.4, knowledge: 0.7, becoming: 0.8 },
            features: ['negation', 'specific', 'productive', 'development', 'result']
        },
        {
            id: 'spirit', symbol: '𝔊', name: 'Spirit', tradition: 'HEGELIANISM',
            semantics: { temporal: 0.6, unity: 0.8, presence: 0.7, subject: 0.8, activity: 0.9, transcendence: 0.6, knowledge: 0.9, becoming: 0.7 },
            features: ['geist', 'absolute', 'self_knowing', 'history', 'freedom']
        },
        {
            id: 'contradiction', symbol: '⊠', name: 'Contradiction', tradition: 'HEGELIANISM',
            semantics: { temporal: 0.6, unity: 0.3, presence: 0.5, subject: 0.4, activity: 0.8, transcendence: 0.4, knowledge: 0.6, becoming: 0.9 },
            features: ['opposition', 'dialectic', 'movement', 'tension', 'motor']
        },
        {
            id: 'becoming', symbol: '⥁', name: 'Becoming', tradition: 'HEGELIANISM',
            semantics: { temporal: 0.8, unity: 0.5, presence: 0.5, subject: 0.3, activity: 0.9, transcendence: 0.3, knowledge: 0.5, becoming: 0.99 },
            features: ['being', 'nothing', 'process', 'movement', 'transition']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Heideggerianism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'being', symbol: '𝔖', name: 'Being', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.5, unity: 0.6, presence: 0.7, subject: 0.3, activity: 0.4, transcendence: 0.6, knowledge: 0.4, becoming: 0.5 },
            features: ['sein', 'ontology', 'question', 'fundamental', 'meaning']
        },
        {
            id: 'dasein', symbol: '𝔇', name: 'Dasein', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.8, unity: 0.6, presence: 0.8, subject: 0.9, activity: 0.7, transcendence: 0.4, knowledge: 0.5, becoming: 0.7 },
            features: ['existence', 'human', 'being_there', 'care', 'thrown']
        },
        {
            id: 'care', symbol: '⦿c', name: 'Care', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.7, unity: 0.6, presence: 0.7, subject: 0.8, activity: 0.7, transcendence: 0.3, knowledge: 0.4, becoming: 0.6 },
            features: ['sorge', 'concern', 'existence', 'structure', 'ahead']
        },
        {
            id: 'clearing', symbol: '⌾', name: 'Clearing', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.4, unity: 0.5, presence: 0.8, subject: 0.4, activity: 0.5, transcendence: 0.5, knowledge: 0.6, becoming: 0.5 },
            features: ['lichtung', 'opening', 'truth', 'disclosure', 'light']
        },
        {
            id: 'aletheia', symbol: 'ἀ', name: 'Aletheia', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.4, unity: 0.5, presence: 0.7, subject: 0.3, activity: 0.5, transcendence: 0.5, knowledge: 0.7, becoming: 0.5 },
            features: ['truth', 'unconcealment', 'disclosure', 'hiddenness', 'greek']
        },
        {
            id: 'ereignis', symbol: '𝔈', name: 'Ereignis', tradition: 'HEIDEGGERIANISM',
            semantics: { temporal: 0.7, unity: 0.6, presence: 0.8, subject: 0.5, activity: 0.6, transcendence: 0.6, knowledge: 0.4, becoming: 0.7 },
            features: ['event', 'appropriation', 'enowning', 'belonging', 'own']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Early Wittgenstein
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'world', symbol: '𝕎', name: 'World', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.3, unity: 0.8, presence: 0.7, subject: 0.2, activity: 0.3, transcendence: 0.4, knowledge: 0.6, becoming: 0.2 },
            features: ['totality', 'facts', 'all', 'limit', 'logical']
        },
        {
            id: 'fact', symbol: '𝔉', name: 'Fact', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.3, unity: 0.5, presence: 0.8, subject: 0.1, activity: 0.3, transcendence: 0.3, knowledge: 0.7, becoming: 0.2 },
            features: ['state', 'case', 'atomic', 'obtaining', 'existence']
        },
        {
            id: 'proposition', symbol: '𝔓', name: 'Proposition', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.2, unity: 0.6, presence: 0.6, subject: 0.3, activity: 0.4, transcendence: 0.3, knowledge: 0.8, becoming: 0.2 },
            features: ['picture', 'sense', 'truth', 'logical', 'sign']
        },
        {
            id: 'shows', symbol: '⧓', name: 'Shows', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.2, unity: 0.5, presence: 0.6, subject: 0.2, activity: 0.3, transcendence: 0.7, knowledge: 0.2, becoming: 0.2 },
            features: ['display', 'manifest', 'unsayable', 'form', 'logical']
        },
        {
            id: 'silence', symbol: '⊘', name: 'Silence', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.2, unity: 0.6, presence: 0.3, subject: 0.3, activity: 0.1, transcendence: 0.9, knowledge: 0.1, becoming: 0.2 },
            features: ['unsayable', 'limit', 'mystical', 'ethics', 'pass_over']
        },
        {
            id: 'mystical', symbol: '⤒', name: 'Mystical', tradition: 'WITTGENSTEIN_EARLY',
            semantics: { temporal: 0.1, unity: 0.7, presence: 0.5, subject: 0.4, activity: 0.2, transcendence: 0.95, knowledge: 0.1, becoming: 0.2 },
            features: ['wonder', 'existence', 'ineffable', 'limit', 'feeling']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Late Wittgenstein
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'language_game', symbol: '𝔖𝔭', name: 'Language-game', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.6, unity: 0.4, presence: 0.7, subject: 0.5, activity: 0.8, transcendence: 0.1, knowledge: 0.5, becoming: 0.6 },
            features: ['practice', 'use', 'activity', 'social', 'primitive']
        },
        {
            id: 'use', symbol: '℧', name: 'Use', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.6, unity: 0.4, presence: 0.7, subject: 0.4, activity: 0.8, transcendence: 0.1, knowledge: 0.6, becoming: 0.6 },
            features: ['meaning', 'practice', 'context', 'application', 'employment']
        },
        {
            id: 'form_life', symbol: '𝔏', name: 'Form of Life', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.5, unity: 0.6, presence: 0.7, subject: 0.5, activity: 0.6, transcendence: 0.1, knowledge: 0.4, becoming: 0.5 },
            features: ['social', 'shared', 'practice', 'agreement', 'natural']
        },
        {
            id: 'family_resemblance', symbol: '≋', name: 'Family Resemblance', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.4, unity: 0.3, presence: 0.5, subject: 0.3, activity: 0.4, transcendence: 0.2, knowledge: 0.5, becoming: 0.4 },
            features: ['similarity', 'overlap', 'network', 'no_essence', 'criss_cross']
        },
        {
            id: 'therapy', symbol: '⤥', name: 'Therapy', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.5, unity: 0.4, presence: 0.6, subject: 0.5, activity: 0.7, transcendence: 0.2, knowledge: 0.6, becoming: 0.6 },
            features: ['cure', 'philosophical', 'dissolve', 'peace', 'clarity']
        },
        {
            id: 'hinge', symbol: '⊢ₕ', name: 'Hinge', tradition: 'WITTGENSTEIN_LATE',
            semantics: { temporal: 0.3, unity: 0.5, presence: 0.6, subject: 0.3, activity: 0.3, transcendence: 0.3, knowledge: 0.4, becoming: 0.3 },
            features: ['bedrock', 'certainty', 'doubt', 'framework', 'riverbed']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Kantianism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'transcendental', symbol: '𝕿', name: 'Transcendental', tradition: 'KANTIANISM',
            semantics: { temporal: 0.1, unity: 0.7, presence: 0.5, subject: 0.6, activity: 0.5, transcendence: 0.7, knowledge: 0.8, becoming: 0.2 },
            features: ['conditions', 'possibility', 'a_priori', 'knowledge', 'subject']
        },
        {
            id: 'phenomenon', symbol: 'φₖ', name: 'Phenomenon', tradition: 'KANTIANISM',
            semantics: { temporal: 0.6, unity: 0.4, presence: 0.8, subject: 0.5, activity: 0.4, transcendence: 0.2, knowledge: 0.7, becoming: 0.5 },
            features: ['appearance', 'sensibility', 'experience', 'object', 'intuition']
        },
        {
            id: 'noumenon', symbol: 'νₖ', name: 'Noumenon', tradition: 'KANTIANISM',
            semantics: { temporal: 0.1, unity: 0.6, presence: 0.3, subject: 0.2, activity: 0.3, transcendence: 0.9, knowledge: 0.1, becoming: 0.1 },
            features: ['thing_itself', 'unknowable', 'limit', 'thought', 'negative']
        },
        {
            id: 'category', symbol: 'Ꮯ', name: 'Category', tradition: 'KANTIANISM',
            semantics: { temporal: 0.1, unity: 0.6, presence: 0.5, subject: 0.5, activity: 0.6, transcendence: 0.4, knowledge: 0.8, becoming: 0.2 },
            features: ['concept', 'pure', 'understanding', 'judgment', 'synthesis']
        },
        {
            id: 'schema', symbol: 'σₖ', name: 'Schema', tradition: 'KANTIANISM',
            semantics: { temporal: 0.7, unity: 0.5, presence: 0.5, subject: 0.5, activity: 0.6, transcendence: 0.4, knowledge: 0.6, becoming: 0.5 },
            features: ['mediate', 'imagination', 'time', 'concept', 'rule']
        },
        {
            id: 'apperception', symbol: '𝔄ₜ', name: 'Apperception', tradition: 'KANTIANISM',
            semantics: { temporal: 0.3, unity: 0.9, presence: 0.7, subject: 0.95, activity: 0.7, transcendence: 0.5, knowledge: 0.7, becoming: 0.3 },
            features: ['unity', 'i_think', 'synthesis', 'consciousness', 'transcendental']
        },
        {
            id: 'categorical_imperative', symbol: '⊨ᶜ', name: 'Categorical Imperative', tradition: 'KANTIANISM',
            semantics: { temporal: 0.1, unity: 0.8, presence: 0.6, subject: 0.6, activity: 0.8, transcendence: 0.6, knowledge: 0.7, becoming: 0.2 },
            features: ['duty', 'universal', 'moral', 'law', 'reason']
        },
        {
            id: 'sublime', symbol: '𝔖ᵤ', name: 'Sublime', tradition: 'KANTIANISM',
            semantics: { temporal: 0.3, unity: 0.4, presence: 0.7, subject: 0.7, activity: 0.5, transcendence: 0.8, knowledge: 0.4, becoming: 0.4 },
            features: ['overwhelming', 'magnitude', 'power', 'reason', 'boundless']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Platonism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'form', symbol: '△', name: 'Form', tradition: 'PLATONISM',
            semantics: { temporal: 0.05, unity: 0.9, presence: 0.8, subject: 0.3, activity: 0.2, transcendence: 0.9, knowledge: 0.9, becoming: 0.05 },
            features: ['eidos', 'eternal', 'paradigm', 'intelligible', 'archetype']
        },
        {
            id: 'participation', symbol: '⊂ₚ', name: 'Participation', tradition: 'PLATONISM',
            semantics: { temporal: 0.5, unity: 0.5, presence: 0.6, subject: 0.3, activity: 0.4, transcendence: 0.6, knowledge: 0.5, becoming: 0.4 },
            features: ['methexis', 'share', 'image', 'particular', 'imitation']
        },
        {
            id: 'the_good', symbol: '☉', name: 'The Good', tradition: 'PLATONISM',
            semantics: { temporal: 0.02, unity: 0.99, presence: 0.95, subject: 0.2, activity: 0.3, transcendence: 0.99, knowledge: 0.95, becoming: 0.02 },
            features: ['agathon', 'sun', 'highest', 'illumination', 'beyond_being']
        },
        {
            id: 'anamnesis', symbol: '⟲', name: 'Anamnesis', tradition: 'PLATONISM',
            semantics: { temporal: 0.4, unity: 0.6, presence: 0.5, subject: 0.7, activity: 0.5, transcendence: 0.7, knowledge: 0.8, becoming: 0.3 },
            features: ['recollection', 'memory', 'soul', 'learning', 'prior']
        },
        {
            id: 'demiurge', symbol: '✦', name: 'Demiurge', tradition: 'PLATONISM',
            semantics: { temporal: 0.3, unity: 0.7, presence: 0.7, subject: 0.5, activity: 0.9, transcendence: 0.6, knowledge: 0.7, becoming: 0.5 },
            features: ['craftsman', 'creator', 'cosmos', 'timaeus', 'ordering']
        },
        {
            id: 'receptacle', symbol: '⌂', name: 'Receptacle', tradition: 'PLATONISM',
            semantics: { temporal: 0.5, unity: 0.3, presence: 0.4, subject: 0.1, activity: 0.2, transcendence: 0.4, knowledge: 0.2, becoming: 0.6 },
            features: ['chora', 'space', 'matrix', 'nurse', 'receiving']
        },
        {
            id: 'eros', symbol: '♡', name: 'Eros', tradition: 'PLATONISM',
            semantics: { temporal: 0.5, unity: 0.6, presence: 0.7, subject: 0.6, activity: 0.8, transcendence: 0.7, knowledge: 0.5, becoming: 0.6 },
            features: ['love', 'desire', 'ascent', 'beauty', 'lack']
        },
        {
            id: 'dialectic_plato', symbol: '⇅', name: 'Dialectic', tradition: 'PLATONISM',
            semantics: { temporal: 0.3, unity: 0.7, presence: 0.6, subject: 0.5, activity: 0.7, transcendence: 0.6, knowledge: 0.85, becoming: 0.4 },
            features: ['division', 'collection', 'method', 'ascent', 'reason']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Aristotelianism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'ousia', symbol: '⦰', name: 'Ousia', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.3, unity: 0.8, presence: 0.9, subject: 0.3, activity: 0.5, transcendence: 0.3, knowledge: 0.7, becoming: 0.4 },
            features: ['substance', 'essence', 'primary', 'being', 'what_it_is']
        },
        {
            id: 'hylomorphism', symbol: '⧈', name: 'Hylomorphism', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.5, unity: 0.7, presence: 0.8, subject: 0.3, activity: 0.5, transcendence: 0.2, knowledge: 0.6, becoming: 0.5 },
            features: ['matter', 'form', 'composite', 'unity', 'structure']
        },
        {
            id: 'actuality', symbol: 'ἐν', name: 'Actuality', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.4, unity: 0.7, presence: 0.9, subject: 0.3, activity: 0.9, transcendence: 0.3, knowledge: 0.7, becoming: 0.5 },
            features: ['energeia', 'act', 'fulfillment', 'work', 'complete']
        },
        {
            id: 'potentiality', symbol: 'δύ', name: 'Potentiality', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.6, unity: 0.5, presence: 0.4, subject: 0.3, activity: 0.4, transcendence: 0.3, knowledge: 0.5, becoming: 0.8 },
            features: ['dynamis', 'power', 'capacity', 'change', 'matter']
        },
        {
            id: 'telos', symbol: '⊚', name: 'Telos', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.3, unity: 0.7, presence: 0.6, subject: 0.3, activity: 0.6, transcendence: 0.4, knowledge: 0.6, becoming: 0.4 },
            features: ['end', 'purpose', 'final_cause', 'goal', 'for_sake_of']
        },
        {
            id: 'eudaimonia', symbol: '☀', name: 'Eudaimonia', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.4, unity: 0.7, presence: 0.8, subject: 0.6, activity: 0.8, transcendence: 0.4, knowledge: 0.6, becoming: 0.4 },
            features: ['happiness', 'flourishing', 'good_life', 'virtue', 'activity']
        },
        {
            id: 'four_causes', symbol: '④', name: 'Four Causes', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.4, unity: 0.8, presence: 0.7, subject: 0.3, activity: 0.6, transcendence: 0.3, knowledge: 0.8, becoming: 0.5 },
            features: ['material', 'formal', 'efficient', 'final', 'explanation']
        },
        {
            id: 'nous', symbol: 'ν', name: 'Nous', tradition: 'ARISTOTELIANISM',
            semantics: { temporal: 0.2, unity: 0.8, presence: 0.8, subject: 0.5, activity: 0.7, transcendence: 0.6, knowledge: 0.95, becoming: 0.2 },
            features: ['intellect', 'mind', 'reason', 'divine', 'unmoved']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Heracliteanism
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'flux', symbol: '≋', name: 'Flux', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.95, unity: 0.4, presence: 0.6, subject: 0.2, activity: 0.9, transcendence: 0.3, knowledge: 0.4, becoming: 0.99 },
            features: ['flow', 'change', 'river', 'panta_rhei', 'impermanence']
        },
        {
            id: 'logos_h', symbol: 'λ', name: 'Logos', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.2, unity: 0.8, presence: 0.7, subject: 0.3, activity: 0.6, transcendence: 0.5, knowledge: 0.8, becoming: 0.5 },
            features: ['reason', 'word', 'order', 'rational', 'measure']
        },
        {
            id: 'fire', symbol: '🔥', name: 'Fire', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.9, unity: 0.5, presence: 0.8, subject: 0.2, activity: 0.95, transcendence: 0.4, knowledge: 0.4, becoming: 0.95 },
            features: ['element', 'primal', 'transformation', 'ever_living', 'exchange']
        },
        {
            id: 'strife', symbol: '⚔', name: 'Strife', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.7, unity: 0.3, presence: 0.7, subject: 0.2, activity: 0.9, transcendence: 0.3, knowledge: 0.4, becoming: 0.85 },
            features: ['war', 'conflict', 'tension', 'polemos', 'father']
        },
        {
            id: 'unity_opposites', symbol: '⊕', name: 'Unity of Opposites', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.3, unity: 0.9, presence: 0.6, subject: 0.2, activity: 0.5, transcendence: 0.6, knowledge: 0.7, becoming: 0.6 },
            features: ['opposites', 'harmony', 'identity', 'one', 'same']
        },
        {
            id: 'hidden_harmony', symbol: '⫰', name: 'Hidden Harmony', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.2, unity: 0.85, presence: 0.4, subject: 0.2, activity: 0.4, transcendence: 0.7, knowledge: 0.6, becoming: 0.4 },
            features: ['harmony', 'hidden', 'superior', 'attunement', 'non_apparent']
        },
        {
            id: 'thunderbolt', symbol: '⚡', name: 'Thunderbolt', tradition: 'HERACLITEANISM',
            semantics: { temporal: 0.5, unity: 0.7, presence: 0.8, subject: 0.2, activity: 0.95, transcendence: 0.6, knowledge: 0.5, becoming: 0.7 },
            features: ['lightning', 'governance', 'steering', 'zeus', 'sudden']
        },

        // ─────────────────────────────────────────────────────────────────────────
        // Computational Complexity (Whiteheadian Process Ontology of Computation)
        // ─────────────────────────────────────────────────────────────────────────
        {
            id: 'p_class', symbol: '𝐏', name: 'P (Deterministic)', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.7, unity: 0.8, presence: 0.9, subject: 0.3, activity: 0.7, transcendence: 0.1, knowledge: 0.8, becoming: 0.6 },
            features: ['polynomial', 'deterministic', 'tractable', 'efficient', 'solvable']
        },
        {
            id: 'np_class', symbol: '𝐍𝐏', name: 'NP (Nondeterministic)', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.8, unity: 0.5, presence: 0.6, subject: 0.4, activity: 0.9, transcendence: 0.5, knowledge: 0.5, becoming: 0.8 },
            features: ['nondeterministic', 'verifiable', 'exponential', 'search', 'witness']
        },
        {
            id: 'satisfiability', symbol: 'SAT', name: '3-SAT', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.6, unity: 0.4, presence: 0.7, subject: 0.3, activity: 0.8, transcendence: 0.4, knowledge: 0.6, becoming: 0.7 },
            features: ['boolean', 'clauses', 'assignment', 'np_complete', 'cook_levin']
        },
        {
            id: 'solver', symbol: '⊢', name: 'Solver', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.9, unity: 0.6, presence: 0.8, subject: 0.5, activity: 0.95, transcendence: 0.2, knowledge: 0.7, becoming: 0.9 },
            features: ['algorithm', 'search', 'construction', 'process', 'creativity']
        },
        {
            id: 'verifier', symbol: '✓', name: 'Verifier', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.5, unity: 0.7, presence: 0.9, subject: 0.3, activity: 0.6, transcendence: 0.1, knowledge: 0.9, becoming: 0.3 },
            features: ['check', 'certificate', 'witness', 'polynomial', 'validation']
        },
        {
            id: 'prehensive_gap', symbol: '⊗ₚ', name: 'Prehensive Gap', tradition: 'COMPLEXITY',
            semantics: { temporal: 0.7, unity: 0.3, presence: 0.4, subject: 0.4, activity: 0.7, transcendence: 0.7, knowledge: 0.4, becoming: 0.8 },
            features: ['asymmetry', 'irreducibility', 'creation_vs_verification', 'gap', 'process']
        }
    ];

    // ═══════════════════════════════════════════════════════════════════════════
    // SEMANTIC RELATIONSHIPS
    // ═══════════════════════════════════════════════════════════════════════════

    const RELATIONSHIPS = [
        // Phenomenology internal
        { source: 'self', target: 'other', weight: 0.85, type: 'dialectic' },
        { source: 'self', target: 'flesh', weight: 0.8, type: 'embodiment' },
        { source: 'living_present', target: 'horizon', weight: 0.8, type: 'temporal' },
        { source: 'flesh', target: 'other', weight: 0.75, type: 'encounter' },

        // Spinozism internal
        { source: 'substance', target: 'mode', weight: 0.9, type: 'modification' },
        { source: 'conatus', target: 'mode', weight: 0.85, type: 'striving' },
        { source: 'intuitive_knowledge', target: 'substance', weight: 0.8, type: 'knowledge' },

        // Buddhism internal
        { source: 'emptiness', target: 'dependent_origination', weight: 0.95, type: 'mutual' },
        { source: 'tetralemma', target: 'emptiness', weight: 0.8, type: 'method' },
        { source: 'buddha_nature', target: 'emptiness', weight: 0.75, type: 'ground' },

        // Process internal
        { source: 'actual_entity', target: 'prehension', weight: 0.9, type: 'constitution' },
        { source: 'concrescence', target: 'creativity', weight: 0.85, type: 'process' },
        { source: 'eternal_object', target: 'actual_entity', weight: 0.7, type: 'ingression' },
        { source: 'prehension', target: 'concrescence', weight: 0.85, type: 'phase' },

        // Poststructuralism internal
        { source: 'fold', target: 'virtual', weight: 0.8, type: 'topology' },
        { source: 'trace', target: 'virtual', weight: 0.7, type: 'differance' },
        { source: 'plane_immanence', target: 'virtual', weight: 0.85, type: 'field' },
        { source: 'rhizome', target: 'plane_immanence', weight: 0.8, type: 'structure' },

        // Hegelianism internal
        { source: 'aufhebung', target: 'determinate_negation', weight: 0.9, type: 'dialectic' },
        { source: 'spirit', target: 'aufhebung', weight: 0.85, type: 'development' },
        { source: 'contradiction', target: 'becoming', weight: 0.85, type: 'movement' },
        { source: 'becoming', target: 'aufhebung', weight: 0.8, type: 'result' },

        // Heideggerianism internal
        { source: 'being', target: 'dasein', weight: 0.9, type: 'question' },
        { source: 'dasein', target: 'care', weight: 0.85, type: 'structure' },
        { source: 'clearing', target: 'aletheia', weight: 0.85, type: 'truth' },
        { source: 'ereignis', target: 'being', weight: 0.8, type: 'event' },

        // Wittgenstein Early internal
        { source: 'world', target: 'fact', weight: 0.9, type: 'totality' },
        { source: 'proposition', target: 'fact', weight: 0.85, type: 'picture' },
        { source: 'shows', target: 'silence', weight: 0.8, type: 'limit' },
        { source: 'mystical', target: 'silence', weight: 0.9, type: 'unsayable' },

        // Wittgenstein Late internal
        { source: 'language_game', target: 'use', weight: 0.9, type: 'practice' },
        { source: 'form_life', target: 'language_game', weight: 0.85, type: 'context' },
        { source: 'family_resemblance', target: 'language_game', weight: 0.8, type: 'concept' },
        { source: 'therapy', target: 'hinge', weight: 0.75, type: 'method' },

        // Kantianism internal
        { source: 'transcendental', target: 'category', weight: 0.9, type: 'conditions' },
        { source: 'phenomenon', target: 'noumenon', weight: 0.85, type: 'limit' },
        { source: 'schema', target: 'category', weight: 0.8, type: 'mediation' },
        { source: 'apperception', target: 'category', weight: 0.85, type: 'synthesis' },

        // Platonism internal
        { source: 'form', target: 'participation', weight: 0.9, type: 'relation' },
        { source: 'the_good', target: 'form', weight: 0.95, type: 'illumination' },
        { source: 'anamnesis', target: 'form', weight: 0.85, type: 'recollection' },
        { source: 'eros', target: 'dialectic_plato', weight: 0.8, type: 'ascent' },
        { source: 'demiurge', target: 'form', weight: 0.85, type: 'crafting' },
        { source: 'receptacle', target: 'participation', weight: 0.7, type: 'receiving' },

        // Aristotelianism internal
        { source: 'potentiality', target: 'actuality', weight: 0.95, type: 'realization' },
        { source: 'hylomorphism', target: 'ousia', weight: 0.9, type: 'composition' },
        { source: 'telos', target: 'eudaimonia', weight: 0.85, type: 'fulfillment' },
        { source: 'four_causes', target: 'ousia', weight: 0.85, type: 'explanation' },
        { source: 'nous', target: 'actuality', weight: 0.8, type: 'thought' },

        // Heracliteanism internal
        { source: 'flux', target: 'logos_h', weight: 0.85, type: 'order' },
        { source: 'fire', target: 'flux', weight: 0.9, type: 'element' },
        { source: 'strife', target: 'unity_opposites', weight: 0.9, type: 'revelation' },
        { source: 'unity_opposites', target: 'hidden_harmony', weight: 0.85, type: 'depth' },
        { source: 'thunderbolt', target: 'logos_h', weight: 0.8, type: 'governance' },

        // Cross-tradition relationships
        { source: 'self', target: 'dasein', weight: 0.75, type: 'resonance' },
        { source: 'substance', target: 'plane_immanence', weight: 0.7, type: 'resonance' },
        { source: 'emptiness', target: 'virtual', weight: 0.7, type: 'resonance' },
        { source: 'concrescence', target: 'becoming', weight: 0.8, type: 'resonance' },
        { source: 'creativity', target: 'conatus', weight: 0.7, type: 'resonance' },
        { source: 'living_present', target: 'actual_entity', weight: 0.75, type: 'resonance' },
        { source: 'noumenon', target: 'silence', weight: 0.7, type: 'resonance' },
        { source: 'transcendental', target: 'horizon', weight: 0.65, type: 'resonance' },
        // New cross-tradition with Platonism, Aristotelianism, Heracliteanism
        { source: 'form', target: 'eternal_object', weight: 0.8, type: 'resonance' },
        { source: 'flux', target: 'becoming', weight: 0.85, type: 'resonance' },
        { source: 'ousia', target: 'substance', weight: 0.75, type: 'resonance' },
        { source: 'the_good', target: 'intuitive_knowledge', weight: 0.7, type: 'resonance' },
        { source: 'actuality', target: 'concrescence', weight: 0.75, type: 'resonance' },
        { source: 'logos_h', target: 'spirit', weight: 0.7, type: 'resonance' },
        { source: 'eros', target: 'conatus', weight: 0.7, type: 'resonance' },
        { source: 'nous', target: 'intuitive_knowledge', weight: 0.8, type: 'resonance' },

        // Complexity internal
        { source: 'p_class', target: 'np_class', weight: 0.9, type: 'containment' },
        { source: 'np_class', target: 'satisfiability', weight: 0.85, type: 'completeness' },
        { source: 'solver', target: 'satisfiability', weight: 0.8, type: 'process' },
        { source: 'verifier', target: 'satisfiability', weight: 0.85, type: 'validation' },
        { source: 'solver', target: 'verifier', weight: 0.7, type: 'asymmetry' },
        { source: 'prehensive_gap', target: 'solver', weight: 0.8, type: 'ground' },
        { source: 'prehensive_gap', target: 'verifier', weight: 0.8, type: 'ground' },

        // Complexity cross-tradition
        { source: 'solver', target: 'concrescence', weight: 0.8, type: 'resonance' },
        { source: 'verifier', target: 'eternal_object', weight: 0.7, type: 'resonance' },
        { source: 'prehensive_gap', target: 'creativity', weight: 0.75, type: 'resonance' },
        { source: 'satisfiability', target: 'contradiction', weight: 0.7, type: 'resonance' },
        { source: 'np_class', target: 'potentiality', weight: 0.7, type: 'resonance' },
        { source: 'p_class', target: 'actuality', weight: 0.7, type: 'resonance' }
    ];

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Get a concept by ID
     */
    function getConcept(id) {
        return CONCEPTS.find(c => c.id === id);
    }

    /**
     * Get all concepts for a tradition
     */
    function getConceptsByTradition(traditionId) {
        return CONCEPTS.filter(c => c.tradition === traditionId);
    }

    /**
     * Get a tradition by ID
     */
    function getTradition(id) {
        return TRADITIONS[id] || null;
    }

    /**
     * Get all tradition IDs
     */
    function getTraditionIds() {
        return Object.keys(TRADITIONS);
    }

    /**
     * Get relationships for a concept
     */
    function getRelationships(conceptId) {
        return RELATIONSHIPS.filter(r =>
            r.source === conceptId || r.target === conceptId
        );
    }

    /**
     * Find related concepts
     */
    function findRelated(conceptId, maxDistance = 2) {
        const related = new Set();
        const visited = new Set([conceptId]);
        let frontier = [conceptId];

        for (let d = 0; d < maxDistance; d++) {
            const nextFrontier = [];
            for (const id of frontier) {
                const rels = getRelationships(id);
                for (const rel of rels) {
                    const other = rel.source === id ? rel.target : rel.source;
                    if (!visited.has(other)) {
                        visited.add(other);
                        nextFrontier.push(other);
                        related.add(other);
                    }
                }
            }
            frontier = nextFrontier;
        }

        return Array.from(related).map(getConcept).filter(Boolean);
    }

    /**
     * Search concepts by name or features
     */
    function searchConcepts(query) {
        const q = query.toLowerCase();
        return CONCEPTS.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q) ||
            c.symbol.includes(query) ||
            c.features.some(f => f.toLowerCase().includes(q))
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Data
        TRADITIONS,
        CONCEPTS,
        RELATIONSHIPS,
        SEMANTIC_AXES,

        // Helpers
        getConcept,
        getConceptsByTradition,
        getTradition,
        getTraditionIds,
        getRelationships,
        findRelated,
        searchConcepts
    };
})();

// Export for browser and module systems
if (typeof window !== 'undefined') {
    window.PhiLangOntology = PhiLangOntology;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangOntology;
}
