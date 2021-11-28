const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      unique : true
    },
    subjectName:{
      type:String,
      required:true
    },
    subjectYear:{
      type: String,
      required:true
    },
    subjectDept:{
      type:String,
      required: true
    }
    // doubts :[{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Doubts"
    // }]
  },
  { timestamps: true, toObject: {virtuals : true} , toJSON: {virtuals : true} }

);

SubjectSchema.virtual("doubts", {ref: "Doubts", localField : "_id", foreignField: "subject", justOne: false})
SubjectSchema.virtual("resources" , { ref: "Resource" , localField : "_id" , foreignField : "subject" , justOne : false})


module.exports = mongoose.model("Subjects", SubjectSchema);