import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 Supersite, Powered by News API</p>

      <nav className="footer__links">
        <Link className="footer__link" to="/">
          Home
        </Link>

        <a
          className="footer__link"
          href="https://tripleten.com/"
          target="_blank"
          rel="noreferrer"
        >
          TripleTen
        </a>

        <a
          className="footer__social"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
         <img className="footer__social-icon" src={githubIcon} alt="GitHub" />
        </a>

        <a
          className="footer__social"
          href="https://linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
         <img className="footer__social-icon" src={linkedinIcon} alt="LinkedIn" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
