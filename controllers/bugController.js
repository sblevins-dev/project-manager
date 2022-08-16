const asyncHandler = require("express-async-handler");
const Bug = require("../models/BugModel");
const Project = require("../models/ProjectModel");

const getBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find();

  if (bugs) {
    res.status(201).json(bugs);
  } else {
    res.status(400);
    throw new Error("No Bugs found");
  }
});

const createBug = asyncHandler(async (req, res) => {
  const { issue, priority, dueBy, creator, projId, teamId, description } = req.body;

  const status = "Open"

  // create the user
  const bug = await Bug.create({
    issue,
    priority,
    dueBy,
    creator,
    projId,
    teamId,
    description,
    status
  });

  const project = await Project.updateOne(
    { _id: projId },
    { $push: { bugs: bug._id } }
  );

  if (bug && project) {
    res.status(201).json({
      bug,
    });
  } else {
    res.status(400);
    throw new Error("Invalid bug data");
  }
});

const updateBug = asyncHandler(async (req, res) => {
  console.log(req.body.id);
});

const deleteBug = asyncHandler(async (req, res) => {
  console.log(req.body.id);
});

module.exports = {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
};
