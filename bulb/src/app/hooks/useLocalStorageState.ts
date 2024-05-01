import { useState, useEffect, useRef } from 'react';

/**
 * A hook for managing state with localStorage.
 * 
 * @param key - The key to set in localStorage for this value.
 * @param defaultValue - The value to use if it is not already in localStorage.
 * @param options - An optional object containing serialize and deserialize functions.
 * @param options.serialize - Function to serialize the state into a string (defaults to JSON.stringify).
 * @param options.deserialize - Function to deserialize the string back into state (defaults to JSON.parse).
 */

function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T) = "" as unknown as T,
  { serialize = JSON.stringify, deserialize = JSON.parse }: { serialize?: (value: T) => string, deserialize?: (value: string) => T } = {}
): [T, (value: T | ((prevState: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage) as T;
    }
    return typeof defaultValue === 'function'
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

export { useLocalStorageState };
