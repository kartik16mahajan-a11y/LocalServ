import { useState } from 'react';
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(key); return saved === null ? initialValue : JSON.parse(saved); }
    catch { return initialValue; }
  });
  const updateValue = (next) => { setValue(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* storage unavailable */ } };
  return [value, updateValue];
}
