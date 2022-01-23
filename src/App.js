import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Display from "./components/Calculator/Display";
import Keyboard from "./components/Calculator/Keyboard";
import { useState, useEffect } from "react";

function App() {
  const [activeNumber, setActiveNumber] = useState("0");
  const [savedNumber, setSavedNumber] = useState("");
  const [resultNumber, setResultNumber] = useState("");
  const [operatorSymbol, setOperatorSymbol] = useState("");
  const [delIsRecieved, setdelIsRecieved] = useState(false); //Protects from removing a number from active number if result number is present
  const [readyForNumber, setReadyForNumber] = useState(false); //When true, the result number will become savednumber on a recieved number type
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  // will check if mql matches the device theme and change it accordingly
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  function changeThemeToDevice(e) {
    if (e.matches) {
      setTheme("dark");
    } else if (!e.matches) {
      setTheme("light");
    }
  }
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      mql.addEventListener("change", changeThemeToDevice);
    }
    return () => {
      mql.removeEventListener("change", changeThemeToDevice);
    };
  }, [mql]);

  //-----------

  const changeTheme = (themeString) => {
    setTheme(themeString);
    localStorage.setItem("theme", themeString);
  };

  const getSymbol = (recievedSymbol) => {
    calculate(recievedSymbol);
  };

  //* The calculate function does different things depending on the recievedsymbols type or name.
  const calculate = (recievedSymbol) => {
    //if savedNumber === infinity, reset calculator
    if (!isFinite(savedNumber)) {
      setResultNumber("");
      setActiveNumber("");
      setSavedNumber("");
      setOperatorSymbol("");
      return;
    }
    //*Add number to activeNumber
    if (recievedSymbol.type === "number") {
      if (resultNumber) {
        setResultNumber("");
        setActiveNumber("");
      }
      setActiveNumber((prevState) => {
        let newNumber = prevState + recievedSymbol.name;
        //only allow one 0 before a decimal
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
    //Set result to savedNumber if there is a result and number is recieved
    if (readyForNumber && recievedSymbol.type === "number" && !delIsRecieved) {
      if (recievedSymbol.name === "0") {
        setActiveNumber("0");
      }
      setReadyForNumber(false);
      setSavedNumber(resultNumber);
    }
    //Add operator, set activeNumber to savedNumber
    if (recievedSymbol.type === "operator" && !operatorSymbol) {
      setOperatorSymbol(recievedSymbol.name);
      setActiveNumber("0");
      setSavedNumber(activeNumber);
    }
    //Switch the operator if an operator is already set
    if (recievedSymbol.type === "operator" && resultNumber) {
      setReadyForNumber(false);
      setOperatorSymbol(recievedSymbol.name);
      if (resultNumber) {
        setSavedNumber(resultNumber);
        setActiveNumber("0");
      }
      setResultNumber("");
    }
    //Calculate the numbers and make ready for new input
    if (recievedSymbol.type === "operator" && !resultNumber && operatorSymbol) {
      setReadyForNumber(false);
      setOperatorSymbol(recievedSymbol.name);
      if (operatorSymbol === "+" && recievedSymbol.name === "+") {
        setSavedNumber(+savedNumber + +activeNumber);
      }
      if (operatorSymbol === "-" && recievedSymbol.name === "-") {
        setSavedNumber(+savedNumber - +activeNumber);
      }
      if (operatorSymbol === "x" && recievedSymbol.name === "x") {
        setSavedNumber(+savedNumber * +activeNumber);
      }
      if (operatorSymbol === "/" && recievedSymbol.name === "/") {
        setSavedNumber(+savedNumber / +activeNumber);
      }
      if (operatorSymbol === recievedSymbol.name) {
        setActiveNumber("0");
      }
    }
    //*Remove a symbol from activeNumber
    if (recievedSymbol.name === "DEL") {
      if (delIsRecieved) {
        //simply removes the last digit
        setActiveNumber(Math.floor(activeNumber / 10).toString());
      }
      if (!delIsRecieved) {
        setdelIsRecieved(true);
      }
      setReadyForNumber(true);
      setResultNumber("");
    }
    if (recievedSymbol.name === "RESET") {
      setOperatorSymbol("");
      setActiveNumber("0");
      setSavedNumber("");
      setResultNumber("");
    }
    //Allows the user to repeatedly smash the = button and get the result from the last resultNumber and current activeNumber
    if (resultNumber && recievedSymbol.name === "=") {
      setdelIsRecieved(false);
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
    //This allows for smashing the button to go below 0 if the result is 0
    if (resultNumber === 0 && recievedSymbol.name === "=") {
      setdelIsRecieved(false);
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
      setReadyForNumber(true);
      setdelIsRecieved(false);
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
