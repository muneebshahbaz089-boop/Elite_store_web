const BASE_URL = "http://localhost:3000";

let DB = {
  products: [],
  categories: []
};


export async function loadDB() {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${BASE_URL}/products`),
    fetch(`${BASE_URL}/categories`)
  ]);

  DB.products = await productsRes.json();
  DB.categories = await categoriesRes.json();
}


export const ProductsAPI = {
  getAll() {
    return DB.products;
  },

  getByCategory(category) {
    return DB.products.filter(p => p.category === category);
  },

  search(query) {
    const q = query.toLowerCase();
    return DB.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  },

  async add(product) {
    await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    await loadDB();
  },

  async update(id, product) {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    await loadDB();
  },

  async delete(id) {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE"
    });
    await loadDB();
  }
};

export const CategoriesAPI = {
  getAll() {
    return DB.categories;
  },

  async add(category) {
    await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    });
    await loadDB();
  },

  async delete(id) {
    await fetch(`${BASE_URL}/categories/${id}`, {   
      method: "DELETE"
    });
    await loadDB();
  }
};

