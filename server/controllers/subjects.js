const Controller = require('./index');
const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

class SubjectController extends Controller {
    constructor(model, modelName, service){
        super(model , modelName ,service )
    }

    getAll = asyncHandler(async (req, res, next) => {
        
        const resource = await this.service.getAll();
        new SuccessfulResponse(
          res,
          200,
          `The ${this.modelName}s was successfully found.`,
          resource
        ).buildResponse();
      });
}

module.exports=SubjectController;