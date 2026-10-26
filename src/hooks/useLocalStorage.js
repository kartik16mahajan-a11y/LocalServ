import { useState, useEffect } from 'react';

/**
 * Custom hook: works like useState, but the value is also saved in
 * localStorage, so it is still there after the page is refreshed.
 *
 *   const [items, setItems] = useLocalStorage('my_key', []);
 */
function useLocalStorage(key, initialValue) {
  // The function inside useState runs only once, on the first render.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Every time the value changes, write it to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked - the app still works, it just won't persist.
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
