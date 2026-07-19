import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Get user profile",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {
      name,
    };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
