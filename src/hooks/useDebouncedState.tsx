import { useEffect, useState } from "react";

export const useDebouncedState = (initialValue: any, delay = 300) => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue];
};
