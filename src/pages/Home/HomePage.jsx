import HeroSection from './sections/HeroSection';
import ServicesPreview from './sections/ServicesPreview';
import HowItWorksSection from './sections/HowItWorksSection';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import './Home.css';

/**
 * Homepage — kept short and scannable:
 * 1. Simple hero with a working search box
 * 2. Popular services preview (4 cards)
 * 3. How it works (merged in from the old standalone page)
 * 4. Quality guarantee / trust section
 * 5. Latest customer reviews (from the shared reviews list)
 */
function HomePage() {
  return (
    <div className="home-page-view">
      <HeroSection />
      <ServicesPreview />
      <HowItWorksSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

export default HomePage;
