import { useState } from "react";
import classes from "./Header.module.css";

const Header = () => {
  const [switchTheme, setSwitchTheme] = useState(1);

  const toggleSwitch = () => {
    if (switchTheme >= 3) {
      setSwitchTheme(1);
    } else setSwitchTheme(switchTheme + 1);
  };

  const toggleSwitchNotch =
    switchTheme === 1
      ? { marginLeft: "0px" }
      : switchTheme === 2
      ? { marginLeft: "22.5px" }
      : { marginLeft: "45px" };

  console.log(toggleSwitchNotch);

  return (
    <header>
      <h1>calc</h1>
      <div className={classes["switch-container"]}>
        <span className={classes["switch-numbers"]}>123</span>
        <div className={classes["switch-container--row"]}>
          <span>THEME</span>
          <div className={classes["switch-body"]} onClick={toggleSwitch}>
            <div
              className={classes["switch-knob"]}
              style={toggleSwitchNotch}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
