const Forgotpassword = require('../models/forgotpasswords');
const User = require('../models/user');
const uuid = require('uuid');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const sequelize = require('../utli/database');
const bcrypt = require('bcrypt');

exports.postForgotPassword = async (req,res,next) => {
    
    try {
        const {email} = req.body;
        const userFound = await User.findOne({where: {email:email}});

        if(userFound){
            const id = uuid.v4();
            await userFound.createForgotpassword({ id , active: true })
                .catch(err => {
                    console.log(err);
                    throw new Error(err)
                });

            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications['api-key']
            apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
            const tranEmailApi = new Sib.TransactionalEmailsApi();

            const sender = {
                email: 'ryuklightyagmi124@gmail.com',
                name: 'Ryuk'
            }

            const receivers = [
                {
                email: email
                }
            ]

            await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Reset Password',
                textContent: `Reset Password`,
                htmlContent: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
            })
            .then(res=>console.log(res))
            .catch(err=>{
                console.log(err);
                throw new Error(err);
            });
            
            return res.status(201).json({success: true,message: 'Reset Mail Sent Successful'});
        } else {
            throw Error('User does not exist');
        }
    } catch(error) {
        console.log(error);
        
        res.status(404).json({success:false, error:error.message});
    }
}

exports.getResetPassword = async (req,res,next) => {
    const id = req.params.id;
    
    try {
    const forgotUser = await Forgotpassword.findOne({where: {id}});
    if(forgotUser) {
        if(forgotUser.dataValues.active) {
            res.status(201).send(`
            <html>                       
                <form action="/password/updatepassword/${id}" method="get">
                    <label for="newPassword">Enter New password</label>
                    <input name="newPassword" type="password" id="newPassword" required></input>
                    <button id='reset-btn'> Reset Password </button>
                </form>
            </html>
            `);
            
            res.end();
        } else {
            
            return res.status(404).json({success: false, error: 'Link expired'});
        }
    } else {
        throw new Error('Wrong reset password link');
    }
    } catch(error) {
       
        return res.status(404).json({success:false, error:error.message});
    }
}

exports.getUpdatePassword = async (req,res,next) => {
    const id = req.params.id;
    const newPassword = req.query.newPassword;
     
    try {
        const forgotUser = await Forgotpassword.findOne({where: {id}});
        forgotUser.update({ active: false},);

        bcrypt.hash(newPassword, 10, async (err, hash) => {
            if(err) console.log(err);
            await User.update({password: hash }, {where: {id: forgotUser.userId}});
           
            res.status(201).json({ message: 'Succcessfully updated user password' });
        });

    } catch (err) {
        console.log(err);
        
        res.status(500).json({ error: err });
    }
}