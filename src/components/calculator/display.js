import { Fragment } from "react";
import classes from "./display.module.css";

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

const Display = (props) => {
  return (
    <Fragment>
      <div className={classes.display}>
        <span className={classes["text--calculation"]}>
          {props.savedNumber} {props.operatorSymbol}{" "}
          {props.resultNumber ? props.activeNumber : null}{" "}
          {props.resultNumber ? "=" : null}
          &#8205;
        </span>
        <span className={classes["text--result"]}>
          {props.resultNumber || props.resultNumber === 0
            ? roundToTwo(props.resultNumber)
            : props.activeNumber}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
