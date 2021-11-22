import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.footer}>
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        .<br />
        Coded with &hearts; by{" "}
        <a href="https://github.com/daklo91" target="_blank" rel="noreferrer">
          daklo
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;
