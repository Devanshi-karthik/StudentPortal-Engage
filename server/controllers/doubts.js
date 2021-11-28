const Controller = require('./index');
const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

class DoubtController extends Controller {
    constructor(model, modelName, service){
        super(model , modelName ,service )
    }

    getAll = asyncHandler(async (req, res, next) => {
        req.body.subject=req.params.subjectId;
        const resource = await this.service.getAll(req.body.subject);
        console.log("hello");
        new SuccessfulResponse(
          res,
          200,
          `The ${this.modelName}s was successfully found.`,
          resource
        ).buildResponse();
      });
     

      upvoteInc = asyncHandler(async (req, res, next) => {
        
        const resource = await this.service.getOneById(req.params.doubtId);
        if (!resource) {
            return next(
              new ErrorResponse(
                `A ${this.modelName} was not found with an id of ${id}`,
                404
              )
            );
          }
        req.body.upvoteCount= resource.upvoteCount + 1;
        const updatedDoubt= await this.service.updateOneById(req.params.doubtId , req.body);
        new SuccessfulResponse(
          res,
          200,
          `Upvote incremented. `,
          updatedDoubt
        ).buildResponse();
      });

      upvoteDec = asyncHandler(async (req, res, next) => {
       
        const resource = await this.service.getOneById(req.params.doubtId);
        if (!resource) {
            return next(
              new ErrorResponse(
                `A ${this.modelName} was not found with an id of ${id}`,
                404
              )
            );
          }
          if(resource.upvoteCount !== 0)
        {
            req.body.upvoteCount= resource.upvoteCount - 1;
        }
        
        const updatedDoubt= await this.service.updateOneById(req.params.doubtId , req.body);
        new SuccessfulResponse(
          res,
          200,
          `Upvote decremented. `,
          updatedDoubt
        ).buildResponse();
      });

      downvoteInc = asyncHandler(async (req, res, next) => {
       
        const resource = await this.service.getOneById(req.params.doubtId);
        if (!resource) {
            return next(
              new ErrorResponse(
                `A ${this.modelName} was not found with an id of ${id}`,
                404
              )
            );
          }
         
        req.body.downvoteCount= Number(resource.downvoteCount) + 1;
        const updatedDoubt= await this.service.updateOneById(req.params.doubtId , req.body);
        new SuccessfulResponse(
          res,
          200,
          ` Downvote incremented. ${req.body.downvoteCount} `,
          updatedDoubt
        ).buildResponse();
      });

      downvoteDec = asyncHandler(async (req, res, next) => {
       
        const resource = await this.service.getOneById(req.params.doubtId);
        if (!resource) {
            return next(
              new ErrorResponse(
                `A ${this.modelName} was not found with an id of ${id}`,
                404
              )
            );
          }
        if(resource.downvoteCount !== 0)
        {
            req.body.downvoteCount= resource.downvoteCount - 1;
        }
       
        const updatedDoubt= await this.service.updateOneById(req.params.doubtId , req.body);
        new SuccessfulResponse(
          res,
          200,
          `Downvote decremented. `,
          updatedDoubt
        ).buildResponse();
      });
}

module.exports=DoubtController;