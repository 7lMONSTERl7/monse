"use client"

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Requests } from '../utiles/Requests'

function RegisterModal({ registerData,setRegisterData,setShowRegister,showRegister }) {
    

    async function register() {
        const Req = new Requests()
        registerData.profile_img == undefined ? registerData.profile_img = 'media/profile_picture/base.png' : registerData.profile_img
        registerData.cover_img == undefined ? registerData.cover_img = 'media/profile_picture/cover.png' : registerData.cover_img
        Req.register(registerData,setShowRegister())
    }

    return (
        <>
            <Modal show={showRegister} onHide={() => setShowRegister(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profile-img" className="form-label">Profile Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            id="profile-img"
                            onChange={(e) => setRegisterData({ ...registerData, profile_img: e.target.files ? e.target.files[0] : null })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profile-cover" className="form-label">Profile Cover</label>
                        <input
                            type="file"
                            className="form-control"
                            id="profile-cover"
                            onChange={(e) => setRegisterData({ ...registerData, cover_img: e.target.files ? e.target.files[0] : null })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bio" className="form-label">Profile Bio</label>
                        <textarea
                            className="form-control"
                            id="bio"
                            value={registerData.bio}
                            onChange={(e) => setRegisterData({ ...registerData, bio: e.target.value })}
                        >
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRegister(false)}>Close</Button>
                    <Button variant="primary" onClick={register}>Register</Button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
}

export default RegisterModal;
