import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <>
      <nav
        className={`navigation ${
          isMenuOpen ? "navigation_opened" : ""
        } ${isSavedNewsPage ? "navigation_logged-in" : ""}`}
      >
        <Link
          className={`navigation__home ${!isSavedNewsPage ? "navigation__home_active" : ""}`}
          to="/"
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              className={`navigation__saved ${isSavedNewsPage ? "navigation__saved_active" : ""}`}
              to="/saved-news"
            >
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
                alt="Logout"
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