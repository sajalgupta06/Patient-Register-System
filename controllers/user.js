const User = require('../models/user');
const Blog = require('../models/blog');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Psychiatrist = require('../models/psychiatrist');

exports.read = (req, res) => {
    User.find({})
    .populate('psychiatrist', '_id firstName lastName,hospitalName')
    .select('_id name email address phone createdAt  updatedAt')
    .exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.psyPatients = (req, res) => {

const id  = req.params.id

Psychiatrist.findOne({_id:id}).exec((err, psychiatrist) => {  
  if (err) {
      return res.status(400).json({
          error: errorHandler(err)
      });
  }

  User.find({psychiatrist:psychiatrist})
    .select('_id name email address phone createdAt  updatedAt')
    .exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
       return  res.json(data);
    });
})}



exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }
  
      const { name, email, password, address, phone, photo ,psychiatrist} = fields;

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
  
      if (!name || !name.length < 3) {
        return res.status(400).json({
          error: "Name is required",
        });
      }
  
      if (!address || body.address < 10) {
        return res.status(400).json({
          error: "Address is too short",
        });
      }
  
      let user = new User({ name, email, password, address, phone, photo ,psychiatrist});
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
          return res.status(400).json(result);
        }
      });
    });
};

exports.remove=(req,res)=>{
const id = req.params.id
User.findOneAndRemove({ _id:id }).exec((err, data) => {
    if (err) {
        return res.json({
            error: errorHandler(err)
        });
    }
    res.json({
        message: 'User deleted successfully'
    });
});
}


exports.photo = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id:id })
      .select('photo')
      .exec((err, result) => {
          if (err || !result) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
         
          res.set('Content-Type', result.photo.contentType);
          return res.send(result.photo.data);
      });
};