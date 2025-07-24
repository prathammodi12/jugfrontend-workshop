import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import { API_PATH, endpoint } from './constant';


const User = () => {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Helper to get full API URL
    const getApiUrl = async (path) => {
        if (path) {
            return `${endpoint}${API_PATH}${path}`;
        } else {
            return `${endpoint}${API_PATH}`;
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [])


    // Fetch users
    const fetchUsers = async () => {
        setLoading(true);
        setError('');

        const apiUrl = await getApiUrl("/fetch");

        await axios.get(apiUrl).then((response) => {
            console.log(response);
            setUsers(response?.data);
        }).catch((error) => {
            console.error("Error fetching users:", error);
            setError('Failed to fetch users');
        })

        setLoading(false);

    };


    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        setError('');
        try {
            const apiUrl = await getApiUrl("/save");

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (!res.ok) throw new Error('Failed to add user');
            setName('');
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ backgroundColor: '#2d3a4b', width: '100%', height: '100vh', top: 0, left: 0, position: 'absolute' }}>
            <div className="container">



                <h1>User Management</h1>
                <form className="user-form" onSubmit={handleAddUser}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>Add User</button>
                </form>
                {error && <div className="error">{error}</div>}
                <div className="table-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr><td colSpan="3">No users found.</td></tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {loading && <div className="loading">Loading...</div>}



            </div>
        </div>
    )
}

export default User
