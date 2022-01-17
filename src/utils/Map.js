import L from "leaflet"
import RoutineMachine from "./RoutineMachine"
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Map = ({ route }) => {

    return (
        <MapContainer center={[`${route.source.lat}`, `${route.source.lon}`]} zoom={13} scrollWheelZoom={true}>
            <TileLayer className="titleLayer"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                // attribution="Tiles &copy; Esri &mdash;"
            />
            <Marker position={[`${route.source.lat}`, `${route.source.lon}`]}>
                {route.sourceAddress ? 
                <Popup >
                        {
                            [`${route.sourceAddress.city ? route.sourceAddress.city : route.sourceAddress.town || route.sourceAddress.village || route.destinationAddress.county} `,
                            `${route.sourceAddress.road ? route.sourceAddress.road : route.sourceAddress.village} `,
                            `${route.sourceAddress.house_number ? route.sourceAddress.house_number : route.sourceAddress.amenity || route.sourceAddress.building} `,
                            `| ${route.sourceAddress.postcode} |`]
                        }
                </Popup>
                    : null}
            </Marker>
            <Marker position={[`${route.destination.lat}`, `${route.destination.lon}`]}>
                {route.sourceAddress ? 
                <Popup>
                        {[`${route.destinationAddress.city ? route.destinationAddress.city : route.destinationAddress.town || route.destinationAddress.village || route.destinationAddress.county} `,
                        `${route.destinationAddress.road ? route.destinationAddress.road : route.destinationAddress.village} `,
                        `${route.destinationAddress.house_number ? route.destinationAddress.house_number : route.destinationAddress.amenity || route.destinationAddress.building} `,
                        `| ${route.destinationAddress.postcode} |`]}
                </Popup>
                    : null}
            </Marker>
            <RoutineMachine
                sourceLat={route.source.lat}
                sourceLon={route.source.lon}
                destinationLat={route.destination.lat}
                destinationLon={route.destination.lon}
            />

        </MapContainer >
    )
}

export default Map