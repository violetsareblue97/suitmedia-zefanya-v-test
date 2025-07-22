const grid = document.getElementById('postsGrid');

async function loadPosts() {
  const sortOrder = document.getElementById('sortBy').value; // 'desc' atau 'asc'
  const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas`;

  try {
    const resp = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!resp.ok) {
      console.error('Response not OK:', resp.status, resp.statusText);
      return;
    }
    const json = await resp.json();
    renderPosts(json.data);
  } catch (error) {
    console.error('Gagal fetch data:', error);
  }
}

function renderPosts(posts) {
  grid.innerHTML = '';

  if (!posts || posts.length === 0) {
    grid.innerHTML = '<p>Tidak ada data</p>';
    return;
  }

  posts.forEach(item => {
    // Buat card
    const card = document.createElement('div');
    card.className = 'card';

    // Gambar
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = item.small_image?.url || 'https://via.placeholder.com/320x180?text=No+Image';
    img.alt = item.title || 'Image';

    // Body
    const body = document.createElement('div');
    body.className = 'card-content';

    // Judul
    const title = document.createElement('h3');
    title.textContent = item.title || 'Tanpa Judul';

    // Tanggal
    const timeTag = document.createElement('time');
    const dateObj = new Date(item.published_at);
    timeTag.textContent = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleDateString();

    body.appendChild(title);
    body.appendChild(timeTag);
    card.appendChild(img);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

// Jalankan saat DOM ready
window.addEventListener('DOMContentLoaded', () => {
  loadPosts();

  // Jika ada filter sort, bisa tambahkan event listener
  const sortSelect = document.getElementById('sortBy');
  if (sortSelect) {
    sortSelect.addEventListener('change', loadPosts);
  }
});