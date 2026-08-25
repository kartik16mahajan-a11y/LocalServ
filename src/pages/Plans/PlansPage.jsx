
import './PlansPage.css';

function PlansPage({ onSelectPlan }) {
  const billingCycle = 'Monthly';
  const activePlanTier = 'plus';

  const plansData = [
    {
      id: 'basic',
      name: 'LocalServ Standard',
      tag: 'Pay As You Go',
      price: 0,
      period: 'free forever',
      description: 'Essential access to 20+ verified home and personal service professionals.',
      features: [
        'Access to all 20+ service categories',
        'Standard booking & verified dispatch',
        'Transparent upfront fixed pricing',
        'Standard customer support'
      ],
      popular: false,
      ctaText: 'Current Plan'
    },
    {
      id: 'plus',
      name: 'LocalServ Premium Pass',
      tag: 'Most Popular',
      price: billingCycle === 'Monthly' ? 299 : 2499,
      period: billingCycle === 'Monthly' ? '/month' : '/year (Save 30%)',
      description: 'Maximum savings, zero inspection fees, and priority pro allocation for families.',
      features: [
        '⚡ 15% Flat Discount on all 20 categories',
        '🚀 Priority express pro dispatch (< 25 mins)',
        '🛠️ Zero inspection & visit charges',
        '🛡️ ₹25,000 complimentary damage cover',
        '📞 24/7 VIP priority support hotline',
        '🔄 Free unlimited booking rescheduling'
      ],
      popular: true,
      ctaText: 'Upgrade to Premium'
    },
    {
      id: 'business',
      name: 'LocalServ Enterprise / Villa',
      tag: 'Comprehensive',
      price: billingCycle === 'Monthly' ? 799 : 7999,
      period: billingCycle === 'Monthly' ? '/month' : '/year',
      description: 'For large residences, offices, villas, and commercial property maintenance.',
      features: [
        '⭐ Dedicated relationship manager',
        '🛠️ Monthly routine electrical & plumbing audit',
        '🧹 2 free deep cleaning sessions per year',
        '⚡ 20% Discount on all on-demand repairs',
        '📄 Itemized business GST invoices',
        '🔒 ₹50,000 extended damage insurance'
      ],
      popular: false,
      ctaText: 'Choose Enterprise'
    }
  ];

  const combos = [
    {
      id: 1,
      title: 'Home Care Elite Combo',
      desc: 'Deep House Cleaning + AC Servicing + Plumbing Inspection',
      originalPrice: '₹1,697',
      bundlePrice: '₹1,299',
      save: 'Save 25%',
      icon: '🏡'
    },
    {
      id: 2,
      title: 'New Home Shifting Setup',
      desc: 'Movers & Packers + Electrician Fitting + Wall Touchup Painter',
      originalPrice: '₹3,597',
      bundlePrice: '₹2,799',
      save: 'Save 22%',
      icon: '🚚'
    },
    {
      id: 3,
      title: 'Smart Gadget & IT Care',
      desc: 'Laptop Servicing + Mobile Screen Diagnostic + Wi-Fi Tuning',
      originalPrice: '₹1,197',
      bundlePrice: '₹899',
      save: 'Save 25%',
      icon: '💻'
    },
    {
      id: 4,
      title: 'Family Wellness & Chef',
      desc: 'Home Chef Weekly Plan + Deep Kitchen Sanitization',
      originalPrice: '₹1,498',
      bundlePrice: '₹1,150',
      save: 'Save 23%',
      icon: '👨‍🍳'
    }
  ];

  return (
    <div className="plans-page-root">
      <div className="plans-page-header">
        <div className="container">
          <span className="section-badge">✨ Membership & Savings</span>
          <h1 className="section-title">Transparent Membership & Combos</h1>
          <p className="section-subtitle">
            Unlock exclusive discounts, zero inspection fees, and guaranteed priority arrival with LocalServ Premium.
          </p>

          <div className="billing-toggle-container">
            <div className="billing-toggle">
              <button
                type="button"
                className={billingCycle === 'Monthly' ? 'toggle-btn active' : 'toggle-btn'}
                disabled
              >
                Monthly Billing
              </button>
              <button
                type="button"
                className={billingCycle === 'Yearly' ? 'toggle-btn active' : 'toggle-btn'}
                disabled
              >
                Yearly Billing <span className="discount-pill">Save 30%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Pricing Cards Grid */}
        <div className="plans-grid">
          {plansData.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'popular-card' : ''} ${activePlanTier === plan.id ? 'active-tier' : ''}`}
            >
              {plan.popular && <span className="badge-popular">{plan.tag}</span>}
              <div className="plan-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>
                <div className="plan-price-wrap">
                  <span className="currency">{plan.price === 0 ? '' : '₹'}</span>
                  <span className="amount">{plan.price === 0 ? 'Free' : plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>

              <div className="plan-divider" />

              <ul className="plan-feature-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`plan-cta-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                disabled
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Bundled Combos */}
        <div className="combos-wrapper">
          <div className="combos-header">
            <span className="section-badge">⚡ Value Bundles</span>
            <h2 className="combos-title">Economical Service Combos</h2>
            <p className="combos-desc">Bundle everyday services together and enjoy instant bundled savings.</p>
          </div>

          <div className="combos-grid">
            {combos.map((combo) => (
              <div className="combo-card" key={combo.id}>
                <div className="combo-top">
                  <div className="combo-icon">{combo.icon}</div>
                  <span className="save-badge">{combo.save}</span>
                </div>
                <h4 className="combo-name">{combo.title}</h4>
                <p className="combo-detail">{combo.desc}</p>
                
                <div className="combo-footer">
                  <div className="combo-pricing">
                    <span className="original-price">{combo.originalPrice}</span>
                    <span className="bundle-price">{combo.bundlePrice}</span>
                  </div>
                  <button
                    className="combo-book-btn"
                    disabled
                  >
                    Book Combo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlansPage;
