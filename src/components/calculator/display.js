import { Fragment, useState, useEffect } from "react";
import classes from "./Display.module.css";

const Display = (props) => {
  const [inputNumber, setInputNumber] = useState("");

  return (
    <Fragment>
      <div className={classes.display}>
        <span className={classes["text--calculation"]}>1893123000 + 123 =</span>
        <span className={classes["text--result"]}>{inputNumber}</span>
      </div>
    </Fragment>
  );
};

export default Display;
