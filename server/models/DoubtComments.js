const mongoose = require("mongoose");

const DoubtCommentSchema = new mongoose.Schema(
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
    // reply:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"DoubtComments"
    // },
    doubt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doubts",
        required:true
    }
    
  },
  { timestamps: true, toObject: {virtuals : true} , toJSON: {virtuals : true}}
);


module.exports = mongoose.model("DoubtComments", DoubtCommentSchema);