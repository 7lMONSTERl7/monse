"use client";

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Requests } from '../utiles/Requests';

function CustomModal({ userData, whoAmI, setME ,setData, setAuthStatus, showModal, setShowModal }) {
    async function login() {
        const Req = new Requests();
        try {
            // Attempt to log in the user
            await Req.login(userData, whoAmI, setAuthStatus, setShowModal);

            // Update auth status immediately
            setAuthStatus(true);

            // Store user data  immediately after successful login
            const data = whoAmI()
            if (data){
                setME(data)
            }
            

            // Close the modal upon successful login
            setShowModal(false);
        } catch (error) {
            console.error("Login failed:", error);
            // You can add error handling or display a message to the user here
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={userData.username}
                            onChange={(e) => setData({ ...userData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={userData.password}
                            onChange={(e) => setData({ ...userData, password: e.target.value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={login}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;


