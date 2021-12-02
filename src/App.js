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
    //* Function works by adding numbers to activeNumber, then when an operator is added to operatorSymbol, the activeNumber will go to savedNumber.
    //* When both an activeNumber and savedNumber is set. The = symbol will convert the strings to integers and calculate them togheter depending on the operator.
    //Add number to activeNumber && only allow one 0 at the start of the string
    if (recievedSymbol.type === "number") {
      setActiveNumber((prevState) => {
        let newNumber = prevState + recievedSymbol.name;
        if (newNumber.charAt(0) === "0" && !activeNumber.includes(".")) {
          newNumber = newNumber.substring(1);
        }
        return newNumber;
      });
    }
    //Only allow one "." symbol
    if (recievedSymbol.name === ".") {
      if (!activeNumber.includes(".")) {
        setActiveNumber((prevState) => {
          const newNumber = prevState + recievedSymbol.name;
          return newNumber;
        });
      }
    }
    //Add operator, set activeNumber to savedNumber
    if (recievedSymbol.type === "operator" && !operatorSymbol) {
      setOperatorSymbol(recievedSymbol.name);
      setActiveNumber("");
      setSavedNumber(activeNumber);
    }
    //Switch the operator if an operator is already set
    if (recievedSymbol.type === "operator" && operatorSymbol) {
      setOperatorSymbol(recievedSymbol.name);
    }
    //Remove a symbol from activeNumber. Similar to Windows 10 Calculator
    if (recievedSymbol.name === "DEL") {
      setActiveNumber(Math.floor(activeNumber / 10).toString());
    }
    if (recievedSymbol.name === "RESET") {
      setOperatorSymbol("");
      setActiveNumber("0");
      setSavedNumber("");
      setResultNumber("");
    }
    //Allows the user to repeatedly smash the = button and get the result from the last resultNumber and current activeNumber. Similar to Windows 10 Calculator
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
    //Do the calculation if there is no resultNumber
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
