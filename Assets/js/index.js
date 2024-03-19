const newsContainer = document.createElement("div");
newsContainer.setAttribute("id", "news-container");

const loadMoreBtn = document.createElement("button");
loadMoreBtn.setAttribute("id", "load-more-btn");
loadMoreBtn.textContent = "Load More";

const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("id", "button-container");

buttonContainer.appendChild(loadMoreBtn);

document.querySelector('body').appendChild(newsContainer); 
document.querySelector('body').appendChild(buttonContainer); 


document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container')
    const loadMoreBtn = document.getElementById('load-more-btn')
    let minNews = 0
    const maxNews = 10

  // Funzione per fetchare
  function callFetch(url) {
    return fetch(url)
      .then(response => response.json())
    }

  // Funzione per fetchare i dettagli dell'API globale
    function getNews(ids) {
      const promises = ids.slice(minNews, minNews + maxNews)
        .map(id => callFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      
      Promise.all(promises)
        .then(news => {
         getNewsOnScreen(news)
        })
        .catch(error => console.error('Error fetching news:', error))
      }
  

  // Funzione che renderizza le notizie
    function getNewsOnScreen(Array) {
      Array.forEach(item => {
        const newsItem = document.createElement('div')
        newsItem.setAttribute("id", "news-item");
        newsItem.innerHTML = `<h3>${item.title}</h3>
        <a id="anchor" href="${item.url}" target="_blank">Click here to read</a>
        <p>Date: ${new Date(item.time * 1000).toLocaleString()}</p>`
        newsContainer.appendChild(newsItem)
      })
    }

    // Richiamo la function per fetchare l'API globale
    callFetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then(newsIds => {

        // Richiamo la function che carica le prime 10 notizie
        getNews(newsIds)
        minNews += maxNews

        // Aggiunta dell'handler per il pulsante "Load more"
        loadMoreBtn.addEventListener('click', () => {
          getNews(newsIds)
          minNews += maxNews
        });
      })
      .catch(error => console.error('Error fetching news IDs:', error))
  }) 