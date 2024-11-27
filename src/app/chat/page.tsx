"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css'
import Main from './main/main'
import Nav from './../profile/nav/nav'
import { useEffect } from 'react';

export default function Home() {
    useEffect(()=>{
        import('bootstrap/js/dist/modal.js')
        import('bootstrap/js/dist/dropdown.js')
        import('bootstrap/js/dist/collapse.js')
        import('bootstrap/js/dist/offcanvas.js')
        import('bootstrap/js/dist/toast.js')
    },[])
    return (
        <main className='d-flex flex-column align-items-center' >
            <div className="container h-25"> 
                <div className=' col-12 m-0 p-0'>
                    <Nav 
                        page='CHAT'
                    />
                </div>
            </div>
           
            <Main/>
        </main>
    );
}
