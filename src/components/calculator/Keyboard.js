import { useEffect } from "react";
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
  const getSymbol = (symbol) => {
    console.log(symbol);
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", keyReleased);
    return () => {
      window.removeEventListener("keydown", keyPressed);
      window.removeEventListener("keyup", keyReleased);
    };
  }, []);

  function keyReleased(e) {
    if (e.code === "Numpad1") {
      // console.log("Numpad1 Pressed");
      // document.getElementById("1").focus();

      // setTimeout(function () {
      //   document.getElementById("1").blur();
      // }, 100);
      //! dont directly manipulate dom, use react conditional class
      document.getElementById("1").classList.remove("mystyle");
    }
  }

  function keyPressed(e) {
    if (e.code === "Numpad1") {
      // console.log("Numpad1 Pressed");
      // document.getElementById("1").focus();

      // setTimeout(function () {
      //   document.getElementById("1").blur();
      // }, 100);
      //! dont directly manipulate dom, use react conditional class
      document.getElementById("1").classList.add("mystyle");
    }
    if (e.code === "Numpad2") {
      console.log("Numpad2 Pressed");
    }
    if (e.code === "Numpad3") {
      console.log("Numpad3 Pressed");
    }
    if (e.code === "Numpad4") {
      console.log("Numpad4 Pressed");
    }
    if (e.code === "Numpad5") {
      console.log("Numpad5 Pressed");
    }
    if (e.code === "Numpad6") {
      console.log("Numpad6 Pressed");
    }
    if (e.code === "Numpad7") {
      console.log("Numpad7 Pressed");
    }
    if (e.code === "Numpad8") {
      console.log("Numpad8 Pressed");
    }
    if (e.code === "Numpad9") {
      console.log("Numpad9 Pressed");
    }
    if (e.code === "Numpad0") {
      console.log("Numpad0 Pressed");
    }
  }

  // const keyDownFunction = (e) => {
  //   if (e.keyCode === 27) {
  //     console.log("You pressed the escape key!");
  //   }
  // };

  return (
    <div className={classes.keyboard}>
      {symbolArray.map((symbol) => {
        return (
          <button id={symbol} key={symbol} onClick={() => getSymbol(symbol)}>
            {symbol}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
