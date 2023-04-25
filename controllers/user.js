const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// exports.postUser = async (req, res, next) => {
//     try {
//         const name = req.body.name;
//         const email = req.body.email;
//         const password = req.body.password;
//         bcrypt.hash(password, 10, async (err, hash) => {
//             if(err) console.log(err);
//             await User.create({ name, email, password: hash, isPremiumUser: false });
//             res.status(201).json({ message: 'Succcessfully created new user' });
//         });
//     } catch (err) {
//         if (err.name === 'SequelizeUniqueConstraintError') {
//             res.status(500).json({ error: err.errors[0].message });
//         } else {
//             res.status(500).json({ error: err });
//         }
//     }
// };

// exports.generateAccessToken=(id, name, isPremiumUser) => {
//   return jwt.sign({ userId: id, name: name, isPremiumUser:isPremiumUser}, 'secretwizardkey7412');
// }

// exports.postLogin = async (req, res, next) => {

//   try {
//       const email = req.body.email;
//       const loginPassword = req.body.password;
//       const userExist = await User.findAll({ where: { email: email } });
//       console.log(userExist);
//       if (userExist && userExist.length) {
//           bcrypt.compare(loginPassword, userExist[0].dataValues.password, (err, result) => {
//               if (err) {
//                   throw new Error('Something went wrong');
//               }
//               if (result) {
//                   res.status(200).json({ message: 'User logged in successfully', 
//                   success: true, 
//                   token: exports.generateAccessToken(userExist[0].dataValues.id, userExist[0].dataValues.name, userExist[0].dataValues.isPremiumUser )});
//               } else {
//                   res.status(401).json({ error: "User not authorized. Wrong password", success: false });
//               }
//           })
//       } else {
//           res.status(404).json({ error: "User doesnot exist. Try with different email", success: false });
//       }
//   } catch (err) {
//       res.status(500).json({ error: err, success: false })
//   }
// }




// exports.postUser = async (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Bad parameters" });
//   }
//   const alreadyExists = await User.findAll({ where: { email: email } });
//   if (alreadyExists.length > 0) {
//     return res.status(500).json({ message: "user already Exists" });
//   }
//   bcrypt.hash(password, 10, (err, password) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     User.create({
//       name: name,
//       email: email,
//       password: password,
//     })
//       .then((result) => {
//         return res.sendStatus(201);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.sendStatus(500);
//       });
//   });
// };
// function generateAccessToken(id, name) {
//   return jwt.sign({ userId: id, name: name }, "secretwizardkey7412");
// }
// exports.postLogin = async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   if (!email || !password) {
//     return res.status(400).json({ customMessage: "Bad parameters" });
//   }

//   try {
//     const emailExists = await User.findAll({ where: { email: email } });
//      if (emailExists.length == 0) {
//       return res.status(404).json({ customMessage: "User not found, SignUp" });
//     }
//     bcrypt.compare(password, emailExists[0].password, (error, response) => {

//       if (error) {
//         console.log(err);
//         return res.sendStatus(500);
//       }
//       if (response) {
//         return res
//           .status(201)
//           .json({
//             customMessage: "Success",
//             token: generateAccessToken(emailExists[0].id, emailExists[0].name),
//           });
//       } else if (!response) {
//         return res.status(401).json({ customMessage: "User not authorized" });
//       }
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };



exports.postUser = async (req, res, next) => {
  try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      bcrypt.hash(password, 10, async (err, hash) => {
          if(err) console.log(err);
          await User.create({ name, email, password: hash, isPremiumUser: false });
          res.status(201).json({ message: 'Succcessfully created new user' });
      });
  } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(500).json({ error: err.errors[0].message });
      } else {
          res.status(500).json({ error: err });
      }
  }
};


exports.generateAccessToken=(id, name, isPremiumUser) => {
  return jwt.sign({ userId: id, name: name, isPremiumUser:isPremiumUser}, 'mysecretkey.987654321');
}

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const loginPassword = req.body.password;
    const userExist = await User.findAll({ where: { email: email } });
    console.log(userExist);
    if (userExist && userExist.length) {
        bcrypt.compare(loginPassword, userExist[0].dataValues.password, (err, result) => {
            if (err) {
                throw new Error('Something went wrong');
            }
            if (result) {
                res.status(200).json({ message: 'User logged in successfully', 
                success: true, 
                token: exports.generateAccessToken(userExist[0].dataValues.id, userExist[0].dataValues.name, userExist[0].dataValues.isPremiumUser )});
            } else {
                res.status(401).json({ error: "User not authorized. Wrong password", success: false });
            }
        })
    } else {
        res.status(404).json({ error: "User doesnot exist. Try with different email", success: false });
    }
} catch (err) {
    res.status(500).json({ error: err, success: false })
}
}
  
      
        
  

      
  
  