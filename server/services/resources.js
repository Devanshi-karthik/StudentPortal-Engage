const Service = require('./index');
const asyncHandler = require("../middleware/async");
const subjects=require('../models/Subjects');


class ResourceService extends Service {
    constructor(model) {
        super(model)
    }

    getAll = asyncHandler(async (subjectId) => {
        const subject = await subjects.findById(subjectId).populate({path:"resources" , populate : {path:"user"}})
        console.log("resource", subject)
        return subject.resources; 
      });
    
    getOneById = asyncHandler(async (id) => {
        const resource = await this.model.findById(id).populate({path:"comments" , populate : {path:"user"}})
        return resource;
      });
  
}

module.exports= ResourceService;