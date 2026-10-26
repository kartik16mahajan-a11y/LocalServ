import { HOW_IT_WORKS_STEPS } from '../../../data/servicesData';

function HowItWorksSection() {
  return (
    <section className="how-it-works-section section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Simple Process</span>
          <h2 className="section-title">How LocalServ Works</h2>
          <p className="section-subtitle">
            Effortless doorstep booking with 100% verified specialists in three simple steps.
          </p>
        </div>

        <div className="how-steps-grid">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="how-step-card">
              <span className="how-step-num">{step.step}</span>
              <div className="how-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
