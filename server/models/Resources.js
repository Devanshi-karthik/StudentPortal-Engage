const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
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
    description:{
      type: String,
      required:true
    },
    link:{
        type:String,
        required:true
    },
    upvoteCount:{
      type: Number,
      default: 0
    },
    downvoteCount:{
      type: Number,
      default:0
    },
    subject: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subjects",
        required: true,
    }
    
  },
  { timestamps: true, toObject: {virtuals : true} , toJSON: {virtuals : true} }
);
ResourceSchema.virtual("comments", {ref: "ResourceComments", localField : "_id", foreignField: "resource", justOne: false})
module.exports = mongoose.model("Resource", ResourceSchema);