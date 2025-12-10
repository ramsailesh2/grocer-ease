# GrocerEase – Online Grocery Shopping Application

GrocerEase is a lightweight web application built using ReactJS with a simulated backend powered by JSON Server. The application demonstrates the core features of an online grocery platform, including product browsing, category-based filtering, search functionality with partial matching, cart management with quantity controls, and basic user profile handling.

The project is developed as part of a web development module, with emphasis on component-based architecture, clean code structure, state management, and REST API integration.

---

## Features

### User Features

* Browse grocery products with images and descriptions
* Category-based product filtering
* Search functionality with partial and similar word matching
* Add products to cart
* Increase and decrease quantity within the product card
* Dedicated cart page with product details and total amount
* Basic profile page with sample email login (localStorage)
* Random featured items displayed on home page
* Responsive layout for desktop and mobile

### Technical Features

* Clean component-based front-end architecture
* React Hooks for state management and data fetching
* REST API integration using Axios
* JSON Server for backend simulation
* Modular folder structure and reusable UI components

---

## Project Structure


grocer-ease/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ ProductCard.jsx
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  ├─ ProductsPage.jsx
│  │  ├─ CartPage.jsx
│  │  └─ ProfilePage.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ App.jsx
│  ├─ index.css
├─ db.json
├─ package.json


---

## Technologies Used

### Frontend

* ReactJS
* React Router DOM
* Axios
* HTML, CSS, JavaScript

### Backend (Prototyping)

* JSON Server
* db.json for product and cart data

### Tools

* Node.js
* Visual Studio Code
* npm

---

## Installation and Setup

Follow the steps below to run the application locally.

### 1. Clone the repository

bash
git clone https://github.com/ramsailesh2/grocer-ease.git
cd grocer-ease


### 2. Install dependencies

bash
npm install


### 3. Start the JSON Server (Backend)

bash
npm run server


JSON Server will run on:


http://localhost:3000


### 4. Start the React Application (Frontend)

Open another terminal:

bash
npm run dev


React will run on:


http://localhost:5173


Run both commands in separate terminals.

---

## API Endpoints

| Endpoint  | Method | Description           |
| --------- | ------ | --------------------- |
| /products | GET    | List all products     |
| /cart     | GET    | Get cart items        |
| /cart     | POST   | Add item to cart      |
| /cart/:id | PUT    | Update quantity       |
| /cart/:id | DELETE | Remove item from cart |

---

## Key Modules

### Products Module

* Displays product details and image
* Provides inline quantity controls
* Supports category filtering and search
* Loads data from API endpoints

### Cart Module

* Shows selected items with quantity
* Supports increment and decrement
* Provides a final checkout button
* Displays order placed confirmation

### Profile Module

* Basic login using email
* Uses localStorage for persistence

### Search Module

* Searches across product name, category and description
* Allows partial word matching

---

## Random Featured Products

On every visit to the home page, eight products are randomly selected from the product list using array shuffling logic.

---

## Future Enhancements

* Full authentication (JWT or OAuth)
* Real backend with database integration
* Payment gateway support
* Order history and tracking
* Admin dashboard for product management
* Advanced search using Fuse.js or Elasticsearch
* Responsive UI improvements

---

