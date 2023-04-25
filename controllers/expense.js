const Expense = require("../models/expense");
const User = require('../models/user');
//const sequelize = require('../utli/database');
//const jwt = require("jsonwebtoken");

exports.getExpenses = async (req, res, next) => {
  try {
    const all = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

exports.postExpense = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const data = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: req.user.id},
      //{transaction: sequelizeTransaction}
    );
    const tExpense = +req.user.totalExpense + +amount;
    User.update(
      {totalExpense: tExpense},
      {where: {id:req.user.id}},
      //transaction: sequelizeTransaction}
    ) 

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;
    const expenseField = await Expense.findByPk(expenseId, {
      where: { userId: req.user.id },
    });
    await expenseField.destroy();
    res.status(201).json({delete: expenseField})
  } catch(err) {
      console.error(err);
  }
}

    // const userTExpense = await User.findByPk(req.user.id,{
    //   attributes: ['totalExpense'],
    //   raw: true,
    // })

//     const editedTotal = userTExpense.totalExpense - expenseField.dataValues.amount;
//     await User.update({totalExpense: editedTotal}, {where:{id:req.user.id}})
//     res.status(201).json({ delete: expenseField });
//   } catch (err) {
//     console.error(err);
//   }
// };

exports.editExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    const befExpense = await Expense.findByPk(expenseId,{
      attributes: ['amount'],
      raw: true
  });
  const chUser = await User.findByPk(req.user.dataValues.id,{
      attributes: ['totalExpense'],
      raw: true
  })
  const updatedExpense = +chUser.totalExpense - +befExpense.amount + +amount;
  const updatedUser = await User.update({
      totalExpense: updatedExpense
  },{where: {id:req.user.dataValues.id}})


    const data = await Expense.update(
      {
        amount: amount,
        description: description,
        category: category,
      },
      { where: { id: expenseId } }
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
 }
};
