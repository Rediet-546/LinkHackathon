import React, { useEffect } from 'react'

const Profile = ({styleProp , name, imageSrc}) => {


 
useEffect(() => {
   
  }, [imageSrc]);
  return (
    <div className="flex flex-col items-center">
        <img
          src= {imageSrc}
          alt="User Profile"
          className= {`rounded-full object-cover border-2 border-blue-400 ${styleProp}`
}        />
       {name && <p className="mt-2 font-semibold text-gray-700 text-sm">{name}</p>}
      </div>
  )
}

export default Profile

// "./src/assets/images/person_four.jpg"