document.addEventListener("DOMContentLoaded", () => {
  const loadBestNewsBtn = document.getElementById("best");
  const loadTopNewsBtn = document.getElementById("top");
  const newsContainer = document.getElementById("news-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const footer = document.querySelector("footer");

  let minNews = 0;
  const maxNews = 10;
  let currentNewsType = 'breaking';
  let newsIds = [];

  function callFetch(url) {
    return fetch(url).then((response) => response.json());
  }

  function fetchNewsIds(newsType) {
    const url =
      newsType === 'best'
        ? "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
        : newsType === 'top'
          ? "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
          : "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
    
    return callFetch(url);
  }

  function getNews(ids) {
    const promises = ids
      .slice(minNews, minNews + maxNews)
      .map((id) =>
        callFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );

    Promise.all(promises)
      .then((news) => {
        getNewsOnScreen(news);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }

  function getNewsOnScreen(newsArray) {
    newsArray.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card", "border-success", "mb-3");
      card.style.maxWidth = "50rem";
      card.classList.add("shadow-lg", "p-3", "bg-body-tertiary", "rounded");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      if (currentNewsType === "best") {
        cardHeader.textContent = "Best News";
      } else if (currentNewsType === "top") {
        cardHeader.textContent = "Top News";
      } else {
        cardHeader.textContent = "Breaking News";
      }

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "text-success");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = item.title;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = `Date: ${new Date(item.time * 1000).toLocaleString()}`;

      const anchor = document.createElement("a");
      anchor.setAttribute("href", item.url);
      anchor.setAttribute("target", "_blank");
      anchor.textContent = "Click To Read";
      anchor.classList.add("btn", "btn-outline-dark", "mb-2");

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(anchor);
      cardBody.appendChild(cardText);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      newsContainer.appendChild(card);
    });
  }

  function loadNewStories() {
    footer.style.display = "none";
    loadMoreBtn.style.display = "none";

    getNews(newsIds);
    minNews += maxNews;

    setTimeout(() => {
      footer.style.display = "block";
      loadMoreBtn.style.display = "block";
    }, 1000);
  }

  function loadNewsByType(newsType) {
    footer.style.display = "none";
    loadMoreBtn.style.display = "none";
    minNews = 0;
    currentNewsType = newsType;
    newsContainer.innerHTML = '';
    fetchNewsIds(newsType)
      .then(ids => {
        newsIds = ids;
        getNews(newsIds);
      })
      .catch((error) => console.error(`Error fetching ${newsType} news IDs:`, error))
      .finally(() => {
        setTimeout(() => {
          footer.style.display = "block";
          loadMoreBtn.style.display = "block";
        }, 1000);
      });
  }

  loadNewStories();

  loadBestNewsBtn.addEventListener("click", () => {
    loadNewsByType('best');
  });

  loadTopNewsBtn.addEventListener("click", () => {
    loadNewsByType('top');
  });

  loadMoreBtn.addEventListener("click", () => {
    getNews(newsIds);
    minNews += maxNews;
  });

  document.querySelector(".navbar-brand").addEventListener("click", () => {
    loadNewsByType('breaking');
  });

  
  if (window.location.search.includes('type')) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    loadNewsByType(type);
  } else {
    loadNewStories(); 
  }
});