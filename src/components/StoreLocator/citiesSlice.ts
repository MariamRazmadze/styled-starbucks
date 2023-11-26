import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CityData } from "./CityList";
import { getAddress as getAddressFromAPI } from "../../services/apiGeocoding";

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "cities/fetchAddress",
  async function () {
    const positionObj = (await getPosition()) as GeolocationPosition;
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = (await getAddressFromAPI(position)) as {
      locality: string;
      city: string;
      postcode: string;
      countryName: string;
    };
    const address = `${addressObj.locality}, ${addressObj.city} ${addressObj.postcode}, ${addressObj.countryName}`;

    return { position, address };
  }
);

interface CitiesState {
  cities: CityData[];
  isLoading: boolean;
  currentCity: CityData | null;
  mapPosition: [number, number];
  address: string;
  error: string;
}

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  mapPosition: [0, 0],
  address: "",
  error: "",
};

const BASE_URL = "https://starbucksapi.pythonanywhere.com";

export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await fetch(`${BASE_URL}/cities`);
  return await response.json();
});

export const fetchCity = createAsyncThunk(
  "cities/fetchCity",
  async (id: string) => {
    const response = await fetch(`${BASE_URL}/cities/${id}`);
    return await response.json();
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
    setMapPosition(state, action) {
      state.mapPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
        if (action.payload.length > 0) {
          state.currentCity = action.payload[0];
        }
      })
      .addCase(fetchCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCity = action.payload;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.mapPosition = [
          action.payload.position.latitude,
          action.payload.position.longitude,
        ];
        state.address = action.payload.address;
        state.isLoading = false;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.error = "There was a problem getting your address.";
      });
  },
});

export const { setCurrentCity, setMapPosition } = citiesSlice.actions;

export const getCities = (state: RootState) => state.cities.cities;
export const getCurrentCity = (state: RootState) => state.cities.currentCity;
export const getMapPosition = (state: RootState) => state.cities.mapPosition;
export const getAddress = (state: RootState) => state.cities.address;

export default citiesSlice.reducer;
