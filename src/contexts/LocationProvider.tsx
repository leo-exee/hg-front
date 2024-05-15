import { createContext, useContext, useEffect, useState } from "react";
import { LYON } from "../services/api.address";

export interface position {
  lat: number;
  long: number;
}

interface locationContextProps {
  userLocation: position;
  setUserLocation: (userLocation: position) => void;
}

const LocationContext = createContext<locationContextProps>({
  userLocation: {
    lat: LYON.latitude,
    long: LYON.longitude,
  },
  setUserLocation: () => {},
});

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [userLocation, setUserLocation] = useState<position>({
    lat: LYON.latitude,
    long: LYON.longitude,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocationContext = () => useContext(LocationContext);
