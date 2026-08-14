import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ articles = [], username = "Elise", onDeleteArticle }) {
  const keywords = [...new Set(articles.map((article) => article.keyword))];

  let keywordText = "";

  if (keywords.length === 1) {
    keywordText = keywords[0];
  } else if (keywords.length === 2) {
    keywordText = `${keywords[0]} and ${keywords[1]}`;
  } else if (keywords.length > 2) {
    keywordText = `${keywords[0]}, ${keywords[1]}, and ${
      keywords.length - 2
    } other`;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__label">Saved articles</p>

        <h1 className="saved-news__title">
          {username}, you have {articles.length} saved articles
        </h1>

        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: <strong>{keywordText}</strong>
          </p>
        )}
      </section>

      <section className="saved-news__articles">
        <div className="saved-news__cards">
          {articles.map((article) => (
            <NewsCard
              key={article.title}
              article={article}
              isSaved
              isSavedPage
              onDelete={onDeleteArticle}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
