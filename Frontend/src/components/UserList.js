import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const sendRequest = (userId) => {
        axios.post('/api/requests/', { receiver: userId })
            .then(response => console.log('Request sent:', response))
            .catch(error => console.error(error));
    };

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <span>{user.username}</span>
                    <button onClick={() => sendRequest(user.id)}>Send Request</button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
