import { Fragment } from "react";
import classes from "./Display.module.css";

const Display = (props) => {
  const removeTrailingZeros = () => {
    const string = props.resultNumber.toFixed(4).toString();
    return +string;
  };

  return (
    <Fragment>
      {/* //* The display rendered alternates between what it shows, the text--result shows the activeNumber when there is no resultNumber */}
      <div className={classes.display}>
        <span className={classes["text--calculation"]}>
          {props.savedNumber} {props.operatorSymbol}{" "}
          {props.resultNumber || props.resultNumber === 0
            ? props.activeNumber
            : null}{" "}
          {props.resultNumber ? "=" : null} &#8205;
        </span>
        <span className={classes["text--result"]}>
          {/* this is to force a fake comma to be displayed temporarely */}
          {props.activeNumber.charAt(props.activeNumber.length - 1) === "."
            ? "."
            : null}
          {props.resultNumber || props.resultNumber === 0
            ? removeTrailingZeros()
            : props.activeNumber.charAt(props.activeNumber.length - 1) === "." //<-- removes the "real" comma temporarely
            ? props.activeNumber.substring(0, props.activeNumber.length - 1)
            : props.activeNumber}
        </span>
      </div>
    </Fragment>
  );
};

export default Display;
