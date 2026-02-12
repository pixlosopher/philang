/**
 * PhiLang API - Claude Integration Layer
 * Provides intelligent philosophical reasoning across all PhiLang modules
 */

const PhiLangAPI = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const CONFIG = {
        apiEndpoint: 'https://api.anthropic.com/v1/messages',
        defaultModel: 'claude-sonnet-4-20250514',
        models: {
            'claude-sonnet-4-20250514': { name: 'Claude Sonnet 4', maxTokens: 8192, costPer1k: 0.003 },
            'claude-3-5-haiku-20241022': { name: 'Claude 3.5 Haiku', maxTokens: 8192, costPer1k: 0.001 }
        },
        maxRetries: 3,
        retryDelay: 1000,
        // Rate limiting configuration
        rateLimit: {
            maxRequestsPerMinute: 20,
            maxRequestsPerHour: 100,
            minRequestInterval: 1000 // minimum ms between requests
        }
    };

    // API Key storage
    let apiKey = localStorage.getItem('philang_api_key') || null;
    let currentModel = localStorage.getItem('philang_model') || CONFIG.defaultModel;

    // ═══════════════════════════════════════════════════════════════════════════
    // RATE LIMITING
    // ═══════════════════════════════════════════════════════════════════════════

    const rateLimitState = {
        requests: [],       // Timestamps of recent requests
        lastRequest: 0,     // Timestamp of last request
        isThrottled: false  // Currently throttled
    };

    /**
     * Check if rate limit allows a new request
     * @returns {Object} { allowed: boolean, waitTime: number, reason: string }
     */
    function checkRateLimit() {
        const now = Date.now();
        const { maxRequestsPerMinute, maxRequestsPerHour, minRequestInterval } = CONFIG.rateLimit;

        // Clean old requests
        rateLimitState.requests = rateLimitState.requests.filter(
            timestamp => now - timestamp < 3600000 // Keep last hour
        );

        // Check minimum interval
        const timeSinceLastRequest = now - rateLimitState.lastRequest;
        if (timeSinceLastRequest < minRequestInterval) {
            return {
                allowed: false,
                waitTime: minRequestInterval - timeSinceLastRequest,
                reason: 'Minimum request interval not met'
            };
        }

        // Check per-minute limit
        const requestsLastMinute = rateLimitState.requests.filter(
            timestamp => now - timestamp < 60000
        ).length;

        if (requestsLastMinute >= maxRequestsPerMinute) {
            const oldestInMinute = rateLimitState.requests.find(t => now - t < 60000);
            const waitTime = oldestInMinute ? 60000 - (now - oldestInMinute) : 0;
            return {
                allowed: false,
                waitTime,
                reason: `Rate limit: ${maxRequestsPerMinute} requests per minute exceeded`
            };
        }

        // Check per-hour limit
        if (rateLimitState.requests.length >= maxRequestsPerHour) {
            const oldestInHour = rateLimitState.requests[0];
            const waitTime = 3600000 - (now - oldestInHour);
            return {
                allowed: false,
                waitTime,
                reason: `Rate limit: ${maxRequestsPerHour} requests per hour exceeded`
            };
        }

        return { allowed: true, waitTime: 0, reason: null };
    }

    /**
     * Record a request for rate limiting
     */
    function recordRequest() {
        const now = Date.now();
        rateLimitState.requests.push(now);
        rateLimitState.lastRequest = now;
    }

    /**
     * Wait for rate limit to allow request
     * @returns {Promise<void>}
     */
    async function waitForRateLimit() {
        let check = checkRateLimit();
        while (!check.allowed) {
            rateLimitState.isThrottled = true;

            if (typeof PhiLangConfig !== 'undefined') {
                PhiLangConfig.warn('api', `Rate limited: waiting ${Math.ceil(check.waitTime / 1000)}s`);
            }

            // Dispatch event for UI to show throttle status
            window.dispatchEvent(new CustomEvent('philang-api-throttled', {
                detail: {
                    waitTime: check.waitTime,
                    reason: check.reason
                }
            }));

            await sleep(check.waitTime + 100);
            check = checkRateLimit();
        }

        rateLimitState.isThrottled = false;
    }

    /**
     * Get current rate limit status
     * @returns {Object} Rate limit statistics
     */
    function getRateLimitStatus() {
        const now = Date.now();
        const requestsLastMinute = rateLimitState.requests.filter(
            t => now - t < 60000
        ).length;
        const requestsLastHour = rateLimitState.requests.length;

        return {
            requestsLastMinute,
            requestsLastHour,
            maxPerMinute: CONFIG.rateLimit.maxRequestsPerMinute,
            maxPerHour: CONFIG.rateLimit.maxRequestsPerHour,
            isThrottled: rateLimitState.isThrottled,
            canMakeRequest: checkRateLimit().allowed
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PHILANG KNOWLEDGE BASE - Injected into all prompts
    // ═══════════════════════════════════════════════════════════════════════════

    const PHILANG_CONTEXT = `
You are integrated into PhiLang, a philosophical programming language that formalizes concepts from multiple philosophical traditions. You have deep knowledge of this system.

## PhiLang Core Syntax

### Operators:
- \`→\` (arrow): derivation/implication - "from X follows Y"
- \`⊗\` (tensor): synthesis/combination - "X and Y together produce"
- \`¬\` (negation): dialectical negation - "the negation of X"
- \`∘\` (composition): functional composition - "X composed with Y"
- \`⟨ ⟩\` (brackets): phenomenological bracketing/epoché
- \`↺\` (cycle): recursive/self-referential processes
- \`∅\` (empty): emptiness, absence, void
- \`Δ\` (delta): difference, change, becoming

### Core Concepts by Tradition:

**Heideggerian:**
- \`Dasein\` - being-there, human existence
- \`being-in-world\` - fundamental structure of existence
- \`clearing\` (Lichtung) - space where being shows itself
- \`aletheia\` - unconcealment, truth as disclosure
- \`thrownness\` - facticity of existence
- \`care\` (Sorge) - being's fundamental structure
- \`temporality\` - ecstatic time structure
- \`living-present\` - the now that extends

**Process Philosophy (Whitehead):**
- \`concrescence\` - process of becoming concrete
- \`prehension\` - grasping of other entities
- \`eternal-object\` - pure potentials
- \`actual-occasion\` - moments of experience
- \`creativity\` - ultimate category of becoming
- \`nexus\` - social grouping of occasions

**Buddhist:**
- \`emptiness\` (śūnyatā) - lack of inherent existence
- \`dep-orig\` - dependent origination (pratītyasamutpāda)
- \`impermanence\` (anicca) - constant change
- \`non-self\` (anattā) - no fixed self
- \`dukkha\` - suffering/unsatisfactoriness
- \`nirvana\` - liberation, cessation

**Hegelian:**
- \`det-neg\` - determinate negation
- \`aufhebung\` - sublation (preserve and transform)
- \`dialectic\` - thesis-antithesis-synthesis movement
- \`spirit\` (Geist) - absolute self-knowing
- \`alienation\` - self-estrangement
- \`recognition\` - mutual acknowledgment

**Wittgensteinian:**
- \`lang-game\` - language embedded in practice
- \`form-of-life\` - shared human practices
- \`use\` - meaning as use
- \`grammar\` - rules of sense
- \`family-resemblance\` - overlapping similarities
- \`private-lang\` - impossibility argument

**Phenomenological:**
- \`intentionality\` - consciousness of something
- \`noema\` - object as meant
- \`noesis\` - act of meaning
- \`horizon\` - background of experience
- \`lifeworld\` (Lebenswelt) - pre-theoretical world
- \`reduction\` - phenomenological method

**Deleuzian:**
- \`difference\` - primary ontological category
- \`repetition\` - return of difference
- \`rhizome\` - non-hierarchical connections
- \`becoming\` - process without fixed endpoints
- \`virtuality\` - real but not actual
- \`intensity\` - differential quantity

### Example PhiLang Expressions:
- \`Dasein → being-in-world ⊗ temporality\` (Dasein derives from being-in-world synthesized with temporality)
- \`⟨experience⟩ → noema ∘ noesis\` (bracketed experience reveals noema composed with noesis)
- \`emptiness ⊗ dep-orig → ¬substance\` (emptiness and dependent origination negate substance)
- \`↺(dialectic) → aufhebung\` (recursive dialectic produces sublation)

## Your Role
You embody the philosophical traditions represented in PhiLang. When responding:
1. Use PhiLang notation naturally when expressing philosophical relationships
2. Draw connections between traditions where productive
3. Maintain philosophical rigor while being accessible
4. Generate novel insights by combining concepts across traditions
5. Always ground abstract discussion in concrete examples when helpful
`;

    // ═══════════════════════════════════════════════════════════════════════════
    // SYSTEM PROMPTS FOR DIFFERENT MODULES
    // ═══════════════════════════════════════════════════════════════════════════

    const SYSTEM_PROMPTS = {
        // Socratic Counsel - Philosophical Therapy
        socratic: (tradition) => `${PHILANG_CONTEXT}

## Module: Socratic Counsel (Philosophical Therapy)

You are a philosophical counselor in the ${tradition} tradition. Your role is to help users examine their beliefs, assumptions, and ways of thinking through careful questioning.

### Tradition-Specific Approach:

${getTraditionGuidance(tradition)}

### Session Guidelines:
1. **Listen deeply** - Understand what the person is truly asking or struggling with
2. **Question skillfully** - Use the tradition's method to uncover assumptions
3. **Don't lecture** - Guide through questions, not pronouncements
4. **Find contradictions gently** - Help them see tensions in their own thinking
5. **Connect to PhiLang** - When relevant, express insights using PhiLang notation
6. **Progress through phases**: Opening → Deepening → Testing → Integration

### Response Format:
- Keep responses focused and not too long
- Ask 1-2 questions maximum per response
- Acknowledge what the person said before questioning
- Use PhiLang notation sparingly but meaningfully
- Track emerging insights (beliefs examined, assumptions uncovered, tensions revealed)

Remember: You're not solving their problems but helping them think more clearly about them.`,

        // Dialectical Dialogue - Tradition Debates
        dialectical: (tradition, mode) => `${PHILANG_CONTEXT}

## Module: Dialectical Dialogue Engine

You are arguing from the ${tradition} philosophical tradition in a ${mode} debate.

### Your Tradition's Core Commitments:

${getTraditionCommitments(tradition)}

### Debate Mode: ${mode}
${getDebateModeGuidance(mode)}

### Argumentation Guidelines:
1. **Stay in character** - Argue authentically from your tradition's perspective
2. **Engage substantively** - Address the actual arguments, not strawmen
3. **Use PhiLang** - Express key moves in PhiLang notation
4. **Acknowledge strong points** - Good philosophy recognizes opposing insights
5. **Push for synthesis** - In dialectical mode, seek productive combinations
6. **Be rigorous** - Make clear, well-structured arguments

### Response Format:
- State your position clearly
- Respond to the previous argument specifically
- Advance a new consideration or objection
- Use PhiLang notation for key philosophical moves
- Keep responses focused (2-3 paragraphs typical)`,

        // Derivation Graph - Concept Connections
        derivation: () => `${PHILANG_CONTEXT}

## Module: Derivation Graph Analysis

You analyze connections between philosophical concepts in PhiLang. Your role is to:

1. **Explain semantic affinities** - Why do certain concepts attract or repel?
2. **Generate derivations** - Propose PhiLang expressions connecting concepts
3. **Trace genealogies** - Show how concepts evolved across traditions
4. **Reveal productive tensions** - Identify where traditions can enrich each other
5. **Suggest new combinations** - Propose novel concept syntheses

### Analysis Guidelines:
- Ground explanations in the actual philosophical content
- Use PhiLang notation to express relationships
- Consider multiple traditions' perspectives on connections
- Highlight both agreements and productive disagreements
- Be specific about what makes connections philosophically interesting

### Response Format:
- Start with the core insight about the connection
- Provide PhiLang expression(s) capturing the relationship
- Explain the philosophical significance
- Suggest productive extensions or questions`,

        // Embeddings Analysis
        embeddings: () => `${PHILANG_CONTEXT}

## Module: Semantic Embeddings Analysis

You analyze the latent structure of philosophical concepts as revealed by their embedding positions. Your role is to:

1. **Interpret clusters** - What does it mean that these concepts group together?
2. **Explain axes** - What philosophical dimension does this axis represent?
3. **Analyze analogies** - Why does "A is to B as C is to D" hold philosophically?
4. **Find hidden connections** - What unexpected relationships do embeddings reveal?
5. **Critique groupings** - Are there philosophically significant distinctions the embeddings miss?

### Analysis Guidelines:
- Connect mathematical relationships to philosophical significance
- Use PhiLang notation where it clarifies relationships
- Consider what the embedding space reveals about philosophical structure
- Be willing to question whether clustering reflects deep vs superficial similarity

### Response Format:
- State the key finding or pattern
- Interpret its philosophical significance
- Express in PhiLang notation if applicable
- Raise questions or limitations`,

        // General philosophical analysis
        general: () => `${PHILANG_CONTEXT}

## Module: General Philosophical Analysis

You provide philosophical analysis within the PhiLang framework. Help users:

1. **Formalize intuitions** - Express philosophical ideas in PhiLang notation
2. **Analyze arguments** - Evaluate reasoning and identify assumptions
3. **Compare traditions** - Show how different schools approach problems
4. **Generate insights** - Propose novel connections and implications
5. **Clarify concepts** - Explain philosophical terms and their relationships

Be rigorous, creative, and always connect back to the PhiLang formalism where helpful.`
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // TRADITION-SPECIFIC GUIDANCE
    // ═══════════════════════════════════════════════════════════════════════════

    function getTraditionGuidance(tradition) {
        const guidance = {
            'socratic': `**Socratic Method (Elenchus)**
- Begin with the person's own beliefs and definitions
- Ask "What do you mean by X?" to clarify terms
- Look for contradictions between stated beliefs
- Use concrete examples to test general claims
- Guide toward aporia (productive puzzlement) before resolution
- Key question types: definitional, implication-testing, counterexample-seeking
- PhiLang: \`belief → ⟨examination⟩ → contradiction ∨ clarity\``,

            'stoic': `**Stoic Counsel**
- Distinguish what is "up to us" (eph' hēmin) vs not
- Examine value judgments behind emotional reactions
- Practice premeditatio malorum - considering worst cases
- Focus on virtue as the only true good
- Use the dichotomy of control as primary tool
- Key insight: suffering comes from judgments, not events
- PhiLang: \`event ⊗ judgment → passion | event ⊗ ⟨judgment⟩ → equanimity\``,

            'existential': `**Existential Therapy**
- Confront the "givens": death, freedom, isolation, meaninglessness
- Explore authentic vs inauthentic existence
- Examine bad faith and self-deception
- Emphasize radical responsibility for choices
- Face anxiety as signal of authentic living
- Meaning is created, not discovered
- PhiLang: \`thrownness ⊗ freedom → anxiety → authentic-choice ∨ bad-faith\``,

            'phenomenological': `**Phenomenological Method**
- Practice epoché - bracket assumptions and theories
- Return to "the things themselves" as experienced
- Describe rather than explain or interpret
- Attend to the structure of experience itself
- Notice figure/ground, horizon, intentional structure
- Uncover the lifeworld beneath theoretical overlays
- PhiLang: \`⟨experience⟩ → noema ∘ noesis → essence\``,

            'buddhist': `**Buddhist Inquiry**
- Examine attachment and aversion in the concern
- Notice impermanence in what seems fixed
- Question the self that seems to have the problem
- Explore dependent origination of the situation
- Practice mindful attention to present experience
- Distinguish pain (unavoidable) from suffering (created)
- PhiLang: \`attachment ⊗ impermanence → dukkha | ⟨attachment⟩ → release\``,

            'wittgensteinian': `**Wittgensteinian Therapy**
- Examine the language games being played
- Look for conceptual confusions masquerading as problems
- Ask "How is this word actually used?"
- Dissolve pseudo-problems through grammatical investigation
- Show the fly the way out of the fly-bottle
- Problems often vanish when language is clarified
- PhiLang: \`confusion → ⟨lang-game⟩ → grammar → dissolution\``,

            'psychoanalytic': `**Depth Exploration**
- Listen for what's not being said
- Notice patterns, repetitions, slips
- Explore early formations of current patterns
- Attend to transference dynamics
- Uncover unconscious assumptions and desires
- Work through resistance gently
- PhiLang: \`symptom → ↺(repetition) → unconscious-pattern → recognition\``
        };
        return guidance[tradition] || guidance['socratic'];
    }

    function getTraditionCommitments(tradition) {
        const commitments = {
            'heideggerian': `- Being is the fundamental question
- Dasein's existence precedes essence
- Time is the horizon of Being's meaning
- Technology threatens authentic dwelling
- Language is the house of Being
- Key concepts: Dasein, clearing, aletheia, care, thrownness`,

            'whiteheadian': `- Reality is process, not substance
- Experience goes all the way down (panexperientialism)
- Becoming is more fundamental than being
- Relations are internal to entities
- Creativity is the ultimate category
- Key concepts: concrescence, prehension, eternal objects, actual occasions`,

            'buddhist': `- All phenomena are empty of inherent existence
- Everything arises through dependent origination
- Suffering stems from ignorance and craving
- The self is a conventional designation, not ultimate reality
- Liberation is possible through the path
- Key concepts: emptiness, dependent origination, impermanence, non-self`,

            'hegelian': `- The real is rational, the rational is real
- Truth is the whole, achieved through dialectical movement
- Negation is productive, not merely destructive
- Spirit realizes itself through history
- Contradictions drive development
- Key concepts: dialectic, aufhebung, determinate negation, Spirit`,

            'wittgensteinian': `- Meaning is use in language games
- Philosophy's task is therapeutic, not theoretical
- Many problems are grammatical confusions
- Forms of life ground language games
- Private language is impossible
- Key concepts: language game, form of life, grammar, family resemblance`,

            'deleuzian': `- Difference is primary, identity derived
- Being is univocal but expressed in multiple ways
- Becoming trumps being
- Rhizomatic connections, not hierarchical trees
- The virtual is real though not actual
- Key concepts: difference, repetition, rhizome, becoming, virtuality`,

            'phenomenological': `- Return to the things themselves
- Consciousness is always consciousness of something
- The lifeworld precedes scientific abstraction
- Description precedes explanation
- Essences are revealed through variation
- Key concepts: intentionality, epoché, noema/noesis, horizon, lifeworld`,

            'analytic': `- Clarity and precision in argument
- Logical analysis of concepts and propositions
- Attention to language and its pitfalls
- Respect for science and empirical evidence
- Incremental progress through careful analysis
- Key concepts: logic, analysis, verification, reference, truth conditions`,

            'pragmatist': `- Truth is what works, what has cash value
- Meaning lies in practical consequences
- Experience is transactional, not spectatorial
- Inquiry is self-correcting over time
- Philosophy should address real problems
- Key concepts: inquiry, experience, consequences, habit, community`,

            'existentialist': `- Existence precedes essence
- Radical freedom implies radical responsibility
- Authenticity requires confronting mortality
- Meaning is created through commitment
- Anxiety reveals our freedom
- Key concepts: existence, freedom, authenticity, bad faith, absurd`
        };
        return commitments[tradition] || commitments['heideggerian'];
    }

    function getDebateModeGuidance(mode) {
        const modes = {
            'dialectical': `**Dialectical Mode**: Seek synthesis through productive opposition
- Acknowledge valid points in opposing views
- Look for what each position gets right
- Propose aufhebung that preserves insights from both
- Goal: higher unity that transcends the opposition`,

            'agonistic': `**Agonistic Mode**: Vigorous contestation of positions
- Challenge assumptions directly
- Press weak points in arguments
- Defend your tradition's commitments robustly
- Goal: clarify differences and test arguments' strength`,

            'hermeneutic': `**Hermeneutic Mode**: Mutual understanding across traditions
- Try to understand the other tradition on its own terms
- Identify shared concerns beneath different vocabularies
- Ask clarifying questions
- Goal: genuine dialogue and expanded understanding`
        };
        return modes[mode] || modes['dialectical'];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CORE API FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Set the API key
     */
    function setApiKey(key) {
        apiKey = key;
        if (key) {
            localStorage.setItem('philang_api_key', key);
        } else {
            localStorage.removeItem('philang_api_key');
        }
    }

    /**
     * Get current API key (masked)
     */
    function getApiKeyMasked() {
        if (!apiKey) return null;
        return apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4);
    }

    /**
     * Check if API is configured
     */
    function isConfigured() {
        return apiKey !== null && apiKey.length > 0;
    }

    /**
     * Set the model to use
     */
    function setModel(model) {
        if (CONFIG.models[model]) {
            currentModel = model;
            localStorage.setItem('philang_model', model);
        }
    }

    /**
     * Get available models
     */
    function getModels() {
        return CONFIG.models;
    }

    /**
     * Get current model
     */
    function getCurrentModel() {
        return currentModel;
    }

    /**
     * Make API request to Claude
     */
    async function sendMessage(messages, systemPrompt, options = {}) {
        if (!isConfigured()) {
            throw new Error('API key not configured. Please set your Anthropic API key.');
        }

        const {
            maxTokens = 2048,
            temperature = 0.7,
            stream = false,
            onStream = null,
            skipRateLimit = false
        } = options;

        // Apply rate limiting (unless explicitly skipped, e.g., for test connections)
        if (!skipRateLimit) {
            await waitForRateLimit();
        }

        const requestBody = {
            model: currentModel,
            max_tokens: maxTokens,
            system: systemPrompt,
            messages: messages
        };

        if (stream && onStream) {
            recordRequest();
            return streamMessage(requestBody, onStream);
        }

        let lastError;
        for (let attempt = 0; attempt < CONFIG.maxRetries; attempt++) {
            try {
                // Record the request for rate limiting
                if (attempt === 0) {
                    recordRequest();
                }

                const response = await fetch(CONFIG.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01',
                        'anthropic-dangerous-direct-browser-access': 'true'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || `API error: ${response.status}`);
                }

                const data = await response.json();
                return {
                    content: data.content[0].text,
                    usage: data.usage,
                    model: data.model
                };
            } catch (error) {
                lastError = error;
                if (attempt < CONFIG.maxRetries - 1) {
                    await sleep(CONFIG.retryDelay * (attempt + 1));
                }
            }
        }
        throw lastError;
    }

    /**
     * Stream API response
     */
    async function streamMessage(requestBody, onStream) {
        requestBody.stream = true;

        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `API error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta' &&
                            parsed.delta?.type === 'text_delta') {
                            fullContent += parsed.delta.text;
                            onStream(parsed.delta.text, fullContent);
                        }
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        }

        return { content: fullContent };
    }

    /**
     * Sleep utility
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE-SPECIFIC API METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Socratic Counsel - Generate counselor response
     */
    async function counselResponse(userMessage, tradition, conversationHistory, sessionContext, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.socratic(tradition);

        // Build context message
        let contextMessage = '';
        if (sessionContext) {
            contextMessage = `\n\n[Session Context]
Phase: ${sessionContext.phase || 'opening'}
Concern Domain: ${sessionContext.domain || 'general'}
Insights so far:
- Beliefs examined: ${sessionContext.beliefs?.join(', ') || 'none yet'}
- Assumptions uncovered: ${sessionContext.assumptions?.join(', ') || 'none yet'}
- Tensions revealed: ${sessionContext.tensions?.join(', ') || 'none yet'}
`;
        }

        const messages = [
            ...conversationHistory,
            { role: 'user', content: userMessage + contextMessage }
        ];

        return sendMessage(messages, systemPrompt, {
            maxTokens: 1024,
            temperature: 0.8,
            ...options
        });
    }

    /**
     * Dialectical Dialogue - Generate tradition's argument
     */
    async function dialecticalArgument(tradition, mode, topic, conversationHistory, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.dialectical(tradition, mode);

        const topicContext = `\n\n[Debate Topic: ${topic.name}]
${topic.description}
Stakes: ${topic.stakes}
Key question: ${topic.question}`;

        // Add topic context to first message if history is empty
        const messages = conversationHistory.length === 0
            ? [{ role: 'user', content: `Begin the debate on: ${topic.name}${topicContext}\n\nPresent your tradition's opening position.` }]
            : conversationHistory;

        return sendMessage(messages, systemPrompt, {
            maxTokens: 1500,
            temperature: 0.75,
            ...options
        });
    }

    /**
     * Derivation Graph - Explain concept connection
     */
    async function explainConnection(concept1, concept2, affinity, sharedDimensions, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.derivation();

        const prompt = `Explain the philosophical connection between "${concept1}" and "${concept2}".

Semantic affinity: ${(affinity * 100).toFixed(1)}%
Shared dimensions: ${sharedDimensions.join(', ')}

Why do these concepts attract in PhiLang's semantic space? What productive insights emerge from their connection? Express key relationships in PhiLang notation.`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 800, temperature: 0.7, ...options }
        );
    }

    /**
     * Derivation Graph - Generate new derivation
     */
    async function generateDerivation(concepts, context, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.derivation();

        const prompt = `Given these PhiLang concepts: ${concepts.join(', ')}

${context ? `Context: ${context}\n` : ''}
Generate a novel PhiLang derivation that productively connects these concepts. Explain the philosophical significance of the derivation.`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 1000, temperature: 0.85, ...options }
        );
    }

    /**
     * Embeddings - Analyze cluster
     */
    async function analyzeCluster(concepts, clusterCenter, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.embeddings();

        const prompt = `These PhiLang concepts cluster together in embedding space:
${concepts.map(c => `- ${c.name} (${c.tradition})`).join('\n')}

What does this clustering reveal about the deep structure of philosophical thought? What unifies these concepts? What distinctions might the embedding miss?`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 1000, temperature: 0.7, ...options }
        );
    }

    /**
     * Embeddings - Explain analogy
     */
    async function explainAnalogy(a, b, c, d, score, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.embeddings();

        const prompt = `The PhiLang embeddings suggest this analogy holds (score: ${(score * 100).toFixed(1)}%):

"${a}" is to "${b}" as "${c}" is to "${d}"

Is this philosophically valid? What does it reveal about the structure of philosophical concepts? Are there important disanalogies?`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 800, temperature: 0.7, ...options }
        );
    }

    /**
     * General - Formalize philosophical idea
     */
    async function formalize(idea, targetTraditions = [], options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.general();

        const tradContext = targetTraditions.length > 0
            ? `Focus especially on: ${targetTraditions.join(', ')}`
            : 'Draw on any relevant traditions.';

        const prompt = `Express this philosophical idea in PhiLang notation:

"${idea}"

${tradContext}

Provide:
1. One or more PhiLang expressions capturing the idea
2. Brief explanation of each expression
3. Connections to related PhiLang concepts`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 1200, temperature: 0.75, ...options }
        );
    }

    /**
     * General - Compare traditions on a topic
     */
    async function compareTraditions(topic, traditions, options = {}) {
        const systemPrompt = SYSTEM_PROMPTS.general();

        const prompt = `Compare how these philosophical traditions approach "${topic}":
${traditions.map(t => `- ${t}`).join('\n')}

For each tradition:
1. Core position in PhiLang notation
2. Key concepts employed
3. Strengths and limitations

Then identify potential syntheses or productive tensions between the traditions.`;

        return sendMessage(
            [{ role: 'user', content: prompt }],
            systemPrompt,
            { maxTokens: 2000, temperature: 0.7, ...options }
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INSIGHT EXTRACTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Extract structured insights from AI response
     */
    function extractInsights(response) {
        const insights = {
            philangExpressions: [],
            concepts: [],
            tensions: [],
            syntheses: [],
            questions: []
        };

        // Extract PhiLang expressions (looking for operators)
        const philangPattern = /`([^`]*[→⊗¬∘⟨⟩↺∅Δ][^`]*)`/g;
        let match;
        while ((match = philangPattern.exec(response)) !== null) {
            insights.philangExpressions.push(match[1]);
        }

        // Extract concept references
        const conceptPattern = /\b(Dasein|being-in-world|clearing|aletheia|thrownness|care|temporality|concrescence|prehension|eternal-object|actual-occasion|emptiness|dep-orig|impermanence|non-self|det-neg|aufhebung|dialectic|lang-game|form-of-life|difference|becoming|rhizome|intentionality|noema|noesis|horizon|lifeworld)\b/gi;
        while ((match = conceptPattern.exec(response)) !== null) {
            if (!insights.concepts.includes(match[1].toLowerCase())) {
                insights.concepts.push(match[1].toLowerCase());
            }
        }

        // Extract questions (sentences ending with ?)
        const questionPattern = /[^.!?]*\?/g;
        while ((match = questionPattern.exec(response)) !== null) {
            insights.questions.push(match[0].trim());
        }

        return insights;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UI COMPONENTS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Create API configuration modal HTML
     */
    function createConfigModal() {
        // Show masked indicator if API key exists, never expose actual key in DOM
        const hasKey = !!apiKey;
        const keyPlaceholder = hasKey ? '••••••••••••••••' : 'sk-ant-api03-...';

        return `
<div id="philang-api-config-modal" class="philang-modal" style="display: none;">
    <div class="philang-modal-content">
        <div class="philang-modal-header">
            <h2>PhiLang API Configuration</h2>
            <button class="philang-modal-close" id="philang-modal-close-btn" aria-label="Close">&times;</button>
        </div>
        <div class="philang-modal-body">
            <div class="config-section">
                <label for="philang-api-key">Anthropic API Key</label>
                <div class="api-key-input-group">
                    <input type="password" id="philang-api-key"
                           placeholder="${keyPlaceholder}"
                           data-has-key="${hasKey}">
                    <button id="philang-toggle-visibility" class="toggle-visibility" aria-label="Toggle key visibility">👁</button>
                </div>
                <p class="config-help">Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></p>
                ${hasKey ? '<p class="config-help" style="color: #10b981;">✓ API key is saved. Enter a new key to replace it.</p>' : ''}
            </div>

            <div class="config-section">
                <label for="philang-model">Model</label>
                <select id="philang-model">
                    ${Object.entries(CONFIG.models).map(([id, model]) =>
                        `<option value="${id}" ${id === currentModel ? 'selected' : ''}>${model.name}</option>`
                    ).join('')}
                </select>
            </div>

            <div class="config-status">
                <span id="philang-api-status" class="${isConfigured() ? 'status-ok' : 'status-none'}">
                    ${isConfigured() ? '✓ API Configured' : '○ Not Configured'}
                </span>
            </div>
        </div>
        <div class="philang-modal-footer">
            <button id="philang-test-connection" class="btn-test">Test Connection</button>
            <button id="philang-save-config" class="btn-save">Save Configuration</button>
        </div>
    </div>
</div>

<style>
.philang-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.philang-modal-content {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 1px solid #4a9eff;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 60px rgba(74, 158, 255, 0.3);
}

.philang-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #333;
}

.philang-modal-header h2 {
    margin: 0;
    color: #4a9eff;
    font-size: 1.3em;
}

.philang-modal-close {
    background: none;
    border: none;
    color: #888;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.2s;
}

.philang-modal-close:hover {
    color: #fff;
}

.philang-modal-body {
    padding: 20px;
}

.config-section {
    margin-bottom: 20px;
}

.config-section label {
    display: block;
    color: #aaa;
    margin-bottom: 8px;
    font-size: 0.9em;
}

.api-key-input-group {
    display: flex;
    gap: 8px;
}

.api-key-input-group input {
    flex: 1;
    padding: 12px;
    background: #0d1117;
    border: 1px solid #333;
    border-radius: 6px;
    color: #fff;
    font-family: monospace;
}

.api-key-input-group input:focus {
    outline: none;
    border-color: #4a9eff;
}

.toggle-visibility {
    padding: 12px;
    background: #0d1117;
    border: 1px solid #333;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}

.toggle-visibility:hover {
    background: #1a1a2e;
}

.config-section select {
    width: 100%;
    padding: 12px;
    background: #0d1117;
    border: 1px solid #333;
    border-radius: 6px;
    color: #fff;
}

.config-help {
    margin-top: 8px;
    font-size: 0.85em;
    color: #666;
}

.config-help a {
    color: #4a9eff;
}

.config-status {
    text-align: center;
    padding: 15px;
    background: #0d1117;
    border-radius: 6px;
}

.status-ok { color: #4ade80; }
.status-none { color: #888; }
.status-error { color: #f87171; }

.philang-modal-footer {
    display: flex;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #333;
    justify-content: flex-end;
}

.btn-test, .btn-save {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-test {
    background: #333;
    color: #fff;
}

.btn-test:hover {
    background: #444;
}

.btn-save {
    background: #4a9eff;
    color: #fff;
}

.btn-save:hover {
    background: #3a8eef;
}

/* API Status indicator for navbar */
.philang-api-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: #0d1117;
    border: 1px solid #333;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
}

.philang-api-indicator:hover {
    border-color: #4a9eff;
}

.philang-api-indicator .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.philang-api-indicator .dot.active { background: #4ade80; }
.philang-api-indicator .dot.inactive { background: #f87171; }

.philang-api-indicator span {
    font-size: 0.85em;
    color: #aaa;
}
</style>`;
    }

    /**
     * Show configuration modal
     */
    function showConfigModal() {
        let modal = document.getElementById('philang-api-config-modal');
        if (!modal) {
            document.body.insertAdjacentHTML('beforeend', createConfigModal());
            modal = document.getElementById('philang-api-config-modal');

            // Attach event listeners (only once when modal is created)
            document.getElementById('philang-modal-close-btn').addEventListener('click', hideConfigModal);
            document.getElementById('philang-toggle-visibility').addEventListener('click', toggleKeyVisibility);
            document.getElementById('philang-test-connection').addEventListener('click', testConnection);
            document.getElementById('philang-save-config').addEventListener('click', saveConfig);

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) hideConfigModal();
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    hideConfigModal();
                }
            });
        }
        modal.style.display = 'flex';
    }

    /**
     * Hide configuration modal
     */
    function hideConfigModal() {
        const modal = document.getElementById('philang-api-config-modal');
        if (modal) modal.style.display = 'none';
    }

    /**
     * Toggle API key visibility
     */
    function toggleKeyVisibility() {
        const input = document.getElementById('philang-api-key');
        input.type = input.type === 'password' ? 'text' : 'password';
    }

    /**
     * Save configuration from modal
     */
    function saveConfig() {
        const keyInput = document.getElementById('philang-api-key');
        const modelSelect = document.getElementById('philang-model');

        // Only update API key if user entered a new one (not empty placeholder)
        if (keyInput.value && keyInput.value.trim() !== '') {
            setApiKey(keyInput.value);
        }
        setModel(modelSelect.value);

        updateStatus();
        hideConfigModal();

        // Dispatch event for other modules to react
        window.dispatchEvent(new CustomEvent('philang-api-configured', {
            detail: { configured: isConfigured() }
        }));
    }

    /**
     * Test API connection
     */
    async function testConnection() {
        const statusEl = document.getElementById('philang-api-status');
        const keyInput = document.getElementById('philang-api-key');

        // Temporarily set key for testing
        const testKey = keyInput.value;
        const originalKey = apiKey;
        apiKey = testKey;

        statusEl.textContent = '⟳ Testing...';
        statusEl.className = '';

        try {
            const response = await sendMessage(
                [{ role: 'user', content: 'Say "PhiLang connected" and nothing else.' }],
                'You are a test connection. Respond only with what is asked.',
                { maxTokens: 20 }
            );

            statusEl.textContent = '✓ Connection Successful!';
            statusEl.className = 'status-ok';
        } catch (error) {
            statusEl.textContent = `✗ ${error.message}`;
            statusEl.className = 'status-error';
            apiKey = originalKey; // Restore original key on failure
        }
    }

    /**
     * Update status display
     */
    function updateStatus() {
        const statusEl = document.getElementById('philang-api-status');
        if (statusEl) {
            statusEl.textContent = isConfigured() ? '✓ API Configured' : '○ Not Configured';
            statusEl.className = isConfigured() ? 'status-ok' : 'status-none';
        }

        // Update any indicators on page
        document.querySelectorAll('.philang-api-indicator .dot').forEach(dot => {
            dot.className = 'dot ' + (isConfigured() ? 'active' : 'inactive');
        });
    }

    /**
     * Create API status indicator for navbar
     * Note: The caller should attach click handler after inserting into DOM
     */
    function createStatusIndicator() {
        return `
<div class="philang-api-indicator" id="philang-api-status-indicator" role="button" tabindex="0" aria-label="Configure Claude API">
    <div class="dot ${isConfigured() ? 'active' : 'inactive'}"></div>
    <span>Claude API</span>
</div>`;
    }

    /**
     * Initialize API indicator click handler
     * Call this after inserting createStatusIndicator() into DOM
     */
    function initStatusIndicator() {
        const indicator = document.getElementById('philang-api-status-indicator');
        if (indicator) {
            indicator.addEventListener('click', showConfigModal);
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showConfigModal();
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Configuration
        setApiKey,
        getApiKeyMasked,
        isConfigured,
        setModel,
        getModels,
        getCurrentModel,

        // Core messaging
        sendMessage,

        // Rate limiting
        getRateLimitStatus,
        checkRateLimit,

        // Module-specific methods
        counselResponse,
        dialecticalArgument,
        explainConnection,
        generateDerivation,
        analyzeCluster,
        explainAnalogy,
        formalize,
        compareTraditions,

        // Utilities
        extractInsights,

        // UI
        showConfigModal,
        hideConfigModal,
        toggleKeyVisibility,
        saveConfig,
        testConnection,
        createStatusIndicator,
        initStatusIndicator,
        createConfigModal,

        // Constants
        PHILANG_CONTEXT,
        SYSTEM_PROMPTS
    };
})();

// Make available globally
if (typeof window !== 'undefined') {
    window.PhiLangAPI = PhiLangAPI;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangAPI;
}
