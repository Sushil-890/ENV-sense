const Vlog = require('../models/vlog');

// Create a new vlog post
const createVlog = async (req, res) => {
  try {
    const { username, caption, imageUrl } = req.body;

    const vlog = new Vlog({ username, caption, imageUrl });
    await vlog.save();
    res.status(201).json(vlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vlog post' });
  }
};

// Get all vlog posts
const getAllVlogs = async (req, res) => {
  try {
    const vlogs = await Vlog.find().sort({ createdAt: -1 });
    res.json(vlogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vlogs' });
  }
};

// Like or unlike a vlog post
const toggleLike = async (req, res) => {
  try {
    const { vlogId } = req.params;
    const userId = req.user.id;

    const vlog = await Vlog.findById(vlogId);
    if (!vlog) return res.status(404).json({ error: 'Vlog not found' });

    const alreadyLiked = vlog.likes.includes(userId);
    if (alreadyLiked) {
      vlog.likes.pull(userId);
    } else {
      vlog.likes.push(userId);
    }

    await vlog.save();
    res.json({ liked: !alreadyLiked, totalLikes: vlog.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Like action failed' });
  }
};

// Export for use in routes
module.exports = {
  createVlog,
  getAllVlogs,
  toggleLike,
};
