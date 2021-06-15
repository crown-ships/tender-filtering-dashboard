const Tender = require('../../models/tenderModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");
// const validateEmail = require("../../validation/validateEmail");
// const validateRole =  require("../../validation/validateRole");
// const validateName =  require("../../validation/validateName");
// const validatePasswordInput = require("../../validation/validatePassword");
const { roles } = require('../roles')


exports.signup = async (req, res, next) => {
 try {
   // Validation code here
   // const { errors, isValid } = validateTenderInput(req.body);
   // // Check validation
   // if (!isValid) {
   //   return res.status(400).json(errors);
   // }
  const signedupTender = new Tender({
   tenderName: req.body.tenderName,
   tenderType: req.body.tenderType,
   organisationName: req.body.organisationName,
   tenderCategory:req.body.tenderCategory,
   productCategory:req.body.productCategory,
   ePublishedDate: req.body.ePublishedDate,
   bidSubmissionDate: req.body.bidSubmissionDate,
   tenderApproxValue: req.body.tenderApproxValue,
   tenderFilesLocation: req.body.tenderFilesLocation
  });

  await signedupTender.save()
  res.status(200).json({message:"Tender created."})
}
catch(error) {
   next(error)
 }
}


exports.searchTenders = async (req, res, next) => {
  const search = {
    tenderName: req.query.tenderName,
    tenderType: req.query.tenderType,
    organisationName: req.query.organisationName,
    tenderCategory: req.query.tenderCategory,
    productCategory: req.query.productCategory,
    ePublishedDate: req.query.ePublishedDate,
    bidSubmissionDate: req.query.bidSubmissionDate,
    tenderApproxValue: req.query.tenderApproxValue
  };

   var counter=0;
   var conditions = [];


   Object.entries(search).forEach(([key,value]) => {
     if(value !== "")
     {
       var json = {};
       json[key]= value;
       conditions[counter++] = json;

     }
   });
  var tenders;
  if(conditions.length == 0){
     tenders = await Tender.find({});
  }
  else {
     tenders = await Tender.find({$and: conditions});
  }

  res.status(200).json({
    data: tenders
  });
}

exports.getTenders = async (req, res, next) => {

  const tenders = await Tender.find({});
  res.status(200).json({
    data: tenders
  });
}

// exports.getTender = async (req, res, next) => {
//   try {
//     const email = req.query.email;
//   //  res.status(200).json(({email}));
//     const tender = await Tender.findOne({email});
//
//     if (!tender) return next(new Error('Tender does not exist.'));
//     res.status(200).json({
//       data: tender
//     });
//   }
//   catch (error) {
//     next(error)
//   }
// }
//  //validate role
// exports.updateTender = async (req, res, next) => {
//  try {
//    const email = req.query.email;
//    const email_upd = req.query.emailupdate;
//
//    const tender_req = await Tender.find({email:email});
//    const tender_upd = await Tender.find({email:email_upd});
//
//    const tenderRole = tender_req[0].role;
//    const updateRole = tender_upd[0].role;
//
//    if (tenderRole == "admin") {
//      if(updateRole == "super-admin" || updateRole == "admin") {
//        res.status(401).json({
//          error: "Action forbidden: Not allowed to change this tender."
//        });
//       }
//     }
//
//    const tenderBody = req.body;
//
//    if (tenderBody.email)
//    {
//      const { errors, isValid } = validateEmail(tenderBody);
//      // Check validation
//      if (!isValid) {
//        return res.status(400).json(errors);
//      }
//    }
//
//    if (tenderBody.role)
//    {
//      const { errors, isValid } = validateRole(tenderBody);
//      // Check validation
//      if (!isValid) {
//        return res.status(400).json(errors);
//      }
//    }
//
//    if (tenderBody.name)
//    {
//      const { errors, isValid } = validateName(tenderBody);
//      // Check validation
//      if (!isValid) {
//        return res.status(400).json(errors);
//      }
//    }
//
//    if (tenderBody.password)
//    {
//      const { errors, isValid } = validatePasswordInput(tenderBody);
//      // Check validation
//      if (!isValid) {
//        return res.status(400).json(errors);
//      }
//      tenderBody.password = await hashPassword(tenderBody.password);
//      tenderBody.password2 = tenderBody.password;
//    }
//
//    await Tender.findByIdAndUpdate(tender_upd[0]._id, tenderBody);
//    const tender = await Tender.findById(tender_upd[0]._id);
//
//    res.status(200).json({
//     data: tender,
//     message: 'Tender updated successfully.'
//    });
//   }
//   catch (error) {
//    next(error)
//   }
// }
//
// exports.deleteTender = async (req, res, next) => {
//  try {
//
//   const email = req.query.email;
//   const email_del = req.query.emailDelete;
//
//   const tender_req = await Tender.find({email:email});
//   const tender_delete = await Tender.find({email:email_del});
//
//   const tenderRole = tender_req[0].role;
//   const deleteRole = tender_delete[0].role;
//
//   if (tenderRole == "admin" && (deleteRole == "super-admin" || deleteRole == "admin")) {
//     res.status(401).json({
//       error: "Action forbidden: Not allowed to change this tender."
//     });
//   }
//   else{
//
//     await Tender.findByIdAndDelete(tender_delete[0]._id);
//     res.status(200).json({
//      data: null,
//      message: 'Tender has been deleted'
//     });
//   }
//
//  }
//  catch (error) {
//   next(error)
//  }
// }
