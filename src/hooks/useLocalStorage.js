
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    try {
      const valueToStore =
        newValue instanceof Function
          ? newValue(value)
          : newValue;

      setValue(valueToStore);
      localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error("Unable to save to localStorage", error);
    }
  };

  return [value, updateValue];
}

export default useLocalStorage;
