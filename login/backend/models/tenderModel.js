const mongoose = require('mongoose');

const tenderModel = new mongoose.Schema({
  tenderName: {
    type: String,
    required: true
  },
  tenderType: {
    type: String,
    required: true,
    enum: ["Open Tender", "Limited Tender"]
  },
  organisationName: {
    type: String,
    required: true
  },
  tenderCategory: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  ePublishedDate: {
    type: Date,
    required: true
  },
  bidSubmissionDate: {
    type: Date,
    required: true
  },
  tenderApproxValue: {
    type: Number,
    required: true
  },
  tenderFilesLocation: {
    type: String
  }
});

module.exports = mongoose.model("tenders", tenderModel);
