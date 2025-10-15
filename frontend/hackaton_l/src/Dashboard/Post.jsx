// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Button from '../ui/Button'
// import CreateHackton from '../component/CreateHackton'
// import CreatePost from '../component/CreatePost'
// import { Authentication } from '../store/Authentication'
// import { useEffect } from 'react'

// const Post = () => {
//   const [addPost , setAddPost] = useState(false)
//   const {post , getAllPosts} = Authentication();


//   useEffect(() => {
//     getAllPosts()
//   } , [post])


//   return (
//     <div> 
//       <Button onClick={() => setAddPost(!addPost)}>
//   add post
// </Button>

      
//        {
//             addPost ? 
//            <CreatePost/>
//             : 
            
            
//             <div> main post 
//               </div>
              
              
//               }
            
//             </div>
//   )
// }

// export default Post





import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import CreatePost from '../component/CreatePost'
import { Authentication } from '../store/Authentication'

const Post = () => {
  const [addPost, setAddPost] = useState(false)
  const { post, getAllPosts } = Authentication()

  useEffect(() => {
    getAllPosts()
  }, []) // fetch only once when page loads

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Community Posts</h1>
        <Button
          onClick={() => setAddPost(!addPost)}
          variant="blue"
          size="sm"
          className="shadow-md hover:scale-105 transition-transform"
        >
          {addPost ? 'Close' : 'Add Post'}
        </Button>
      </div>

      {/* Create Post Form */}
      {addPost && (
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <CreatePost />
        </div>
      )}

      {/* Post Feed */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {post && post.length > 0 ? (
          post.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Banner Image */}
              {p.banner && (
                <img
                  src={p.banner}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Post Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {p.description.length > 120
                    ? p.description.substring(0, 120) + '...'
                    : p.description}
                </p>

                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span>🧑‍💻 {p.author?.fullName || 'Unknown Author'}</span>
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No posts yet. Be the first to share something!
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
