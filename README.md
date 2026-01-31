# Product Management System

A professional, aesthetically pleasing Product Management System (PMS) built with Node.js, Express, MySQL, and EJS.

## 🚀 Key Features

- **User Authentication:** Secure registration and login using JWT stored in HTTP-Only cookies.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for inventory.
- **Soft Delete:** Products are never truly removed from the database; they are marked as deleted to preserve history.
- **Dynamic Dashboard:** Real-time calculation of total products and total inventory value.
- **Clean Architecture:** Organized folder structure separating controllers, routes, middleware, and views.
- **Modern UI:** Styled with Tailwind CSS v4 for a premium, responsive experience.

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (Connected via `mysql2` pool)
- **Frontend:** EJS (Server-Side Rendering), Tailwind CSS v4
- **Authentication:** JSON Web Token (JWT), BcryptJS for password hashing

## 📁 Project Structure

```text
/
├── config/             # Database connection configuration
├── controllers/        # Business logic for Auth and Products
├── database/           # SQL database exports
├── middleware/         # Authentication protection middleware
├── routes/             # Route definitions
├── views/              # EJS Templates
│   ├── auth/           # Login and Register pages
│   ├── products/       # Dashboard, Add, and Edit pages
│   ├── layouts/        # Main layout shell
│   └── partials/       # Reusable Navbar and Footer
├── app.js              # Application entry point
└── package.json        # Dependencies and scripts
```

## ⚙️ Setup Instructions

1.  **Clone the repository** (or navigate to the project folder).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
    JWT_SECRET="your_secret_key"
    PORT=3000
    ```
4.  **Database Setup**:
    - Create a database in MySQL named `product_db` (or as specified in your `.env`).
    - Import the SQL schema and data from `database/product_db.sql`.
5.  **Run the Project**:

    ```bash
    # Development mode
    npm run dev

    # Production
    npm start
    ```

---

## �️ Application Routes

### Authentication

- `GET /login` - View login page
- `POST /login` - Process login
- `GET /register` - View registration page
- `POST /register` - Process registration
- `GET /logout` - Log out and clear session

### Products (Protected)

- `GET /` or `/dashboard` - View inventory dashboard
- `GET /add-product` - View add product form
- `POST /products` - Create a new product
- `GET /edit-product/:id` - View edit product form
- `PUT /products/:id` - Update existing product (via `_method=PUT`)
- `DELETE /products/:id` - Soft delete product (via `_method=DELETE`)

---

## �👤 Author

- **Arun PS**
