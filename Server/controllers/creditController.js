import Agent from "../models/Branch.js";
import Branch from "../models/Branch.js";
import Credit from "../models/Credit.js";
import User from "../models/User.js";
export const getCredit = async (req, res, next) => {
  try {
    const credit = await Credit.find({sender : req.params.id});
    res.json(credit);
  } catch (error) {
    next(error);
  }
};
  
export const credit = async (req, res) => {
  const { amount, receiver } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (user.role !== 'superadmin') {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const recipient = await Agent.findOne({ phone: receiver });

    if (!recipient) {
      return res.status(404).json({ msg: 'Recipient not found' });
    }

    recipient.balance += parseFloat(amount);
    await recipient.save();

    const credit = new Credit({
      amount,
      sender: user.phone,
      receiver,
    });

    await credit.save();

    res.json(credit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const transfer = async (req, res) => {
  const { amount, receiver, sender } = req.body;

  try {
    const senderr = (await User.findOne({ phone: sender })) || (await Agent.findOne({ phone: sender }));
    const recipient = await User.findOne({ phone: receiver });

    if (!senderr || !recipient) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (senderr.balance < parseFloat(amount)) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    senderr.balance -= parseFloat(amount);
    recipient.balance += parseFloat(amount);

    await senderr.save();
    await recipient.save();

    const credit = new Credit({
      amount,
      sender,
      receiver,
    });

    await credit.save();

    res.json(credit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const balance = async (req, res) => {
  try {
    // Attempt to find the user by ID
    const user = await User.findById(req.params.id);

    if (user) {
      // If user is found, return the user's balance
      return res.json({ balance: user.balance });
    }

    // If user is not found, attempt to find the branch by ID
    const branch = await Branch.findById(req.params.id);

    if (branch) {
      // If branch is found, return the branch's balance
      return res.json({ balance: branch.balance });
    }

    // If neither user nor branch is found, return a 404 status
    res.status(404).json({ msg: 'User or Branch not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteCredit = async (req, res, next) => {
  const users = await Credit.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "Credit not found!"));
  }

  try {
    await Credit.findByIdAndDelete(req.params.id);
    res.status(200).json("Credit has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const deleteTransfer = async (req, res, next) => {
  const users = await Credit.findById(req.params.id);

  if (!users) {
    return next(errorHandler(404, "Credit not found!"));
  }

  try {
    await Credit.findByIdAndDelete(req.params.id);
    res.status(200).json("Credit has been deleted!");
  } catch (error) {
    next(error);
  }
};