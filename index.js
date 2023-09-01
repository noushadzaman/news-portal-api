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
        <div onclick=handleModal('${
          news._id
        }') class="btn btn-primary">Details</div> 
      </div>
    </div>
  </div>`;
    cardContainer.appendChild(div);
  });
};

const handleModal = async (news_id) => {
  console.log(news_id);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/${news_id}`
  );
  const data = await response.json();
  console.log(data.data[0]);

  const modalContainer = document.getElementById("modal-container");
  const div = document.createElement("div");
  div.innerHTML = `
 <dialog id="my_modal_1" class="modal">
   <form method="dialog" class="modal-box">
     <h3 class="font-bold text-lg">${data.data[0].title}</h3>
     <p class="py-4">${data.data[0].details}</p>
     <div class="modal-action">
     <button class="btn">Close</button>
    </div>
   </form>
 </dialog>
    `;
  modalContainer.appendChild(div);

  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

handleCategory();
handleLoadNews(8);

document.getElementById('header').innerHTML = ` <div class="navbar bg-base-100">
<div class="navbar-start">
    <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </label>
        <ul tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
        </ul>
    </div>
</div>
<div class="navbar-center">
    <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
</div>
<div class="navbar-end">
    <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </button>
    <button class="btn btn-ghost btn-circle">
        <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
    </button>
</div>
</div>`;
