const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Bad parameters" });
  }

  const alreadyExists = await User.findAll({ where: { email: email } });

  if (alreadyExists.length > 0) {
    return res.status(500).json({ message: "user already Exists" });
  }
  bcrypt.hash(password, 10, (err, password) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    User.create({
      name: name,
      email: email,
      password: password,
    })
      .then((result) => {
        return res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
      });
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ customMessage: "Bad parameters" });
  }

  try {
    const emailExists = await User.findAll({ where: { email: email } });

    //   if (emailExists.length) {
    //     if (password == emailExists[0].password) {
    //       return res.status(201).json({ customMessage: "Success" });
    //     } else {
    //       return res.status(401).json({ customMessage: "User not authorized" });
    //     }
    //   } else {
    //     return res.status(404).json({ customMessage: "User not found, SignUp" });
    //   }
    // } catch (err) {
    //   return res.status(500).json(err);
    //}

    if (emailExists.length == 0) {
      return res.status(404).json({ customMessage: "User not found, SignUp" });
    }
    bcrypt.compare(password, emailExists[0].password, (error, response) => {
      if (error) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (response) {
        return res.status(201).json({ customMessage: "Success" });
      } else if (!response) {
        return res.status(401).json({ customMessage: "User not authorized" });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
