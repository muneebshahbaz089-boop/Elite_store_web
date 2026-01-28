
import { initApp, renderProducts, renderCategories } from './app.js';
import { ProductsAPI, CategoriesAPI, loadDB } from './api.js';


initApp();




const renderProductPage = async () => {
    await loadDB();

    
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category');

    
    renderCategories('categories-container', selectedCategory);

    
    let allProducts = ProductsAPI.getAll();
    let filteredProducts = selectedCategory 
        ? ProductsAPI.getByCategory(selectedCategory) 
        : allProducts;

    renderProducts(filteredProducts, 'products-container');

    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim();
            let searchResult = query ? ProductsAPI.search(query) : ProductsAPI.getAll();

            if (selectedCategory) {
                searchResult = searchResult.filter(p => p.category === selectedCategory);
            }

            renderProducts(searchResult, 'products-container');
        }, 300));
    }
};


function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}


renderProductPage();
