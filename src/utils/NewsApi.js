const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_NEWS_API_PROXY_URL
  : import.meta.env.VITE_NEWS_API_URL;

function getDate(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

export function getNews(keyword) {
  const params = new URLSearchParams({
    q: keyword,
    apiKey: API_KEY,
    from: getDate(7),
    to: getDate(),
    pageSize: "100",
  });

  return fetch(`${BASE_URL}?${params.toString()}`).then((res) => {
    if (!res.ok) {
      return Promise.reject(new Error(`Error: ${res.status}`));
    }

    return res.json();
  });
}
