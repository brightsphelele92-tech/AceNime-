// scripts.js

// URLs to your JSON data files
const animeDataURL = 'anime-data.json';
const mangaDataURL = 'manga-data.json';
const reviewsDataURL = 'reviews-data.json';
const fightsDataURL = 'fights-data.json';
const motivationDataURL = 'motivation-data.json';

// Elements
const searchInput = document.getElementById('search-input');
const animeSection = document.getElementById('anime-reviews-section');
const mangaSection = document.getElementById('manga-section');
const reviewsSection = document.getElementById('reviews-section');
const fightsSection = document.getElementById('fights-section');
const motivationSection = document.getElementById('motivation-section');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');

// Fetch and load JSON data dynamically
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err);
    return [];
  }
}

// Render anime reviews
function renderAnime(animeList) {
  animeSection.innerHTML = '';
  animeList.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';
    animeCard.innerHTML = `
      <img src="${anime.coverImage}" alt="${anime.title}" />
      <h3>${anime.title} (${anime.releaseYear})</h3>
      <p>${anime.description}</p>
      <a href="${anime.trailerURL}" target="_blank" class="btn">Watch Trailer</a>
    `;
    animeSection.appendChild(animeCard);
  });
}

// Render manga list
function renderManga(mangaList) {
  mangaSection.innerHTML = '';
  mangaList.forEach(manga => {
    const mangaCard = document.createElement('div');
    mangaCard.className = 'manga-card';
    mangaCard.innerHTML = `
      <img src="${manga.coverImage}" alt="${manga.title}" />
      <h3>${manga.title} by ${manga.author} (${manga.publicationYear})</h3>
      <p>${manga.summary}</p>
    `;
    mangaSection.appendChild(mangaCard);
  });
}

// Render reviews with comments (simplified)
function renderReviews(reviewsList) {
  reviewsSection.innerHTML = '';
  reviewsList.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
      <h4>${review.animeTitle} - ${review.reviewTitle || ''}</h4>
      <p><strong>${review.reviewerName}</strong> (${review.reviewDate}) rated: ${review.rating}/5</p>
      <p>${review.reviewText}</p>
      ${review.spoiler ? '<p><em>Contains spoilers</em></p>' : ''}
      <p>Comments: ${review.commentCount}</p>
    `;
    reviewsSection.appendChild(reviewCard);
  });
}

// Render fights section
function renderFights(fightsList) {
  fightsSection.innerHTML = '';
  fightsList.forEach(fight => {
    const fightCard = document.createElement('div');
    fightCard.className = 'fight-card';
    fightCard.innerHTML = `
      <img src="${fight.fightImage}" alt="Fight scene from ${fight.animeName}" />
      <h4>${fight.animeName} Fight</h4>
      <p><strong>Characters:</strong> ${fight.charactersInvolved.join(', ')}</p>
      <p>${fight.fightDescription}</p>
      <a href="${fight.fightVideo}" target="_blank" class="btn">Watch Fight</a>
    `;
    fightsSection.appendChild(fightCard);
  });
}

// Render motivation quotes
function renderMotivation(quotesList) {
  motivationSection.innerHTML = '';
  quotesList.forEach(quote => {
    const quoteCard = document.createElement('div');
    quoteCard.className = 'quote-card';
    quoteCard.innerHTML = `
      <img src="${quote.characterImage}" alt="${quote.characterName}" />
      <blockquote>"${quote.quoteText}"</blockquote>
      <p>- ${quote.characterName}, <em>${quote.animeTitle}</em></p>
    `;
    motivationSection.appendChild(quoteCard);
  });
}

// Search function (searches anime titles only for demo)
function searchAnime(query, animeList) {
  const filtered = animeList.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );
  renderAnime(filtered);
}

// Responsive navbar toggle
navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});

// Initialize the site by loading data and rendering
async function init() {
  const animeList = await fetchData(animeDataURL);
  const mangaList = await fetchData(mangaDataURL);
  const reviewsList = await fetchData(reviewsDataURL);
  const fightsList = await fetchData(fightsDataURL);
  const motivationList = await fetchData(motivationDataURL);

  renderAnime(animeList);
  renderManga(mangaList);
  renderReviews(reviewsList);
  renderFights(fightsList);
  renderMotivation(motivationList);

  // Setup search
  searchInput.addEventListener('input', e => {
    searchAnime(e.target.value, animeList);
  });
}

// Call init on page load
window.addEventListener('DOMContentLoaded', init);
