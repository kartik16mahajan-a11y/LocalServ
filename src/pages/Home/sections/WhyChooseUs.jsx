import { WHY_CHOOSE_US } from '../../../data/servicesData';

function WhyChooseUs() {
  return (
    <section className="why-us-section section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Quality & Trust</span>
          <h2 className="section-title">The LocalServ Quality Guarantee</h2>
          <p className="section-subtitle">
            We built LocalServ to eliminate the uncertainty, haggling, and delays of hiring local technicians.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_CHOOSE_US.map((item, index) => (
            <div key={index} className="why-card">
              <div className="why-icon-box">{item.icon}</div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Safety Callout */}
        <div className="safety-callout-card">
          <div className="safety-left">
            <span className="shield-large">🛡️</span>
            <div>
              <h4>₹10,000 LocalServ Protection Guarantee</h4>
              <p>Every booking is backed by our comprehensive protection cover and a 30-day rework warranty.</p>
            </div>
          </div>
          <div className="safety-right">
            <span className="verified-badge-pill">✓ 100% Verified Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
