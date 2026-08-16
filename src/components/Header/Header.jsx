import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onSignInClick, isLoggedIn, username, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isSavedNewsPage = location.pathname === "/saved-news";

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header
      className={`header ${isSavedNewsPage ? "header_saved-news" : ""}`}
    >
      <div className="header__container">
        <Link className="header__logo" to="/">
          NewsExplorer
        </Link>

        <Navigation
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onSignInClick={onSignInClick}
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

export default Header;