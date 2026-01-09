================================================================================
                        NEOFORGE TECH - WEBSITE DE PREZENTARE
================================================================================

Autor: Student Informatica, Anul 3
Data: 09 Ianuarie 2026

================================================================================
1. DESPRE WEBSITE
================================================================================

NeoForge Tech este un website de prezentare pentru o companie fictivă 
specializată în dezvoltarea de soluții AI și jocuri video imersive.

DATE COMPANIE:
- Adresă: Str. Trandafirilor, nr. 10, Târgu Mureș, România
- Email: contact@neoforgetech.ro
- Telefon: +40 773 111 222

SERVICII OFERITE:
- Soluții AI/ML (Neural Networks, NLP, Computer Vision)
- Dezvoltare jocuri video (Unity, Unreal Engine)
- Optimizare hardware pentru gaming și AI
- Programare personalizată (Web, Backend, Desktop)
- Consultanță tehnologică

================================================================================
2. STRUCTURA WEBSITE-ULUI (4 PAGINI)
================================================================================

┌─────────────────────────────────────────────────────────────────────────┐
│ home.html          │ Pagina principală cu prezentare generală          │
├─────────────────────────────────────────────────────────────────────────┤
│ servicii.html      │ Detalii despre toate serviciile oferite           │
├─────────────────────────────────────────────────────────────────────────┤
│ preturi.html       │ 3 pachete + calculator interactiv JavaScript      │
├─────────────────────────────────────────────────────────────────────────┤
│ contact.html       │ Formular contact + informații companie            │
└─────────────────────────────────────────────────────────────────────────┘

Toate paginile au:
- Header cu logo și navigare completă
- Footer cu date de contact
- Design responsive (mobile, tablet, desktop)

================================================================================
3. ROLUL FIECĂREI PAGINI
================================================================================

HOME.HTML - Pagina Principală
├── Hero section cu call-to-action
├── Descriere companie și misiune
└── 6 carduri: De ce să alegi NeoForge Tech?
    (Expertiză ML, Dezvoltare Rapidă, Reducere Costuri, Gaming, 
     Optimizare Hardware, Soluții Personalizate)

SERVICII.HTML - Prezentare Servicii
├── 6 carduri detaliate cu servicii
│   (AI Solutions, Game Development, Hardware Optimization,
│    Custom Programming, Tech Consulting, Maintenance)
├── Procesul de lucru în 4 pași
├── Tehnologii folosite (3 categorii: AI/ML, Game Dev, Web)
└── CTA banner

PRETURI.HTML - Pachete și Prețuri
├── Calculator interactiv JavaScript (calcul personalizat)
├── Calculator economii anuale
├── 3 Pachete generate dinamic cu JavaScript:
│   ├── STARTER: €999/lună (40h, suport email 48h)
│   ├── PROFESSIONAL: €2,499/lună (100h, suport 24h, AI/ML)
│   └── ENTERPRISE: €4,999/lună (ore nelimitate, suport 24/7)
├── Tabel comparativ pachete
├── Servicii suplimentare (Mentenanță, Training, Audit)
└── FAQ (6 întrebări)

CONTACT.HTML - Formular Contact
├── Formular complet (nume, email, telefon, subiect, mesaj, GDPR)
├── 4 carduri info: Adresă, Email, Telefon, Program
├── Placeholder hartă
└── Secțiune beneficii contact

================================================================================
4. IMPLEMENTĂRI JAVASCRIPT
================================================================================

Website-ul folosește 2 fișiere JavaScript externe:

--------------------------------------------------------------------------------
4.1. PRICING-CARDS.JS - Generare Dinamică Carduri Prețuri
--------------------------------------------------------------------------------

ROL: Generează automat cele 3 carduri de pricing din JavaScript în loc să fie 
     scrise static în HTML.

STRUCTURA:
const pricingPackages = [
    {
        id: 'starter',
        name: 'Starter',
        price: 999,
        features: [
            { text: 'Consultanță tehnologică', included: true },
            { text: 'AI/ML solutions', included: false },
            ...
        ]
    },
    { /* Professional */ },
    { /* Enterprise */ }
]

FUNCȚII PRINCIPALE:
1. generatePricingCard(packageData)
   → Primește: Object cu date pachet
   → Returnează: String HTML pentru un card complet

2. renderPricingCards(containerId)
   → Primește: ID container HTML
   → Acțiune: Inserează toate cardurile în pagină
   → Auto-initialize la DOMContentLoaded

3. getPackageById(packageId) - Găsește un pachet specific
4. getAllPackages() - Returnează toate pachetele
5. getFeaturedPackage() - Returnează pachetul popular
6. getPackagesByPriceRange(min, max) - Filtrare după preț

AVANTAJE:
✓ HTML mai curat - doar un container gol
✓ Modificare ușoară prețuri fără să schimbi HTML
✓ Separare completă date vs. prezentare

--------------------------------------------------------------------------------
4.2. PRICING-CALCULATOR.JS - Calculator Interactiv Prețuri
--------------------------------------------------------------------------------

ROL: Calculator de prețuri în timp real cu discount-uri, ore suplimentare și
     servicii adiționale.

FUNCȚII PRINCIPALE:

1. calculatePrice(packageType, billingPeriod, extraHours)
   → Primește: 'starter'|'professional'|'enterprise', 'monthly'|'quarterly'|'annual', Number
   → Returnează: Object cu breakdown complet (basePrice, discount, total)
   → Aplică: 15% discount anual, 5% discount trimestrial
   → Calcul ore extra: €100/oră (doar Starter și Professional)

2. calculatePriceWithServices(packageType, billingPeriod, extraHours, additionalServices)
   → Primește: Parametri + Object { maintenance, training, urgentDev, audit }
   → Returnează: Object extins cu servicesTotal și grandTotal
   → Adaugă: Mentenanță €299, Training €150/h, Urgente €200/h, Audit €999

3. formatPriceDisplay(priceResult)
   → Primește: Object rezultat calcul
   → Returnează: String HTML formatat pentru afișare
   → Generează: Tabel cu detalii complete și total evidențiat

4. comparePackages(billingPeriod) - Compară toate pachetele
5. calculateAnnualSavings(packageType) - Economii plată anuală

INTERACTIVITATE:
- Formular cu dropdown-uri pentru pachet și perioadă facturare
- Input-uri pentru ore suplimentare și servicii adiționale
- Buton "Calculează Prețul" → afișează rezultat în timp real
- Buton "Calculează Economiile" → arată economii plată anuală

CONSTANTE:
PRICING = { starter: 999, professional: 2499, enterprise: 4999 }
DISCOUNTS = { annual: 15%, quarterly: 5% }
ADDITIONAL_SERVICES = { maintenance: 299, training: 150, urgentDev: 200, audit: 999 }

EXEMPLU UTILIZARE:
const result = calculatePrice('professional', 'annual', 10);
// Result: { basePrice: 2499, extraHoursCost: 1000, discount: 5998.8, total: 35989.2 }

================================================================================
5. FIȘIERE ȘI TEHNOLOGII
================================================================================

STRUCTURA FIȘIERELOR:
├── home.html, servicii.html, preturi.html, contact.html
├── style.css (toate stilurile - ZERO CSS inline)
├── pricing-cards.js (generare dinamică carduri)
├── pricing-calculator.js (calculator interactiv)
└── readme.txt (acest fișier)

TEHNOLOGII:
- HTML5 (semantic markup, form validation)
- CSS3 (Flexbox, Grid, Animations, Gradients, Media Queries)
- JavaScript ES6+ (Arrow functions, Template literals, DOM manipulation)

CARACTERISTICI CSS:
- Zero CSS inline - tot extern în style.css
- Gradient backgrounds
- Hover effects și transitions
- Animații @keyframes (fadeInDown, fadeInUp)
- Design responsive cu media queries

BEST PRACTICES:
✓ Separare completă HTML / CSS / JavaScript
✓ Semantic HTML pentru SEO
✓ Mobile-first responsive design
✓ Funcții JavaScript modulare și reutilizabile
✓ DRY principle (Don't Repeat Yourself)

================================================================================
6. CUM SĂ FOLOSEȘTI WEBSITE-UL
================================================================================

DESCHIDERE:
1. Deschide "home.html" în browser
2. Navighează între pagini din meniul header

CALCULATOR PREȚURI (preturi.html):
1. Selectează pachetul și perioada de facturare
2. Introdu ore suplimentare și servicii adiționale (opțional)
3. Click "Calculează Prețul"
4. Vezi rezultatul cu breakdown complet

FORMULAR CONTACT (contact.html):
1. Completează câmpurile obligatorii (*)
2. Selectează subiectul din dropdown
3. Bifează acordul GDPR
4. Click "Trimite Mesajul"

================================================================================
7. COPYRIGHT
================================================================================

© 2026 NeoForge Tech - Proiect educațional
Student Informatica, Anul 3, UMFST Târgu Mureș

NeoForge Tech este o companie fictivă creată pentru demonstrarea
abilităților de dezvoltare web.

================================================================================
