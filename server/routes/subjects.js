const Router= require('./index');
const Controller = require('../controllers/subjects');
const SubjectService = require('../services/subjects');

class SubjectRouter extends Router {
    constructor (model, modelName) {
        super(model,modelName, new Controller(model, modelName, new SubjectService(model)))
        this.router.route("/").get(this.controller.getAll)
    }
}

module.exports=SubjectRouter;