import Project from "../model/project.js";


export async function createProject(req, res) {
  try {
    const { name, description , githubLink , hackthon } = req.body;
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


    const newPost = await Project.create({
      banner:bannerBase64,
      name,
      description,
      githubLink,
      hackthon,
      userId: authorId,
    });

    return res.status(201).json({
      message: 'project created successfully',
      post: newPost,
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}




export async function getUserProjects(req, res) {
  try {
    // Ensure user is authenticated (assuming protectRoute middleware adds req.user)
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }

    // Fetch all projects where userId matches
    const userProjects = await Project.find({ userId })
      .populate("hackthon", "title description") // optional: include hackathon details
      .sort({ createdAt: -1 }); // show latest first

    return res.status(200).json({
      success: true,
      count: userProjects.length,
      projects: userProjects,
    });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
