const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Users"
    },
    title:{
      type: String,
      required:true
    },
    content:{
      type: String,
      required:true
    },
    upvoteCount:{
      type: Number,
      default: 0
    },
    downvoteCount:{
      type: Number,
      default: 0
    },
    subject: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subjects",
        required: true
    }
    
  },
  { timestamps: true, toObject: {virtuals : true} , toJSON: {virtuals : true} }
);
DoubtSchema.virtual("comments", {ref: "DoubtComments", localField : "_id", foreignField: "doubt", justOne: false})
module.exports = mongoose.model("Doubts", DoubtSchema);