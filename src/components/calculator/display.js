import { Fragment } from "react";
import classes from "./Display.module.css";

// const calculate = (firstNumber, operator, secondNumber) => {
//   const op = operator.trim();
//   if (op === "+") {
//     return firstNumber + secondNumber;
//   }
//   if (op === "-") {
//     return firstNumber - secondNumber;
//   }
//   if (op === "x") {
//     return firstNumber * secondNumber;
//   }
//   if (op === "/") {
//     return firstNumber / secondNumber;
//   }
// };

const Display = (props) => {
  return (
    <Fragment>
      <div className={classes.display}>
        {/* <span className={classes["text--calculation"]}>
          &#8205;{props.savedNumber} {props.operatorSymbol}
        </span> */}
        <span className={classes["text--result"]}>
          {props.savedNumber} {props.operatorSymbol} {props.activeNumber}{" "}
          {props.resultNumber || props.resultNumber === 0
            ? "= " + props.resultNumber
            : null}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
