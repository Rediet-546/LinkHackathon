import Post from "../model/post.js";

// Create a new post
export async function createPost(req, res) {
  try {
    const { name, description } = req.body;
    const authorId = req.user._id; // assuming `protectRoute` middleware sets req.user

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

      let bannerBase64 = null;

    if (req.files?.banner?.[0]) {
      const file = req.files.banner[0];
      // Convert to base64 string with content type
      bannerBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }


    const newPost = await Post.create({
      banner:bannerBase64,
      name,
      description,
      author: authorId,
    });

    return res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get all posts with author info
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate('author', 'fullName email') // populate author name/email
      .sort({ createdAt: -1 }) // latest first
      .lean();

    return res.status(200).json({
      message: 'Posts fetched successfully',
      total: posts.length,
      posts,
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
