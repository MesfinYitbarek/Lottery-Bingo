import Credit from "../models/Credit.js";

export const getCredit = async (req, res, next) => {
    try {
      const credit = await Credit.find();
      res.json(credit);
    } catch (error) {
      next(error);
    }
  };
  
  export const credit = async (req, res, next) => {
    try {
      const newCredit = new Credit({
        sender: req.body.name,
        receiver: req.body.email,
        credit: req.body.message,
      });
  
      await newCredit.save(); 
  
      res
        .status(201)
        .json({ message: "Credit information submitted successfully!" });
    } catch (err) {
      next(err);
      res.status(500).json({ message: "Error submitting Credit information" });
    }
  };

  export const deleteCredit = async (req, res, next) => {
    const credit = await Credit.findById(req.params.id);
  
    if (!credit) {
      return next(errorHandler(404, "credit not found!"));
    }
  
    try {
      await Credit.findByIdAndDelete(req.params.id);
    } catch (error) {
      next(error);
    }
  };