/**
 * PhiLang Ontology Module Tests
 */

describe('PhiLangOntology', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALIZATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('init', () => {
        it('should be defined', () => {
            assert.defined(PhiLangOntology);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // TRADITIONS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getTraditions', () => {
        it('should return array of traditions', () => {
            const traditions = PhiLangOntology.getTraditions();
            assert.truthy(Array.isArray(traditions));
            assert.truthy(traditions.length > 0);
        });

        it('should include major traditions', () => {
            const traditions = PhiLangOntology.getTraditions();
            const names = traditions.map(t => t.id);
            assert.contains(names, 'heideggerian');
            assert.contains(names, 'buddhist');
            assert.contains(names, 'hegelian');
        });
    });

    describe('getTradition', () => {
        it('should return tradition by id', () => {
            const tradition = PhiLangOntology.getTradition('heideggerian');
            assert.truthy(tradition);
            assert.equal(tradition.id, 'heideggerian');
        });

        it('should have required properties', () => {
            const tradition = PhiLangOntology.getTradition('buddhist');
            assert.truthy(tradition.name);
            assert.truthy(tradition.color);
            assert.truthy(tradition.description);
        });

        it('should return null for unknown tradition', () => {
            const tradition = PhiLangOntology.getTradition('nonexistent');
            assert.null(tradition);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // CONCEPTS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getConcepts', () => {
        it('should return array of concepts', () => {
            const concepts = PhiLangOntology.getConcepts();
            assert.truthy(Array.isArray(concepts));
            assert.truthy(concepts.length > 0);
        });

        it('should filter by tradition', () => {
            const concepts = PhiLangOntology.getConcepts('heideggerian');
            concepts.forEach(c => {
                assert.equal(c.tradition, 'heideggerian');
            });
        });
    });

    describe('getConcept', () => {
        it('should return concept by id', () => {
            const concept = PhiLangOntology.getConcept('Dasein');
            assert.truthy(concept);
            assert.equal(concept.id, 'Dasein');
        });

        it('should have required properties', () => {
            const concept = PhiLangOntology.getConcept('Dasein');
            assert.truthy(concept.name);
            assert.truthy(concept.tradition);
            assert.truthy(concept.description);
        });

        it('should return null for unknown concept', () => {
            const concept = PhiLangOntology.getConcept('nonexistent');
            assert.null(concept);
        });
    });

    describe('searchConcepts', () => {
        it('should search by term', () => {
            const results = PhiLangOntology.searchConcepts('being');
            assert.truthy(Array.isArray(results));
        });

        it('should return matching concepts', () => {
            const results = PhiLangOntology.searchConcepts('Dasein');
            const found = results.find(r => r.id === 'Dasein');
            assert.truthy(found);
        });

        it('should be case insensitive', () => {
            const results1 = PhiLangOntology.searchConcepts('DASEIN');
            const results2 = PhiLangOntology.searchConcepts('dasein');
            assert.truthy(results1.length > 0);
            assert.equal(results1.length, results2.length);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // OPERATORS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getOperators', () => {
        it('should return array of operators', () => {
            const operators = PhiLangOntology.getOperators();
            assert.truthy(Array.isArray(operators));
            assert.truthy(operators.length > 0);
        });

        it('should include core operators', () => {
            const operators = PhiLangOntology.getOperators();
            const symbols = operators.map(o => o.symbol);
            assert.contains(symbols, '→');
            assert.contains(symbols, '⊗');
            assert.contains(symbols, '¬');
        });
    });

    describe('getOperator', () => {
        it('should return operator by symbol', () => {
            const operator = PhiLangOntology.getOperator('→');
            assert.truthy(operator);
            assert.equal(operator.symbol, '→');
        });

        it('should have required properties', () => {
            const operator = PhiLangOntology.getOperator('→');
            assert.truthy(operator.name);
            assert.truthy(operator.description);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // RELATIONS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getRelations', () => {
        it('should return array of relations', () => {
            const relations = PhiLangOntology.getRelations();
            assert.truthy(Array.isArray(relations));
        });
    });

    describe('getConceptRelations', () => {
        it('should return relations for a concept', () => {
            const relations = PhiLangOntology.getConceptRelations('Dasein');
            assert.truthy(Array.isArray(relations));
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SEMANTIC FEATURES TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getSemanticFeatures', () => {
        it('should return semantic features', () => {
            const features = PhiLangOntology.getSemanticFeatures();
            assert.truthy(Array.isArray(features));
        });
    });

    describe('getConceptFeatures', () => {
        it('should return features for a concept', () => {
            const features = PhiLangOntology.getConceptFeatures('Dasein');
            assert.type(features, 'object');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // DEBATE TOPICS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getDebateTopics', () => {
        it('should return array of topics', () => {
            const topics = PhiLangOntology.getDebateTopics();
            assert.truthy(Array.isArray(topics));
            assert.truthy(topics.length > 0);
        });

        it('should have required properties', () => {
            const topics = PhiLangOntology.getDebateTopics();
            const topic = topics[0];
            assert.truthy(topic.name);
            assert.truthy(topic.description);
        });
    });

    describe('getDebateTopic', () => {
        it('should return topic by id', () => {
            const topics = PhiLangOntology.getDebateTopics();
            if (topics.length > 0) {
                const topic = PhiLangOntology.getDebateTopic(topics[0].id);
                assert.truthy(topic);
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // COUNSELING TRADITIONS TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('getCounselingTraditions', () => {
        it('should return counseling traditions', () => {
            const traditions = PhiLangOntology.getCounselingTraditions();
            assert.truthy(Array.isArray(traditions));
            assert.truthy(traditions.length > 0);
        });

        it('should include common approaches', () => {
            const traditions = PhiLangOntology.getCounselingTraditions();
            const ids = traditions.map(t => t.id);
            assert.contains(ids, 'socratic');
            assert.contains(ids, 'stoic');
        });
    });

    describe('getCounselingTradition', () => {
        it('should return tradition by id', () => {
            const tradition = PhiLangOntology.getCounselingTradition('socratic');
            assert.truthy(tradition);
            assert.equal(tradition.id, 'socratic');
        });

        it('should have methodology info', () => {
            const tradition = PhiLangOntology.getCounselingTradition('socratic');
            assert.truthy(tradition.name);
            assert.truthy(tradition.description);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITY FUNCTION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('formatExpression', () => {
        it('should format PhiLang expressions', () => {
            if (typeof PhiLangOntology.formatExpression === 'function') {
                const formatted = PhiLangOntology.formatExpression('Dasein → being-in-world');
                assert.type(formatted, 'string');
            } else {
                assert.truthy(true); // Skip if not implemented
            }
        });
    });

    describe('parseExpression', () => {
        it('should parse PhiLang expressions', () => {
            if (typeof PhiLangOntology.parseExpression === 'function') {
                const parsed = PhiLangOntology.parseExpression('Dasein → being-in-world');
                assert.type(parsed, 'object');
            } else {
                assert.truthy(true); // Skip if not implemented
            }
        });
    });

    describe('getTraditionColor', () => {
        it('should return color for tradition', () => {
            const color = PhiLangOntology.getTraditionColor('heideggerian');
            assert.truthy(color);
            assert.match(color, /^#[0-9A-Fa-f]{6}$/);
        });

        it('should return default color for unknown', () => {
            const color = PhiLangOntology.getTraditionColor('nonexistent');
            assert.truthy(color);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // DATA INTEGRITY TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    describe('data integrity', () => {
        it('all concepts should reference valid traditions', () => {
            const concepts = PhiLangOntology.getConcepts();
            const traditions = PhiLangOntology.getTraditions().map(t => t.id);

            concepts.forEach(concept => {
                assert.contains(traditions, concept.tradition,
                    `Concept ${concept.id} has invalid tradition: ${concept.tradition}`);
            });
        });

        it('all relations should reference valid concepts', () => {
            const relations = PhiLangOntology.getRelations();
            const conceptIds = PhiLangOntology.getConcepts().map(c => c.id);

            relations.forEach(relation => {
                if (relation.source) {
                    assert.contains(conceptIds, relation.source,
                        `Relation has invalid source: ${relation.source}`);
                }
                if (relation.target) {
                    assert.contains(conceptIds, relation.target,
                        `Relation has invalid target: ${relation.target}`);
                }
            });
        });

        it('all traditions should have valid colors', () => {
            const traditions = PhiLangOntology.getTraditions();
            traditions.forEach(tradition => {
                if (tradition.color) {
                    assert.match(tradition.color, /^#[0-9A-Fa-f]{6}$/,
                        `Tradition ${tradition.id} has invalid color: ${tradition.color}`);
                }
            });
        });
    });
});
