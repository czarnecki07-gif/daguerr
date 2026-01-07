const itemsContainer = document.getElementById("world-items");
const filterButtons = document.querySelectorAll(".filter-btn");

let allItems = [];

fetch("feed.json")
  .then(res => res.json())
  .then(data => {
    allItems = data.items || [];
    renderItems(allItems);
  });

function renderItems(items) {
  itemsContainer.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("a");
    card.href = item.url;
    card.target = "_blank";
    card.className = "world-card";

    card.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="world-card-content">
        <div class="world-card-title">${item.title}</div>
        <div class="world-card-source">${item.source}</div>
      </div>
    `;

    itemsContainer.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "all") {
      renderItems(allItems);
    } else {
      renderItems(allItems.filter(i => i.category === category));
    }
  });
});
