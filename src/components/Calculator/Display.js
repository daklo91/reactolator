import { Fragment } from "react";
import classes from "./Display.module.css";

const Display = (props) => {
  const removeTrailingZeros = () => {
    const string = props.resultNumber.toFixed(4).toString();
    return +string;
  };

  return (
    <Fragment>
      <div className={classes.display}>
        <span className={classes["text--calculation"]}>
          {props.resultNumber ? "=" : null}{" "}
          {props.resultNumber || props.resultNumber === 0
            ? props.activeNumber
            : null}{" "}
          {props.operatorSymbol} {props.savedNumber} &#8205;
        </span>
        <span className={classes["text--result"]}>
          {props.resultNumber || props.resultNumber === 0
            ? removeTrailingZeros()
            : props.activeNumber}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
