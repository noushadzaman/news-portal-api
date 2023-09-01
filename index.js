const handleCategory = async () => {
  const tabContainer = document.getElementById("tab-container");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  data.data.news_category.slice(0, 5).forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="handleLoadNews(${category.category_id})" class="tab">${category.category_name}</a>
     `;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (category) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/0${category}`
  );
  const data = await response.json();
  data.data.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src=${news?.image_url} alt="Shoes" /></figure>
    <div class="card-body">
    <h2 class="card-title">${news.title}
        <div class="badge badge-secondary">${news?.rating?.badge}</div>
      </h2>
      <p>${news.details.slice(0, 100)}...</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div> 
      </div>
    </div>
  </div>`;
    cardContainer.appendChild(div);
  });
};

handleCategory();
handleLoadNews(8);
