import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/profiles/');
        setProfiles(response.data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    const fetchConnections = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/interests/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setConnections(response.data);
      } catch (err) {
        console.error('Error fetching connections:', err);
      }
    };

    fetchProfiles();
    fetchConnections();
  }, []);

  const handleSendInterest = async (profile) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/interests/',
        { recipient: profile.user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Interest sent:', response.data);
      // Optionally, update UI or show a success message
    } catch (err) {
      console.error('Error sending interest:', err);
      // Handle error in UI
    }
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const updatedMessages = [
      ...selectedChat.messages,
      { sender: 'me', text: newMessage },
    ];
    setSelectedChat({ ...selectedChat, messages: updatedMessages });
    setNewMessage('');
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
                onClick={() => handleSendInterest(profile)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/5 bg-gray-900 p-4 overflow-y-auto h-screen">
        {selectedChat ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <button onClick={handleBack} className="text-white mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12H3m0 0L6 9m-3 3l3 3"
                  />
                </svg>
              </button>
              <h2 className="text-white text-2xl">{selectedChat.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              {selectedChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg text-white ${
                      message.sender === 'me' ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-600 rounded"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map((chat) => (
              <div
                key={chat.id}
                className="bg-gray-800 p-4 rounded-lg cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                <h3 className="text-white text-lg">{chat.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
