import React from 'react'
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  const user = location.state;

  if (!user) {
    return <p>No user data. Please login first.</p>;
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* aur data */}
    </div>
  );
}

export default Profile