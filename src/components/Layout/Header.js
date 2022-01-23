import { useState, useEffect } from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const [switchTheme, setSwitchTheme] = useState(1);

  // two-way binds the knob and theme setting
  useEffect(() => {
    if (props.theme === "dark") {
      setSwitchTheme(1);
    } else if (props.theme === "light") {
      setSwitchTheme(2);
    } else if (props.theme === "purple") {
      setSwitchTheme(3);
    }
  }, [props.theme]);

  const toggleSwitch = () => {
    if (switchTheme === 3) {
      setSwitchTheme(1);
      props.changeTheme("dark");
    } else if (switchTheme === 1) {
      setSwitchTheme(2);
      props.changeTheme("light");
    } else if (switchTheme === 2) {
      setSwitchTheme(3);
      props.changeTheme("purple");
    }
  };

  const toggleSwitchNotch =
    switchTheme === 1
      ? { marginLeft: "0px" }
      : switchTheme === 2
      ? { marginLeft: "22.5px" }
      : { marginLeft: "45px" };

  return (
    <header>
      <h1>calc</h1>
      <div className={classes["theme-container"]}>
        <span>123</span>
        <div className={classes["theme-container--row"]}>
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
