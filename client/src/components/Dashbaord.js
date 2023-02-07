import React, { useEffect, useState } from "react";
import { getCampaigns, deleteCampaign } from '../utils/requests'
import { Trash21Svg } from './svg'

const Campaign = ({ campaignName, link, percentage, cid, sync, setSync }) => {
    // console.log(cid)

    const handleDelete = async e => {
        let confirm = window.confirm("Are you sure you want to delete this campaign?")
        if (confirm) {
            const res = await deleteCampaign(cid)

            if (res.status !== 200) {
                alert('some sort of delete error, email tech')
                return
            }
            setSync(sync + 1)
        }

    }

    return (
        <div className="campaign--grid--item">
            <div className="campaignName">{campaignName}</div>
            {
                link
                    ? <a className="link" href={link} download>Download Completed Campaign</a>
                    : <div className="percentage">
                        <div className="percentage--pill">
                            <div className="percentage--pill--bar" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span>{percentage}%</span>
                    </div>
            }
            <button className="delete" onClick={handleDelete}>
                <Trash21Svg />
            </button>

        </div>
    )
}

const Dashbaord = ({ sync, setSync }) => {

    const [campaings, setCampaigns] = useState([])

    useEffect(() => {
        const getData = async () => {
            const resp = await getCampaigns()
            if (resp.status !== 200) {
                alert('some sort of error retrieving campaigns, email tech')
                return
            }
            setCampaigns(resp.data)
        }
        getData()
    }, [sync])
    console.log({ campaings })
    return (
        <div className="dashboard--wrapper">
            <div className="dashboard">
                <h1>Campaigns</h1>
                <div className="campaign--grid">
                    {
                        campaings
                            .sort((a, b) => { return b.cid - a.cid })
                            .map((elem, index) => {
                                return (
                                    <Campaign key={index} campaignName={elem.campaignName} link={elem.link} percentage={elem.percentage} cid={elem.cid} sync={sync} setSync={setSync} />
                                )
                            })
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashbaord