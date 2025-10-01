"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import "./../toggler/style.css";

interface NavParams {
    authStatus: boolean,
    url: string,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setShowRegister: Dispatch<SetStateAction<boolean>>,
    setAuthStatus: Dispatch<SetStateAction<boolean>>,
    mode: string | null | undefined,
    page: string,
    setMode: Dispatch<SetStateAction<string | null | undefined>>,
    Me: any | undefined,
    log: any,
    logs: String[],
    setLang: Dispatch<SetStateAction<string>>,
}

interface userDataParams {
    username: string,
    email: string,
    profile_picture: any,
}

function Nav({
    page, url, Me, authStatus, setShowModal, setShowRegister, setAuthStatus,
    mode, setMode, logs, log,setLang
}: NavParams) {
    const [localMode, setLocalMode] = useState<boolean>(false);
    const [userData, setUserData] = useState<userDataParams | undefined>();

    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const baseMode = localStorage.getItem('mode');
            setLocalMode(baseMode === "dark");
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('mode', localMode ? 'dark' : 'light');
            setMode(localMode ? 'dark' : 'light');
        }
    }, [localMode, setMode]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const me = localStorage.getItem('me');
            const lang = localStorage.getItem('lang')
            if (token && me) {
                setAuthStatus(true);
                setUserData(JSON.parse(me));
            } else {
                setAuthStatus(false);
                setUserData(undefined);
            }
        }
    }, []);

    const profileImageSrc = Me && Me.profile_picture
        ? `${url}${Me.profile_picture}`
        : "/media/base.png";  // Default image path when profile picture is not available

    return (
        <nav className={`navbar bg-${mode} shadow navbar-expand-lg bg-body-tertiary rounded mt-1 z-3`}>
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand p-0" href="#">
                    <Image src="/logo.png" width={45} height={45} alt="Logo" />
                    {page}
                </a>
                <div className={`user d-${authStatus ? "flex" : "none"} text-${mode === "dark" ? "light" : "dark"}`}>
                    {
                        Me ? (
                            <>
                                <Image
                                    className="img-thumbnail border border-2 rounded-circle shadow"
                                    src={profileImageSrc}  // Use the calculated image source here
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    onClick={() => { window.location.href = `/profile`; }}
                                />
                                <div className="user-details d-flex flex-column justify-content-center">
                                    <em className="mx-2">{Me.username || ""}</em>
                                    <h6 className="nav-mail mx-3 fs-6">{Me.email || ""}</h6>
                                </div>
                            </>
                        )
                        : null
                    }
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={`navbar-nav ${authStatus ? 'true' : 'false'} w-100`}>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="../"> <i className="fas fa-home"></i> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="watch/"> <i className="fas fa-tv"></i> Video</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${authStatus ? 'active' : 'disabled'}`} href="/profile" aria-disabled={!authStatus}> <i className="fas fa-user"></i> Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${authStatus ? 'active' : 'disabled'}`} href="/chat" aria-disabled={!authStatus}> <i className="fas fa-envelope"></i> Chat</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-gear"></i>
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <a className="dropdown-item" href="#">MonsTer AI</a>
                                </li>
                                 <li className="dropdown-item">
                                    <span>Translation</span>
                                    <label className="switch d-flex align-items-center">
                                        <select name="language" 
                                            id="lang"
                                            value={
                                                typeof window !== "undefined" && localStorage.getItem("lang") 
                                                ? ""+localStorage.getItem("lang") 
                                                : "en"
                                            }
                                            onChange={
                                                (e)=>{
                                                    localStorage.setItem('lang',e.target.value)
                                                    setLang(e.target.value)
                                                }
                                            }
                                            style={{"width":"8em"}}
                                        >
                                            <option value="ar">AR - Arabic</option>
                                            <option value="en">EN - English</option>
                                            <option value="fr">FR - French</option>
                                            <option value="es">ES - Spanish</option>
                                            <option value="de">DE - German</option>
                                            <option value="it">IT - Italian</option>
                                            <option value="pt">PT - Portuguese</option>
                                            <option value="ru">RU - Russian</option>
                                            <option value="ja">JA - Japanese</option>
                                            <option value="ko">KO - Korean</option>
                                            <option value="hi">HI - Hindi</option>
                                            <option value="tr">TR - Turkish</option>
                                            <option value="nl">NL - Dutch</option>
                                            <option value="zh-cn">ZH - Chinese (Simplified)</option>
                                            <option value="zh-tw">ZH-TW - Chinese (Traditional)</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="dropdown-item">
                                    <span>Appearance</span>
                                    <label className="switch d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            checked={localMode}
                                            onChange={(e) => setLocalMode(e.target.checked)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        id="opendoor"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('me');
                                            setAuthStatus(false);
                                            log([...logs, 'Logged out !!!'])
                                        }}
                                    >
                                        <i className="fas fa-door-open"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <button
                        className={`btn ${authStatus ? 'true' : 'false'} btn-outline-success mx-1`}
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`btn ${authStatus ? 'true' : 'false'} btn-outline-success mx-1`}
                        type="button"
                        onClick={() => setShowRegister(true)}
                    >
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
