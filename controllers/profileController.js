import User from "../model/userModel.js"; 

// Show user profile
export const getProfile = async (req, res) => {
  try {
     const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile information as response
    res.json({
      userId: user._id,
      name: user.name,
      photo: user.photo,
      bio: user.bio,
      phone: user.phone,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Edit user profile
export const editProfile =  async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, photo, bio, phone } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile information
    user.name = name || user.name;
    user.photo = photo || user.photo;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;

    // Save the updated user
    await user.save();

    // Send the updated user profile as response
    res.json({
      userId: user._id,
      name: user.name,
      photo: user.photo,
      bio: user.bio,
      phone: user.phone,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


