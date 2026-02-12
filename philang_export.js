/**
 * PhiLang Export System
 * Provides export functionality for derivations, dialogues, and sessions
 * Supports LaTeX, PDF, Markdown, JSON, and plain text formats
 */

const PhiLangExport = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const CONFIG = {
        pdfWorkerUrl: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
        defaultFont: 'Helvetica',
        titleFont: 'Helvetica-Bold',
        monoFont: 'Courier'
    };

    // Symbol to LaTeX mapping
    const LATEX_SYMBOLS = {
        // Phenomenology
        'Σ': '\\Sigma',
        'Ω': '\\Omega',
        'χ': '\\chi',
        'τ': '\\tau',
        '◉': '\\odot',
        'H[τ]': 'H[\\tau]',
        '⋈': '\\bowtie',

        // Spinozism
        '▣': '\\blacksquare',
        '◇': '\\diamond',
        'κ+': '\\kappa^{+}',
        'K₃': 'K_3',
        '𝔄': '\\mathfrak{A}',

        // Buddhism
        'śū': '\\acute{s}\\bar{u}',
        'प्र': '\\text{प्र}',
        '◈': '\\diamondsuit',
        'अ': '\\text{अ}',
        '⊏⊐': '\\sqsubset\\sqsupset',
        '⇝': '\\leadsto',

        // Process
        '⦿': '\\circledcirc',
        '⥤': '\\rightharpoonup',
        '⤳': '\\rightarrowtail',
        'ℂ': '\\mathbb{C}',
        '∞ₒ': '\\infty_o',

        // Poststructuralism
        '⌒': '\\frown',
        'ν': '\\nu',
        '†': '\\dagger',
        'Π∞': '\\Pi_{\\infty}',
        '⫘': '\\pitchfork',
        '⋔': '\\pitchfork',

        // Hegelianism
        '⍟': '\\circledast',
        '¬ᵈ': '\\neg^d',
        '𝔊': '\\mathfrak{G}',
        '⥁': '\\circlearrowleft',
        '⊠': '\\boxtimes',
        '𝔸': '\\mathbb{A}',

        // Heideggerianism
        '𝔖': '\\mathfrak{S}',
        '𝔇': '\\mathfrak{D}',
        '⦿c': '\\circledcirc_c',
        '⤋': '\\downarrowtail',
        '⌾': '\\circ',
        'ἀ': '\\alpha\\lambda\\eta\\theta\\epsilon\\iota\\alpha',
        '𝔈': '\\mathfrak{E}',
        'ℨ': '\\mathfrak{Z}',

        // Wittgenstein
        '𝕎': '\\mathbb{W}',
        '𝔉': '\\mathfrak{F}',
        '𝔖𝔞': '\\mathfrak{Sa}',
        '𝔬': '\\mathfrak{o}',
        '𝔓': '\\mathfrak{P}',
        '↭': '\\leftrightharpoons',
        '⧓': '\\between',
        '⊘': '\\oslash',
        '⤒': '\\uparrow',
        '𝔏𝔣': '\\mathfrak{Lf}',
        '𝔖𝔭': '\\mathfrak{Sp}',
        '℧': '\\mho',
        '⟴': '\\circlearrowright',
        '𝔏': '\\mathfrak{L}',
        '≋ᶠ': '\\approx^f',
        '⊛ₐ': '\\circledast_a',
        '⤥': '\\curvearrowleft',
        '⌀': '\\varnothing',
        '⊢ₕ': '\\vdash_h',
        '⬚': '\\square',

        // Kantianism
        '𝕿': '\\mathbb{T}',
        '𝔞': '\\mathfrak{a}',
        '⊕ₛ𝔞': '\\oplus_s\\mathfrak{a}',
        'φₖ': '\\phi_k',
        'νₖ': '\\nu_k',
        '𝔦': '\\mathfrak{i}',
        'Ꮯ': '\\mathcal{C}',
        'σₖ': '\\sigma_k',
        '𝔄ₜ': '\\mathfrak{A}_t',
        '⊨ᶜ': '\\vDash^c',
        '𝔞ᵤ': '\\mathfrak{a}_u',
        '𝔖ᵤ': '\\mathfrak{S}_u',

        // Operators
        '→': '\\rightarrow',
        '←': '\\leftarrow',
        '↔': '\\leftrightarrow',
        '⟹': '\\Rightarrow',
        '⟸': '\\Leftarrow',
        '⟺': '\\Leftrightarrow',
        '≡': '\\equiv',
        '≈': '\\approx',
        '⊥': '\\perp',
        '∈': '\\in',
        '∉': '\\notin',
        '⊂': '\\subset',
        '⊃': '\\supset',
        '∧': '\\land',
        '∨': '\\lor',
        '¬': '\\neg',
        '∀': '\\forall',
        '∃': '\\exists',
    };

    /**
     * Convert PhiLang expression to LaTeX
     */
    function expressionToLatex(expr) {
        if (!expr) return '';

        let latex = expr;

        // Sort by length (longest first) to avoid partial replacements
        const sortedSymbols = Object.entries(LATEX_SYMBOLS)
            .sort((a, b) => b[0].length - a[0].length);

        for (const [symbol, replacement] of sortedSymbols) {
            latex = latex.split(symbol).join(replacement);
        }

        return latex;
    }

    /**
     * Export derivation chain to LaTeX
     */
    function derivationToLatex(chain, options = {}) {
        const {
            title = 'PhiLang Derivation',
            author = '',
            includeDescription = true,
            includeRules = true
        } = options;

        let latex = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}
\\usepackage{mathrsfs}
\\usepackage{fontspec}
\\usepackage{unicode-math}

\\title{${escapeLatex(title)}}
${author ? `\\author{${escapeLatex(author)}}` : ''}
\\date{\\today}

\\newtheorem{step}{Step}
\\newtheorem{rule}{Rule}

\\begin{document}
\\maketitle

\\section{Derivation Chain}

\\begin{enumerate}
`;

        chain.forEach((step, index) => {
            const expr = expressionToLatex(step.expression || '');
            latex += `\\item \\textbf{Step ${index + 1}}`;

            if (step.ruleName && includeRules) {
                latex += ` \\textit{(${escapeLatex(step.ruleName)})}`;
            }

            latex += `\n\\[\n${expr}\n\\]\n`;

            if (step.description && includeDescription) {
                latex += `\\textit{${escapeLatex(step.description)}}\n\n`;
            }
        });

        latex += `\\end{enumerate}

\\section{Summary}
This derivation consists of ${chain.length} step${chain.length !== 1 ? 's' : ''}, demonstrating the logical progression through philosophical concepts.

\\end{document}`;

        return latex;
    }

    /**
     * Export dialogue to LaTeX
     */
    function dialogueToLatex(dialogue, options = {}) {
        const {
            title = 'Dialectical Dialogue',
            topic = 'Philosophical Inquiry',
            traditions = []
        } = options;

        let latex = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{fontspec}
\\usepackage{csquotes}

\\title{${escapeLatex(title)}}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
A dialectical dialogue on the topic of \\textit{${escapeLatex(topic)}}, featuring perspectives from ${traditions.length > 0 ? traditions.join(', ') : 'multiple philosophical traditions'}.
\\end{abstract}

\\section{Dialogue}

`;

        if (dialogue.entries) {
            dialogue.entries.forEach((entry, index) => {
                if (entry.type === 'synthesis') {
                    latex += `\\subsection*{Synthesis}
\\begin{quote}
${escapeLatex(entry.content || '')}
\\end{quote}

`;
                } else {
                    latex += `\\paragraph{${escapeLatex(entry.tradition || 'Speaker')}}
${escapeLatex(entry.content || '')}

`;
                }
            });
        }

        latex += `\\end{document}`;

        return latex;
    }

    /**
     * Export session to Markdown
     */
    function sessionToMarkdown(session, options = {}) {
        const {
            title = 'Philosophical Session',
            includeMetadata = true
        } = options;

        let md = `# ${title}\n\n`;

        if (includeMetadata) {
            md += `**Date:** ${new Date().toLocaleDateString()}\n`;
            if (session.tradition) {
                md += `**Tradition:** ${session.tradition}\n`;
            }
            md += `\n---\n\n`;
        }

        if (session.messages) {
            session.messages.forEach(msg => {
                if (msg.type === 'user') {
                    md += `## You\n\n${msg.content}\n\n`;
                } else {
                    md += `## Counselor\n\n${msg.content}\n\n`;
                }
            });
        }

        if (session.insights) {
            md += `---\n\n## Insights Gathered\n\n`;

            if (session.insights.beliefs && session.insights.beliefs.length > 0) {
                md += `### Beliefs\n${session.insights.beliefs.map(b => `- ${b}`).join('\n')}\n\n`;
            }
            if (session.insights.assumptions && session.insights.assumptions.length > 0) {
                md += `### Assumptions\n${session.insights.assumptions.map(a => `- ${a}`).join('\n')}\n\n`;
            }
            if (session.insights.tensions && session.insights.tensions.length > 0) {
                md += `### Tensions\n${session.insights.tensions.map(t => `- ${t}`).join('\n')}\n\n`;
            }
        }

        return md;
    }

    /**
     * Export derivation to Markdown
     */
    function derivationToMarkdown(chain, options = {}) {
        const { title = 'Derivation Chain' } = options;

        let md = `# ${title}\n\n`;
        md += `*Generated by PhiLang on ${new Date().toLocaleDateString()}*\n\n`;
        md += `---\n\n`;

        chain.forEach((step, index) => {
            md += `## Step ${index + 1}`;
            if (step.ruleName) {
                md += ` — *${step.ruleName}*`;
            }
            md += `\n\n`;

            if (step.expression) {
                md += `\`\`\`\n${step.expression}\n\`\`\`\n\n`;
            }

            if (step.description) {
                md += `${step.description}\n\n`;
            }
        });

        return md;
    }

    /**
     * Download content as a file
     */
    function download(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show toast if available
        if (typeof PhiLangToast !== 'undefined') {
            PhiLangToast.success(`Downloaded ${filename}`);
        }
    }

    /**
     * Copy content to clipboard
     */
    async function copyToClipboard(content) {
        try {
            await navigator.clipboard.writeText(content);
            if (typeof PhiLangToast !== 'undefined') {
                PhiLangToast.success('Copied to clipboard');
            }
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            if (typeof PhiLangToast !== 'undefined') {
                PhiLangToast.error('Failed to copy to clipboard');
            }
            return false;
        }
    }

    /**
     * Escape special LaTeX characters
     */
    function escapeLatex(text) {
        if (!text) return '';
        return text
            .replace(/\\/g, '\\textbackslash{}')
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/\$/g, '\\$')
            .replace(/#/g, '\\#')
            .replace(/_/g, '\\_')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/~/g, '\\textasciitilde{}')
            .replace(/\^/g, '\\textasciicircum{}');
    }

    /**
     * Generate a BibTeX entry for a derivation
     */
    function derivationToBibtex(chain, options = {}) {
        const {
            key = `philang_derivation_${Date.now()}`,
            author = 'PhiLang User',
            title = 'Philosophical Derivation',
            note = ''
        } = options;

        const traditions = [...new Set(chain.flatMap(s => s.tradition || []))];

        return `@misc{${key},
    author = {${author}},
    title = {${title}},
    year = {${new Date().getFullYear()}},
    howpublished = {Generated by PhiLang},
    note = {Traditions: ${traditions.join(', ')}${note ? '. ' + note : ''}}
}`;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED DIALOGUE EXPORTS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Export dialogue to JSON format
     * @param {Object} dialogue - Dialogue object with entries, topic, traditions
     * @param {Object} options - Export options
     * @returns {string} JSON string
     */
    function dialogueToJSON(dialogue, options = {}) {
        const {
            includeMetadata = true,
            prettyPrint = true,
            includeTimestamps = true
        } = options;

        const exportData = {
            format: 'philang-dialogue',
            version: '1.0',
            exportedAt: includeTimestamps ? new Date().toISOString() : undefined,
            dialogue: {
                id: dialogue.id || `dialogue-${Date.now()}`,
                topic: dialogue.topic || {},
                mode: dialogue.mode || 'open',
                traditions: (dialogue.traditions || []).map(t => ({
                    id: t.id,
                    name: t.name,
                    color: t.color,
                    emoji: t.emoji
                })),
                entries: (dialogue.entries || []).map((entry, index) => ({
                    index,
                    type: entry.type || 'statement',
                    tradition: entry.tradition ? {
                        id: entry.tradition.id,
                        name: entry.tradition.name
                    } : null,
                    speaker: entry.speaker,
                    content: entry.content,
                    round: entry.round,
                    timestamp: includeTimestamps && entry.timestamp ? entry.timestamp : undefined
                })),
                totalEntries: (dialogue.entries || []).length,
                rounds: Math.max(...(dialogue.entries || []).map(e => e.round || 0), 0)
            }
        };

        if (includeMetadata) {
            exportData.metadata = {
                generator: 'PhiLang Dialectical Dialogue Engine',
                generatorVersion: '1.0.0',
                traditions: (dialogue.traditions || []).map(t => t.name)
            };
        }

        return prettyPrint ? JSON.stringify(exportData, null, 2) : JSON.stringify(exportData);
    }

    /**
     * Enhanced dialogue to LaTeX with academic formatting
     * @param {Object} dialogue - Dialogue object
     * @param {Object} options - Export options
     * @returns {string} LaTeX document
     */
    function dialogueToLatexEnhanced(dialogue, options = {}) {
        const {
            title = 'Dialectical Dialogue',
            author = '',
            includeAbstract = true,
            includeTOC = false,
            documentClass = 'article',
            fontSize = '11pt'
        } = options;

        const topic = dialogue.topic || {};
        const traditions = dialogue.traditions || [];
        const entries = dialogue.entries || [];

        // Count rounds and synthesises
        const rounds = Math.max(...entries.map(e => e.round || 0), 0);
        const syntheses = entries.filter(e => e.type === 'synthesis');

        let latex = `\\documentclass[${fontSize}]{${documentClass}}

% ═══════════════════════════════════════════════════════════════════════════
% PACKAGES
% ═══════════════════════════════════════════════════════════════════════════
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{mathrsfs}
\\usepackage{fontspec}
\\usepackage{unicode-math}
\\usepackage{csquotes}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{geometry}
\\usepackage{fancyhdr}
\\usepackage{titlesec}
\\usepackage{hyperref}

\\geometry{margin=1in}

% ═══════════════════════════════════════════════════════════════════════════
% COLORS FOR TRADITIONS
% ═══════════════════════════════════════════════════════════════════════════
`;

        // Define colors for each tradition
        traditions.forEach(t => {
            const colorName = t.id || t.name.toLowerCase().replace(/\s+/g, '');
            const hexColor = (t.color || '#999999').replace('#', '');
            latex += `\\definecolor{${escapeLatex(colorName)}}{HTML}{${hexColor}}\n`;
        });

        latex += `
% ═══════════════════════════════════════════════════════════════════════════
% CUSTOM ENVIRONMENTS
% ═══════════════════════════════════════════════════════════════════════════
\\newenvironment{dialogue}[2]{%
    \\vspace{0.5em}
    \\noindent\\textcolor{#1}{\\textbf{#2:}}\\\\
    \\itshape
}{\\vspace{0.5em}}

\\newenvironment{synthesis}{%
    \\vspace{1em}
    \\begin{center}
    \\rule{0.5\\textwidth}{0.4pt}\\\\[0.5em]
    \\textsc{Synthesis}\\\\[0.5em]
    \\rule{0.5\\textwidth}{0.4pt}
    \\end{center}
    \\begin{quote}
}{\\end{quote}\\vspace{1em}}

% ═══════════════════════════════════════════════════════════════════════════
% DOCUMENT
% ═══════════════════════════════════════════════════════════════════════════

\\title{${escapeLatex(title)}}
${author ? `\\author{${escapeLatex(author)}}` : ''}
\\date{\\today}

\\begin{document}
\\maketitle
`;

        if (includeTOC && rounds > 1) {
            latex += `\\tableofcontents\n\\newpage\n\n`;
        }

        if (includeAbstract) {
            latex += `\\begin{abstract}
A dialectical dialogue on \\textit{${escapeLatex(topic.title || 'philosophical inquiry')}} engaging ${traditions.length} philosophical tradition${traditions.length !== 1 ? 's' : ''}: ${traditions.map(t => escapeLatex(t.name)).join(', ')}.
The dialogue spans ${rounds} round${rounds !== 1 ? 's' : ''} of discourse${syntheses.length > 0 ? ` with ${syntheses.length} synthesis point${syntheses.length !== 1 ? 's' : ''}` : ''}.
\\end{abstract}

`;
        }

        // Participants section
        latex += `\\section{Participants}
\\begin{itemize}[noitemsep]
`;
        traditions.forEach(t => {
            const colorName = t.id || t.name.toLowerCase().replace(/\s+/g, '');
            latex += `    \\item \\textcolor{${escapeLatex(colorName)}}{\\textbf{${escapeLatex(t.name)}}}`;
            if (t.emoji) latex += ` ${t.emoji}`;
            latex += `\n`;
        });
        latex += `\\end{itemize}

\\section{Topic}
\\textit{${escapeLatex(topic.title || 'Unspecified')}}

${topic.description ? `\\noindent ${escapeLatex(topic.description)}\n\n` : ''}
\\section{Dialogue}

`;

        // Group entries by round
        let currentRound = 0;
        entries.forEach((entry, index) => {
            if (entry.round && entry.round !== currentRound) {
                currentRound = entry.round;
                latex += `\\subsection*{Round ${currentRound}}\n\n`;
            }

            if (entry.type === 'synthesis') {
                latex += `\\begin{synthesis}
${escapeLatex(entry.content || '')}
\\end{synthesis}

`;
            } else {
                const tradition = entry.tradition || {};
                const colorName = tradition.id || (tradition.name || '').toLowerCase().replace(/\s+/g, '') || 'black';
                const speaker = entry.speaker || tradition.name || 'Speaker';

                latex += `\\begin{dialogue}{${escapeLatex(colorName)}}{${escapeLatex(speaker)}}
${escapeLatex(entry.content || '')}
\\end{dialogue}

`;
            }
        });

        // Summary section
        latex += `\\section{Summary}

This dialectical dialogue consisted of ${entries.length} exchange${entries.length !== 1 ? 's' : ''} across ${rounds} round${rounds !== 1 ? 's' : ''}, featuring perspectives from ${traditions.map(t => escapeLatex(t.name)).join(', ')}.

\\vfill
\\begin{center}
\\small\\textit{Generated by PhiLang Dialectical Dialogue Engine}
\\end{center}

\\end{document}`;

        return latex;
    }

    /**
     * Export dialogue to PDF (browser-based generation)
     * Requires jspdf library to be loaded
     * @param {Object} dialogue - Dialogue object
     * @param {Object} options - Export options
     */
    async function dialogueToPDF(dialogue, options = {}) {
        const {
            title = 'Dialectical Dialogue',
            filename = `dialogue-${Date.now()}.pdf`,
            pageSize = 'a4',
            orientation = 'portrait'
        } = options;

        // Check if jspdf is available (jspdf UMD exports as window.jspdf.jsPDF)
        let jsPDFConstructor = null;

        // Try different access patterns for jspdf
        if (typeof window !== 'undefined' && window.jspdf && window.jspdf.jsPDF) {
            jsPDFConstructor = window.jspdf.jsPDF;
        } else if (typeof jspdf !== 'undefined' && jspdf.jsPDF) {
            jsPDFConstructor = jspdf.jsPDF;
        }

        // If not found, try to load dynamically
        if (!jsPDFConstructor) {
            try {
                await loadScript(CONFIG.pdfWorkerUrl);
                // Wait a moment for the script to initialize
                await new Promise(resolve => setTimeout(resolve, 100));

                if (window.jspdf && window.jspdf.jsPDF) {
                    jsPDFConstructor = window.jspdf.jsPDF;
                }
            } catch (e) {
                console.error('Failed to load jspdf:', e);
            }
        }

        if (!jsPDFConstructor) {
            if (typeof PhiLangToast !== 'undefined') {
                PhiLangToast.error('PDF export requires jspdf library. Please refresh the page.');
            }
            throw new Error('jspdf library not available');
        }

        const doc = new jsPDFConstructor({
            orientation,
            unit: 'mm',
            format: pageSize
        });

        const topic = dialogue.topic || {};
        const traditions = dialogue.traditions || [];
        const entries = dialogue.entries || [];

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        let y = margin;

        // Helper function to add text with word wrap
        function addWrappedText(text, x, startY, maxW, lineHeight = 6) {
            const lines = doc.splitTextToSize(text, maxW);
            lines.forEach((line, i) => {
                if (startY + (i * lineHeight) > pageHeight - margin) {
                    doc.addPage();
                    startY = margin;
                }
                doc.text(line, x, startY + (i * lineHeight));
            });
            return startY + (lines.length * lineHeight);
        }

        // Title
        doc.setFontSize(18);
        doc.setFont(CONFIG.titleFont || 'helvetica', 'bold');
        doc.text(title, pageWidth / 2, y, { align: 'center' });
        y += 12;

        // Topic
        doc.setFontSize(12);
        doc.setFont(CONFIG.defaultFont || 'helvetica', 'italic');
        doc.text(`Topic: ${topic.title || 'Philosophical Inquiry'}`, pageWidth / 2, y, { align: 'center' });
        y += 8;

        // Participants
        doc.setFontSize(10);
        doc.setFont(CONFIG.defaultFont || 'helvetica', 'normal');
        doc.text(`Participants: ${traditions.map(t => t.name).join(', ')}`, pageWidth / 2, y, { align: 'center' });
        y += 15;

        // Horizontal line
        doc.setDrawColor(150, 150, 150);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        // Dialogue entries
        entries.forEach((entry, index) => {
            // Check if we need a new page
            if (y > pageHeight - 40) {
                doc.addPage();
                y = margin;
            }

            if (entry.type === 'synthesis') {
                // Synthesis styling
                doc.setFontSize(11);
                doc.setFont(CONFIG.titleFont || 'helvetica', 'bold');
                doc.text(`⟐ SYNTHESIS — Round ${entry.round || ''}`, margin, y);
                y += 8;

                doc.setFontSize(10);
                doc.setFont(CONFIG.defaultFont || 'helvetica', 'italic');
                y = addWrappedText(entry.content || '', margin, y, maxWidth);
                y += 8;
            } else {
                // Speaker entry
                const tradition = entry.tradition || {};
                const speaker = entry.speaker || tradition.name || 'Speaker';

                doc.setFontSize(10);
                doc.setFont(CONFIG.titleFont || 'helvetica', 'bold');

                // Try to set tradition color
                if (tradition.color) {
                    const hex = tradition.color.replace('#', '');
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);
                    doc.setTextColor(r, g, b);
                }

                doc.text(`[${tradition.name || 'Unknown'}] ${speaker}:`, margin, y);
                y += 6;

                // Reset to black for content
                doc.setTextColor(0, 0, 0);
                doc.setFont(CONFIG.defaultFont || 'helvetica', 'normal');
                y = addWrappedText(entry.content || '', margin, y, maxWidth);
                y += 8;
            }
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Generated by PhiLang Dialectical Dialogue Engine', pageWidth / 2, pageHeight - 10, { align: 'center' });

        // Save
        doc.save(filename);

        if (typeof PhiLangToast !== 'undefined') {
            PhiLangToast.success(`Downloaded ${filename}`);
        }

        return doc;
    }

    /**
     * Export dialogue to Markdown (enhanced version)
     * @param {Object} dialogue - Dialogue object
     * @param {Object} options - Export options
     * @returns {string} Markdown text
     */
    function dialogueToMarkdown(dialogue, options = {}) {
        const {
            title = 'Dialectical Dialogue',
            includeMetadata = true,
            includeEmoji = true
        } = options;

        const topic = dialogue.topic || {};
        const traditions = dialogue.traditions || [];
        const entries = dialogue.entries || [];

        let md = `# ${title}\n\n`;

        if (includeMetadata) {
            md += `**Topic:** ${topic.title || 'Philosophical Inquiry'}\n`;
            md += `**Participants:** ${traditions.map(t => includeEmoji && t.emoji ? `${t.emoji} ${t.name}` : t.name).join(', ')}\n`;
            md += `**Mode:** ${dialogue.mode || 'open'}\n`;
            md += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
            md += `---\n\n`;
        }

        let currentRound = 0;

        entries.forEach((entry, index) => {
            // Round headers
            if (entry.round && entry.round !== currentRound) {
                currentRound = entry.round;
                md += `## Round ${currentRound}\n\n`;
            }

            if (entry.type === 'synthesis') {
                md += `### ⟐ Synthesis\n\n`;
                md += `> ${(entry.content || '').split('\n').join('\n> ')}\n\n`;
            } else {
                const tradition = entry.tradition || {};
                const emoji = includeEmoji && tradition.emoji ? `${tradition.emoji} ` : '';
                const speaker = entry.speaker || tradition.name || 'Speaker';

                md += `**${emoji}[${tradition.name || 'Unknown'}] ${speaker}:**\n\n`;
                md += `${entry.content || ''}\n\n`;
            }
        });

        md += `---\n\n`;
        md += `*Generated by PhiLang Dialectical Dialogue Engine*\n`;

        return md;
    }

    /**
     * Export dialogue to plain text
     * @param {Object} dialogue - Dialogue object
     * @param {Object} options - Export options
     * @returns {string} Plain text
     */
    function dialogueToText(dialogue, options = {}) {
        const {
            useUnicode = true,
            lineWidth = 60
        } = options;

        const divider = useUnicode ? '─'.repeat(lineWidth) : '-'.repeat(lineWidth);
        const doubleDivider = useUnicode ? '═'.repeat(lineWidth) : '='.repeat(lineWidth);

        const topic = dialogue.topic || {};
        const traditions = dialogue.traditions || [];
        const entries = dialogue.entries || [];

        let text = `${doubleDivider}\n`;
        text += `PHILANG DIALECTICAL DIALOGUE\n`;
        text += `${doubleDivider}\n\n`;

        text += `Topic: ${topic.title || 'Philosophical Inquiry'}\n`;
        text += `Participants: ${traditions.map(t => t.name).join(', ')}\n`;
        text += `Mode: ${dialogue.mode || 'open'}\n\n`;
        text += `${divider}\n\n`;

        entries.forEach((entry, index) => {
            if (entry.type === 'synthesis') {
                text += `\n${useUnicode ? '⟐' : '*'} SYNTHESIS — Round ${entry.round || ''}\n`;
                text += `${entry.content || ''}\n\n`;
            } else {
                const tradition = entry.tradition || {};
                const speaker = entry.speaker || tradition.name || 'Speaker';

                text += `[${tradition.name || 'Unknown'}] ${speaker}:\n`;
                text += `${entry.content || ''}\n\n`;
            }
        });

        text += `${divider}\n`;
        text += `Generated by PhiLang Dialectical Dialogue Engine\n`;

        return text;
    }

    /**
     * Helper: Load external script dynamically
     */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Public API
    return {
        // LaTeX exports
        derivationToLatex,
        dialogueToLatex,
        dialogueToLatexEnhanced,
        expressionToLatex,

        // Markdown exports
        sessionToMarkdown,
        derivationToMarkdown,
        dialogueToMarkdown,

        // JSON exports
        dialogueToJSON,

        // PDF exports
        dialogueToPDF,

        // Plain text
        dialogueToText,

        // BibTeX
        derivationToBibtex,

        // Utilities
        download,
        copyToClipboard,
        escapeLatex,
        loadScript,

        // Symbol mapping (for custom usage)
        LATEX_SYMBOLS,

        // Config
        CONFIG
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangExport;
}
