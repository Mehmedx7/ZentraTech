import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import RequestList from './components/RequestList';
import Chat from './components/Chat';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={UserList} />
                <Route path="/requests" element={RequestList} />
                <Route path="/chat" element={Chat} />
            </Routes>
        </Router>
    );
}

export default App;
