import { MainLogo } from './svg'
import React, { useEffect } from "react"
import gsap from "gsap"
import { Back } from 'gsap/gsap-core'
import { GoogleSvg } from './svg'


const Login = () => {

    const localhost = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''

    useEffect(() => {

        let tl = gsap.timeline({
            defaults: {
                duration: 1,
            }
        })
        tl.from('#mainText span', {
            x: -100,
            opacity: 0,
            ease: Back.easeOut.config(1)
        })
        tl.from('#subText', {
            x: 70,
            opacity: 0,
            ease: Back.easeOut.config(1)
        }, "-=.8")
        tl.from('.right-col-items svg', {
            rotation: 720,
            opacity: 0,
            duration: 1.5
        }, "-=.5")

        const translateDist = 150
        tl.from('#harryLogo', {
            opacity: 0,
            translateX: translateDist,
            translateY: translateDist,
            duration: 1.5,
            ease: Back.easeOut.config(1)
        }, "-=.8")
        tl.delay(.5)
        tl.play()
    })
    return (
        <div className="login--wrapper">
            <div className="login">
                <div id="harryLogo" className="harryLogo">
                    <img src="/searchbiasreport/assets/brian.png" alt="brian" />
                </div>
                <div className="left-col">
                    <div className="left-col-items">
                        <h1 id="mainText"><span>MRC</span><span>Search Bias Report</span></h1>
                        <p id="subText">Search greatness</p>
                        <a id="signIn" className="hoverAnim" href={`${localhost}/searchbiasreport/auth/google`}><GoogleSvg /><span>Sign In with Google</span></a>
                    </div>
                </div>
                <div className="right-col">
                    <div className="right-col-items">
                        <MainLogo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 
