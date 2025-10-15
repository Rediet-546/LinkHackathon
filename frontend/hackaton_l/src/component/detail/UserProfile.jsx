import React, { useEffect  } from "react";
import { useParams } from "react-router-dom";
import { Authentication } from "../../store/Authentication";


const UserProfile = () => {
  const { userId } = useParams();
  const { currentUserProfile, getUserProfile, loadProfile } = Authentication();

  // useEffect(() => {
  //   if (userId) {
  //     // Wrap in async function
  //     const fetchProfile = async () => {
  //       await getUserProfile(userId);
  //     };
  //     fetchProfile();
  //   }
  // }, [userId, getUserProfile]);

  useEffect(() => {
    getUserProfile(userId)
  },[currentUserProfile])


  // if (loadProfile) return <div>Loading profile...</div>;
  if (!currentUserProfile) return <div>User not found</div>;

  // Destructure safely with defaults
  const {
    user = {},
    projects = [],
    posts = [],
    hackathons = []
  } = currentUserProfile || {};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt={user.fullName || "User"}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName || "Unnamed"}</h1>
          <p className="text-gray-500">{user.headline || ""}</p>
          <p className="text-sm text-gray-400">{user.location || ""}</p>
        </div>
      </div>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p._id} className="border rounded shadow p-4">
                {p.banner && (
                  <img
                    src={p.banner}
                    alt={p.name || "Project"}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold">{p.name || "Untitled"}</h3>
                <p className="text-gray-600 text-sm">{p.description}</p>
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm mt-1 inline-block"
                  >
                    GitHub Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Posts */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="border rounded shadow p-4">
                {post.banner && (
                  <img
                    src={post.banner}
                    alt={post.name || "Post"}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold">{post.name || "Untitled"}</h3>
                <p className="text-gray-600 text-sm">{post.description}</p>
                <span className="text-xs text-gray-400">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hackathons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hackathons</h2>
        {hackathons.length === 0 ? (
          <p>No hackathons yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathons.map((h) => (
              <div key={h._id} className="border rounded shadow p-4">
                {h.banner && (
                  <img
                    src={h.banner}
                    alt={h.title || "Hackathon"}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold">{h.title || "Untitled"}</h3>
                <p className="text-gray-600 text-sm">{h.description}</p>
                <span className="text-xs text-gray-400">
                  {h.startDate && h.endDate
                    ? `${new Date(h.startDate).toLocaleDateString()} - ${new Date(
                        h.endDate
                      ).toLocaleDateString()}`
                    : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;


// export default UserProfile;


// export default UserProfile;

// export default UserProfile;
