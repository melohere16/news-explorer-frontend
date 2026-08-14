import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ onSignInClick, isLoggedIn, username, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${isLoggedIn ? "header_logged-in" : ""}`}>
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
