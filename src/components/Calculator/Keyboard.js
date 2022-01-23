import { useEffect, useState } from "react";
import classes from "./Keyboard.module.css";

const symbols = [
  { name: "7", key: ["7"], type: "number" },
  { name: "8", key: ["8"], type: "number" },
  { name: "9", key: ["9"], type: "number" },
  { name: "DEL", key: ["Backspace"], type: "other" },
  { name: "4", key: ["4"], type: "number" },
  { name: "5", key: ["5"], type: "number" },
  { name: "6", key: ["6"], type: "number" },
  { name: "+", key: ["+"], type: "operator" },
  { name: "1", key: ["1"], type: "number" },
  { name: "2", key: ["2"], type: "number" },
  { name: "3", key: ["3"], type: "number" },
  { name: "-", key: ["-"], type: "operator" },
  { name: ".", key: [".", ","], type: "other" },
  { name: "0", key: ["0"], type: "number" },
  { name: "/", key: ["/"], type: "operator" },
  { name: "x", key: ["x", "X", "*"], type: "operator" },
  { name: "RESET", key: ["Delete"], type: "other" },
  { name: "=", key: ["Enter"], type: "other" },
];

const Keyboard = (props) => {
  const [keyPress, setKeyPress] = useState(""); //<-- only for adding a class that animates the button
  const [keyIsHeld, setkeyIsHeld] = useState(false);

  const keyPressed = (e) => {
    if (!keyIsHeld) {
      const foundSymbol = symbols.find(
        (symbol) => e.key === symbol.key.find((key) => e.key === key)
      );
      if (foundSymbol) {
        setKeyPress(foundSymbol.name);
        props.getSymbol(foundSymbol);
      }
      setkeyIsHeld(true);
    }
    if ("activeElement" in document) document.activeElement.blur();
  };

  const keyReleased = () => {
    setKeyPress("");
    setkeyIsHeld(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    return () => {
      document.removeEventListener("keydown", keyPressed);
      document.removeEventListener("keyup", keyReleased);
    };
  });

  return (
    <div className={classes.keyboard}>
      {symbols.map((symbol) => {
        return (
          <button
            className={keyPress === symbol.name ? classes.active : ""}
            id={symbol.name}
            key={symbol.name}
            onClick={() => props.getSymbol(symbol)}
          >
            {symbol.name}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
