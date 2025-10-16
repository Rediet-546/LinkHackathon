import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'
import CreateProject from '../component/CreateProject'
import { Authentication } from '../store/Authentication'

const ProjectPage = () => {
  const [addProject, setAddProject] = useState(false)
  const { allProject, getUserProjects } = Authentication()

  useEffect(() => {
    getUserProjects()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
        <Button
          onClick={() => setAddProject(!addProject)}
          variant="blue"
          size="sm"
          className="shadow-md hover:scale-105 transition-transform"
        >
          {addProject ? 'Close' : 'Add Project'}
        </Button>
      </div>

      {/* Create Project Form */}
      {addProject && (
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <CreateProject />
        </div>
      )}

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProject && allProject.length > 0 ? (
          allProject.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Banner Image */}
              {project.banner && (
                <img
                  src={project.banner}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Project Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.name}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {project.description.length > 120
                    ? project.description.substring(0, 120) + '...'
                    : project.description}
                </p>

                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <span>
                    🧠 <strong>Hackathon:</strong>{' '}
                    {project.hackthon?.title || 'N/A'}
                  </span>
                  <span>
                    🔗{' '}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on GitHub
                    </a>
                  </span>
                  <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            You haven’t added any projects yet. Click “Add Project” to get started!
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPage
