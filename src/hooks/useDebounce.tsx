import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 1000): T {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedVal;
}

export default useDebounce;
