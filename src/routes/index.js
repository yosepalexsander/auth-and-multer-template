const express = require("express");

const router = express.Router();

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { getProduct, addProduct } = require("../controllers/product");
const { getTransactions, addTransaction } = require("../controllers/transaction");
const { register, login } = require("../controllers/auth");

// Middleware
const { auth, adminOnly } = require("../middlewares/auth");

// Route
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/products", getProduct);
router.post("/product", auth, adminOnly, addProduct); // place middleware before controller

router.get("/transactions", getTransactions);
router.post("/transaction", auth, addTransaction); // place middleware before controller

router.post("/register", register);
router.post("/login", login);

module.exports = router;
