// Small helper functions used by the forms.

export const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim());

// Indian mobile number: 10 digits starting with 6-9
export const isPhone = (value) => /^[6-9]\d{9}$/.test(value.trim());
