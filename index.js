const handleCategory = async () => {
  const tabContainer = document.getElementById("tab-container");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  data.data.news_category.slice(0, 3).forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="handleLoadNews(${category.category_id})" class="tab">${category.category_name}</a>
     `;
    tabContainer.appendChild(div);
  });
};

const handleLoadNews = async (category) => {
    const cardContainer = document.getElementById('card-container');
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/0${category}`
  );
  const data = await response.json();
  data.data.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `;
    cardContainer.appendChild(div);
  });
};

handleCategory();
