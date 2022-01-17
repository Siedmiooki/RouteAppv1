import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const createRoutineMachineLayer = ({ sourceLat, sourceLon, destinationLat, destinationLon }) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(`${sourceLat.toString()}`, `${sourceLon.toString()}`),
            L.latLng(`${destinationLat.toString()}`, `${destinationLon.toString()}`)
        ],
        lineOptions: {
            styles: [{ color: "#1ec6e4", weight: 4 }]
        },
        createMarker: function () { return null; },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
