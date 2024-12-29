const User = require("../models/userModel");

// Create a new user
async function createUser(req, res) {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user" });
  }
}

// Get a specific user by ID
async function getUser(req, res) {
  const userId = req.params.id;
  try {
    // Validate the ID
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   throw new Error("Invalid product ID");
    // }

    // Use Mongoose findById with a query object (prevents injection)
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const userId = req.params.id;
  const user = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User is removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
}

async function getUserById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

async function changePw(req, res) {
  const userId = req.params.id;
  return;
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  changePw,
};
