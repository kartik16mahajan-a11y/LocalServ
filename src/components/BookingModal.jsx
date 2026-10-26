import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { InputField, SelectField, TextareaField } from './FormFields';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { CITIES, TIME_SLOTS } from '../data/servicesData';
import { todayISO, formatPrice } from '../utils/format';

const SAFETY_FEE = 29;

// Booking form popup. `service` can be a normal service or a combo.
function BookingModal({ service, onClose }) {
  const { currentUser } = useAuth();
  const { addBooking } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    city: CITIES[0].name,
    address: currentUser.address || '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const price = service.startingPrice;
  const total = price + SAFETY_FEE;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Please select a date.';
    else if (form.date < todayISO()) newErrors.date = 'Date cannot be in the past.';
    if (!form.timeSlot) newErrors.timeSlot = 'Please select a time slot.';
    if (form.address.trim().length < 10) newErrors.address = 'Enter your full address (at least 10 characters).';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    addBooking({
      id: `BK-${Date.now().toString().slice(-6)}`,
      createdAt: Date.now(),
      userId: currentUser.id,
      customerName: currentUser.name,
      serviceId: service.serviceId || service.id,
      serviceTitle: service.title,
      icon: service.icon,
      date: form.date,
      timeSlot: form.timeSlot,
      city: form.city,
      address: form.address.trim(),
      notes: form.notes.trim(),
      status: 'Pending', // becomes Confirmed when a provider accepts
      providerId: null,
      providerName: '',
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      basePrice: price,
      safetyFee: SAFETY_FEE,
      totalAmount: total,
    });

    onClose();
    showToast('Booking placed! A provider will confirm it shortly.');
    navigate('/bookings');
  };

  return (
    <Modal title={`Book ${service.title}`} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <InputField label="Date" name="date" type="date" min={todayISO()} value={form.date} onChange={handleChange} error={errors.date} />
          <SelectField label="Time Slot" name="timeSlot" value={form.timeSlot} onChange={handleChange} error={errors.timeSlot}
            options={TIME_SLOTS.map((t) => ({ value: t, label: t }))} placeholder="Select a slot" />
        </div>
        <SelectField label="City" name="city" value={form.city} onChange={handleChange}
          options={CITIES.map((c) => ({ value: c.name, label: c.name }))} />
        <TextareaField label="Service Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="House no, street, area" />
        <TextareaField label="Notes for the provider (optional)" name="notes" value={form.notes} onChange={handleChange} placeholder="Describe the work needed" />

        <div className="price-summary">
          <div><span>Service charge (starting)</span><span>{formatPrice(price)}</span></div>
          <div><span>Safety fee</span><span>{formatPrice(SAFETY_FEE)}</span></div>
          <div className="price-total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Confirm Booking</button>
        </div>
      </form>
    </Modal>
  );
}

export default BookingModal;
