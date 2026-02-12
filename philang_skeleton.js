/**
 * PhiLang Skeleton Loader System
 * Provides loading placeholders for better perceived performance
 */

const PhiLangSkeleton = (function() {
    'use strict';

    /**
     * Create a skeleton element
     * @param {string} type - Type of skeleton: 'text', 'circle', 'rect', 'card', 'message', 'concept'
     * @param {Object} options - Configuration options
     */
    function create(type, options = {}) {
        const skeleton = document.createElement('div');
        skeleton.className = `philang-skeleton philang-skeleton-${type}`;

        if (options.className) {
            skeleton.className += ` ${options.className}`;
        }

        if (options.width) skeleton.style.width = options.width;
        if (options.height) skeleton.style.height = options.height;

        switch (type) {
            case 'text':
                return createTextSkeleton(skeleton, options);
            case 'circle':
                return createCircleSkeleton(skeleton, options);
            case 'rect':
                return createRectSkeleton(skeleton, options);
            case 'card':
                return createCardSkeleton(skeleton, options);
            case 'message':
                return createMessageSkeleton(skeleton, options);
            case 'concept':
                return createConceptSkeleton(skeleton, options);
            case 'graph-node':
                return createGraphNodeSkeleton(skeleton, options);
            case 'dialogue-entry':
                return createDialogueEntrySkeleton(skeleton, options);
            default:
                return skeleton;
        }
    }

    function createTextSkeleton(skeleton, options) {
        const lines = options.lines || 1;
        skeleton.innerHTML = '';

        for (let i = 0; i < lines; i++) {
            const line = document.createElement('div');
            line.className = 'skeleton-line';
            // Last line is often shorter
            if (i === lines - 1 && lines > 1) {
                line.style.width = `${60 + Math.random() * 20}%`;
            }
            skeleton.appendChild(line);
        }

        return skeleton;
    }

    function createCircleSkeleton(skeleton, options) {
        const size = options.size || '40px';
        skeleton.style.width = size;
        skeleton.style.height = size;
        skeleton.style.borderRadius = '50%';
        return skeleton;
    }

    function createRectSkeleton(skeleton, options) {
        skeleton.style.borderRadius = options.radius || 'var(--radius-sm, 4px)';
        return skeleton;
    }

    function createCardSkeleton(skeleton, options) {
        skeleton.innerHTML = `
            <div class="skeleton-card-header">
                <div class="philang-skeleton philang-skeleton-circle" style="width: 48px; height: 48px;"></div>
                <div class="skeleton-card-title">
                    <div class="skeleton-line" style="width: 60%;"></div>
                    <div class="skeleton-line" style="width: 40%;"></div>
                </div>
            </div>
            <div class="skeleton-card-body">
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line" style="width: 75%;"></div>
            </div>
        `;
        return skeleton;
    }

    function createMessageSkeleton(skeleton, options) {
        const isUser = options.isUser || false;
        skeleton.className += isUser ? ' skeleton-message-user' : ' skeleton-message-ai';

        skeleton.innerHTML = `
            <div class="skeleton-message-avatar">
                <div class="philang-skeleton philang-skeleton-circle" style="width: 36px; height: 36px;"></div>
            </div>
            <div class="skeleton-message-content">
                <div class="skeleton-line" style="width: 90%;"></div>
                <div class="skeleton-line" style="width: 70%;"></div>
                <div class="skeleton-line" style="width: 80%;"></div>
            </div>
        `;
        return skeleton;
    }

    function createConceptSkeleton(skeleton, options) {
        skeleton.innerHTML = `
            <div class="skeleton-concept-symbol">
                <div class="philang-skeleton philang-skeleton-circle" style="width: 32px; height: 32px;"></div>
            </div>
            <div class="skeleton-concept-info">
                <div class="skeleton-line" style="width: 70%;"></div>
                <div class="skeleton-line" style="width: 50%; height: 8px;"></div>
            </div>
        `;
        return skeleton;
    }

    function createGraphNodeSkeleton(skeleton, options) {
        skeleton.innerHTML = `
            <div class="philang-skeleton philang-skeleton-circle" style="width: 60px; height: 60px; margin: 0 auto;"></div>
            <div class="skeleton-line" style="width: 80%; margin: 8px auto 0;"></div>
        `;
        return skeleton;
    }

    function createDialogueEntrySkeleton(skeleton, options) {
        skeleton.innerHTML = `
            <div class="skeleton-dialogue-header">
                <div class="philang-skeleton philang-skeleton-circle" style="width: 40px; height: 40px;"></div>
                <div class="skeleton-line" style="width: 120px;"></div>
            </div>
            <div class="skeleton-dialogue-body">
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line" style="width: 60%;"></div>
            </div>
        `;
        return skeleton;
    }

    /**
     * Create multiple skeletons
     */
    function createMultiple(type, count, options = {}) {
        const container = document.createElement('div');
        container.className = 'skeleton-container';

        for (let i = 0; i < count; i++) {
            container.appendChild(create(type, options));
        }

        return container;
    }

    /**
     * Show skeleton in a container, replacing its content
     */
    function show(container, type, options = {}) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) return null;

        // Store original content
        container.dataset.originalContent = container.innerHTML;
        container.classList.add('skeleton-loading');

        const count = options.count || 1;
        container.innerHTML = '';

        if (count > 1) {
            container.appendChild(createMultiple(type, count, options));
        } else {
            container.appendChild(create(type, options));
        }

        return container;
    }

    /**
     * Hide skeleton and restore original content
     */
    function hide(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) return;

        container.classList.remove('skeleton-loading');

        if (container.dataset.originalContent) {
            container.innerHTML = container.dataset.originalContent;
            delete container.dataset.originalContent;
        }
    }

    /**
     * Replace skeleton with new content
     */
    function replace(container, newContent) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) return;

        container.classList.remove('skeleton-loading');
        delete container.dataset.originalContent;

        if (typeof newContent === 'string') {
            container.innerHTML = newContent;
        } else if (newContent instanceof Node) {
            container.innerHTML = '';
            container.appendChild(newContent);
        }
    }

    /**
     * Inject skeleton CSS styles
     */
    function injectStyles() {
        if (document.getElementById('philang-skeleton-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'philang-skeleton-styles';
        styles.textContent = `
            @keyframes skeleton-shimmer {
                0% {
                    background-position: -200% 0;
                }
                100% {
                    background-position: 200% 0;
                }
            }

            .philang-skeleton {
                background: linear-gradient(
                    90deg,
                    rgba(61, 55, 80, 0.2) 0%,
                    rgba(61, 55, 80, 0.4) 50%,
                    rgba(61, 55, 80, 0.2) 100%
                );
                background-size: 200% 100%;
                animation: skeleton-shimmer 1.5s ease-in-out infinite;
                border-radius: var(--radius-sm, 4px);
            }

            .skeleton-line {
                height: 12px;
                width: 100%;
                background: linear-gradient(
                    90deg,
                    rgba(61, 55, 80, 0.2) 0%,
                    rgba(61, 55, 80, 0.4) 50%,
                    rgba(61, 55, 80, 0.2) 100%
                );
                background-size: 200% 100%;
                animation: skeleton-shimmer 1.5s ease-in-out infinite;
                border-radius: var(--radius-sm, 4px);
                margin-bottom: 8px;
            }

            .skeleton-line:last-child {
                margin-bottom: 0;
            }

            .philang-skeleton-text {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .philang-skeleton-circle {
                border-radius: 50%;
            }

            /* Card skeleton */
            .philang-skeleton-card {
                padding: 1rem;
                background: rgba(22, 20, 28, 0.5);
                border: 1px solid rgba(61, 55, 80, 0.3);
                border-radius: var(--radius-md, 8px);
            }

            .skeleton-card-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }

            .skeleton-card-title {
                flex: 1;
            }

            .skeleton-card-title .skeleton-line:first-child {
                height: 16px;
                margin-bottom: 6px;
            }

            .skeleton-card-title .skeleton-line:last-child {
                height: 10px;
            }

            .skeleton-card-body .skeleton-line {
                height: 10px;
            }

            /* Message skeleton */
            .philang-skeleton-message {
                display: flex;
                gap: 12px;
                padding: 12px;
                margin-bottom: 12px;
            }

            .skeleton-message-user {
                flex-direction: row-reverse;
            }

            .skeleton-message-content {
                flex: 1;
                max-width: 70%;
            }

            .skeleton-message-user .skeleton-message-content {
                margin-left: auto;
            }

            /* Concept skeleton */
            .philang-skeleton-concept {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: rgba(22, 20, 28, 0.5);
                border: 1px solid rgba(61, 55, 80, 0.3);
                border-radius: var(--radius-sm, 4px);
                margin-bottom: 8px;
            }

            .skeleton-concept-info {
                flex: 1;
            }

            .skeleton-concept-info .skeleton-line:first-child {
                height: 14px;
                margin-bottom: 4px;
            }

            /* Graph node skeleton */
            .philang-skeleton-graph-node {
                text-align: center;
                padding: 12px;
            }

            /* Dialogue entry skeleton */
            .philang-skeleton-dialogue-entry {
                padding: 16px;
                background: rgba(22, 20, 28, 0.5);
                border-left: 3px solid rgba(61, 55, 80, 0.4);
                border-radius: 0 8px 8px 0;
                margin-bottom: 16px;
            }

            .skeleton-dialogue-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            }

            .skeleton-dialogue-body .skeleton-line {
                height: 14px;
            }

            /* Container styles */
            .skeleton-container {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .skeleton-loading {
                position: relative;
                overflow: hidden;
            }

            /* Pulse variant for simple elements */
            .skeleton-pulse {
                animation: skeleton-pulse 1.5s ease-in-out infinite;
            }

            @keyframes skeleton-pulse {
                0%, 100% {
                    opacity: 0.4;
                }
                50% {
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Auto-inject styles
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectStyles);
    } else {
        injectStyles();
    }

    // Public API
    return {
        create,
        createMultiple,
        show,
        hide,
        replace,
        injectStyles
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiLangSkeleton;
}
