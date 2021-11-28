const Router= require('./index');
const Controller = require('../controllers/resources');
const ResourceService = require('../services/resources');

class ResourceRouter extends Router {
    constructor (model, modelName) {
        super(model,modelName, new Controller(model, modelName, new ResourceService(model)))
        this.router.route("/subject/:subjectId").get(this.controller.getAll)
        this.router.route("/:resourceId/upvoteIncrement").put(this.controller.upvoteInc)
        this.router.route("/:resourceId/upvoteDecrement").put(this.controller.upvoteDec)
        this.router.route("/:resourceId/downvoteIncrement").put(this.controller.downvoteInc)
        this.router.route("/:resourceId/downvoteDecrement").put(this.controller.downvoteDec)
    }
}

module.exports=ResourceRouter;