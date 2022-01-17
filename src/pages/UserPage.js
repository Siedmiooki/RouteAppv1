import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Map from '../utils/Map'
import { Appcontext } from '../App'
import axios from 'axios'
import { AnimateSharedLayout, motion } from "framer-motion";
import Toggle from '../utils/Toggle'
import 'leaflet/dist/leaflet.css'
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import useAxios from '../utils/useAxios'

const UserPage = () => {
    const { state, dispatch } = useContext(Appcontext)

    const navigate = useNavigate()

    const api = useAxios()

    useEffect(() => {
        axiosGetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const axiosGetData = async () => {
        try {
            const { data } = await api.get("/orders/many")
            dispatch({ type: "ADD_DATA", payload: data })
            for (const route of data) {
                const sourceAddress = await axiosGetAddress(route.source.lat, route.source.lon)
                const destinationAddress = await axiosGetAddress(route.destination.lat, route.destination.lon)
                dispatch({
                    type: "ADD_ADDRESS",
                    payload: {
                        id: route.id,
                        sourceAddress,
                        destinationAddress
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            window.alert("Session has expired (refresh token expired), Please login again to refresh data.")
        }
    }

    const axiosGetAddress = async (lat, lon) => {
        try {
            const { data } = await axios.post(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`)
            return data.features[0].properties.address
        }
        catch (error) {
            console.log(error)
        }
    }

    const logoutHandler = () => {
        navigate('/')
        dispatch({
            type: "LOGOUT_USER"
        })
    }

    return (
        <div className="pageContainer">
            <div className="buttonContainer"> 
                <motion.button type="submit" whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} onClick={() => logoutHandler()}>Back to login page</motion.button>
                <motion.button type="submit" whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} onClick={() => axiosGetData()}>Refresh data</motion.button>
            </div>
            <h1>{`Welcome ${state.tokenDetails.username} `}</h1>
            {state.routesData.map(route => (
                <div key={route.id} className="mainContainer">
                    <div className="infoContainer">
                        <div className="infoBox">
                            <h4>Route Information</h4>
                        <p>Route No.: {route.order_number}</p>
                            <p>Arrival Time: {route.destination.time}</p>
                            <p>Person: {route.subject}</p>
                            {route.comment ? `Comment: ${route.comment}` : null}
                        </div>
                        {route.sourceAddress ? 
                        <div className="infoBox">
                                <h4>Source address</h4>
                                <p>City: {route.sourceAddress.city ? route.sourceAddress.city : route.sourceAddress.town || route.sourceAddress.village || route.destinationAddress.county} </p>
                                <p>Street: {route.sourceAddress.road ? route.sourceAddress.road : route.sourceAddress.village} {route.sourceAddress.house_number ? route.sourceAddress.house_number : route.sourceAddress.amenity || route.sourceAddress.building} </p>
                                <p>Post Code: {route.sourceAddress.postcode}</p>
                        </div>
                            : null}
                        {route.destinationAddress ?
                            <div className="infoBox">
                                <h4>Destination address</h4>
                                <p>City: {route.destinationAddress.city ? route.destinationAddress.city : route.destinationAddress.town || route.destinationAddress.village || route.destinationAddress.county} </p>
                                <p>Street: {route.destinationAddress.road ? route.destinationAddress.road : route.destinationAddress.village} {route.destinationAddress.house_number ? route.destinationAddress.house_number : route.destinationAddress.amenity || route.destinationAddress.building}</p>
                                <p>Post Code: {route.destinationAddress.postcode}</p>
                            </div>
                            : null}
                    </div>
                    <AnimateSharedLayout>
                        <Toggle>
                    <div className="mapContainer" >
                                <Map route={route}
                        />
                    </div>
                        </Toggle>
                    </AnimateSharedLayout>
                </div>
            ))}
        </div>
    )
}

export default UserPage
