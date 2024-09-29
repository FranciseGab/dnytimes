const sections = {
    home: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=PIssOpb3KLPxbpgAvFdA84HAyPLaHnA5',
    us: 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=PIssOpb3KLPxbpgAvFdA84HAyPLaHnA5',
    world: 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=PIssOpb3KLPxbpgAvFdA84HAyPLaHnA5',
    arts: 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=PIssOpb3KLPxbpgAvFdA84HAyPLaHnA5',
    science: 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=PIssOpb3KLPxbpgAvFdA84HAyPLaHnA5'
  };
  
  const TopNews = document.getElementById('top-stories');
  
  const displayDate = () => {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Manila', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,  
    };
    document.getElementById('date_now').innerHTML = now.toLocaleString('en-US', options);
  };
  
  
  const getSectionNews = async (section) => {
    const jsonFile = sections[section];
    try {
      const res = await fetch(jsonFile);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${section} news: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
    } catch (e) {
      alert(`An error occurred while fetching ${section} news. ${e.message}`);
      return [];
    }
  };
  
  const updateContainer = (data) => {
    TopNews.innerHTML = '';
    if (data.results && data.results.length > 0) {
      data.results.forEach((news) => {
        const newsContainer = document.createElement('div');
        newsContainer.setAttribute('class', 'article');
  
        const title = news?.title || 'No title available';
        const abstract = news?.abstract || 'No description available';
        const imageUrl = news?.multimedia?.[0]?.url || 'https://via.placeholder.com/150';
  
        newsContainer.innerHTML = `
          <div class="title_b">
            <h2>${title}</h2>
          </div>
          <p>${abstract}</p>
        `;
  
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = title;
        imgElement.style.width = '100%';
        newsContainer.appendChild(imgElement);
  
        const readMoreLink = document.createElement('a');
        readMoreLink.href = news?.url || '#';
        readMoreLink.textContent = 'Read More';
        readMoreLink.target = '_blank';
        newsContainer.appendChild(readMoreLink);
  
        TopNews.appendChild(newsContainer);
      });
    } else {
      TopNews.innerHTML = '<p>No news available for this section.</p>';
    }
  };
  
  document.querySelectorAll('#nav a').forEach((navItem) => {
    navItem.addEventListener('click', async (e) => {
      e.preventDefault(); 
      const section = e.target.id; 
      const data = await getSectionNews(section); 
      updateContainer(data); 
    });
  });
  
  (async () => {
    displayDate();  
    const data = await getSectionNews('home');
    updateContainer(data);
  })();