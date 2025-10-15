import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import { Authentication } from "../store/Authentication";

const CreateProject = () => {
  const { allHackathons, getAllHackathons, currentUser, loadProject, createProject } = Authentication();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubLink: "",
    hackthon: "",
    banner: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ Fetch all hackathons when user is logged in
  useEffect(() => {
    if (currentUser) {
      getAllHackathons();
    }
  }, [currentUser]);

  // ✅ Handle input and file change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "banner") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, banner: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hackthon) {
      toast.error("Please select a hackathon");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("hackthon", formData.hackthon);
    data.append("githubLink", formData.githubLink);
    data.append("banner", formData.banner);

    await createProject(data);
  };

  return (
    <div className="p-20 h-screen mb-8 m-4">
      <div className="flex flex-col gap-4 mx-auto md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
            {/* Banner Upload */}
            <div className="relative size-28 bg-blue-950 flex-shrink-0 overflow-visible">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="relative flex items-center justify-center h-full text-white font-bold">
                  Add Banner
                </span>
              )}

              <label
                htmlFor="banner"
                className="absolute top-0 right-0 z-10 text-white text-xl bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md"
              >
                +
              </label>
              <input
                type="file"
                id="banner"
                name="banner"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Name & Description */}
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                <input
                  id="name"
                  name="name"
                  placeholder="Project name..."
                  onChange={handleChange}
                  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
              </h2>

              <textarea
                name="description"
                placeholder="Project description..."
                onChange={handleChange}
                required
                className="border border-gray-300 h-24 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-xl flex flex-col gap-4 flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Project</h2>

          {/* ✅ Hackathon Dropdown */}
          <label htmlFor="hackthon">For Hackathon</label>
          <select
            required
            id="hackthon"
            name="hackthon"
            value={formData.hackthon}
            onChange={handleChange}
            className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Hackathon --</option>
            {allHackathons && allHackathons.length > 0 ? (
              allHackathons.map((hack) => (
                <option key={hack._id} value={hack._id}>
                  {hack.title || hack.name}
                </option>
              ))
            ) : (
              <option disabled>No hackathons available</option>
            )}
          </select>

          {/* Github link */}
          <label htmlFor="githubLink">Github Repo</label>
          <input
            required
            name="githubLink"
            type="text"
            placeholder="GitHub link"
            onChange={handleChange}
            className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit Button */}
          <button
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition flex items-center justify-center"
            onClick={handleSubmit}
          >
            <div className="flex items-center gap-3">
              {loadProject && (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>Create Project</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
