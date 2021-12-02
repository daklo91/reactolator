import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Display from "./components/calculator/Display";
import Keyboard from "./components/calculator/Keyboard";
import { useState, useEffect } from "react";

function App() {
  const [activeNumber, setActiveNumber] = useState("0");
  const [savedNumber, setSavedNumber] = useState("");
  const [resultNumber, setResultNumber] = useState("");
  const [operatorSymbol, setOperatorSymbol] = useState("");
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

  const getSymbol = (recievedSymbol) => {
    calculate(recievedSymbol);
  };

  const calculate = (recievedSymbol) => {
    if (recievedSymbol.type === "number") {
      setActiveNumber((prevState) => {
        let newNumber = prevState + recievedSymbol.name;
        if (newNumber.charAt(0) === "0" && !activeNumber.includes(".")) {
          newNumber = newNumber.substring(1);
        }
        return newNumber;
      });
    }
    if (recievedSymbol.name === ".") {
      if (!activeNumber.includes(".")) {
        setActiveNumber((prevState) => {
          const newNumber = prevState + recievedSymbol.name;
          return newNumber;
        });
      }
    }
    if (recievedSymbol.type === "operator" && !operatorSymbol) {
      setOperatorSymbol(recievedSymbol.name);
      setActiveNumber("");
      setSavedNumber(activeNumber);
    }
    if (recievedSymbol.type === "operator" && operatorSymbol) {
      setOperatorSymbol(recievedSymbol.name);
    }
    if (recievedSymbol.name === "DEL") {
      setActiveNumber(Math.floor(activeNumber / 10).toString());
    }
    if (recievedSymbol.name === "RESET") {
      setOperatorSymbol("");
      setActiveNumber("0");
      setSavedNumber("");
      setResultNumber("");
    }
    if (resultNumber && recievedSymbol.name === "=") {
      setSavedNumber(resultNumber);
      if (operatorSymbol === "+") {
        setResultNumber(+resultNumber + +activeNumber);
      }
      if (operatorSymbol === "-") {
        setResultNumber(+resultNumber - +activeNumber);
      }
      if (operatorSymbol === "x") {
        setResultNumber(+resultNumber * +activeNumber);
      }
      if (operatorSymbol === "/") {
        setResultNumber(+resultNumber / +activeNumber);
      }
    }
    if (recievedSymbol.name === "=" && !resultNumber) {
      if (operatorSymbol === "+") {
        setResultNumber(+savedNumber + +activeNumber);
      }
      if (operatorSymbol === "-") {
        setResultNumber(+savedNumber - +activeNumber);
      }
      if (operatorSymbol === "x") {
        setResultNumber(+savedNumber * +activeNumber);
      }
      if (operatorSymbol === "/") {
        setResultNumber(+savedNumber / +activeNumber);
      }
    }
  };

  return (
    <div id="theme-switch" data-theme={theme}>
      <div id="calculator-body">
        <Header changeTheme={changeTheme} theme={theme} />
        <main>
          <Display
            activeNumber={activeNumber}
            operatorSymbol={operatorSymbol}
            savedNumber={savedNumber}
            resultNumber={resultNumber}
          />
          <Keyboard getSymbol={getSymbol} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
