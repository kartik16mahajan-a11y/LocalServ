// Reusable controlled input components.
// Each one shows a label, the input, and an error message under it.
// The parent form keeps the value in state and passes value + onChange.

export function InputField({ label, name, error, ...inputProps }) {
  return (
    <div className={`field ${error ? 'field-has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...inputProps} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export function TextareaField({ label, name, error, ...textareaProps }) {
  return (
    <div className={`field ${error ? 'field-has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={3} {...textareaProps} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

// options = [{ value: 'abc', label: 'ABC' }]
export function SelectField({ label, name, options, placeholder, error, ...selectProps }) {
  return (
    <div className={`field ${error ? 'field-has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...selectProps}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
