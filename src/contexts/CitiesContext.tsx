import { createContext, useState, useEffect, ReactNode } from "react";
import { CityData } from "../components/StoreLocator/CityList";
interface CitiesContextType {
  cities: CityData[];
  isLoading: boolean;
  currentCity: CityData | null;
  getCity: (id: string) => Promise<void>;
  setCurrentCity: (city: CityData | null) => void;
  mapPosition: [number, number];
  setMapPosition: (position: [number, number]) => void;
}

export const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: async () => {},
  setCurrentCity: () => {},
  mapPosition: [0, 0],
  setMapPosition: () => {},
});
const BASE_URL = "https://starbucksapi.pythonanywhere.com";

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityData | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    41.7202047, 44.7203986,
  ]);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        if (data.length > 0) {
          setCurrentCity(data[0]);
        }
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        setCurrentCity,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
