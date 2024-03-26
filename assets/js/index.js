import "bootstrap";
import "../css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";

document.addEventListener("DOMContentLoaded", () => {
  // Chiamo elementi del DOM
  const loadBestNewsBtn = document.getElementById("best");
  const loadTopNewsBtn = document.getElementById("top");
  const newsContainer = document.getElementById("news-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const footer = document.querySelector("footer");
  // importo axios
  const axios = require("axios");

  // Variabili per gestire il caricamento delle notizie
  let minNews = 0;
  const maxNews = 10;
  let currentNewsType = localStorage.getItem("currentNewsType") || "breaking";
  let newsIds = JSON.parse(localStorage.getItem("newsIds")) || [];

  // Funzione per ottenere gli ID delle notizie chiamando axios
  async function fetchNewsIds(newsType) {
    const urls = {
      best: "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
      top: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      breaking:
        "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    };

    try {
      const response = await axios.get(urls[newsType]);
      return response.data;
    } catch (error) {
      console.error("Error fetching news IDs:", error);
      throw error; // Rilancia l'errore per gestirlo al livello superiore
    }
  }

  // Funzione per ottenere le notizie in base agli ID tramite axios
  async function getNews(ids) {
    // utilizzo lodash per la catena di operazioni sugli array con _.chain
    const promises = _.chain(ids)
      .slice(minNews, minNews + maxNews)
      .map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
      .value();

    try {
      const responses = await Promise.all(promises);
      const news = responses.map((response) => response.data);
      getNewsOnScreen(news);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  // Funzione per visualizzare le notizie sullo schermo
  function getNewsOnScreen(newsArray) {
    newsArray.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card", "border-success", "mb-3");
      card.classList.add("shadow-lg", "p-3", "bg-body-tertiary", "rounded");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      // Cambio'intestazione della carta in base al tipo di notizie
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

  // Funzione per caricare nuove storie
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

  // Controllo se sono presenti ID di notizie memorizzati nella memoria locale
  if (!localStorage.getItem("newsIds")) {
    // Se non ci sono ID memorizzati, ottengo gli ID delle notizie in base al tipo corrente
    fetchNewsIds("breaking")
      .then((ids) => {
        newsIds = ids;
        localStorage.setItem("currentNewsType", currentNewsType);
        localStorage.setItem("newsIds", JSON.stringify(newsIds));
        loadNewStories();
      })
      .catch((error) =>
        console.error("Error fetching breaking news IDs:", error)
      );
  } else {
    // Se gli ID delle notizie sono già memorizzati, carichiamo le nuove storie
    loadNewStories();
  }

  // Gestore di eventi per i pulsanti di caricamento delle diverse categorie di notizie
  loadBestNewsBtn.addEventListener("click", () => {
    footer.style.display = "none";
    loadMoreBtn.style.display = "none";
    minNews = 0;
    currentNewsType = "best";
    newsContainer.innerHTML = "";
    fetchNewsIds("best")
      .then((ids) => {
        newsIds = ids;
        localStorage.setItem("currentNewsType", currentNewsType);
        localStorage.setItem("newsIds", JSON.stringify(newsIds));
        loadNewStories();
      })
      .catch((error) => console.error("Error fetching best news IDs:", error))
      .finally(() => {
        setTimeout(() => {
          footer.style.display = "block";
          loadMoreBtn.style.display = "block";
        }, 1000);
      });
  });

  loadTopNewsBtn.addEventListener("click", () => {
    footer.style.display = "none";
    loadMoreBtn.style.display = "none";
    minNews = 0;
    currentNewsType = "top";
    newsContainer.innerHTML = "";
    fetchNewsIds("top")
      .then((ids) => {
        newsIds = ids;
        localStorage.setItem("currentNewsType", currentNewsType);
        localStorage.setItem("newsIds", JSON.stringify(newsIds));
        loadNewStories();
      })
      .catch((error) => console.error("Error fetching top news IDs:", error))
      .finally(() => {
        setTimeout(() => {
          footer.style.display = "block";
          loadMoreBtn.style.display = "block";
        }, 1000);
      });
  });

  // Gestore di eventi per il pulsante "Load More"
  loadMoreBtn.addEventListener("click", () => {
    getNews(newsIds);
    minNews += maxNews;
  });

  // Gestore di eventi per il clic sul logo
  document.querySelector(".navbar-brand").addEventListener("click", () => {
    footer.style.display = "none";
    loadMoreBtn.style.display = "none";
    minNews = 0;
    currentNewsType = "breaking";
    newsContainer.innerHTML = "";
    fetchNewsIds("breaking")
      .then((ids) => {
        newsIds = ids;
        localStorage.setItem("currentNewsType", currentNewsType);
        localStorage.setItem("newsIds", JSON.stringify(newsIds));
        loadNewStories();
      })
      .catch((error) =>
        console.error("Error fetching breaking news IDs:", error)
      )
      .finally(() => {
        setTimeout(() => {
          footer.style.display = "block";
          loadMoreBtn.style.display = "block";
        }, 1000);
      });
  });
});
