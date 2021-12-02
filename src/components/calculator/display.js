import { Fragment } from "react";
import classes from "./Display.module.css";

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

const Display = (props) => {
  return (
    <Fragment>
      <div className={classes.display}>
        <span className={classes["text--result"]}>
          {props.savedNumber} {props.operatorSymbol} {props.activeNumber}{" "}
          {props.resultNumber || props.resultNumber === 0
            ? "= " + roundToTwo(props.resultNumber)
            : null}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
