"use client";

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Requests } from '../utiles/Requests';

function CustomModal({ userData, whoAmI, setME ,setData, setAuthStatus, showModal, setShowModal,logs,log }) {
    async function login() {
        const Req = new Requests();
        try {
            await Req.login(userData, whoAmI, setAuthStatus, setShowModal,log);
            setAuthStatus(true);
            const data = whoAmI()
            if (data){
                setME(data)
                log([...logs,'LOGIN Successful',`Welcome ${userData.username}`])
            }
            setShowModal(false);
        } catch (error) {
            log([...logs,"Login failed ","Username or Password is Wrong !!!"]);
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


