/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var loadBestNewsBtn = document.getElementById(\"best\");\n  var loadTopNewsBtn = document.getElementById(\"top\");\n  var newsContainer = document.getElementById(\"news-container\");\n  var loadMoreBtn = document.getElementById(\"load-more-btn\");\n  var footer = document.querySelector(\"footer\");\n  var minNews = 0;\n  var maxNews = 10;\n  var currentNewsType = localStorage.getItem(\"currentNewsType\") || \"breaking\";\n  var newsIds = JSON.parse(localStorage.getItem(\"newsIds\")) || [];\n  function callFetch(url) {\n    return fetch(url).then(function (response) {\n      return response.json();\n    });\n  }\n  function fetchNewsIds(newsType) {\n    var url = newsType === \"best\" ? \"https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty\" : newsType === \"top\" ? \"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty\" : \"https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty\";\n    return callFetch(url);\n  }\n  function getNews(ids) {\n    var promises = ids.slice(minNews, minNews + maxNews).map(function (id) {\n      return callFetch(\"https://hacker-news.firebaseio.com/v0/item/\".concat(id, \".json\"));\n    });\n    Promise.all(promises).then(function (news) {\n      getNewsOnScreen(news);\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching news:\", error);\n    });\n  }\n  function getNewsOnScreen(newsArray) {\n    newsArray.forEach(function (item) {\n      var card = document.createElement(\"div\");\n      card.classList.add(\"card\", \"border-success\", \"mb-3\");\n      card.style.maxWidth = \"50rem\";\n      card.classList.add(\"shadow-lg\", \"p-3\", \"bg-body-tertiary\", \"rounded\");\n      var cardHeader = document.createElement(\"div\");\n      cardHeader.classList.add(\"card-header\");\n      if (currentNewsType === \"best\") {\n        cardHeader.textContent = \"Best News\";\n      } else if (currentNewsType === \"top\") {\n        cardHeader.textContent = \"Top News\";\n      } else {\n        cardHeader.textContent = \"Breaking News\";\n      }\n      var cardBody = document.createElement(\"div\");\n      cardBody.classList.add(\"card-body\", \"text-success\");\n      var cardTitle = document.createElement(\"h5\");\n      cardTitle.classList.add(\"card-title\");\n      cardTitle.textContent = item.title;\n      var cardText = document.createElement(\"p\");\n      cardText.classList.add(\"card-text\");\n      cardText.textContent = \"Date: \".concat(new Date(item.time * 1000).toLocaleString());\n      var anchor = document.createElement(\"a\");\n      anchor.setAttribute(\"href\", item.url);\n      anchor.setAttribute(\"target\", \"_blank\");\n      anchor.textContent = \"Click To Read\";\n      anchor.classList.add(\"btn\", \"btn-outline-dark\", \"mb-2\");\n      cardBody.appendChild(cardTitle);\n      cardBody.appendChild(anchor);\n      cardBody.appendChild(cardText);\n      card.appendChild(cardHeader);\n      card.appendChild(cardBody);\n      newsContainer.appendChild(card);\n    });\n  }\n  function loadNewStories() {\n    footer.style.display = \"none\";\n    loadMoreBtn.style.display = \"none\";\n    getNews(newsIds);\n    minNews += maxNews;\n    setTimeout(function () {\n      footer.style.display = \"block\";\n      loadMoreBtn.style.display = \"block\";\n    }, 1000);\n  }\n  if (!localStorage.getItem(\"newsIds\")) {\n    fetchNewsIds(\"breaking\").then(function (ids) {\n      newsIds = ids;\n      localStorage.setItem(\"currentNewsType\", currentNewsType);\n      localStorage.setItem(\"newsIds\", JSON.stringify(newsIds));\n      loadNewStories();\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching breaking news IDs:\", error);\n    });\n  } else {\n    loadNewStories();\n  }\n  loadBestNewsBtn.addEventListener(\"click\", function () {\n    footer.style.display = \"none\";\n    loadMoreBtn.style.display = \"none\";\n    minNews = 0;\n    currentNewsType = \"best\";\n    newsContainer.innerHTML = \"\";\n    fetchNewsIds(\"best\").then(function (ids) {\n      newsIds = ids;\n      localStorage.setItem(\"currentNewsType\", currentNewsType);\n      localStorage.setItem(\"newsIds\", JSON.stringify(newsIds));\n      loadNewStories();\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching best news IDs:\", error);\n    })[\"finally\"](function () {\n      setTimeout(function () {\n        footer.style.display = \"block\";\n        loadMoreBtn.style.display = \"block\";\n      }, 1000);\n    });\n  });\n  loadTopNewsBtn.addEventListener(\"click\", function () {\n    footer.style.display = \"none\";\n    loadMoreBtn.style.display = \"none\";\n    minNews = 0;\n    currentNewsType = \"top\";\n    newsContainer.innerHTML = \"\";\n    fetchNewsIds(\"top\").then(function (ids) {\n      newsIds = ids;\n      localStorage.setItem(\"currentNewsType\", currentNewsType);\n      localStorage.setItem(\"newsIds\", JSON.stringify(newsIds));\n      loadNewStories();\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching top news IDs:\", error);\n    })[\"finally\"](function () {\n      setTimeout(function () {\n        footer.style.display = \"block\";\n        loadMoreBtn.style.display = \"block\";\n      }, 1000);\n    });\n  });\n  loadMoreBtn.addEventListener(\"click\", function () {\n    getNews(newsIds);\n    minNews += maxNews;\n  });\n  document.querySelector(\".navbar-brand\").addEventListener(\"click\", function () {\n    footer.style.display = \"none\";\n    loadMoreBtn.style.display = \"none\";\n    minNews = 0;\n    currentNewsType = \"breaking\";\n    newsContainer.innerHTML = \"\";\n    fetchNewsIds(\"breaking\").then(function (ids) {\n      newsIds = ids;\n      localStorage.setItem(\"currentNewsType\", currentNewsType);\n      localStorage.setItem(\"newsIds\", JSON.stringify(newsIds));\n      loadNewStories();\n    })[\"catch\"](function (error) {\n      return console.error(\"Error fetching breaking news IDs:\", error);\n    })[\"finally\"](function () {\n      setTimeout(function () {\n        footer.style.display = \"block\";\n        loadMoreBtn.style.display = \"block\";\n      }, 1000);\n    });\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/js/index.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/css/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;