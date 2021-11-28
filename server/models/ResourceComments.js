const mongoose = require("mongoose");

const ResourceCommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Users"
    },
    content:{
      type: String,
      required:true
    },
    subject: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subjects",
        required:true
    },
    reply:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ResourceComments"
    },
    resource:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Resources",
      required:true
  }
    
  },
  { timestamps: true, toObject: {virtuals : true} , toJSON: {virtuals : true} }
);

module.exports = mongoose.model("ResourceComments", ResourceCommentSchema);