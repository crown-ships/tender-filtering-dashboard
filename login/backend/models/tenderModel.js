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
  },
  assignedID: {
    type: String
  },
  assignedName: {
    type: String
  },
  decision: {
    type: String,
    default: "none",
    enum: ["Attended", "Rejected", "none"]
  },
  rejectReason: {
    type: String
  },
  viewed: {
    type: String,
    default: "no",
    enum: ["yes", "no"]
  },
  viewedDate: {
    type: Date
  },
  decisionDate: {
    type: Date
  }
});

module.exports = mongoose.model("tenders", tenderModel);
