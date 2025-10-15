import { useState, useEffect } from "react";

export function usePersistedTheme(defaultTheme = "white") {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme");
    return savedTheme || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
