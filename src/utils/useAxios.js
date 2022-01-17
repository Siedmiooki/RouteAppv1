import axios from "axios";
import { useContext } from "react";
import { Appcontext } from '../App'
import dayjs from "dayjs";

const useAxios = () => {
    const { state, dispatch } = useContext(Appcontext)


    const refreshParams = new URLSearchParams();
    refreshParams.append('grant_type', 'refresh_token');

    const axiosInstance = axios.create({
        baseURL: 'https://api.demo.cargo-speed.pl/demo/api/v1',
        headers: { "Authorization": `Bearer ${state.token}` }
    })


    axiosInstance.interceptors.request.use(async req => {

        const isExpired = dayjs.unix(state.tokenDetails.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

        const { data } = await axios.post("/login/access_token", refreshParams)

        dispatch({
            type: "ADD_TOKEN",
            payload: data.access_token,
        })

        req.headers.Authorization = `Bearer ${data.access_token}`

        return req
    })

    return axiosInstance
}

export default useAxios