import { useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";

function Main({
  isLoggedIn,
  articles = [],
  savedArticles = [],
  onSaveArticle,
  isLoading = false,
  hasSearched = false,
  error = "",
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  function handleShowMore() {
    setVisibleCards((current) => current + 3);
  }
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <section className="main__not-found">
        <p className="main__not-found-text">{error}</p>
      </section>
    );
  }

  if (hasSearched && articles.length === 0) {
    return (
      <section className="main__not-found">
        <div className="main__not-found-icon">☹</div>
        <h2 className="main__not-found-title">Nothing found</h2>
        <p className="main__not-found-text">
          Sorry, but nothing matched your search terms.
        </p>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <main className="main">
      <section className="main__content">
        <h2 className="main__title">Search results</h2>

        <div className="main__cards">
          {articles.slice(0, visibleCards).map((article) => (
            <NewsCard
              key={article.title}
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={savedArticles.some(
                (savedArticle) => savedArticle.title === article.title,
              )}
              onSave={onSaveArticle}
            />
          ))}
        </div>

        {visibleCards < articles.length && (
          <button
            className="main__show-more"
            type="button"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </section>
    </main>
  );
}

export default Main;
