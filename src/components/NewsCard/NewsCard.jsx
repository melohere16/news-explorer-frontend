import "./NewsCard.css";
import savedIcon from "../../assets/saved.svg";
import savedActiveIcon from "../../assets/saved-active.svg";
import trashIcon from "../../assets/trash.svg";

function NewsCard({
  isLoggedIn = false,
  article = {},
  isSaved = false,
  isSavedPage = false,
  onSave,
  onDelete,
}) {
  const {
    image,
    date = "November 4, 2020",
    title = "Everyone Needs a Special 'Sit Spot' in Nature",
    text = "Ever since I read Richard Louv's influential book, the idea of having a special sit spot has stuck with me.",
    source = "TREEHUGGER",
    keyword,
  } = article;

  function handleActionClick() {
    if (!isLoggedIn && !isSavedPage) {
      return;
    }

    if (isSavedPage) {
      onDelete?.(article);
    } else {
      onSave?.(article);
    }
  }

  return (
    <article className="news-card">
      {image && <img className="news-card__image" src={image} alt={title} />}

      {isSavedPage && keyword && (
        <span className="news-card__keyword">{keyword}</span>
      )}

      {isSavedPage && (
        <span className="news-card__delete-tooltip">Remove from saved</span>
      )}

      {!isLoggedIn && !isSavedPage && (
        <span className="news-card__save-tooltip">
          Sign in to save articles
        </span>
      )}

      <button
        className={`news-card__save-button ${
          isSaved ? "news-card__save-button_active" : ""
        }`}
        type="button"
        aria-label={isSavedPage ? "Delete article" : "Save article"}
        onClick={handleActionClick}
      >
    <img
  className={`news-card__action-icon ${
    isSavedPage ? "news-card__action-icon_trash" : ""
  }`}
  src={isSavedPage ? trashIcon : isSaved ? savedActiveIcon : savedIcon}
  alt={isSavedPage ? "Delete article" : isSaved ? "Article saved" : "Save article"}
/>
      </button>

      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
