import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const Chat = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.emit('join', userId);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, [userId]);

    const sendMessage = () => {
        socket.emit('message', { userId, text: input });
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
