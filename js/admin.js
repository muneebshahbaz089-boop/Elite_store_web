import { ProductsAPI, CategoriesAPI, loadDB } from './api.js';

window.adminFunctions = {};

async function initAdmin() {
  await loadDB();
  renderProductsTable();
  renderCategoriesTable();
  populateCategoryDropdown();
}


const productsTableBody = document.getElementById('products-table-body');
const productForm = document.getElementById('productForm');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
const productModalTitle = document.getElementById('productModalTitle');
const productIdInput = document.getElementById('productId');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const productCategory = document.getElementById('productCategory');
const productImage = document.getElementById('productImage');

function renderProductsTable() {
  const products = ProductsAPI.getAll();
  productsTableBody.innerHTML = '';

  if (!products.length) {
    productsTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-5">No products found</td></tr>`;
    return;
  }

  products.forEach(p => {
    
    productsTableBody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td><img src="${p.image}" style="height:50px;width:50px;object-fit:cover;"></td>
        <td>
          <strong>${p.name}</strong><br>
          <small>${p.description}</small>
        </td>
        <td>${p.category}</td>
        <td>$${p.price}</td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="window.adminFunctions.editProduct('${p.id}')">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="window.adminFunctions.deleteProduct('${p.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

window.adminFunctions.openProductModal = function() {
  productModalTitle.textContent = "Add Product";
  productForm.reset();
  productIdInput.value = '';
  populateCategoryDropdown();
  productModal.show();
};

window.adminFunctions.editProduct = function(id) {
  
  const p = ProductsAPI.getAll().find(x => x.id == id);
  if (!p) return;

  productModalTitle.textContent = "Edit Product";
  productIdInput.value = p.id;
  productName.value = p.name;
  productDescription.value = p.description;
  productPrice.value = p.price;
  productCategory.value = p.category;
  productImage.value = p.image;

  productModal.show();
};

window.adminFunctions.deleteProduct = async function(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  await ProductsAPI.delete(id);
  renderProductsTable();
};

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const prod = {
    name: productName.value,
    description: productDescription.value,
    price: parseFloat(productPrice.value),
    category: productCategory.value,
    image: productImage.value
  };

  const id = productIdInput.value; 

  if (id) {
    await ProductsAPI.update(id, prod);
  } else {
    await ProductsAPI.add(prod);
  }

  productModal.hide();
  renderProductsTable();
});

const categoriesTableBody = document.getElementById('categories-table-body');
const categoryForm = document.getElementById('categoryForm');
const categoryName = document.getElementById('categoryName');
const categorySlug = document.getElementById('categorySlug');
const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));

function renderCategoriesTable() {
  const categories = CategoriesAPI.getAll();
  categoriesTableBody.innerHTML = '';

  if (!categories.length) {
    categoriesTableBody.innerHTML = `<tr><td colspan="4" class="text-center py-5">No categories found</td></tr>`;
    return;
  }

  categories.forEach(c => {
    categoriesTableBody.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.slug}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="window.adminFunctions.deleteCategory('${c.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function populateCategoryDropdown() {
  const categories = CategoriesAPI.getAll();
  productCategory.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(c => {
    productCategory.innerHTML += `<option value="${c.slug}">${c.name}</option>`;
  });
}

window.adminFunctions.openCategoryModal = function() {
  categoryForm.reset();
  categoryModal.show();
};

categoryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cat = {
    name: categoryName.value,
    slug: categorySlug.value
  };
  await CategoriesAPI.add(cat);
  categoryModal.hide();
  renderCategoriesTable();
  populateCategoryDropdown();
});

window.adminFunctions.deleteCategory = async function(id) {
  if (!confirm("Are you sure you want to delete this category?")) return;
  await CategoriesAPI.delete(id);
  renderCategoriesTable();
  populateCategoryDropdown();
};

initAdmin();