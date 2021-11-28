const Service = require('./index');
const asyncHandler = require("../middleware/async");
const subjects=require('../models/Subjects');



class DoubtService extends Service {
    constructor(model) {
        super(model)
    }

    getAll = asyncHandler(async (subjectId) => {
        const subject = await subjects.findById(subjectId).populate({path:"doubts" , populate : {path:"user"}})
        return subject.doubts; 
      });
    
    getOneById = asyncHandler(async (id) => {
        const doubt = await this.model.findById(id).populate({path:"comments" , populate : {path:"user"}})
        return doubt;
      });
      
   
  
}

module.exports= DoubtService;