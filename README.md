# Elite Sports Store

A modern, responsive e-commerce platform for sports equipment built with HTML5, CSS3, and JavaScript (ES6).

## Features

### Client Features
- ✅ Responsive Home Page with Sports Categories
- ✅ Product Listing Page with Images & Prices
- ✅ Product Detail Page
- ✅ Add to Cart System (JavaScript-based with LocalStorage)
- ✅ Search & Category Filter
- ✅ Simple Checkout Page (Static)
- ✅ Client Login
- ✅ Cart Management (Add/Remove items)

### Admin Features
- ✅ Admin Login
- ✅ Products View
- ✅ Product Add/Edit/Delete
- ✅ Category Add and Delete

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6)** - ES6 modules, async/await
- **Bootstrap 5** - Responsive UI framework
- **LocalStorage** - Client-side data persistence

## Project Structure

```
project-root/
├── index.html          # Home page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── api.js         # Data API (LocalStorage operations)
│   ├── app.js         # Main application logic
│   └── utils.js       # Utility functions
├── assets/            # Assets folder
├── images/            # Product images
├── db.json            # Initial database data
├── package.json       # Project configuration
└── README.md          # This file
```

## Pages

1. **index.html** - Home page with hero section and categories
2. **login.html** - Login page for clients and admins
3. **product.html** - Product listing with search and filter
4. **product-detail.html** - Individual product details
5. **cart.html** - Shopping cart page
6. **checkout.html** - Checkout page
7. **admin.html** - Admin dashboard

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local server)

### Installation

1. Clone or download the project
2. Open the project folder

### Running the Project

#### Option 1: Using Node.js (Recommended)
```bash
npm install
npm start
```
Then open `http://localhost:8080` in your browser.

#### Option 2: Using Python
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 3: Direct File Access
Simply open `index.html` in your web browser (some features may not work due to CORS).

## Default Login Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Client
- Username: `client`
- Password: `client123`

## Data Storage

All data is stored in browser's LocalStorage:
- Products
- Categories
- Users
- Cart
- Current User Session

## Features in Detail

### Cart System
- Add products to cart
- Update quantities
- Remove items
- Persistent storage using LocalStorage
- Real-time cart count in navigation

### Search & Filter
- Search products by name, description, or category
- Filter by category
- Real-time search results

### Admin Dashboard
- View all products
- Add new products
- Edit existing products
- Delete products
- Manage categories (add/delete)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Author

Elite Sports Store Development Team

