const User = require("../models/user");
const Blog = require("../models/blog");
const Psychiatrist = require("../models/psychiatrist");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.create = (req, res) => {

    const { firstName, lastName, hospitalName, pincode, phone, state } = req.body;

    if (!firstName || firstName.length > 20) {
      return res.status(400).json({
        error: "First Name should be valid",
      });
    }

    if (!lastName || lastName.length > 20) {
        return res.status(400).json({
          error: "Last Name should be valid",
        });
      }
      
      let psychiatrist = new Psychiatrist({ firstName, lastName, hospitalName, pincode, phone, state});
     
      psychiatrist.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        } 
          return res.status(400).json(result);
        
      });

 
};

exports.list=(req,res)=>{
  Psychiatrist.find().exec((err,result)=>{
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } 
      return res.status(400).json(result);
    
  })
} 

exports.info=(req,res)=>{
  Psychiatrist.find({}).select('patients hospitalName firstName lastName').exec((err,result)=>{
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler(err),
      });
    } 
      return res.status(400).json(result);
    
  })
}
