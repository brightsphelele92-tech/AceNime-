// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Select containers for each section
  const animeContainer = document.getElementById('anime-container');
  const mangaContainer = document.getElementById('manga-container');
  const reviewsContainer = document.getElementById('reviews-container');
  const fightsContainer = document.getElementById('fights-container');
  const motivationContainer = document.getElementById('motivation-container');
  const searchInput = document.getElementById('search-input');

  // Helper to create cards for anime/manga/reviews
  function createCard(item, type = 'anime') {
    const card = document.createElement('div');
    card.className = 'card';

    // Image
    const img = document.createElement('img');
    img.src = item.image || item.coverImage || '';
    img.alt = item.title || 'item image';

    // Content container
    const content = document.createElement('div');
    content.className = 'card-content';

    // Title
    const title = document.createElement('h3');
    title.textContent = item.title || 'No Title';

    // Description or summary
    const desc = document.createElement('p');
    desc.textContent = item.description || item.summary || item.quoteText || '';

    content.appendChild(title);
    content.appendChild(desc);

    // Reviews section specific content
    if (type === 'reviews') {
      // Reviewer & rating
      const reviewer = document.createElement('p');
      reviewer.textContent = `By: ${item.reviewerName || 'Anonymous'} - Rating: ${item.rating || 'N/A'}/5`;
      reviewer.style.fontStyle = 'italic';
      reviewer.style.fontSize = '0.85rem';
      content.appendChild(reviewer);

      // Comment area (simulate posting)
      const commentBox = document.createElement('textarea');
      commentBox.placeholder = 'Add a comment...';
      commentBox.style.width = '100%';
      commentBox.style.marginTop = '10px';
      commentBox.style.resize = 'vertical';
      content.appendChild(commentBox);

      const postBtn = document.createElement('button');
      postBtn.textContent = 'Post Comment';
      postBtn.className = 'btn';
      postBtn.style.marginTop = '5px';
      content.appendChild(postBtn);

      const commentsList = document.createElement('div');
      commentsList.className = 'comments-list';
      commentsList.style.marginTop = '10px';
      commentsList.style.fontSize = '0.85rem';
      commentsList.style.maxHeight = '100px';
      commentsList.style.overflowY = 'auto';
      content.appendChild(commentsList);

      postBtn.addEventListener('click', () => {
        const text = commentBox.value.trim();
        if (text) {
          const comment = document.createElement('p');
          comment.textContent = text;
          commentsList.appendChild(comment);
          commentBox.value = '';
        }
      });
    }

    card.appendChild(img);
    card.appendChild(content);

    return card;
  }

  // Load JSON and render a section
  async function loadSection(jsonFile, container, type = 'anime', limit = 10) {
    try {
      const res = await fetch(jsonFile);
      if (!res.ok) throw new Error(`Failed to load ${jsonFile}`);
      const data = await res.json();

      container.innerHTML = ''; // clear before adding

      // Limit number of displayed items
      const itemsToShow = data.slice(0, limit);
      itemsToShow.forEach(item => {
        const card = createCard(item, type);
        container.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="color: #ff2e63;">Failed to load data.</p>`;
    }
  }

  // Search filtering for anime section
  function filterAnime() {
    const filter = searchInput.value.toLowerCase();
    const cards = animeContainer.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(filter) ? '' : 'none';
    });
  }

  // Responsive nav toggle (optional, if you have a burger menu)
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Initialize all sections
  loadSection('anime-data.json', animeContainer, 'anime');
  loadSection('manga-data.json', mangaContainer, 'manga');
  loadSection('reviews-data.json', reviewsContainer, 'reviews');
  loadSection('fights-data.json', fightsContainer, 'anime'); // fights use anime style
  loadSection('motivation-data.json', motivationContainer, 'motivation');

  // Bind search input
  if (searchInput) {
    searchInput.addEventListener('input', filterAnime);
  }
});
