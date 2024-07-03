// branch
import errorHandler from "../Utils/error.js";
import Branch from "../models/Agent.js";

export const branch = async (req, res, next) => {
    try {
      const branch = await Branch.find();
      res.json(branch);
    } catch (error) {
      next(error);
    }
  };
  
  // catagory display for edit
  export const branchEdit = async (req, res, next) => {
    const { id } = req.params; 
  
    try {
      const user = await Branch.findById(id); 
      if (!user) {
        return res.status(404).json({ message: "Branch not found" }); 
      }
      res.status(200).json(user); 
    } catch (error) {
      console.error("Error fetching Branch:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  //catagory creation
  export const createBranch = async (req, res, next) => {
    const { name,agent, location } = req.body;
    const {userRef} = req.params.id;
    const newCatagory = new Branch({
        name, agent, location,userRef: req.params.id
    });
    try {
      await newCatagory.save();
      res.status(201).json("Branch created successfull");
    } catch (error) {
      next(error);
    }
  };
  
  //delete catagory
  export const deleteBranch = async (req, res, next) => {
    const users = await Branch.findById(req.params.id);
  
    if (!users) {
      return next(errorHandler(404, "Branch not found!"));
    }
  
    try {
      await Branch.findByIdAndDelete(req.params.id);
      res.status(200).json("Branch has been deleted!");
    } catch (error) {
      next(error);
    }
  };
  
  // update catagory
  export const updateBranch = async (req, res, next) => {
    try {
      
      const updatedUser = await Branch.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            agent: req.body.agent,
            location: req.body.location,
          },
        },
        { new: true }
      );
  
      
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };