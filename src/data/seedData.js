// Starting (demo) data. It is copied into localStorage the first time the
// site opens, after that the app reads and writes localStorage only.

export const SEED_USERS = [
  {
    id: 'u-kartik',
    role: 'user',
    name: 'Kartik Mahajan',
    email: 'user@localserv.in',
    password: 'user123',
    phone: '9876543210',
    address: 'Sector 56, Gurgaon, Haryana',
    plan: 'basic',
    favourites: ['electrician', 'house-cleaning'],
  },
  {
    id: 'p-vikram',
    role: 'provider',
    name: 'Vikram Singh',
    email: 'vikram@localserv.in',
    password: 'pro123',
    phone: '9876501234',
    serviceId: 'electrician',
    experience: 11,
    rate: 249,
    area: 'Sector 56, Gurgaon',
    bio: 'Experienced electrician dedicated to quality work and customer satisfaction. Specialises in fault diagnosis, repairs and installations.',
    skills: ['Fault diagnosis', 'Inverter setup', 'MCB repair', 'Wiring', 'Fan installation'],
    available: true,
  },
];

const base = { city: 'Delhi NCR', providerId: null, providerName: '', otp: '', basePrice: 0, safetyFee: 29 };

export const SEED_BOOKINGS = [
  {
    ...base, id: 'BK-1001', createdAt: 1761000000001, userId: 'u-kartik', customerName: 'Kartik Mahajan',
    serviceId: 'electrician', serviceTitle: 'Electrician', icon: '⚡',
    date: '2026-11-02', timeSlot: '10:00 AM - 12:00 PM', address: 'Sector 56, Gurgaon, Haryana',
    notes: 'Switchboard sparking and fan regulator check.', status: 'Confirmed',
    providerId: 'p-vikram', providerName: 'Vikram Singh', otp: '4829', basePrice: 249, totalAmount: 278,
  },
  {
    ...base, id: 'BK-1002', createdAt: 1760900000002, userId: 'u-kartik', customerName: 'Kartik Mahajan',
    serviceId: 'house-cleaning', serviceTitle: 'House Cleaning', icon: '🧹',
    date: '2026-10-18', timeSlot: '02:00 PM - 04:00 PM', address: 'Sector 56, Gurgaon, Haryana',
    notes: 'Full apartment deep cleaning.', status: 'Completed',
    providerName: 'Anita Patil', otp: '1942', basePrice: 599, totalAmount: 628,
  },
  {
    ...base, id: 'BK-1003', createdAt: 1760800000003, userId: 'seed-1', customerName: 'Aditya V.',
    serviceId: 'electrician', serviceTitle: 'Electrician', icon: '⚡',
    date: '2026-10-30', timeSlot: '12:00 PM - 02:00 PM', address: 'Sector 45, Gurgaon',
    notes: 'MCB keeps tripping, needs short circuit inspection.', status: 'Pending', basePrice: 249, totalAmount: 278,
  },
  {
    ...base, id: 'BK-1004', createdAt: 1760700000004, userId: 'seed-2', customerName: 'Priya M.',
    serviceId: 'electrician', serviceTitle: 'Electrician', icon: '⚡',
    date: '2026-10-31', timeSlot: '04:00 PM - 06:00 PM', address: 'Sector 56, Gurgaon',
    notes: 'Ceiling fan installation in bedroom.', status: 'Pending', basePrice: 249, totalAmount: 278,
  },
  {
    ...base, id: 'BK-1005', createdAt: 1760600000005, userId: 'seed-3', customerName: 'Rahul K.',
    serviceId: 'electrician', serviceTitle: 'Electrician', icon: '⚡',
    date: '2026-11-01', timeSlot: '08:00 AM - 10:00 AM', address: 'DLF Phase 2, Gurgaon',
    notes: 'Inverter battery checkup.', status: 'Pending', basePrice: 249, totalAmount: 278,
  },
  {
    ...base, id: 'BK-1006', createdAt: 1760500000006, userId: 'seed-4', customerName: 'Sneha R.',
    serviceId: 'plumber', serviceTitle: 'Plumber', icon: '🚰',
    date: '2026-10-29', timeSlot: '10:00 AM - 12:00 PM', address: 'Sector 48, Gurgaon',
    notes: 'Kitchen tap leakage.', status: 'Pending', basePrice: 299, totalAmount: 328,
  },
  {
    ...base, id: 'BK-1007', createdAt: 1760400000007, userId: 'seed-5', customerName: 'Neha S.',
    serviceId: 'mobile-repair', serviceTitle: 'Mobile Repair', icon: '📱',
    date: '2026-10-29', timeSlot: '06:00 PM - 08:00 PM', address: 'Sector 14, Gurgaon',
    notes: 'Screen replacement.', status: 'Pending', basePrice: 299, totalAmount: 328,
  },
  {
    ...base, id: 'BK-1008', createdAt: 1760300000008, userId: 'seed-6', customerName: 'Amit K.',
    serviceId: 'house-cleaning', serviceTitle: 'House Cleaning', icon: '🧹',
    date: '2026-11-03', timeSlot: '02:00 PM - 04:00 PM', address: 'Sector 21, Gurgaon',
    notes: '2 BHK deep cleaning.', status: 'Pending', basePrice: 599, totalAmount: 628,
  },
];

export const SEED_REVIEWS = [
  { id: 'r1', userId: 'seed', name: 'Kavita Ramanathan', role: 'Homeowner, Bandra', serviceId: 'house-cleaning', rating: 5, date: '2026-10-24', comment: 'Booked deep cleaning before Diwali. The professionals were on time, polite and thorough. The upfront billing made it completely stress-free.' },
  { id: 'r2', userId: 'seed', name: 'Vikram Mehta', role: 'Tech Lead, Koramangala', serviceId: 'computer-repair', rating: 5, date: '2026-10-19', comment: 'My laptop screen broke during a release sprint. The technician arrived within 40 minutes and replaced the display at my doorstep with genuine parts.' },
  { id: 'r3', userId: 'seed', name: 'Sunita & Arvind Roy', role: 'Resident, Gurgaon', serviceId: 'movers-packers', rating: 4, date: '2026-10-05', comment: 'Moving homes is usually a nightmare, but the packing team handled our glassware with extreme care. One box arrived a little late, otherwise perfect.' },
  { id: 'r4', userId: 'seed', name: 'Rohan Gupta', role: 'Student, Pune', serviceId: 'tutor', rating: 5, date: '2026-09-28', comment: 'My maths tutor explained concepts so clearly that my grades improved within a month. The free demo class helped me decide.' },
  { id: 'r5', userId: 'seed', name: 'Meera Nair', role: 'Homemaker, Hyderabad', serviceId: 'ac-repair', rating: 4, date: '2026-09-21', comment: 'AC servicing was done properly and the technician explained the gas level clearly. Pricing matched the quote exactly.' },
  { id: 'r6', userId: 'seed', name: 'Imran Shaikh', role: 'Shop Owner, Mumbai', serviceId: 'electrician', rating: 5, date: '2026-09-12', comment: 'Needed urgent rewiring for my shop. The electrician arrived in 30 minutes, finished neatly and cleaned up after the work.' },
  { id: 'r7', userId: 'seed', name: 'Pooja Deshmukh', role: 'Working Professional, Pune', serviceId: 'home-chef', rating: 5, date: '2026-08-30', comment: 'The home chef planned a weekly menu around our diet needs. Fresh, tasty food and a very hygienic kitchen routine.' },
  { id: 'r8', userId: 'seed', name: 'Arjun Kapoor', role: 'Resident, Delhi', serviceId: 'plumber', rating: 3, date: '2026-08-14', comment: 'Leak was fixed but the plumber arrived 20 minutes late. Work quality was good and support handled my complaint quickly.' },
];
