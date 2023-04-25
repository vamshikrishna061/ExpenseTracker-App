const Expense = require('../models/expense');
const User = require('../models/user');


const sequelize = require("sequelize");

// exports.getLeaderBoard = async (req, res, next) => {
//     try {
//         const userLeaderBoardDetails = await User.findAll({
//             attributes:[ 'name', 'totalExpense'],
//             //'id',
//         //     include: [{
//         //         model: Expense,
//         //         attributes: []
//         //     }],
            
//         //  group:['user.id'],
//             order:[['totalExpense', 'DESC']]
//             //.sort({'totalExpense: 'desc})
//         });
                
//         res.status(200).json(userLeaderBoardDetails);
//         }   catch (error) {
//             console.log(error);
//             res.status(500).json({error: error, success : false})
//         }
// }

exports.getLeaderBoard = async (req, res, next) => {
    try {
        const userLeaderBoardDetails = await User.findAll({
            attributes: ['id','name', 'totalExpense'],
            order:[['totalExpense', 'DESC']]
        });
        res.status(200).json(userLeaderBoardDetails);
         
        }   catch (error) {
            console.log(error);
            res.status(500).json({error: error, success : false})
        }
}