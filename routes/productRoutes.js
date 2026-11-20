const express = require("express");
const router = express.Router();

const authorizeRole = require("../middleware/authorizeRole");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Employee, Manager and Admin: read products
router.get("/", authorizeRole("employee", "manager", "admin"), getProducts);
router.get("/:id", authorizeRole("employee", "manager", "admin"), getProduct);

// Manager and Admin: create and update products
router.post("/", authorizeRole("manager", "admin"), addProduct);
router.patch("/:id", authorizeRole("manager", "admin"), updateProduct);

// Admin only: delete products
router.delete("/:id", authorizeRole("admin"), deleteProduct);

module.exports = router;
