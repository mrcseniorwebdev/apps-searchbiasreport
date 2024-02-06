import React, { useState, useEffect } from "react";
import { CloseSvg, UploadSvg, Trash21Svg } from "./svg";
import { addCampaign } from "../utils/requests";
import gsap from "gsap";
import { Back } from "gsap/gsap-core";

const NewAdModal = ({ setShowModal, setSync, sync }) => {
    const [doAnimation, setDoAnimation] = useState(true);
    const [name, setName] = useState("");
    const [query, setQuery] = useState("");
    const [site, setSite] = useState("");
    const [jobs, setJobs] = useState([]);
    // Add these two lines after the existing useState declarations
    const [generalCheck, setGeneralCheck] = useState(true);
    const [newsCheck, setNewsCheck] = useState(false);

    useEffect(() => {
        if (doAnimation) {
            const duration = 0.4;
            let tl = gsap.timeline({
                defaults: {
                    duration: duration,
                },
            });
            tl.to(".modal-background", {
                opacity: 1,
            });
            tl.to(
                ".modal",
                {
                    opacity: 1,
                },
                `-=${duration / 2}`
            );
            tl.from(
                ".modal",
                {
                    y: 60,
                    ease: Back.easeOut.config(2),
                },
                `-=${duration}`
            );
        }
        setDoAnimation(false);
        // console.log(localStorage)
        // const storedJobs = localStorage['currCampaign'] ? JSON.parse(localStorage['currCampaign']) : []
        // setJobs(storedJobs)
    }, [doAnimation, setDoAnimation]);

    const clearForm = () => {
        setName("");
        setSite("");
        setQuery("");
        setJobs([]);
        document.getElementById("adForm").reset();
    };

    const closeForm = () => {
        setShowModal(0);
    };

    const handleCloseBG = (e) => {
        if (e.target.classList.contains("modal-background")) {
            // clearForm()
            closeForm();
        }
    };
    const handleCloseBtn = (e) => {
        // clearForm()
        closeForm();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
        let formElements = document.getElementsByClassName("form--group");
        for (let i = 0; i < formElements.length; ++i) {
            if (formElements[i].classList.contains("error")) {
                formElements[i].classList.remove("error");
            }
        }

        let formError = 0;

        if (!name || !name.length) {
            formError = 1;
            document.getElementById("name").classList.toggle("error");
            alert("Please enter a Campaign Name");
        }

        if (!jobs.length) {
            formError = 1;
            document.getElementById("site").classList.toggle("error");
            document.getElementById("query").classList.toggle("error");
            alert("Please enter atleast one search query");
        }

        if(!(generalCheck || newsCheck)){
            formError = 1;
            document.getElementById("tabs").classList.toggle("error");
            alert("Please select atleast one tab to search");
        }

        let btn = document.getElementById("newAdSubmit");
        const oldBtnText = btn.innerHTML;
        if (formError) {
            btn.classList.toggle("error");
            btn.innerText = "Error";
            setTimeout(() => {
                btn.classList.toggle("error");
                btn.innerText = "";
                btn.insertAdjacentHTML("afterbegin", oldBtnText);
            }, 3000);
            return;
        }

        btn.classList.toggle("uploading");
        btn.innerText = "Uploading...";

        const Data = {
            name,
            jobs,
            searchTabs: {
                general: generalCheck,
                news: newsCheck,
            },
        };
        // const Data = {
        //     name,
        //     jobs,
        // };

        let res = await addCampaign(Data);
        if (res.status !== 201) {
            alert("server error creating campaign");
            return;
        }

        btn.classList.toggle("uploading");
        btn.innerText = "Done!";

        localStorage.removeItem("currCampaign");
        clearForm();
        closeForm();
        setSync(sync + 1);
    };
    const handleAddJob = (e) => {
        const newJob = {
            query,
            site,
        };

        const newJobs = [...jobs, newJob];
        setJobs(newJobs);
        setSite("");
        setQuery("");
        setLocalStorage(newJobs);
    };

    const handleDeleteQuery = (elem) => {
        const newJobs = jobs.filter((e) => e.query !== elem.query);
        setJobs(newJobs);
        setLocalStorage(newJobs);
    };

    const setLocalStorage = (newJobs) => {
        console.log("setting storage:", jobs);
        localStorage.setItem("currCampaign", JSON.stringify(newJobs));
    };

    console.log({ jobs });
    console.log({ localStorage });
    return (
        <div className="modal-background" onClick={handleCloseBG}>
            <div className="modal">
                <div className="closeBtn hoverAnim" onClick={handleCloseBtn}>
                    <CloseSvg />
                </div>
                <h1>
                    <span>Launch</span> A New Campaign
                </h1>
                <form id="adForm">
                    <div id="name" className="form--group">
                        <label>Campaign Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </div>
                    <div id="tabs" className="form--group tab">
                        <label>Search Tab:</label>
                        <div className="tab--grid">
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={generalCheck}
                                        onChange={(e) =>
                                            setGeneralCheck(
                                                e.currentTarget.checked
                                            )
                                        }
                                    />
                                    General
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newsCheck}
                                        onChange={(e) =>
                                            setNewsCheck(
                                                e.currentTarget.checked
                                            )
                                        }
                                    />
                                    News
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form--group query-list">
                        <label>Queries:</label>
                        <div className="query-list-grid">
                            {jobs.map((elem, index) => {
                                return (
                                    <div className="query-list-grid--item">
                                        <div className="index">
                                            {index + 1}.
                                        </div>
                                        <div className="query">
                                            {elem.query}
                                        </div>
                                        <div className="site">{elem.site}</div>
                                        <div
                                            className="delete hoverAnim"
                                            onClick={(e) =>
                                                handleDeleteQuery(elem)
                                            }
                                        >
                                            <Trash21Svg />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="new-query">
                        <div id="query" className="form--group">
                            <label>Query:</label>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) =>
                                    setQuery(e.currentTarget.value)
                                }
                            />
                        </div>
                        <div id="site" className="form--group">
                            <label>Site URL:</label>
                            <input
                                type="text"
                                value={site}
                                onChange={(e) => setSite(e.currentTarget.value)}
                            />
                        </div>
                        <div
                            className="addBtn hoverAnim"
                            onClick={handleAddJob}
                        >
                            <CloseSvg />
                        </div>
                    </div>

                    <button
                        id="newAdSubmit"
                        className="greenFillBtn hoverAnim"
                        onClick={handleFormSubmit}
                    >
                        <UploadSvg />
                        <span>Launch</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAdModal;
