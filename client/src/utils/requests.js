import axios from 'axios'

const localhost = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''


export const appLogout = async () => {
    try {
        const response = await axios.get(`${localhost}/searchbiasreport/auth/logout`)
        return response
    }
    catch (error) {
        console.log(error)
        return 0
    }
}
export const getUsers = async () => {
    try {
        const response = await axios.get(`${localhost}/searchbiasreport/api/user`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}
export const postUsers = async (data) => {
    try {
        const response = await axios.post(`${localhost}/searchbiasreport/api/user`, data)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}
export const deleteUsers = async (id) => {
    try {
        const response = await axios.delete(`${localhost}/searchbiasreport/api/user/${id}`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}

export const addCampaign = async (data) => {
    try {
        const response = await axios.post(`${localhost}/searchbiasreport/api/campaign`, data)
        return response
        // const response = await axios.post(`${localhost}/searchbiasreport/api/campaign`, data, {
        //     headers: {
        //         'Accept': 'multipart/form-data',
        //         'Content-Type': 'multipart/form-data',
        //     }
        // })
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}
export const getCampaigns = async () => {
    try {
        const response = await axios.get(`${localhost}/searchbiasreport/api/campaign`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}

export const deleteCampaign = async (id) => {
    try {
        const response = await axios.delete(`${localhost}/searchbiasreport/api/campaign/${id}`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/searchbiasreport/login'

        }
        console.error(err)
        return 0
    }
}