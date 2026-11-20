# Role-Based Node.js + Express + MongoDB API

A simple product CRUD API demonstrating role-based access control (RBAC).

**There is no authentication or login system in this project.** The API reads a role from the `x-role` request header purely to demonstrate route permissions. Anyone can send `x-role: admin`, so this is not secure and must not be used to protect a real application.

## 1. Requirements

- Node.js and npm
- MongoDB Community Server running locally
- MongoDB Compass (GUI to view the database)
- Postman or Thunder Client

MongoDB Compass is the graphical interface. The actual database server must be running for the API to connect.

## 2. Install and run

Open this project folder in VS Code and run:

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

The `.env` file connects to:

```text
mongodb://127.0.0.1:27017/roleBasedDB
```

In MongoDB Compass, connect using that same URI. The `roleBasedDB` database and `products` collection will appear after the first product is inserted.

## 3. Roles and permissions

| Role | Read products | Add product | Update product | Delete product |
|---|---:|---:|---:|---:|
| employee | Yes | No | No | No |
| manager | Yes | Yes | Yes | No |
| admin | Yes | Yes | Yes | Yes |

For every request, add a header:

| Key | Value |
|---|---|
| x-role | employee / manager / admin |

Examples:
- `GET /api/products` with `x-role: employee`
- `POST /api/products` with `x-role: manager`
- `PATCH /api/products/PRODUCT_ID` with `x-role: manager`
- `DELETE /api/products/PRODUCT_ID` with `x-role: admin`

## 4. API endpoints

| Method | Endpoint | Allowed roles |
|---|---|---|
| GET | `/api/products` | employee, manager, admin |
| GET | `/api/products/:id` | employee, manager, admin |
| POST | `/api/products` | manager, admin |
| PATCH | `/api/products/:id` | manager, admin |
| DELETE | `/api/products/:id` | admin |

### POST body example

```json
{
  "name": "HP Pavilion Laptop",
  "category": "Laptop",
  "price": 55000,
  "stock": 12,
  "brand": "HP"
}
```

### PATCH body example

```json
{
  "price": 52000,
  "stock": 8
}
```

## 5. Folder structure

```text
role-based-node-express/
│
├── config/
│   └── db.js
├── controllers/
│   └── productController.js
├── middleware/
│   └── authorizeRole.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 6. Important concept

RBAC means **Role-Based Access Control**. The middleware checks whether the role supplied with the request is included in the roles allowed for that route.

Because this project intentionally has no authentication, the server does not know who is making the request. The header is only a learning/demo mechanism. In a real application, the server must get the user's role from a trusted, authenticated identity rather than trusting a role sent by the client.
