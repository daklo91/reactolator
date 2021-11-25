import { useEffect, useState } from "react";
import classes from "./Keyboard.module.css";

const symbolArray = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
  "RESET",
  "=",
];

const Keyboard = () => {
  const [keyPress, setKeyPress] = useState("");
  const getSymbol = (symbol) => {
    console.log(symbol);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    return () => {
      document.removeEventListener("keydown", keyPressed);
      document.removeEventListener("keyup", keyReleased);
    };
    //! this either have to be disabled or useCallback or memo must be used on keyPressed before passing it as a dependency
  }, []);

  const keyPressed = (e) => {
    if (e.key === "1") {
      setKeyPress("1");
    }
    if (e.key === "2") {
      setKeyPress("2");
    }
    if (e.key === "3") {
      setKeyPress("3");
    }
    if (e.key === "4") {
      setKeyPress("4");
    }
    if (e.key === "5") {
      setKeyPress("5");
    }
    if (e.key === "6") {
      setKeyPress("6");
    }
    if (e.key === "7") {
      setKeyPress("7");
    }
    if (e.key === "8") {
      setKeyPress("8");
    }
    if (e.key === "9") {
      setKeyPress("9");
    }
    if (e.key === "0") {
      setKeyPress("0");
    }
    if (e.key === ",") {
      setKeyPress(".");
    }
    if (e.key === ".") {
      setKeyPress(".");
    }
    if (e.key === "/") {
      setKeyPress("/");
    }
    if (e.key === "x") {
      setKeyPress("x");
    }
    if (e.key === "*") {
      setKeyPress("x");
    }
    if (e.key === "-") {
      setKeyPress("-");
    }
    if (e.key === "+") {
      setKeyPress("+");
    }
    if (e.key === "Backspace") {
      setKeyPress("DEL");
    }
    if (e.key === "Delete") {
      setKeyPress("RESET");
    }
    if (e.key === "Enter") {
      setKeyPress("=");
    }
    getSymbol(e.key);
  };

  const keyReleased = () => {
    setKeyPress("");
  };

  return (
    <div className={classes.keyboard}>
      {symbolArray.map((symbol) => {
        return (
          <button
            className={keyPress === symbol ? classes.active : ""}
            id={symbol}
            key={symbol}
            onClick={() => getSymbol(symbol)}
          >
            {symbol}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
