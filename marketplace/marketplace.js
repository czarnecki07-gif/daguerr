document.addEventListener("DOMContentLoaded", () => {

  const DATA = {
    categories: ["Presets", "Courses", "Prints", "Stock", "Music"],
    products: [
      {
        title: "Preset Pack — Portrait Gold",
        price: "49",
        category: "Presets",
        image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        tags: ["portrait", "warm", "skin tones"],
        link: "#"
      },
      {
        title: "Preset Pack — Cinematic Blue",
        price: "59",
        category: "Presets",
        image: "https://images.pexels.com/photos/3101527/pexels-photo-3101527.jpeg",
        tags: ["cinematic", "cool"],
        link: "#"
      },
      {
        title: "Kurs: Podstawy Fotografii",
        price: "199",
        category: "Courses",
        image: "",
        tags: ["beginner"],
        link: "#"
      },
      {
        title: "Kurs: Studio Lighting PRO",
        price: "299",
        category: "Courses",
        image: "",
        tags: ["studio", "lighting"],
        link: "#"
      },
      {
        title: "Print 30×40 — Old Town",
        price: "120",
        category: "Prints",
        image: "https://images.pexels.com/photos/208349/pexels-photo-208349.jpeg",
        tags: ["print", "architecture"],
        link: "#"
      },
      {
        title: "Print 50×70 — Seaside",
        price: "180",
        category: "Prints",
        image: "",
        tags: ["print", "sea"],
        link: "#"
      },
      {
        title: "Stock Pack — Architecture",
        price: "79",
        category: "Stock",
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        tags: ["stock", "architecture"],
        link: "#"
      },
      {
        title: "Stock Pack — Nature",
        price: "79",
        category: "Stock",
        image: "",
        tags: ["stock", "nature"],
        link: "#"
      },
      {
        title: "Music Pack — Ambient",
        price: "39",
        category: "Music",
        image: "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
        tags: ["music", "ambient"],
        link: "#"
      }
    ]
  };

  const catContainer = document.getElementById("marketplace-categories");
  const prodContainer = document.getElementById("marketplace-products");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  let activeCategory = "All";

  searchInput.addEventListener("input", renderProducts);
  sortSelect.addEventListener("change", renderProducts);

  renderCategories();
  renderProducts();

  function renderCategories() {
    catContainer.innerHTML = "";

    const allBtn = createCategoryButton("All");
    catContainer.appendChild(allBtn);

    DATA.categories.forEach(cat => {
      const btn = createCategoryButton(cat);
      catContainer.appendChild(btn);
    });
  }

  function createCategoryButton(cat) {
    const btn = document.createElement("button");
    btn.className = "category-button";
    btn.textContent = cat;

    if (cat === activeCategory) btn.classList.add("active");

    btn.addEventListener("click", () => {
      activeCategory = cat;
      updateActiveButtons();
      renderProducts();
    });

    return btn;
  }

  function updateActiveButtons() {
    document.querySelectorAll(".category-button").forEach(btn => {
      btn.classList.toggle("active", btn.textContent === activeCategory);
    });
  }

  function renderProducts() {
    prodContainer.innerHTML = "";

    let filtered =
      activeCategory === "All"
        ? DATA.products
        : DATA.products.filter(p => p.category === activeCategory);

    // 🔍 WYSZUKIWANIE
    const query = searchInput.value.toLowerCase().trim();
    if (query !== "") {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // ↕ SORTOWANIE
    const sort = sortSelect.value;

    if (sort === "price-asc") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (sort === "price-desc") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (sort === "alpha-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "alpha-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    // RENDEROWANIE KART
    filtered.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";

      const hasImage = prod.image && prod.image.trim() !== "";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "product-image-wrapper";
      imageWrapper.classList.add(hasImage ? "has-image" : "no-image");

      if (hasImage) {
        const img = document.createElement("img");
        img.src = prod.image;
        img.alt = prod.title;
        img.className = "product-image";
        imageWrapper.appendChild(img);
      } else {
        imageWrapper.textContent = "Brak zdjęcia";
      }

      const body = document.createElement("div");
      body.className = "product-body";

      const titleEl = document.createElement("div");
      titleEl.className = "product-title";
      titleEl.textContent = prod.title;

      const priceEl = document.createElement("div");
      priceEl.className = "product-price";
      priceEl.textContent = prod.price + " zł";

      const catEl = document.createElement("div");
      catEl.className = "product-category";
      catEl.textContent = prod.category;

      body.appendChild(titleEl);
      body.appendChild(priceEl);
      body.appendChild(catEl);

      if (prod.tags && prod.tags.length > 0) {
        const tagsWrapper = document.createElement("div");
        tagsWrapper.className = "product-tags";

        prod.tags.forEach(t => {
          const tagEl = document.createElement("span");
          tagEl.className = "product-tag";
          tagEl.textContent = t;
          tagsWrapper.appendChild(tagEl);
        });

        body.appendChild(tagsWrapper);
      }

      const footer = document.createElement("div");
      footer.className = "product-footer";

      if (prod.link && prod.link.trim() !== "") {
        const linkEl = document.createElement("a");
        linkEl.className = "product-link";
        linkEl.href = prod.link;
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";
        linkEl.textContent = "Zobacz ofertę";
        footer.appendChild(linkEl);
      }

      card.appendChild(imageWrapper);
      card.appendChild(body);
      card.appendChild(footer);

      prodContainer.appendChild(card);
    });
  }
});

