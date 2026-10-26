const LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' };

// Rating selector using number buttons 1-5 (no star icons).
function RatingPicker({ value, onChange }) {
  return (
    <div className="rating-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`rating-pill ${value === n ? 'active' : ''}`}
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} out of 5`}
        >
          {n}
        </button>
      ))}
      <span className="rating-hint">{value ? `${value}/5 - ${LABELS[value]}` : 'Select a rating'}</span>
    </div>
  );
}

export default RatingPicker;
