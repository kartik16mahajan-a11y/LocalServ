import { useState } from 'react';
import { PLANS, COMBOS } from '../../data/servicesData';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/format';
import './PlansPage.css';

function PlansPage() {
  const { currentUser, openAuth, updateUser } = useAuth();
  const { startBooking } = useData();
  const { showToast } = useToast();

  const [billingCycle, setBillingCycle] = useState('Monthly'); // 'Monthly' | 'Yearly'

  // Plan the logged-in user has chosen (guests and providers see none)
  const activePlanId = currentUser?.role === 'user' ? currentUser.plan : null;

  const handleChoosePlan = (plan) => {
    if (!currentUser) {
      showToast('Please login to choose a plan.', 'info');
      openAuth('login', 'user');
    } else if (currentUser.role === 'provider') {
      showToast('Plans are available for user accounts only.', 'error');
    } else {
      updateUser({ plan: plan.id });
      showToast(`You are now on ${plan.name}.`);
    }
  };

  // A combo is booked like a normal service
  const handleBookCombo = (combo) => {
    startBooking({
      id: combo.id,
      serviceId: combo.serviceId,
      title: combo.title,
      icon: combo.icon,
      startingPrice: combo.bundlePrice,
    });
  };

  return (
    <div className="plans-page-root">
      <div className="plans-page-header">
        <div className="container">
          <span className="section-badge">Membership & Savings</span>
          <h1 className="section-title">Transparent Membership & Combos</h1>
          <p className="section-subtitle">
            Unlock exclusive discounts, zero inspection fees and priority arrival with LocalServ Premium.
          </p>

          <div className="billing-toggle-container">
            <div className="billing-toggle">
              <button
                type="button"
                className={billingCycle === 'Monthly' ? 'toggle-btn active' : 'toggle-btn'}
                onClick={() => setBillingCycle('Monthly')}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                className={billingCycle === 'Yearly' ? 'toggle-btn active' : 'toggle-btn'}
                onClick={() => setBillingCycle('Yearly')}
              >
                Yearly Billing <span className="discount-pill">Save 30%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="plans-grid">
          {PLANS.map((plan) => {
            const price = billingCycle === 'Monthly' ? plan.monthly : plan.yearly;
            const isCurrent = activePlanId === plan.id;
            return (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? 'popular-card' : ''} ${isCurrent ? 'active-tier' : ''}`}
              >
                {plan.popular && <span className="badge-popular">Most Popular</span>}
                <div className="plan-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>
                  <div className="plan-price-wrap">
                    {price === 0 ? (
                      <span className="amount">Free</span>
                    ) : (
                      <>
                        <span className="currency">₹</span>
                        <span className="amount">{price.toLocaleString('en-IN')}</span>
                      </>
                    )}
                    <span className="period">
                      {price === 0 ? 'forever' : billingCycle === 'Monthly' ? '/month' : '/year'}
                    </span>
                  </div>
                </div>

                <div className="plan-divider" />

                <ul className="plan-feature-list">
                  {plan.features.map((feat) => (
                    <li key={feat}>
                      <span className="check-icon">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`plan-cta-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  disabled={isCurrent}
                  onClick={() => handleChoosePlan(plan)}
                >
                  {isCurrent ? 'Current Plan' : price === 0 ? 'Choose Free Plan' : `Choose ${plan.name.replace('LocalServ ', '')}`}
                </button>
              </div>
            );
          })}
        </div>

        <div className="combos-wrapper">
          <div className="combos-header">
            <span className="section-badge">Value Bundles</span>
            <h2 className="combos-title">Economical Service Combos</h2>
            <p className="combos-desc">Bundle everyday services together and enjoy instant savings.</p>
          </div>

          <div className="combos-grid">
            {COMBOS.map((combo) => (
              <div className="combo-card" key={combo.id}>
                <div className="combo-top">
                  <div className="combo-icon">{combo.icon}</div>
                  <span className="save-badge">{combo.save}</span>
                </div>
                <h4 className="combo-name">{combo.title}</h4>
                <p className="combo-detail">{combo.desc}</p>

                <div className="combo-footer">
                  <div className="combo-pricing">
                    <span className="original-price">{formatPrice(combo.originalPrice)}</span>
                    <span className="bundle-price">{formatPrice(combo.bundlePrice)}</span>
                  </div>
                  <button type="button" className="combo-book-btn" onClick={() => handleBookCombo(combo)}>
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
