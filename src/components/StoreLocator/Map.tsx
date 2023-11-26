import { useSelector, useDispatch as useReduxDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect } from "react";
import { RootState } from "../../store";
import { divIcon } from "leaflet";
import { getCities, getMapPosition, fetchAddress } from "./citiesSlice";
import styles from "./Map.module.css";
import { useMap } from "react-leaflet/hooks";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";

const coffeeIcon = divIcon({
  className: "custom-icon",
  iconSize: [30, 50],
  html: `<div style="background-color: #00704A; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;"><img src="/sizes/grande-active.svg" width="25px"/></div>`,
});

export default function Map() {
  const dispatch = useReduxDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => getCities(state));
  const mapPosition = useSelector((state: RootState) => getMapPosition(state));
  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
            icon={coffeeIcon}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* <Marker position={mapPosition}>
          <Popup>
            <span>Your current position</span>
          </Popup>
        </Marker> */}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}
interface ChangeCenterProps {
  position: [number, number];
}
function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}
