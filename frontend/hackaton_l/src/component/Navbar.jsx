import React, { useEffect, useState } from 'react';
import Profile from '../ui/Profile.jsx';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import { Authentication } from '../store/Authentication.jsx';
import { axiosInstance } from '../lib/axios';

const Navbar = () => {
  const { currentUser, getCurrentUser } = Authentication();
  const [showProfile, setShowProfile] = useState(false);

  // Only for regular users
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    getCurrentUser();
    if (currentUser?.userType !== "company") {
      fetchNotifications();
    }
  }, [getCurrentUser, currentUser]);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get('/api/user/notifications'); // implement backend
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    // Optional: mark notifications as read on backend here
  };

  return (
    <div className='bg-neutral-100 border-gray-600 shadow w-full h-16 flex'>
      <div className='flex justify-between items-center w-full px-4'>
        <div className='flex items-center'>
          <Link>
            <Button size='sm' variant='blue'>LinkHackthon</Button>
          </Link>
        </div>

        <nav className="flex items-center space-x-8">
          <Link to='/hackton'>
            <button className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
              Hackthon
            </button>
          </Link>
          <Link to='/project'>
            <button className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
              Project
            </button>
          </Link>
          <Link to='/post'>
            <button className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
              Post
            </button>
          </Link>
        </nav>

        <div className='flex items-center space-x-2 relative'>

          {/* Notifications for regular users */}
          {currentUser?.userType !== "company" && (
            <div className='relative'>
              <button onClick={handleNotificationsClick} className='relative mr-2'>
                🔔
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
                  <h4 className="font-semibold mb-2">Notifications</h4>
                  {notifications.length === 0 && (
                    <p className="text-sm text-gray-500">No new notifications</p>
                  )}
                  {notifications.map((notif) => (
  <div key={notif._id} className="notification-item">
    {/* Use hackathon title if exists */}
    {notif.hackathon
      ? `You have been accepted to join "${notif.hackathon.title}"!`
      : notif.message}
  </div>
))}

                </div>
              )}
            </div>
          )}

          <Link to={`/profile/${currentUser?._id}`}>
            <Button variant='blue' size='sm'>Profile</Button>
          </Link>

          {currentUser?.userType === "company" &&
            <div className='space-x-2'>
              <Link to='/createHackton'>
                <Button variant='blue' size='sm'>Create Hackton</Button>
              </Link>
            </div>
          }

          <button onClick={() => setShowProfile(!showProfile)}>
            <Profile styleProp={'w-12 h-12'} imageSrc={currentUser?.profilePicture} />
          </button>

          {showProfile &&
            <div className="absolute right-1 top-10 z-50 mt-6 bg-gray-100 font-roboto text-gray-500 border border-gray-600 rounded-xl shadow-lg p-6 flex flex-col space-y-2 gap-1">
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">Full Name:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.fullName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">Email:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.email}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">Website:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.website}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">Location:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.location}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">Phone:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.phoneNumber}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-sm font-semibold text-gray-500">User type:</span>
                <span className="text-sm font-medium text-gray-800">{currentUser?.userType}</span>
              </div>
              <Button variant='blue'>Logout</Button>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
