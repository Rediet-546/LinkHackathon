  import React, { useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { Authentication } from '../../store/Authentication';
  import { Link } from 'react-router-dom';
  const HacktonDetail = () => {
    const { id } = useParams();
    const { hackthonDetail, loadHackton, currentUser, getCurrentUser, getHackthonById, applyToHackathon  ,acceptParticipant} = Authentication();

    useEffect(() => {
      getCurrentUser();
      getHackthonById(id);
    }, [id]);

    if (loadHackton || !hackthonDetail) {
      return <div className="flex items-center justify-center h-screen">Loading Hackathon...</div>;
    }
     hackthonDetail.participants.forEach(element => {
      console.log('USER ' + element.user._id)
    })
    
    const acceptedParticipants = hackthonDetail.participants.filter(p => p.accepted);
    const pendingParticipants = hackthonDetail.participants.filter(p => !p.accepted);
    
    const isApplied = hackthonDetail.participants?.some(
      (p) => p.user._id=== currentUser?._id
    );
    console.log('APPLIED' + isApplied) 


    return (
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Banner and info */}
        {hackthonDetail.banner && <img src={hackthonDetail.banner} alt={hackthonDetail.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
        <h1 className="text-3xl font-bold mb-2">{hackthonDetail.title}</h1>
        <p className="mb-4">{hackthonDetail.description}</p>

        <div className="mb-4">
          <span>Start: {new Date(hackthonDetail.startDate).toLocaleDateString()}</span>
          <span className="ml-4">End: {new Date(hackthonDetail.endDate).toLocaleDateString()}</span>
        </div>
        <div className="mb-6">
          <span>Created by: {hackthonDetail.company.fullName} ({hackthonDetail.company.email})</span>
        </div>
        {/* Hackathon Projects */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projects</h2>
          {hackthonDetail.projects && hackthonDetail.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hackthonDetail.projects.map(project => (
                <div key={project._id} className="border rounded shadow p-4">
                  {project.banner && (
                    <img
                      src={project.banner}
                      alt={project.name || "Project"}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-semibold">{project.name || "Untitled"}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
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
          ) : (
            <p className="text-gray-500">No projects yet.</p>
          )}
        </div>


        {/* Apply button for non-company users */}
        {currentUser?.userType !== 'company' &&  !isApplied && (
          <button
            onClick={() => applyToHackathon(hackthonDetail._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-6"
          >
            Apply
          </button>
        )}

        

        {/* Participants for company users */}
        {currentUser?.userType === 'company' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Participants</h2>
            {/* Accepted */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-green-600">Accepted</h3>
              {acceptedParticipants.length > 0 ? (
                <ul className="space-y-2">
                  {acceptedParticipants.map(p => (
                    <li key={p.user._id} className="flex justify-between bg-green-50 p-3 rounded shadow-sm">
                      <Link to={`/profile/${p.user._id}`}>
                      <span>Full name: {p.user.fullName} ,email : {p.user.email}</span>           
        
           
                     </Link>
                      <span className="text-green-700 font-semibold">Accepted</span>
                    </li>
                  ))}
                </ul>
              ) : <p>No accepted participants yet.</p>}
            </div>

            {/* Pending */}
            <div>
              <h3 className="text-xl font-medium mb-2 text-yellow-600">Pending</h3>
              {/* {pendingParticipants.length > 0 ? (
                <ul className="space-y-2">
                  {pendingParticipants.map(p => (
                    <li key={p.user._id} className="flex justify-between bg-yellow-50 p-3 rounded shadow-sm">
                      <span>{p.user.fullName} ({p.user.email})</span>
                      <span className="text-yellow-700 font-semibold">Pending</span>
                    </li>
                  ))}
                </ul>
              ) : <p>No pending participants.</p>} */}

              {pendingParticipants.length > 0 ? (
    <ul className="space-y-2">
      {pendingParticipants.map((p) => (
        <li key={p.user._id} className="flex items-center justify-between bg-yellow-50 p-3 rounded-md shadow-sm">
        
        <Link to={`/profile/${currentUser?._id}`}>
            
          <span>{p.user.fullName} ({p.user.email})</span>
           
            </Link>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={() => acceptParticipant(hackthonDetail._id, p.user._id)}
          >
            Accept
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No pending participants.</p>
  )}

            </div>
          </div>
        )}
      </div>
    );
  };

  export default HacktonDetail;
