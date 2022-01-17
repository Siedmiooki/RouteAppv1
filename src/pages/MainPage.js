import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Appcontext } from '../App'
import UserPage from "./UserPage"
import LoginPage from "./LoginPage"

axios.defaults.baseURL = 'https://api.demo.cargo-speed.pl/demo/api/v1';
axios.defaults.withCredentials = true

function MainPage() {

    const { state, dispatch } = useContext(Appcontext)

    useEffect(() => {
        axiosAutoLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const refreshParams = new URLSearchParams();
    refreshParams.append('grant_type', 'refresh_token');

    const axiosAutoLogin = async () => {
        try {
            const { data } = await axios.post("/login/access_token", refreshParams)
            dispatch({
                type: "ADD_TOKEN",
                payload: data.access_token,
            })
        }
        catch (error) {
            console.log(error)

        }
    }

    return (
        <div className="mainPageContainer">
            {state.logedIn ? <UserPage /> : <LoginPage />}
        </div>
    )
}

export default MainPage
