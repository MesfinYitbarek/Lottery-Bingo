import Agent from "../models/Branch.js";
import Branch from "../models/Branch.js";
import Credit from "../models/Credit.js";
import User from "../models/User.js";
import errorHandler from "../Utils/error.js";
export const getCredit = async (req, res, next) => {
  try {
    const credit = await Credit.find({
      sender: req.params.id
    });
    res.json(credit);
  } catch (error) {
    next(error);
  }
};
export const credit = async (req, res) => {
  const {
    amount,
    receiver
  } = req.body;
  try {
    const user = await User.findById(req.params.id);
    const branch = await Agent.findById(req.params.id);
    const validAccount = user || branch;
    if (validAccount.role !== 'superadmin') {
      return res.status(401).json({
        msg: 'Unauthorized'
      });
    }
    const recipient = await Agent.findOne({
      phone: receiver
    });
    if (!recipient) {
      return res.status(404).json({
        msg: 'Recipient not found'
      });
    }
    recipient.balance += parseFloat(amount);
    await recipient.save();
    const credit = new Credit({
      amount,
      sender: validAccount.phone,
      receiver
    });
    await credit.save();
    res.json(credit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
export const transfer = async (req, res) => {
  const {
    amount,
    receiver,
    sender
  } = req.body;
  let senderUser = null; // Initialize senderUser
  let recipientUser = null; // Initialize recipientUser

  try {
    // Find sender and receiver users
    senderUser = (await User.findOne({
      phone: sender
    })) || (await Agent.findOne({
      phone: sender
    }));
    recipientUser = await User.findOne({
      phone: receiver
    });

    // Check if both users exist
    if (!senderUser || !recipientUser) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    // Check if sender has sufficient balance
    if (senderUser.balance < parseFloat(amount)) {
      return res.status(400).json({
        msg: 'Insufficient balance'
      });
    }

    // Store initial balance of recipient before transfer
    const initialRecipientBalance = recipientUser.balance;

    // Update recipient's balance
    recipientUser.balance += parseFloat(amount);

    // Save recipient's new balance
    await recipientUser.save();

    // Verify that the receiver's balance is updated correctly
    const updatedRecipient = await User.findOne({
      phone: receiver
    });
    if (updatedRecipient.balance !== initialRecipientBalance + parseFloat(amount)) {
      throw new Error('Receiver balance did not update correctly'); // Trigger rollback
    }

    // Now that we are sure the recipient's balance is correct, deduct from sender
    senderUser.balance -= parseFloat(amount);

    // Save both users' new balances
    await senderUser.save();

    // Create a new credit record
    const credit = new Credit({
      amount,
      sender,
      receiver
    });
    await credit.save();
    res.json({
      success: true,
      credit,
      message: 'Credit transferred successfully',
      data: {
        senderBalance: senderUser.balance,
        receiverBalance: updatedRecipient.balance
      }
    });
  } catch (err) {
    console.error(err.message);

    // Rollback in case of any error during transfer
    if (senderUser) {
      try {
        // Restore original balance to the sender
        senderUser.balance += parseFloat(amount);
        await senderUser.save();
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError.message);
        return res.status(500).json({
          msg: 'Transaction failed, and rollback also failed.'
        });
      }
    }
    res.status(500).json({
      msg: 'Server Error: ' + err.message
    });
  }
};
export const balance = async (req, res) => {
  try {
    // Attempt to find the user by ID
    const user = await User.findById(req.params.id);
    if (user) {
      // If user is found, return the user's balance
      return res.json({
        balance: user.balance
      });
    }

    // If user is not found, attempt to find the branch by ID
    const branch = await Branch.findById(req.params.id);
    if (branch) {
      // If branch is found, return the branch's balance
      return res.json({
        balance: branch.balance
      });
    }

    // If neither user nor branch is found, return a 404 status
    res.status(404).json({
      msg: 'User or Branch not found'
    });
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