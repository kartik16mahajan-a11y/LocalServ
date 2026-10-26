export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);
