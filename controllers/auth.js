const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

 const {email, password} = req.body;

try {
   let user = await User.findOne({email});

   if ( user) {
    return res.status(400).json({
      ok: false,
      msg: 'User already exists'
    });
   }

   console.log(user);

   user = new User(req.body);

   //Encriptar contraseña

   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password, salt);

  await user.save();

  const token = await generateJWT(user.id, user.name);


   res.status(201).json({
     ok: true,
     uid: "user.id",
     name: "user.name",
     token
   })

} catch (error) {
  console.log(error);
  res.status(500).json({
    ok:false,
    msg: 'Please contact the administrator'

  })
}}

const loginUser = async (req, res = response) => {

  const {email, password} = req.body;

  try {

    const user = await User.findOne({email});

    if ( !user) {
     return res.status(400).json({
       ok: false,
       msg: 'User does not exist with that email.'
     });
    }
    
    //Confirmar los passwords

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok:false,
        msg:'Incorrect password'
      });
    }

    //Generar JWT

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok:true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Please contact the administrator'
    })
  }
};

const revalidateToken = async (req, res = response) => {

  const {uid, name} = req;

  const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid, name,
        token
    })
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken
};