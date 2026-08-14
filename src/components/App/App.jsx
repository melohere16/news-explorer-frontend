import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import SavedNews from "../SavedNews/SavedNews";
import { getNews } from "../../utils/NewsApi.js";

function App() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || "",
  );

  function handleSignInClick() {
    setIsLoginModalOpen(true);
  }

  function handleSignUpClick() {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  }

  function handleRegisterSignInClick() {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  }

  function closeRegisterModal() {
    setIsRegisterModalOpen(false);
  }

  function handleRegistrationSuccess(newUsername) {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(true);
  }

  function handleSuccessSignInClick() {
    setIsSuccessModalOpen(false);
    setIsLoginModalOpen(true);
  }

  function closeSuccessModal() {
    setIsSuccessModalOpen(false);
  }

  function handleLoginSuccess() {
    const savedUsername = localStorage.getItem("username") || "melo";
    setUsername(savedUsername);
    localStorage.setItem("username", savedUsername);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoginModalOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  function handleSaveArticle(article) {
    setSavedArticles((currentArticles) => {
      const alreadySaved = currentArticles.some(
        (savedArticle) => savedArticle.title === article.title,
      );

      if (alreadySaved) {
        return currentArticles;
      }

      return [...currentArticles, article];
    });
  }

  function handleDeleteArticle(article) {
    setSavedArticles((currentArticles) =>
      currentArticles.filter(
        (savedArticle) => savedArticle.title !== article.title,
      ),
    );
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }

  function handleSearch(query) {
    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    setIsLoading(true);
    setHasSearched(false);
    setSearchError("");

    getNews(keyword)
      .then((data) => {
        const formattedArticles = (data.articles || []).map((article) => ({
          image: article.urlToImage,
          date: new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          title: article.title,
          text: article.description,
          source: article.source?.name,
          keyword,
          url: article.url,
        }));

        setSearchResults(formattedArticles);
        setHasSearched(true);
      })
      .catch(() => {
        setSearchResults([]);
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
        setHasSearched(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <Header
                  onSignInClick={handleSignInClick}
                  isLoggedIn={isLoggedIn}
                  username={username}
                  onLogout={handleLogout}
                />

                <div className="hero__content">
                  <h1 className="hero__title">What's going on in the world?</h1>

                  <p className="hero__subtitle">
                    Find the latest news on any topic and save them in your
                    personal account.
                  </p>

                  <SearchForm onSearch={handleSearch} />
                </div>
              </section>

              <Main
                key={searchResults.length ? searchResults[0]?.keyword : "empty"}
                isLoggedIn={isLoggedIn}
                articles={searchResults}
                hasSearched={hasSearched}
                isLoading={isLoading}
                error={searchError}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
              />

              <About />
            </>
          }
        />

        <Route
          path="/saved-news"
          element={
            isLoggedIn ? (
              <>
                <Header
                  onSignInClick={handleSignInClick}
                  isLoggedIn={isLoggedIn}
                  username={username}
                  onLogout={handleLogout}
                />

                <SavedNews
                  articles={savedArticles}
                  username={username}
                  onDeleteArticle={handleDeleteArticle}
                />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
        onSignUpClick={handleSignUpClick}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSignInClick={handleRegisterSignInClick}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        onSignInClick={handleSuccessSignInClick}
      />
    </div>
  );
}

export default App;
