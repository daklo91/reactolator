import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(
    //if storage empty, run code
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    //add if ("has theme in storage"). if it has, dont run code.
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

  const changeTheme = (themeString) => {
    setTheme(themeString);
    //save to storage
  };

  return (
    <div id="theme-switch" data-theme={theme}>
      <div id="calculator-body">
        <Header changeTheme={changeTheme} theme={theme} />
        <main></main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
