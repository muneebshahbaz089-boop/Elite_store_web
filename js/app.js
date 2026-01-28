
import { ProductsAPI, CategoriesAPI } from './api.js';





  

export const renderProducts = async (products, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

 
    container.innerHTML = products.length === 0
    ? `<p class="text-center text-muted py-5">No products found.</p>`
    : products.map(p => `
      <div class="col-6 col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" style="height:200px; object-fit:cover;" alt="${p.name}">
          <div class="card-body text-center d-flex flex-column justify-content-between">
            <div>
              <h6 class="card-title">${p.name}</h6>
              <p class="card-text text-muted">${p.description}</p>
              <p class="card-text text-muted">${p.category}</p>
              <p class="fw-bold">$${p.price.toFixed(2)}</p>
            </div>
            <div class="mt-2 d-flex justify-content-around">
          
<a href="product-detail.html?id=${p.id}" class="btn btn-outline-primary btn-sm">
  View Details
</a>
<a href="product-detail.html?id=${p.id}" class="btn btn-outline-primary btn-sm">
  add to cart
</a> 



            </div>
          </div>
        </div>
      </div>
    `).join('');

};

export const renderCategories = async (containerId, selectedCategory=null) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const categories = await CategoriesAPI.getAll();
  container.innerHTML = `<a href="product.html" class="btn btn-sm ${!selectedCategory?'btn-primary':'btn-outline-primary'}">All Categories</a> `;
  container.innerHTML += categories.map(c => `
    <a href="product.html?category=${c.slug}" class="btn btn-sm ${selectedCategory===c.slug?'btn-primary':'btn-outline-primary'}">${c.name}</a>
  `).join(' ');
};

export const initApp = () => {
  
};
