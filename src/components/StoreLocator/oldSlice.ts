import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CityData } from "./CityList";

interface CitiesState {
  cities: CityData[];
  isLoading: boolean;
  currentCity: CityData | null;
  mapPosition: [number, number];
}

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  mapPosition: [0, 0],
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
      });
  },
});

export const { setCurrentCity, setMapPosition } = citiesSlice.actions;

export const getCities = (state: RootState) => state.cities.cities;
export const getCurrentCity = (state: RootState) => state.cities.currentCity;
export const getMapPosition = (state: RootState) => state.cities.mapPosition;

export default citiesSlice.reducer;
