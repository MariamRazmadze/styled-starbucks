import { CityData } from "./CityList";
import { PiHeartLight } from "react-icons/pi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { setCurrentCity, setMapPosition } from "./citiesSlice";
import {
  CityIcon,
  CityItemContainer,
  CityName,
  CityParagraph,
  DeleteButton,
  CitySpan,
  CityButton,
  CityIcons,
  StoreClosed,
} from "./StyledCity";

const isStoreOpen = (open: string, close: string) => {
  const currentTime = new Date();
  const [openHour, openMinute] = open.split(":").map(Number);
  const [closeHour, closeMinute] = close.split(":").map(Number);

  const openTime = new Date();
  openTime.setHours(openHour, openMinute);

  const closeTime = new Date();
  closeTime.setHours(closeHour, closeMinute);

  return currentTime >= openTime && currentTime <= closeTime;
};

export default function CityItem({ city }: { city: CityData }) {
  const { cityName, address, id, storeHours } = city;
  const dispatch = useDispatch();
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  const storeStatus = isStoreOpen(storeHours.open, storeHours.close);

  const handleClick = () => {
    dispatch(setCurrentCity(city));
    dispatch(setMapPosition([city.position.lat, city.position.lng]));
  };
  return (
    <li onClick={handleClick}>
      <Link to={`?lat=${city.position.lat}&lng=${city.position.lng}`}>
        <CityItemContainer
          $isActive={Boolean(currentCity && id === currentCity.id)}
        >
          <div>
            <CityName>{cityName}</CityName>
            <CityParagraph>{address}</CityParagraph>
            {!storeStatus && (
              <>
                <CityParagraph>Closed</CityParagraph>
                <StoreClosed>
                  <DeleteButton>&times;</DeleteButton>
                  <CitySpan>Store closed</CitySpan>
                </StoreClosed>
              </>
            )}
          </div>
          <div>
            <CityIcons>
              <CityIcon>
                <PiHeartLight />
              </CityIcon>
              <CityIcon>
                <AiOutlineExclamationCircle />
              </CityIcon>
            </CityIcons>
            {currentCity && id === currentCity.id && (
              <CityButton>Order here</CityButton>
            )}
          </div>
        </CityItemContainer>
      </Link>
    </li>
  );
}
