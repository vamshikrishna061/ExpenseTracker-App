const express = require("express");

const expenseController = require("../controllers/expense");

const userAuth = require("../middleware/auth");

const router = express.Router();

router.get(
  "/get-expenses",
  userAuth.authenticate,
  expenseController.getExpenses
);

router.post(
  "/post-expense",
  userAuth.authenticate,
  expenseController.postExpense
);

router.get(
  "/delete-expense/:expenseId",
  userAuth.authenticate,
  expenseController.deleteExpense
);

router.post(
  "/edit-expense/:expenseId",
  userAuth.authenticate,
  expenseController.editExpense
);

module.exports = router;
