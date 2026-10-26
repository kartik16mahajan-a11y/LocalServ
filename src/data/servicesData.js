// Centralized mock data for LocalServ Marketplace
// Designed with clear structure for university project demonstration

export const CITIES = [
  { id: 'mum', name: 'Mumbai', area: 'Bandra / Andheri' },
  { id: 'del', name: 'Delhi NCR', area: 'Connaught Place / Gurgaon' },
  { id: 'blr', name: 'Bengaluru', area: 'Koramangala / Indiranagar' },
  { id: 'pun', name: 'Pune', area: 'Kothrud / Viman Nagar' },
  { id: 'hyd', name: 'Hyderabad', area: 'Hitec City / Jubilee Hills' },
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Services (20)' },
  { id: 'repairs', label: 'Home Repair & Maintenance' },
  { id: 'cleaning', label: 'Cleaning & Housekeeping' },
  { id: 'food', label: 'Cooking & Food' },
  { id: 'tech', label: 'Tech & Gadgets' },
  { id: 'personal', label: 'Personal & Care' },
  { id: 'transport', label: 'Transport & Logistics' },
];

export const SERVICES_DATA = [
  {
    id: 'electrician',
    title: 'Electrician',
    icon: '⚡',
    filterGroup: 'repairs',
    tagline: 'Wiring, switches, fuse repair & electrical installations',
    startingPrice: 249,
    priceUnit: 'visit',
    rating: 4.9,
    reviewsCount: 1420,
    eta: '30 mins',
    popular: true,
    badges: ['Certified', 'Tools Included'],
    description: 'Expert licensed electricians for quick fuse fixes, appliance installations, rewiring, and surge protection.'
  },
  {
    id: 'plumber',
    title: 'Plumber',
    icon: '🚰',
    filterGroup: 'repairs',
    tagline: 'Leak detection, pipe repairs, tap fixes & bath fitting',
    startingPrice: 299,
    priceUnit: 'service',
    rating: 4.8,
    reviewsCount: 1180,
    eta: '35 mins',
    popular: true,
    badges: ['Equipped', 'Warranty Cover'],
    description: 'Skilled plumbers for emergency leakage resolution, drain cleaning, tap installations, and bathroom fittings.'
  },
  {
    id: 'carpenter',
    title: 'Carpenter',
    icon: '🛠',
    filterGroup: 'repairs',
    tagline: 'Furniture repair, custom woodwork, locks & fittings',
    startingPrice: 349,
    priceUnit: 'job',
    rating: 4.7,
    reviewsCount: 890,
    eta: '45 mins',
    popular: false,
    badges: ['Craftsman', 'Precision Work'],
    description: 'Experienced woodworkers and carpenters for bespoke furniture repair, hinges, wardrobe fixes, and doors.'
  },
  {
    id: 'painter',
    title: 'Painter',
    icon: '🎨',
    filterGroup: 'repairs',
    tagline: 'Full home painting, accent walls, waterproofing & touch-ups',
    startingPrice: 799,
    priceUnit: 'room',
    rating: 4.9,
    reviewsCount: 650,
    eta: 'Same Day',
    popular: false,
    badges: ['Premium Finish', 'Clean Cleanup'],
    description: 'Professional wall and exterior painting specialists with dust-free sanding and branded paints.'
  },
  {
    id: 'house-cleaning',
    title: 'House Cleaning',
    icon: '🧹',
    filterGroup: 'cleaning',
    tagline: 'Deep home cleaning, bathroom scrubbing & kitchen sanitization',
    startingPrice: 599,
    priceUnit: 'session',
    rating: 4.9,
    reviewsCount: 2340,
    eta: '40 mins',
    popular: true,
    badges: ['Hospital Grade Chem', 'Top Rated'],
    description: 'Thorough deep cleaning and disinfection for apartments, villas, kitchens, and restrooms by trained staff.'
  },
  {
    id: 'home-chef',
    title: 'Home Chef',
    icon: '👨‍🍳',
    filterGroup: 'food',
    tagline: 'Gourmet home-cooked meals, party catering & diet plans',
    startingPrice: 499,
    priceUnit: 'meal prep',
    rating: 4.9,
    reviewsCount: 780,
    eta: 'Scheduled',
    popular: true,
    badges: ['Hygiene Certified', 'Custom Menu'],
    description: 'Verified private chefs and culinary experts preparing fresh, delicious meals customized to your dietary needs.'
  },
  {
    id: 'tiffin-service',
    title: 'Tiffin Service',
    icon: '🍱',
    filterGroup: 'food',
    tagline: 'Fresh daily homemade lunch & dinner boxes delivered hot',
    startingPrice: 120,
    priceUnit: 'meal',
    rating: 4.8,
    reviewsCount: 1950,
    eta: 'Daily Schedule',
    popular: false,
    badges: ['Pure & Hygienic', 'Flexible Plans'],
    description: 'Nutritious, authentic home-style meal subscription delivered punctually to your doorstep or workplace.'
  },
  {
    id: 'laundry',
    title: 'Laundry & Dry Clean',
    icon: '🧺',
    filterGroup: 'cleaning',
    tagline: 'Wash & fold, steam pressing & premium dry cleaning',
    startingPrice: 199,
    priceUnit: 'load',
    rating: 4.7,
    reviewsCount: 920,
    eta: 'Pickup in 1h',
    popular: false,
    badges: ['Fabric Care', 'Doorstep Pickup'],
    description: 'Express fabric care, garment sanitization, delicates wash, and crisp steam ironing with swift doorstep delivery.'
  },
  {
    id: 'gardener',
    title: 'Gardener',
    icon: '🌿',
    filterGroup: 'cleaning',
    tagline: 'Lawn mowing, plant care, trimming & balcony garden setup',
    startingPrice: 399,
    priceUnit: 'visit',
    rating: 4.8,
    reviewsCount: 510,
    eta: 'Same Day',
    popular: false,
    badges: ['Green Thumb', 'Organic Care'],
    description: 'Passionate horticulturists and garden specialists for weeding, pruning, potting, and landscape maintenance.'
  },
  {
    id: 'tutor',
    title: 'Academic Tutor',
    icon: '📚',
    filterGroup: 'personal',
    tagline: '1-on-1 home & online tuition for school, college & exams',
    startingPrice: 450,
    priceUnit: 'hour',
    rating: 4.9,
    reviewsCount: 1120,
    eta: 'On Schedule',
    popular: true,
    badges: ['Verified Degree', 'Free Demo'],
    description: 'Qualified subject tutors for STEM, languages, board exam preparation, coding, and academic excellence.'
  },
  {
    id: 'computer-repair',
    title: 'Computer Repair',
    icon: '💻',
    filterGroup: 'tech',
    tagline: 'Laptop diagnostics, screen replacement, OS install & speedup',
    startingPrice: 349,
    priceUnit: 'diagnostic',
    rating: 4.8,
    reviewsCount: 1340,
    eta: '45 mins',
    popular: true,
    badges: ['OEM Parts', 'Data Safe'],
    description: 'Certified IT technicians for hardware fixes, slow PC tuning, malware removal, and motherboard servicing.'
  },
  {
    id: 'mobile-repair',
    title: 'Mobile Repair',
    icon: '📱',
    filterGroup: 'tech',
    tagline: 'Doorstep screen replacement, battery swap & camera fixes',
    startingPrice: 299,
    priceUnit: 'service',
    rating: 4.8,
    reviewsCount: 1670,
    eta: '30 mins',
    popular: true,
    badges: ['Doorstep Fix', '6-Mo Warranty'],
    description: 'On-site smartphone repair for all major brands (Apple, Samsung, OnePlus, Xiaomi) with genuine parts.'
  },
  {
    id: 'driver',
    title: 'Private Driver',
    icon: '🚗',
    filterGroup: 'transport',
    tagline: 'Verified chauffeur for city commute, outstation & events',
    startingPrice: 399,
    priceUnit: '4 hours',
    rating: 4.9,
    reviewsCount: 980,
    eta: '30 mins',
    popular: false,
    badges: ['License Checked', 'Punctual'],
    description: 'Professional, uniformed drivers with clean records for manual & automatic vehicles on hourly or daily basis.'
  },
  {
    id: 'movers-packers',
    title: 'Movers & Packers',
    icon: '🚚',
    filterGroup: 'transport',
    tagline: 'Safe house shifting, bubble wrapping & intercity moving',
    startingPrice: 1999,
    priceUnit: 'move',
    rating: 4.8,
    reviewsCount: 840,
    eta: 'Book Ahead',
    popular: true,
    badges: ['Damage Transit Insured', 'Heavy Lift Crew'],
    description: 'End-to-end relocation experts with high-grade multi-layer packaging, loading vehicles, and careful unboxing.'
  },
  {
    id: 'babysitter',
    title: 'Babysitter & Nanny',
    icon: '👶',
    filterGroup: 'personal',
    tagline: 'Vetted child care, infant supervision & engaging activities',
    startingPrice: 250,
    priceUnit: 'hour',
    rating: 4.9,
    reviewsCount: 620,
    eta: 'Scheduled',
    popular: false,
    badges: ['Background Checked', 'CPR Trained'],
    description: 'Trustworthy, compassionate babysitters and certified child-care aides for dependable family peace of mind.'
  },
  {
    id: 'pet-care',
    title: 'Pet Care & Walking',
    icon: '🐶',
    filterGroup: 'personal',
    tagline: 'Dog walking, pet grooming, sitting & vet assistance',
    startingPrice: 199,
    priceUnit: 'walk',
    rating: 4.9,
    reviewsCount: 890,
    eta: '45 mins',
    popular: false,
    badges: ['Animal Lovers', 'GPS Tracked Walk'],
    description: 'Dedicated pet sitters and professional groomers providing loving attention, exercise, and care for furry companions.'
  },
  {
    id: 'makeup-artist',
    title: 'Makeup Artist',
    icon: '💄',
    filterGroup: 'personal',
    tagline: 'Bridal makeup, party styling, hair design & skin prep',
    startingPrice: 899,
    priceUnit: 'makeover',
    rating: 4.9,
    reviewsCount: 730,
    eta: 'On Booking',
    popular: true,
    badges: ['Luxury Cosmetics', 'Portfolio Verified'],
    description: 'Certified aesthetic artists using top global brands (MAC, Huda, Sephora) for stunning occasion styling.'
  },
  {
    id: 'photographer',
    title: 'Photographer',
    icon: '📸',
    filterGroup: 'personal',
    tagline: 'Event photography, portraits, pre-wedding & product shoots',
    startingPrice: 1499,
    priceUnit: 'session',
    rating: 4.8,
    reviewsCount: 460,
    eta: 'Scheduled',
    popular: false,
    badges: ['4K Equipment', 'Raw + Edited'],
    description: 'Creative visual storytellers equipped with high-end cameras, lighting setups, and prompt color-graded deliverables.'
  },
  {
    id: 'tailor',
    title: 'Doorstep Tailor',
    icon: '🧵',
    filterGroup: 'personal',
    tagline: 'Custom stitching, dress alterations & doorstep measurements',
    startingPrice: 249,
    priceUnit: 'garment',
    rating: 4.7,
    reviewsCount: 580,
    eta: 'Home Visit',
    popular: false,
    badges: ['Perfect Fit Guarantee', 'Fast Return'],
    description: 'Master tailors who take measurements at your convenience, craft custom fits, and deliver neatly finished apparel.'
  },
  {
    id: 'ac-repair',
    title: 'AC & Appliance Repair',
    icon: '🔧',
    filterGroup: 'repairs',
    tagline: 'AC servicing, gas refill, refrigerator, washing machine & microwave',
    startingPrice: 399,
    priceUnit: 'appliance',
    rating: 4.9,
    reviewsCount: 2890,
    eta: '30 mins',
    popular: true,
    badges: ['90-Day Guarantee', 'Original Spares'],
    description: 'Master appliance technicians for split/window AC jet cleaning, gas charging, fridge cooling faults, and washer repair.'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-9482',
    serviceId: 'electrician',
    serviceTitle: 'Electrician Service',
    icon: '⚡',
    category: 'Home Repair',
    date: '2026-08-22',
    timeSlot: '10:00 AM - 12:00 PM',
    city: 'Mumbai',
    address: 'Flat 402, Sunshine Heights, Bandra West',
    status: 'Confirmed', // 'Confirmed', 'Completed', 'Cancelled'
    assignedSpecialist: 'Rajesh Sharma (Certified Specialist)',
    contactPhone: '+91 98201 44321',
    otp: '4829',
    basePrice: 249,
    safetyFee: 29,
    discount: 0,
    totalAmount: 278,
    notes: 'Switchboard sparking and ceiling fan regulator check.'
  },
  {
    id: 'BK-8721',
    serviceId: 'house-cleaning',
    serviceTitle: 'House Deep Cleaning',
    icon: '🧹',
    category: 'Cleaning & Housekeeping',
    date: '2026-08-18',
    timeSlot: '01:00 PM - 03:00 PM',
    city: 'Mumbai',
    address: 'Flat 402, Sunshine Heights, Bandra West',
    status: 'Completed',
    assignedSpecialist: 'Anita Patil (Sanitization Expert)',
    contactPhone: '+91 98332 99120',
    otp: '1942',
    basePrice: 599,
    safetyFee: 29,
    discount: 0,
    totalAmount: 628,
    rating: 5,
    notes: 'Full apartment deep sanitization and kitchen scrubbing.'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Professional Service',
    desc: 'Browse from 20+ specialized service categories and enter your locality for immediate availability.',
    icon: '🔍'
  },
  {
    step: '02',
    title: 'Get Matched with Verified Specialist',
    desc: 'Choose from certified, background-checked specialists with transparent fixed rates and real ratings.',
    icon: '🤝'
  },
  {
    step: '03',
    title: 'Express Arrival & Safe Payment',
    desc: 'Your specialist arrives on time with complete equipment. Pay securely only after 100% satisfactory completion.',
    icon: '🛡️'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: '🛡️',
    title: '100% Background-Checked Specialists',
    desc: 'Every service professional undergoes police verification, identity check, and practical trade skill assessment.'
  },
  {
    icon: '💳',
    title: 'Transparent Upfront Pricing',
    desc: 'No hidden charges or surprise hourly surge. You receive fixed quotes and itemized invoices for every task.'
  },
  {
    icon: '⏱️',
    title: '30-45 Min Express Dispatch',
    desc: 'Need an electrician or plumber right now? Our geo-dispatch connects you with the nearest active specialist.'
  },
  {
    icon: '🔒',
    title: 'LocalServ Damage Protection',
    desc: 'Enjoy complete peace of mind with our ₹10,000 complimentary insurance cover on all booked services.'
  },
  {
    icon: '💬',
    title: '24/7 Dedicated Support',
    desc: 'Our customer care desk is always active to coordinate, reschedule, or address any concerns smoothly.'
  },
  {
    icon: '⭐',
    title: 'Re-work Satisfaction Guarantee',
    desc: 'If a service does not meet your quality expectations, we will send another senior specialist to fix it free of charge.'
  }
];

// Time slots offered while booking / rescheduling
export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Kavita Ramanathan',
    role: 'Homeowner, Bandra',
    service: 'House Cleaning & AC Repair',
    rating: 5,
    date: '2 days ago',
    comment: 'Booked deep cleaning before Diwali and an AC servicing. The professionals were on time, extremely polite, and thoroughly professional. The upfront billing made it completely stress-free!'
  },
  {
    id: 2,
    name: 'Vikram Mehta',
    role: 'Tech Lead, Koramangala',
    service: 'Computer & Mobile Repair',
    rating: 5,
    date: '1 week ago',
    comment: 'My MacBook screen broke in the middle of a release sprint. The technician arrived within 40 minutes and replaced the display at my doorstep with genuine parts. Unbeatable service!'
  },
  {
    id: 3,
    name: 'Sunita & Arvind Roy',
    role: 'Resident, Gurgaon',
    service: 'Movers & Packers + Electrician',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Moving homes is usually a nightmare, but LocalServ made it seamless. The packaging team handled our glassware with extreme care, and the electrician mounted our appliances on the same day.'
  }
];


