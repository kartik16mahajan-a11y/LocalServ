export default function RatingPicker({ value = 0 }) { return <span aria-label={`Rating: ${value} out of 5`}>{value}/5</span>; }
