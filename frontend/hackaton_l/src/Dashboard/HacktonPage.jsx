

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../store/Authentication';
import CardHackton from '../ui/CardHackton';

const HacktonPage = () => {
  const navigate = useNavigate();
  const { 
    campanyHacktons, 
    getHackthonByCampany, 
    allHackathons, 
    getAllHackathons, 
    currentUser 
  } = Authentication();

  // Fetch hackathons based on user type
  useEffect(() => {
    if (currentUser?.userType === 'company') {
      getHackthonByCampany();
    } else {
      getAllHackathons();
    }
  }, [currentUser]);

  const hackathonsToShow = currentUser?.userType === 'company' 
    ? campanyHacktons 
    : allHackathons;

  const handleRedirect = (id) => {
    navigate(`/hackton/${id}`);
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {hackathonsToShow && hackathonsToShow.length > 0 ? (
        hackathonsToShow.map((hackathon) => {
          // Check if current user already applied
          const isApplied = hackathon.participants?.some(
            (p) => p.user=== currentUser?._id
          );

          return (
            
            <CardHackton
              key={hackathon._id}
              id={hackathon._id}
              title={hackathon.title}
              description={hackathon.description}
              banner={hackathon.banner}
              company={hackathon.company}
              startDate={hackathon.startDate}
              endDate={hackathon.endDate}
              isApplied={isApplied}  // pass boolean to Card
              actionButton={{
                label: currentUser?.userType === 'company' ? 'Details' : 'Apply',
                onClick: () => handleRedirect(hackathon._id),
                disabled: currentUser?.userType === 'user' && isApplied
              }}
            />
          );
        })
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No hackathons found.
        </p>
      )}
    </div>
  );
};

export default HacktonPage;

