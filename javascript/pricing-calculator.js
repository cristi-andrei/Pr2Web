// Pricing Calculator for NeoForge Tech
// Author: NeoForge Tech Team
// Date: 2026

// Pricing constants
const PRICING = {
    starter: {
        monthly: 999,
        hourlyRate: 100,
        includedHours: 40
    },
    professional: {
        monthly: 2499,
        hourlyRate: 100,
        includedHours: 100
    },
    enterprise: {
        monthly: 4999,
        hourlyRate: 0, // Unlimited hours
        includedHours: Infinity
    }
};

const DISCOUNTS = {
    annual: 0.15, // 15% discount for annual payment
    quarterly: 0.05 // 5% discount for quarterly payment
};

const ADDITIONAL_SERVICES = {
    maintenance: 299,
    training: 150,
    urgentDev: 200,
    audit: 999
};

/**
 * Calculate total price based on package, billing period, and extra hours
 * @param {string} packageType - Type of package: 'starter', 'professional', or 'enterprise'
 * @param {string} billingPeriod - Billing period: 'monthly', 'quarterly', or 'annual'
 * @param {number} extraHours - Extra hours needed beyond included hours
 * @returns {object} Object containing breakdown of costs
 */
function calculatePrice(packageType, billingPeriod = 'monthly', extraHours = 0) {
    if (!PRICING[packageType]) {
        return { error: 'Pachet invalid. Alege: starter, professional sau enterprise' };
    }

    const basePrice = PRICING[packageType].monthly;
    const hourlyRate = PRICING[packageType].hourlyRate;
    const includedHours = PRICING[packageType].includedHours;

    // Calculate extra hours cost
    let extraHoursCost = 0;
    if (extraHours > 0 && packageType !== 'enterprise') {
        extraHoursCost = extraHours * hourlyRate;
    }

    // Calculate monthly total
    const monthlyTotal = basePrice + extraHoursCost;

    // Calculate based on billing period
    let total = monthlyTotal;
    let discount = 0;
    let months = 1;

    if (billingPeriod === 'quarterly') {
        months = 3;
        total = monthlyTotal * months;
        discount = total * DISCOUNTS.quarterly;
        total -= discount;
    } else if (billingPeriod === 'annual') {
        months = 12;
        total = monthlyTotal * months;
        discount = total * DISCOUNTS.annual;
        total -= discount;
    }

    return {
        packageType: packageType,
        billingPeriod: billingPeriod,
        basePrice: basePrice,
        includedHours: includedHours === Infinity ? 'Nelimitate' : includedHours,
        extraHours: extraHours,
        extraHoursCost: extraHoursCost,
        monthlyTotal: monthlyTotal,
        months: months,
        subtotal: monthlyTotal * months,
        discount: discount,
        discountPercent: billingPeriod === 'annual' ? 15 : (billingPeriod === 'quarterly' ? 5 : 0),
        total: total,
        currency: '€'
    };
}

/**
 * Calculate price with additional services
 * @param {string} packageType - Type of package
 * @param {string} billingPeriod - Billing period
 * @param {number} extraHours - Extra hours needed
 * @param {object} additionalServices - Object with service names and quantities
 * @returns {object} Object containing breakdown of all costs
 */
function calculatePriceWithServices(packageType, billingPeriod = 'monthly', extraHours = 0, additionalServices = {}) {
    const baseCalculation = calculatePrice(packageType, billingPeriod, extraHours);

    if (baseCalculation.error) {
        return baseCalculation;
    }

    let servicesTotal = 0;
    const servicesBreakdown = [];

    // Calculate additional services
    for (const [service, quantity] of Object.entries(additionalServices)) {
        if (ADDITIONAL_SERVICES[service] && quantity > 0) {
            const serviceCost = ADDITIONAL_SERVICES[service] * quantity;
            servicesTotal += serviceCost;
            servicesBreakdown.push({
                service: service,
                unitPrice: ADDITIONAL_SERVICES[service],
                quantity: quantity,
                total: serviceCost
            });
        }
    }

    return {
        ...baseCalculation,
        additionalServices: servicesBreakdown,
        servicesTotal: servicesTotal,
        grandTotal: baseCalculation.total + servicesTotal
    };
}

/**
 * Format price result for display
 * @param {object} priceResult - Result from calculatePrice or calculatePriceWithServices
 * @returns {string} Formatted HTML string
 */
function formatPriceDisplay(priceResult) {
    if (priceResult.error) {
        return `<div class="price-error">${priceResult.error}</div>`;
    }

    let html = '<div class="price-breakdown">';
    html += `<h3>Detalii Calcul Preț</h3>`;
    html += `<div class="price-item"><span>Pachet:</span><span>${priceResult.packageType.toUpperCase()}</span></div>`;
    html += `<div class="price-item"><span>Preț bază lunar:</span><span>${priceResult.currency}${priceResult.basePrice}</span></div>`;
    html += `<div class="price-item"><span>Ore incluse:</span><span>${priceResult.includedHours}</span></div>`;

    if (priceResult.extraHours > 0) {
        html += `<div class="price-item"><span>Ore suplimentare (${priceResult.extraHours}h):</span><span>${priceResult.currency}${priceResult.extraHoursCost}</span></div>`;
    }

    html += `<div class="price-item"><span>Total lunar:</span><span>${priceResult.currency}${priceResult.monthlyTotal}</span></div>`;
    html += `<div class="price-item"><span>Perioada facturare:</span><span>${priceResult.months} ${priceResult.months === 1 ? 'lună' : 'luni'}</span></div>`;
    html += `<div class="price-item"><span>Subtotal:</span><span>${priceResult.currency}${priceResult.subtotal.toFixed(2)}</span></div>`;

    if (priceResult.discount > 0) {
        html += `<div class="price-item discount"><span>Discount (${priceResult.discountPercent}%):</span><span>-${priceResult.currency}${priceResult.discount.toFixed(2)}</span></div>`;
    }

    if (priceResult.additionalServices && priceResult.additionalServices.length > 0) {
        html += '<div class="services-section">';
        html += '<h4>Servicii Suplimentare:</h4>';
        priceResult.additionalServices.forEach(service => {
            html += `<div class="price-item"><span>${service.service} (${service.quantity}x ${service.unitPrice}${priceResult.currency}):</span><span>${priceResult.currency}${service.total}</span></div>`;
        });
        html += `<div class="price-item"><span>Total servicii:</span><span>${priceResult.currency}${priceResult.servicesTotal}</span></div>`;
        html += '</div>';
    }

    const finalTotal = priceResult.grandTotal || priceResult.total;
    html += `<div class="price-item total"><span>TOTAL DE PLATĂ:</span><span>${priceResult.currency}${finalTotal.toFixed(2)}</span></div>`;
    html += '</div>';

    return html;
}

/**
 * Compare prices between packages
 * @param {string} billingPeriod - Billing period for comparison
 * @returns {object} Comparison of all packages
 */
function comparePackages(billingPeriod = 'monthly') {
    const packages = ['starter', 'professional', 'enterprise'];
    const comparison = {};

    packages.forEach(pkg => {
        comparison[pkg] = calculatePrice(pkg, billingPeriod, 0);
    });

    return comparison;
}

/**
 * Calculate savings from annual payment
 * @param {string} packageType - Type of package
 * @returns {object} Savings information
 */
function calculateAnnualSavings(packageType) {
    const monthly = calculatePrice(packageType, 'monthly', 0);
    const annual = calculatePrice(packageType, 'annual', 0);

    if (monthly.error || annual.error) {
        return { error: 'Pachet invalid' };
    }

    const monthlyYearlyCost = monthly.total * 12;
    const savings = monthlyYearlyCost - annual.total;
    const savingsPercent = (savings / monthlyYearlyCost) * 100;

    return {
        packageType: packageType,
        monthlyPayment: monthly.total,
        monthlyYearlyCost: monthlyYearlyCost,
        annualPayment: annual.total,
        savings: savings,
        savingsPercent: savingsPercent.toFixed(1)
    };
}

// Export functions for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatePrice,
        calculatePriceWithServices,
        formatPriceDisplay,
        comparePackages,
        calculateAnnualSavings,
        PRICING,
        ADDITIONAL_SERVICES
    };
}
