import { Link } from "react-router-dom";
import "./Navigation.css";
import logoutIcon from "../../assets/logout.svg";

function Navigation({
  isMenuOpen,
  onMenuClick,
  onSignInClick,
  isLoggedIn,
  username,
  onLogout,
}) {
  return (
    <>
      <nav
        className={`navigation ${
          isMenuOpen ? "navigation_opened" : ""
        } ${isLoggedIn ? "navigation_logged-in" : ""}`}
      >
        <Link className="navigation__home" to="/">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link className="navigation__saved" to="/saved-news">
              Saved articles
            </Link>

            <button
              className="navigation__user"
              type="button"
              onClick={onLogout}
              aria-label="Log out"
            >
              <span>{username}</span>
              <img
                className="navigation__logout-icon"
                src={logoutIcon}
                alt=""
              />
            </button>
          </>
        ) : (
          <button
            className="navigation__signin"
            type="button"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        )}
      </nav>

      <button
        className={`navigation__menu ${
          isMenuOpen ? "navigation__menu_opened" : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={onMenuClick}
      >
        <span className="navigation__menu-line"></span>
        <span className="navigation__menu-line"></span>
      </button>
    </>
  );
}

export default Navigation;
