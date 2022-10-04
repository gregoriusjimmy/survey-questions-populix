import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  const data = localStorage.getItem(key);
  let initial;
  if (data) {
    initial = JSON.parse(data);
  }
  return initial || defaultValue;
}

export const useLocalStorage = <T,>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
