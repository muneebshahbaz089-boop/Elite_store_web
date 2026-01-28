import { loadDB, ProductsAPI, CategoriesAPI } from './api.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  
  const res = await fetch('http://localhost:3000/users');
  const users = await res.json();

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert('Invalid credentials!');
    return;
  }

  
  localStorage.setItem('currentUser', JSON.stringify(user));

  
  if (user.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'product.html';
  }
});

