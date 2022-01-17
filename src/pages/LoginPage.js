import React, { useState, useContext } from 'react'
import { Appcontext } from '../App'
import axios from 'axios'
import { motion } from "framer-motion"

const LoginPage = () => {
    const { dispatch } = useContext(Appcontext)

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const loginParams = new URLSearchParams();
    loginParams.append('grant_type', 'password');
    loginParams.append('username', `${user}`);
    loginParams.append('password', `${pass}`);

    const axiosManualLogin = async () => {
        try {
            const { data } = await axios.post("/login/access_token", loginParams)
            dispatch({
                type: "ADD_TOKEN",
                payload: data.access_token,
            })

        }
        catch (error) {
            console.log(error)
            window.alert("Incorrect user or password")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        await axiosManualLogin()
    }

    return (
        <div className="pageContainer">
            <form className="formBox" onSubmit={(e) => handleLogin(e)}>
                <input className="styledInput" type="text" placeholder="user" value={user} onChange={(e) => setUser(e.target.value)} />
                <input className="styledInput" type="password" placeholder="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <motion.button type="submit" whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>Login</motion.button> 
            </form>
        </div>
    )
}

export default LoginPage

