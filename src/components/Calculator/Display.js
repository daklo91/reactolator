import { Fragment, useEffect, useRef } from "react";
import classes from "./Display.module.css";

const Display = (props) => {
  const display = useRef();
  useEffect(() => {
    display.current.scrollLeft = display.current.scrollWidth;
  });

  const removeTrailingZeros = () => {
    const string = props.resultNumber.toFixed(4).toString();
    return +string;
  };

  return (
    <Fragment>
      <div ref={display} className={classes.display}>
        <span className={classes["text--calculation"]}>
          {props.savedNumber} {props.operatorSymbol}{" "}
          {props.resultNumber || props.resultNumber === 0
            ? props.activeNumber
            : null}{" "}
          {props.resultNumber ? "=" : null} &#8205;
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
