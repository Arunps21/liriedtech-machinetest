const db = require("../config/db");

// --- Views ---
// Renders the dashboard view with a list of products and a summary report.
getDashboard = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM Product WHERE is_deleted = 0 ORDER BY created_at DESC",
    );

    // Calculate report data for the dashboard or report section
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0,
    );

    res.render("products/index", {
      products,
      user: req.user,
      report: { totalProducts, totalValue },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Renders the page to add a new product.
getAddProduct = (req, res) => {
  res.render("products/add", { user: req.user });
};

// Renders the page to edit an existing product.
getEditProduct = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Product WHERE id = ? AND is_deleted = 0",
      [req.params.id],
    );
    const product = rows[0];

    if (!product) return res.redirect("/");
    res.render("products/edit", {
      product,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// --- Logic (UI) ---
// Handles the creation of a new product via UI form submission.
createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    await db.query(
      "INSERT INTO Product (name, description, price, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [name, description, parseFloat(price), parseInt(quantity)],
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("products/add", {
      user: req.user,
      error: "Error adding product",
    });
  }
};

// Handles the update of an existing product via UI form submission.
updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    await db.query(
      "UPDATE Product SET name = ?, description = ?, price = ?, quantity = ?, updated_at = NOW() WHERE id = ?",
      [name, description, parseFloat(price), parseInt(quantity), id],
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect(`/edit-product/${id}`);
  }
};

// Performs a soft delete on a product by setting is_deleted to 1.
deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE Product SET is_deleted = 1 WHERE id = ?", [id]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

module.exports = {
  getDashboard,
  getAddProduct,
  getEditProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
