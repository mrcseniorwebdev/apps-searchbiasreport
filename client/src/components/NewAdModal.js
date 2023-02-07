import React, { useState, useEffect } from "react";
import { CloseSvg, UploadSvg, Trash21Svg } from './svg'
import { addCampaign } from '../utils/requests'
import gsap from "gsap"
import { Back } from 'gsap/gsap-core'

const NewAdModal = ({ setShowModal, setSync, sync }) => {
    const [doAnimation, setDoAnimation] = useState(true)
    const [name, setName] = useState('')
    const [query, setQuery] = useState('')
    const [site, setSite] = useState('')
    const [jobs, setJobs] = useState([])
    // const [jobs, setJobs] = useState([
    //     {
    //         "site": "drummondok.com",
    //         "query": "Gentner Drummond attorney general race 2022"
    //     },
    //     {
    //         "site": "birdforiowa.com",
    //         "query": "Brenna Bird Attorney General race 2022"
    //     },
    //     {
    //         "site": "trudybuschvalentine.com",
    //         "query": "Trudy Busch Senate Race 2022"
    //     }
    // ])
    // const [jobs, setJobs] = useState([
    //     {
    //         "site": "drummondok.com",
    //         "query": "Gentner Drummond attorney general race 2022"
    //     },
    //     {
    //         "site": "birdforiowa.com",
    //         "query": "Brenna Bird Attorney General race 2022"
    //     },
    //     {
    //         "site": "trudybuschvalentine.com",
    //         "query": "Trudy Busch Senate Race 2022"
    //     },
    //     {
    //         "site": "marshallforalabama.com",
    //         "query": "Steve Marshall Attorney General race 2022"
    //     },
    //     {
    //         "site": "wendellmajor.com",
    //         "query": "Wendell Major Attorney General race 2022"
    //     },
    //     {
    //         "site": "abeforag.com",
    //         "query": "Abraham Hamadeh Attorney General race 2022"
    //     },
    //     {
    //         "site": "krismayes.com",
    //         "query": "Kris Mayes Attorney General race 2022"
    //     },
    //     {
    //         "site": "leslierutledge.com",
    //         "query": "Leslie Rutledge Luitenant Governor Race 2022"
    //     },
    //     {
    //         "site": "kellyforarkansas.com",
    //         "query": "Kelly Krout Luitenant Governor Race 2022"
    //     },
    //     {
    //         "site": "frankgilbert.orgmeet-frank",
    //         "query": "Frank GIlbert Luitenant Governor Race 2022"
    //     },
    //     {
    //         "site": "jessegibsonforarkansas.com",
    //         "query": "Jesse Gibson Attorney General race 2022"
    //     },
    //     {
    //         "site": "timgriffinforag.com",
    //         "query": "Tim Griffin  Attorney General race 2022"
    //     },
    //     {
    //         "site": "robbonta.com",
    //         "query": "Rob Bonta Attorney General race 2022"
    //     },
    //     {
    //         "site": "nathanhochman.comabout",
    //         "query": "Nathan Hochman Attorney General race 2022"
    //     },
    //     {
    //         "site": "philforcolorado.com",
    //         "query": "Phil Weiser Attorney General race 2022"
    //     },
    //     {
    //         "site": "johnkellner.com",
    //         "query": "John Kellner Attorney General race 2022"
    //     },
    //     {
    //         "site": "thorneforattorneygeneral.comabout",
    //         "query": "Stanley Thorne Attorney General race 2022"
    //     },
    //     {
    //         "site": "williamtong.com",
    //         "query": "William Tong Attorney General race 2022"
    //     },
    //     {
    //         "site": "jessicakordas.com",
    //         "query": "Jessica Kordas Attorney General race 2022"
    //     },
    //     {
    //         "site": "kenkrayeske.com",
    //         "query": "Ken Krayeske Attorney General race 2022"
    //     },
    //     {
    //         "site": "kathyfordelaware.com",
    //         "query": "Kathy Jennings Attorney General race 2022"
    //     },
    //     {
    //         "site": "murrayfordelaware.com",
    //         "query": "Julianne Murray Attorney General race 2022"
    //     },
    //     {
    //         "site": "ashleymoody.com",
    //         "query": "Ashley Moody Attorney General race 2022"
    //     },
    //     {
    //         "site": "aramisayalafl.com",
    //         "query": "Amaris Ayala Attorney General race 2022"
    //     },
    //     {
    //         "site": "chriscarrga.com",
    //         "query": "Chris Carr Attorney General race 2022"
    //     },
    //     {
    //         "site": "jen4georgia.com",
    //         "query": "Jen Jordan Attorney General race 2022"
    //     },
    //     {
    //         "site": "arkooshforag.com",
    //         "query": "Tom Arkoosh Attorney General race 2022"
    //     },
    //     {
    //         "site": "labrador2022.com",
    //         "query": "Raúl Labrador Attorney General race 2022"
    //     },
    //     {
    //         "site": "kwameraoul.com",
    //         "query": "Kwame Raoul Attorney General race 2022"
    //     },
    //     {
    //         "site": "tomdevore.com",
    //         "query": "Thomas DeVore  Attorney General race 2022"
    //     },
    //     {
    //         "site": "danrobin4ag.org",
    //         "query": "Dan Robin Attorney General race 2022"
    //     },
    //     {
    //         "site": "iowansformiller.com",
    //         "query": "Tom Miller Attorney General race 2022"
    //     },
    //     {
    //         "site": "birdforiowa.com",
    //         "query": "Brenna Bird Attorney General race 2022"
    //     },
    //     {
    //         "site": "schmidtforkansas.com",
    //         "query": "Derek Schmidt Governor race 2022"
    //     },
    //     {
    //         "site": "laurakellyforkansas.com",
    //         "query": "Laura Kelly Governor race 2022"
    //     },
    //     {
    //         "site": "cordellforkansas.com",
    //         "query": "Seth Cordell Governor race 2022"
    //     },
    //     {
    //         "site": "pyleforkansas.commeet-dennis",
    //         "query": "Dennis Pyle Governor race 2022"
    //     },
    //     {
    //         "site": "kriskobach.com",
    //         "query": "Kris Kobach Attorney General race 2022"
    //     },
    //     {
    //         "site": "chrismannforkansas.com",
    //         "query": "Chris Mann Attorney General race 2022"
    //     },
    //     {
    //         "site": "cameronforkentucky.com",
    //         "query": "Daniel Cameron Governor race 2023"
    //     },
    //     {
    //         "site": "governor.ky.gov",
    //         "query": "Andy Beshear Governor race 2023"
    //     },
    //     {
    //         "site": "cooperforky.com",
    //         "query": "David Cooper Governor race 2023"
    //     },
    //     {
    //         "site": "detersforgovernor.com",
    //         "query": "Eric Deters Governor race 2023"
    //     },
    //     {
    //         "site": "mikeharmon.com",
    //         "query": "Mike Harmon Governor race 2023"
    //     },
    //     {
    //         "site": "kellycraft.com",
    //         "query": "Kelly Knight Craft Governor race 2023"
    //     },
    //     {
    //         "site": "savannahforgovernor.com",
    //         "query": "Savannah Maddox Governor race 2023"
    //     },
    //     {
    //         "site": "ryanquarles.com",
    //         "query": "Ryan Quarles Governor race 2023"
    //     },
    //     {
    //         "site": "rsmith4gov.com",
    //         "query": "Robbie Smith Governor race 2023"
    //     },
    //     {
    //         "site": "jefflandry.com",
    //         "query": "Jeff Landry Governor race 2023"
    //     },
    //     {
    //         "site": "lundyforlouisiana.com",
    //         "query": "Hunter Lundy Governor race 2023"
    //     },
    //     {
    //         "site": "anthonybrown.com",
    //         "query": "Anthony G. Brown Attorney General race 2022"
    //     },
    //     {
    //         "site": "patriots4peroutka.com",
    //         "query": "Michael Anthony Peroutka Attorney General race 2022"
    //     },
    //     {
    //         "site": "andreacampbell.org",
    //         "query": "Andrea Campbell Attorney General race 2022"
    //     },
    //     {
    //         "site": "attorneyjaymcmahon.com",
    //         "query": "James McMahon Attorney General race 2022"
    //     },
    //     {
    //         "site": "dananessel.com",
    //         "query": "Dana Nessel Attorney General race 2022"
    //     },
    //     {
    //         "site": "depernoformi.com",
    //         "query": "Matthew DePerno Attorney General race 2022"
    //     },
    //     {
    //         "site": "libertystrikesback.com",
    //         "query": "Joe McHugh Attorney General race 2022"
    //     },
    //     {
    //         "site": "keithellison.org",
    //         "query": "Keith Ellison Attorney General race 2022"
    //     },
    //     {
    //         "site": "jimformnag.com",
    //         "query": "Jim Schultz Attorney General race 2022"
    //     },
    //     {
    //         "site": "schmittforsenate.comabout",
    //         "query": "Eric Schmitt Senate Race 2022"
    //     },
    //     {
    //         "site": "trudybuschvalentine.com",
    //         "query": "Trudy Busch Senate Race 2022"
    //     },
    //     {
    //         "site": "mikehilgers.com",
    //         "query": "Mike Hilgers Attorney General race 2022"
    //     },
    //     {
    //         "site": "larrybolinger.comindex.html",
    //         "query": "Larry Bolinger Attorney General race 2022"
    //     },
    //     {
    //         "site": "fordfornevada.com",
    //         "query": "Aaron Ford Attorney General race 2022"
    //     },
    //     {
    //         "site": "sigalchattah.com",
    //         "query": "Sigal Chattah Attorney General race 2022"
    //     },
    //     {
    //         "site": "raultorrez.com",
    //         "query": "Raul Torrez Attorney General race 2022"
    //     },
    //     {
    //         "site": "jeremygay.com",
    //         "query": "Jeremy Gay Attorney General race 2022"
    //     },
    //     {
    //         "site": "jamesforny.com",
    //         "query": "Letitia James Attorney General race 2022"
    //     },
    //     {
    //         "site": "michaelhenryforag.com",
    //         "query": "Michael Henry Attorney General race 2022"
    //     },
    //     {
    //         "site": "drewwrigley.com",
    //         "query": "Drew Wrigley Attorney General race 2022"
    //     },
    //     {
    //         "site": "facebook.comtimothy.c.lamb.7",
    //         "query": "Timothy Lamb Attorney General race 2022"
    //     },
    //     {
    //         "site": "daveyost.com",
    //         "query": "Dave Yost Attorney General race 2022"
    //     },
    //     {
    //         "site": "crossmanforohio.com",
    //         "query": "Jeff Crossman Attorney General race 2022"
    //     },
    //     {
    //         "site": "drummondok.com",
    //         "query": "Gentner Drummond attorney general race 2022"
    //     },
    //     {
    //         "site": "steeleforag.com",
    //         "query": "Lynda Steele attorney general race 2022"
    //     },
    //     {
    //         "site": "joshshapiro.org",
    //         "query": "Josh Shapiro Governor race 2022"
    //     },
    //     {
    //         "site": "doug4gov.com",
    //         "query": "Doug Mastriano Governor race 2022"
    //     },
    //     {
    //         "site": "peterneronha.com",
    //         "query": "Peter Neronha attorney general race 2022"
    //     },
    //     {
    //         "site": "chas4ag.com",
    //         "query": "Charles Calenda attorney general race 2022"
    //     },
    //     {
    //         "site": "kenpaxton.com",
    //         "query": "Ken Paxton attorney general race 2022"
    //     },
    //     {
    //         "site": "rochellegarzafortexas.com",
    //         "query": "Rochelle Garza attorney general race 2022"
    //     },
    //     {
    //         "site": "michaeltagliaviaforvermont.com",
    //         "query": "Michael Tagliavia attorney general race 2022"
    //     },
    //     {
    //         "site": "charityforvermont.com",
    //         "query": "Charity Clark attorney general race 2022"
    //     },
    //     {
    //         "site": "joshkaul.org",
    //         "query": "Josh Kaul attorney general race 2022"
    //     },
    //     {
    //         "site": "erictoney.com",
    //         "query": "Eric Toney attorney general race 2022"
    //     }
    // ])

    useEffect(() => {
        if (doAnimation) {
            const duration = .4
            let tl = gsap.timeline({
                defaults: {
                    duration: duration,
                }
            })
            tl.to('.modal-background', {
                opacity: 1
            })
            tl.to('.modal', {
                opacity: 1,

            }, `-=${duration / 2}`)
            tl.from('.modal', {
                y: 60,
                ease: Back.easeOut.config(2)

            }, `-=${duration}`)
        }
        setDoAnimation(false)
        // console.log(localStorage)
        // const storedJobs = localStorage['currCampaign'] ? JSON.parse(localStorage['currCampaign']) : []
        // setJobs(storedJobs)
    }, [doAnimation, setDoAnimation])



    const clearForm = () => {
        setName('')
        setSite('')
        setQuery('')
        setJobs([])
        document.getElementById('adForm').reset()
    }

    const closeForm = () => {
        setShowModal(0)
    }

    const handleCloseBG = (e) => {
        if (e.target.classList.contains('modal-background')) {
            // clearForm()
            closeForm()
        }
    }
    const handleCloseBtn = (e) => {
        // clearForm()
        closeForm()
    }

    const handleFormSubmit = async e => {
        e.preventDefault()
        console.log('submit')
        let formElements = document.getElementsByClassName('form--group')
        for (let i = 0; i < formElements.length; ++i) {
            if (formElements[i].classList.contains('error')) {
                formElements[i].classList.remove('error')
            }
        }

        let formError = 0

        if (!name || !name.length) {
            formError = 1
            document.getElementById('name').classList.toggle('error')
            alert('Please enter a Campaign Name')
        }

        if (!jobs.length) {
            formError = 1
            document.getElementById('site').classList.toggle('error')
            document.getElementById('query').classList.toggle('error')
            alert('Please enter atleast one search query')
        }

        let btn = document.getElementById('newAdSubmit')
        const oldBtnText = btn.innerHTML
        if (formError) {
            btn.classList.toggle('error')
            btn.innerText = "Error"
            setTimeout(() => {
                btn.classList.toggle('error')
                btn.innerText = ''
                btn.insertAdjacentHTML('afterbegin', oldBtnText)
            }, 3000)
            return
        }

        btn.classList.toggle('uploading')
        btn.innerText = "Uploading..."

        const Data = {
            name,
            jobs,
        }


        let res = await addCampaign(Data)
        if (res.status !== 201) {
            alert('server error creating campaign')
            return
        }

        btn.classList.toggle('uploading')
        btn.innerText = "Done!"


        localStorage.removeItem("currCampaign")
        clearForm()
        closeForm()
        setSync(sync + 1)
    }
    const handleAddJob = e => {
        const newJob = {
            query,
            site
        }

        const newJobs = [...jobs, newJob]
        setJobs(newJobs)
        setSite('')
        setQuery('')
        setLocalStorage(newJobs)
    }

    const handleDeleteQuery = elem => {
        const newJobs = jobs.filter(e => e.query !== elem.query)
        setJobs(newJobs)
        setLocalStorage(newJobs)
    }

    const setLocalStorage = (newJobs) => {
        console.log('setting storage:', jobs)
        localStorage.setItem("currCampaign", JSON.stringify(newJobs))
    }

    console.log({ jobs })
    console.log({ localStorage })
    return (
        <div className="modal-background" onClick={handleCloseBG}>
            <div className="modal">
                <div className="closeBtn hoverAnim" onClick={handleCloseBtn}>
                    <CloseSvg />
                </div>
                <h1><span>Launch</span> A New Campaign</h1>
                <form id="adForm">
                    <div id="name" className="form--group">
                        <label>Campaign Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.currentTarget.value)} />
                    </div>
                    <div className="form--group query-list">
                        <label>Queries:</label>
                        <div className="query-list-grid">
                            {
                                jobs.map((elem, index) => {
                                    return (
                                        <div className="query-list-grid--item">
                                            <div className="index">{index + 1}.</div>
                                            <div className="query">{elem.query}</div>
                                            <div className="site">{elem.site}</div>
                                            <div className="delete hoverAnim" onClick={e => handleDeleteQuery(elem)}><Trash21Svg /></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="new-query">
                        <div id="query" className="form--group">
                            <label>Query:</label>
                            <input type="text" value={query} onChange={e => setQuery(e.currentTarget.value)} />
                        </div>
                        <div id="site" className="form--group">
                            <label>Site URL:</label>
                            <input type="text" value={site} onChange={e => setSite(e.currentTarget.value)} />
                        </div>
                        <div className="addBtn hoverAnim" onClick={handleAddJob}>
                            <CloseSvg />
                        </div>
                    </div>

                    <button id="newAdSubmit" className="greenFillBtn hoverAnim" onClick={handleFormSubmit}><UploadSvg /><span>Launch</span></button>
                </form>
            </div>
        </div>
    )
}


export default NewAdModal