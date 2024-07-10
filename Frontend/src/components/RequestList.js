import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/requests/')
            .then(response => setRequests(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleRequest = (requestId, status) => {
        axios.put(`/api/requests/${requestId}/`, { status })
            .then(response => console.log('Request updated:', response))
            .catch(error => console.error(error));
    };

    return (
        <div>
            {requests.map(request => (
                <div key={request.id}>
                    <span>{request.sender.username} wants to connect</span>
                    <button onClick={() => handleRequest(request.id, 'accepted')}>Accept</button>
                    <button onClick={() => handleRequest(request.id, 'rejected')}>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default RequestList;
