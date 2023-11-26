import Loader from "../UI/Loader";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useDispatch } from "../../store";
import { RootState } from "../../store";
import { getCities, fetchCities } from "./citiesSlice";
import { useEffect } from "react";
import CityItem from "./CityItem";
import styled from "styled-components";

const StyledCityList = styled.ul`
  width: 100%;
  height: 65vh;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export interface CityData {
  cityName: string;
  address: string;
  country: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
  storeHours: {
    open: string;
    close: string;
  };
}

export interface CityListProps {
  cities: CityData[];
  isLoading: boolean;
}
const CityList = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => getCities(state));
  const isLoading = useSelector((state: RootState) => state.cities.isLoading);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (!cities.length) return <Message message="no stores found nearby" />;
  return (
    <StyledCityList>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </StyledCityList>
  );
};

export default CityList;
