import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1>calc</h1>
      <div className={classes["switch-container"]}>
        <span className={classes["switch-numbers"]}>123</span>
        <div className={classes["switch-container--row"]}>
          <span>THEME</span>
          <div className={classes["switch-body"]}>
            <div className={classes["switch-knob"]}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
