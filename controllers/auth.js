const User = require("../models/user");
const Blog = require("../models/blog");
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Psychiatrist = require("../models/psychiatrist");

exports.signup = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const {
      name,
      email,
      password,
      address,
      phone,
      photo,
      psychiatrist,
    } = fields;
    
    
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    var passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    var phoneRegex =/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!name || name.length < 3) {
      return res.status(400).json({
        error: "Name should be minimum 3 Characters long",
      });
    }

    if (!address || address < 10) {
      return res.status(400).json({
        error: "Address should be minimum 10 Characters long",
      });
    }
    
    if(!email || !email.match(emailRegex) ){
      return res.status(400).json({
        error: "Provide a Valid Email",
      });
    }
    if(!password || !password.match(passwordRegex) ){
      return res.status(400).json({
        error: "Provide a Valid Password",
      });
    }
    if(!phone || !phone.match(phoneRegex) ){
      return res.status(400).json({
        error: "Provide a Valid Phone Number",
      });
    }

    User.findOne({ email: email.toLowerCase() }, (err, data) => {
      if (data) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }

      let user = new User({
        name,
        email,
        password,
        address,
        phone,
        photo,
        psychiatrist,
      });

      if (files.photo) {
        if (files.photo.size > 20000000) {
          return res.status(400).json({
            error: "Image should be less then 2mb in size",
          });
        }

        user.photo.data = fs.readFileSync(files.photo.path);
        user.photo.contentType = files.photo.type;
      }

      user.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          
          console.log(result._id)
          Psychiatrist.findByIdAndUpdate(
            { _id: psychiatrist },
            { $push: { patients: [result._id] } },
            { new: true }
          ).exec((err, finalUser) => {
            if (err) {
              console.log(err)
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              return res.status(400).json( result );
            }
          });

         
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup.",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user
  algorithms: ["HS256"],
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }

    req.profile = user;
    next();
  });
};


