import React from "react";
import { Link, useLocation } from "react-router-dom"
import { NavLogo, NewAdSvg, SaveSvg, LogoutSvg } from "./svg"
import { postLayout, generateDeliverable } from '../utils/requests'


const Nav = ({setShowModal}) => {
    const localhost = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''


    const location = useLocation()
    console.log(location)

    // the only reason this is here is so i can save them.. 
    // I honestly dont think this is neccesary.. we shall see


    const newAd = (e) => {
        e.preventDefault()
        setShowModal(1)
    }

    // const handleLogout = async e => {
    //     e.preventDefault()
    //     console.log('logout')
    //     const res = await appLogout()
    //     console.log(res)
    //     if (res && res.status === 200) {
    //         window.location.href = '/login'
    //     }
    //     else {
    //         alert('error logging out? how did you do this? contact tech')
    //     }
    // }


    const handleSave = async e => {
        e.preventDefault()
        console.log('hi')

    }

    return (
        <div className="app-nav-items">
            <div className="harryLogo">
                <img src="/searchbiasreport/assets/gab.png" alt="gab" />
            </div>
            <div className="nav-header">
                <h1>
                    <span>
                        Mrc
                    </span>
                    <span>
                        Search Bias Report
                    </span>
                </h1>
                <NavLogo />
            </div>
            <nav>
                <ul>
                    <li className={
                        "/searchbiasreport/dashboard/main" === location.pathname
                            ? "active blue"
                            : ""
                    }>
                        <Link to="/searchbiasreport/dashboard/main" >
                            Dashboard
                        </Link>
                    </li>
                    <li className={
                        "/searchbiasreport/dashboard/settings" === location.pathname
                            ? "active red"
                            : ""
                    }>
                        <Link to="/searchbiasreport/dashboard/settings">Settings</Link>
                    </li>
                    {/* <li className={
                        "/intranet/dashboard/help" === location.pathname
                            ? "active blue"
                            : ""
                    }>
                        <Link to="/intranet/dashboard/help">Help</Link>
                    </li> */}
                </ul>
            </nav>
            <div className="nav-buttons">
                {/* <button onClick={handleLogout} className="redStrokeLink hoverAnim"><LogoutSvg /><span>Logout</span></button> */}

                <a href={`${localhost}/searchbiasreport/auth/logout`} className="redStrokeLink hoverAnim"><LogoutSvg /><span>Logout</span></a>
                {
                    ("/searchbiasreport/dashboard/main" === location.pathname) &&
                    <button onClick={newAd} className="greenStrokeBtn hoverAnim"><NewAdSvg /><span>New Campaign</span></button>
                }
            </div>
        </div>
    )
}

export default Nav
