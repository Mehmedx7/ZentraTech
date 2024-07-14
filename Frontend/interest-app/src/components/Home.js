import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatComponent from './ChatComponent';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [receivedInterests, setReceivedInterests] = useState([]);
  const [acceptedInterest, setAcceptedInterest] = useState(null); // Track accepted interest

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfiles(response.data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    const fetchReceivedInterests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/interests/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReceivedInterests(response.data);
      } catch (err) {
        console.error('Error fetching received interests:', err);
      }
    };

    // Check local storage for accepted interest ID
    const storedAcceptedInterest = localStorage.getItem('acceptedInterest');
    if (storedAcceptedInterest) {
      setAcceptedInterest(parseInt(storedAcceptedInterest));
    }

    fetchProfiles();
    fetchReceivedInterests();
  }, []);

  const handleSendInterest = async (profileId) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/interests/',
        {
          receiver: profileId,
          message: 'I am interested in connecting with you!'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Interest sent successfully:', response.data);
      // Optionally update connections or notify the user
    } catch (err) {
      console.error('Error sending interest:', err.response?.data);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleAcceptInterest = async (interestId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/interests/${interestId}/`,
        { status: 'accepted' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Interest accepted successfully:', response.data);
      localStorage.setItem('acceptedInterest', interestId); // Store accepted interest ID in local storage
      setAcceptedInterest(interestId); // Set the accepted interest ID
      // Optionally update UI or notify the user
    } catch (err) {
      console.error('Error accepting interest:', err.response?.data);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleRejectInterest = async (interestId) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/interests/${interestId}/`,
        { status: 'rejected' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Interest rejected successfully:', response.data);
      // Optionally update UI or notify the user
    } catch (err) {
      console.error('Error rejecting interest:', err.response?.data);
      // Handle error (e.g., show error message to user)
    }
  };

  const generateAvatarUrl = (seed) =>
    `https://api.dicebear.com/9.x/micah/svg?seed=${seed}`;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Section */}
      <div className="w-full lg:w-3/5 bg-gray-900 p-4 overflow-y-auto h-screen">
        <h2 className="text-white text-2xl mb-4">Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-gray-800 p-4 rounded-lg text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mx-auto mb-2">
                <img
                  src={generateAvatarUrl(`${profile.username}`)}
                  alt={profile.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h3 className="text-white text-lg">{profile.username}</h3>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleSendInterest(profile.id)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/5 bg-gray-900 p-4 overflow-y-auto h-screen">
        <h2 className="text-white text-2xl mb-4">Received Interests</h2>
        <div className="space-y-4">
          {receivedInterests.map((interest) => (
            <div
              key={interest.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer flex items-center justify-between"
            >
              <div>
                <h3 className="text-white text-lg">{interest.sender.username}</h3>
                <p className="text-gray-400">{interest.message}</p>
              </div>
              {interest.status === 'pending' && (
                <div>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                    onClick={() => handleAcceptInterest(interest.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleRejectInterest(interest.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
              {interest.status === 'accepted' && (
                <p className="text-green-500">Accepted</p>
              )}
              {interest.status === 'rejected' && (
                <p className="text-red-500">Rejected</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
        <div className="w-full lg:w-2/5 bg-gray-900 p-4 overflow-y-auto h-screen">
          <h2 className="text-white text-2xl mb-4">Chat</h2>
          <ChatComponent chatRoomId={acceptedInterest} />
        </div>

    </div>
  );
};

export default Home;
