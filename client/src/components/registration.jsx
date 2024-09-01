import React, { useState } from "react";
import axios from 'axios';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // State to determine message type

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createReg', { name, email, password })
            .then(result => {
                console.log(result);
                setMessage('Profile created successfully!');
                setMessageType('success');
                setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 409) {
                    setMessage('Profile already exists.');
                    setMessageType('error');
                } else {
                    setMessage('Failed to create profile. Please try again.');
                    setMessageType('error');
                }
                setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25 position-relative">
                <h2>Registration</h2>
                {message && (
                    <div
                        className={`position-absolute top-0 end-0 m-3 alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}
                        style={{ zIndex: 1050, top: '10px', right: '10px' }} // Position at the top right corner
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already Registered</p>
                    <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
