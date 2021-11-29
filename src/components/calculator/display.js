import { useEffect, useState } from "react";
import { Fragment } from "react";
import classes from "./Display.module.css";

const calculate = (firstNumber, operator, secondNumber) => {
  const op = operator.trim();
  if (op === "+") {
    return firstNumber + secondNumber;
  }
  if (op === "-") {
    return firstNumber - secondNumber;
  }
  if (op === "x") {
    return firstNumber * secondNumber;
  }
  if (op === "/") {
    return firstNumber / secondNumber;
  }
};

const Display = (props) => {
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [resultNumber, setResultNumber] = useState("");
  const symbol = props.symbol;
  const cleanSymbol = props.cleanSymbol;
  useEffect(() => {
    // if (splitted === []) {
    //   setFirstNumber(symbol);
    // }
    const numbersToCalculate = resultNumber + symbol;
    const splitted = numbersToCalculate.split(" ");
    if (resultNumber) {
      setFirstNumber(resultNumber);
    } else setFirstNumber(splitted[0]);
    setOperator(splitted[1]);
    setSecondNumber(splitted[2]);
    if (splitted[3]) {
      const result = calculate(+splitted[0], splitted[1], +splitted[2]);
      setResultNumber(result);
      cleanSymbol();
      // setOperator("");
      // setSecondNumber("");
    }
  }, [symbol, cleanSymbol, resultNumber]);
  console.log(
    "first: " +
      firstNumber +
      "  oper: " +
      operator +
      "  second: " +
      secondNumber
  );
  // console.log(operator);
  return (
    <Fragment>
      <div className={classes.display}>
        <span className={classes["text--calculation"]}>
          {firstNumber} {operator} {secondNumber}
        </span>
        <span className={classes["text--result"]}>
          {resultNumber ? resultNumber : firstNumber}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
