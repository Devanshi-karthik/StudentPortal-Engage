const Service = require('./index');
const asyncHandler = require("../middleware/async");

class SubjectService extends Service {
    constructor(model) {
        super(model)
    }

    getAll = asyncHandler(async () => {
        return await this.model.find({});
      });
}

module.exports= SubjectService;