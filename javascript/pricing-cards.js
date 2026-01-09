// Pricing Cards Generator for NeoForge Tech
// Author: NeoForge Tech Team
// Date: 2026

// Pricing packages data structure
const pricingPackages = [
    {
        id: 'starter',
        name: 'Starter',
        icon: '🚀',
        subtitle: 'Perfect pentru startup-uri și proiecte mici',
        price: 999,
        currency: '€',
        period: '/lună',
        featured: false,
        features: [
            { text: 'Consultanță tehnologică', included: true },
            { text: 'Dezvoltare aplicații simple', included: true },
            { text: 'Suport email (48h răspuns)', included: true },
            { text: 'Până la 40 ore de dezvoltare/lună', included: true },
            { text: '1 revizie/iterație', included: true },
            { text: 'Documentație de bază', included: true },
            { text: 'Hosting basic inclus (1 an)', included: true },
            { text: 'AI/ML solutions', included: false },
            { text: 'Game development', included: false },
            { text: 'Suport prioritar', included: false },
            { text: 'Manager dedicat', included: false }
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        icon: '⭐',
        subtitle: 'Ideal pentru afaceri în creștere',
        price: 2499,
        currency: '€',
        period: '/lună',
        featured: true,
        featuredBadge: 'CEL MAI POPULAR',
        features: [
            { text: 'Consultanță avansată', included: true },
            { text: 'Dezvoltare aplicații complexe', included: true },
            { text: 'Suport prioritar (24h răspuns)', included: true },
            { text: 'Până la 100 ore de dezvoltare/lună', included: true },
            { text: '3 revizii/iterații', included: true },
            { text: 'Documentație completă', included: true },
            { text: 'Hosting premium inclus (2 ani)', included: true },
            { text: 'Soluții AI/ML de bază', included: true },
            { text: 'Optimizare performanță', included: true },
            { text: 'Code review săptămânal', included: true },
            { text: 'Manager dedicat 24/7', included: false }
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        icon: '👑',
        subtitle: 'Soluții complete pentru corporații',
        price: 4999,
        currency: '€',
        period: '/lună',
        featured: false,
        features: [
            { text: 'Consultanță strategică completă', included: true },
            { text: 'Dezvoltare enterprise-grade', included: true },
            { text: 'Suport dedicat 24/7', included: true },
            { text: 'Ore nelimitate de dezvoltare', included: true },
            { text: 'Revizii nelimitate', included: true },
            { text: 'Documentație enterprise completă', included: true },
            { text: 'Hosting dedicat inclus (5 ani)', included: true },
            { text: 'Soluții AI/ML avansate', included: true },
            { text: 'Game development complet', included: true },
            { text: 'Optimizare hardware dedicată', included: true },
            { text: 'Manager de proiect dedicat 24/7', included: true },
            { text: 'Training echipă inclus', included: true },
            { text: 'SLA garantat 99.9%', included: true },
            { text: 'Acces la tehnologii proprietare', included: true }
        ]
    }
];

/**
 * Generate HTML for a single pricing card
 * @param {object} packageData - Package data object
 * @returns {string} HTML string for the pricing card
 */
function generatePricingCard(packageData) {
    const featuredClass = packageData.featured ? ' featured' : '';

    let html = `<article class="pricing-card${featuredClass}">`;

    // Add featured badge if applicable
    if (packageData.featured && packageData.featuredBadge) {
        html += `<div class="popular-badge">${packageData.featuredBadge}</div>`;
    }

    // Pricing header
    html += `<div class="pricing-header">`;
    html += `<div class="tier-icon">${packageData.icon}</div>`;
    html += `<h2>${packageData.name}</h2>`;
    html += `<p class="tier-subtitle">${packageData.subtitle}</p>`;
    html += `</div>`;

    // Pricing price
    html += `<div class="pricing-price">`;
    html += `<span class="currency">${packageData.currency}</span>`;
    html += `<span class="amount">${packageData.price.toLocaleString()}</span>`;
    html += `<span class="period">${packageData.period}</span>`;
    html += `</div>`;

    // Features list
    html += `<ul class="pricing-features">`;
    packageData.features.forEach(feature => {
        const featureClass = feature.included ? 'feature-included' : 'feature-not-included';
        html += `<li class="${featureClass}">${feature.text}</li>`;
    });
    html += `</ul>`;

    // CTA button
    html += `<a href="contact.html" class="pricing-button">Alege ${packageData.name}</a>`;

    html += `</article>`;

    return html;
}

/**
 * Generate all pricing cards and insert them into the DOM
 * @param {string} containerId - ID of the container element
 */
function renderPricingCards(containerId = 'pricing-cards-container') {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }

    let allCardsHTML = '';
    pricingPackages.forEach(packageData => {
        allCardsHTML += generatePricingCard(packageData);
    });

    container.innerHTML = allCardsHTML;
}

/**
 * Get package data by ID
 * @param {string} packageId - ID of the package
 * @returns {object|null} Package data or null if not found
 */
function getPackageById(packageId) {
    return pricingPackages.find(pkg => pkg.id === packageId) || null;
}

/**
 * Get all packages data
 * @returns {array} Array of all packages
 */
function getAllPackages() {
    return pricingPackages;
}

/**
 * Get featured package
 * @returns {object|null} Featured package or null
 */
function getFeaturedPackage() {
    return pricingPackages.find(pkg => pkg.featured) || null;
}

/**
 * Filter packages by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {array} Filtered packages
 */
function getPackagesByPriceRange(minPrice, maxPrice) {
    return pricingPackages.filter(pkg => pkg.price >= minPrice && pkg.price <= maxPrice);
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderPricingCards();
});

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        pricingPackages,
        generatePricingCard,
        renderPricingCards,
        getPackageById,
        getAllPackages,
        getFeaturedPackage,
        getPackagesByPriceRange
    };
}
