import Loader from "../UI/Loader";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useDispatch } from "../../store";
import { RootState } from "../../store";
import {
  getCities,
  fetchCities,
  fetchAddress,
  getAddress,
} from "./citiesSlice";
import { useEffect, useState } from "react";
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

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StyledSearch = styled.input`
  border: none;
  outline: none;
  font-size: 24px;
  margin: 2rem;
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 1px solid #00000094;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-image: url("/search.svg");
  background-position: center right 5%;
  background-repeat: no-repeat;
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
  const [userCity, setUserCity] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchMade, setIsSearchMade] = useState(false);

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchAddress()).then((action) => {
      if (fetchAddress.fulfilled.match(action)) {
        const city = action.payload.address.split(",")[1].trim();
        setUserCity(city); //
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (userCity && cities.some((city) => city.cityName === userCity)) {
      setSearchTerm(userCity);
      setIsSearchMade(true);
    }
  }, [userCity, cities]);
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearchMade(true);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <SearchContainer>
        <StyledSearch
          type="text"
          placeholder="Find a store"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      {isSearchMade && !filteredCities.length && (
        <Message message="No stores were found" />
      )}
      {isSearchMade && filteredCities.length > 0 && (
        <StyledCityList>
          {filteredCities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </StyledCityList>
      )}
    </>
  );
};

export default CityList;
