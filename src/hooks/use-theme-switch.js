import { useEffect, useState } from "react";

const useThemeSwitch = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const watchTheme = window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
      });
    return () => {
      window.removeEventListener("change", watchTheme);
    };
  }, []);

  return theme;
};

export default useThemeSwitch;
