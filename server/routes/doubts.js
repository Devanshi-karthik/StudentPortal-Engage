const Router= require('./index');
const Controller = require('../controllers/doubts');
const DoubtService = require('../services/doubts');


class DoubtRouter extends Router {
    constructor (model, modelName) {
        super(model,modelName, new Controller(model, modelName, new DoubtService(model)))
        this.router.route("/subject/:subjectId").get(this.controller.getAll)
        this.router.route("/:doubtId/upvoteIncrement").put(this.controller.upvoteInc)
        this.router.route("/:doubtId/upvoteDecrement").put(this.controller.upvoteDec)
        this.router.route("/:doubtId/downvoteIncrement").put(this.controller.downvoteInc)
        this.router.route("/:doubtId/downvoteDecrement").put(this.controller.downvoteDec)
        
    
    }
}

module.exports=DoubtRouter;