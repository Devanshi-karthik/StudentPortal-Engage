const express = require("express");
const subjectData =require('../models/Subjects');
const authRouter =require('../routes/auth');
const DefaultData=require('../seeder');
const doubtData = require('../models/Doubts');
const resourceData = require('../models/Resources');
const doubtComments = require('../models/DoubtComments');
const resourceComments= require('../models/ResourceComments');
const SubjectRouter = require('../routes/subjects');
const DoubtRouter = require('../routes/doubts');
const ResourceRouter = require('../routes/resources');
const authroute = require('../routes/auth');



// Security
const security = require("./expressLoader/security");

// Utility
const errorHandler = require("../middleware/error");
const developmentHelpers = require("./expressLoader/dev");

// Api maker
const Api = require("../api");
const ModelData = require("../models/modelData");

module.exports = (app) => {
  // Body parser
  app.use(express.json());

  // Security
  security(app);

  // Dev logging middleware
  developmentHelpers(app);

  // Create API Instance
  let v1Api = new Api({
    // Prefix for all api routes. Default is index ("/").
    routePrefix: "/api",
  });

  // Set model data
  let subjectModelData = new ModelData({
    // Model: Mongoose model
    apiModel: subjectData,

    // Model Name: Name that will be used for your route (singular).
    modelName: "subject",

    // Router: Uses the default router if not provided.
    router: new SubjectRouter(subjectData, "subject"),
  });
  let doubtModelData = new ModelData({
    // Model: Mongoose model
    apiModel: doubtData,

    // Model Name: Name that will be used for your route (singular).
    modelName: "doubt",

    // Router: Uses the default router if not provided.
    router: new DoubtRouter(doubtData, "doubt"),
  });
  let resourceModelData = new ModelData({
    // Model: Mongoose model
    apiModel: resourceData,

    // Model Name: Name that will be used for your route (singular).
    modelName: "resource",

    // Router: Uses the default router if not provided.
    router: new ResourceRouter(resourceData, "resource"),
  });
  let doubtCommentModelData = new ModelData({
    // Model: Mongoose model
    apiModel: doubtComments,

    // Model Name: Name that will be used for your route (singular).
    modelName: "doubtComment",

    // Router: Uses the default router if not provided.
    //router: new DoubtCommentRouter(doubtComments, "doubtComment"),
  });
  let resourceCommentModelData = new ModelData({
    // Model: Mongoose model
    apiModel: resourceComments,

    // Model Name: Name that will be used for your route (singular).
    modelName: "resourceComment",

    // Router: Uses the default router if not provided.
    //router: new BookRouter(Book, "book"),
  });


  // Add model data to API
  v1Api.addModelData(subjectModelData);
  v1Api.addModelData(doubtModelData);
  v1Api.addModelData(resourceModelData);
  v1Api.addModelData(doubtCommentModelData);
  v1Api.addModelData(resourceCommentModelData);

  // Mount routers
  v1Api.initRouters(app);

  // app.use("/api",authRouter);
  app.use('/api/user',authroute);
  app.use("/resetDatabase", async(req,res)=> {
    await DefaultData();
    res.status(200).json({message: "Database was sucessfully reset"});
  })
  app.use("/", (req, res) => {
    res.status(200).json({ success: true });
  });

  // Custom error handler middleware
  app.use(errorHandler);

  return app;
};
