const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect } = require("../middleware/auth");

// Views (Protected)
router.get("/", protect, productController.getDashboard);
router.get("/dashboard", protect, productController.getDashboard);
router.get("/add-product", protect, productController.getAddProduct);
router.get("/edit-product/:id", protect, productController.getEditProduct);

// Actions (UI)
router.post("/products", protect, productController.createProduct);
router.put("/products/:id", protect, productController.updateProduct);
router.delete("/products/:id", protect, productController.deleteProduct);

module.exports = router;
