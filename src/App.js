import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Display from "./components/calculator/Display";
import Keyboard from "./components/calculator/Keyboard";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    let watchTheme = "";
    if (!localStorage.getItem("theme")) {
      watchTheme = window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const newTheme = e.matches ? "dark" : "light";
          setTheme(newTheme);
        });
    } else if (watchTheme !== "") {
      window.removeEventListener("change", watchTheme);
    }
    return () => {
      if (watchTheme !== "") {
        window.removeEventListener("change", watchTheme);
      }
    };
  }, []);

  const changeTheme = (themeString) => {
    setTheme(themeString);
    localStorage.setItem("theme", themeString);
  };

  return (
    <div id="theme-switch" data-theme={theme}>
      <div id="calculator-body">
        <Header changeTheme={changeTheme} theme={theme} />
        <main>
          <Display />
          <Keyboard />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
