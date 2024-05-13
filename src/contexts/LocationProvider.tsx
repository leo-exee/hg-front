import { createContext, useContext, useEffect, useState } from "react";

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
    lat: 0,
    long: 0,
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
    lat: 0,
    long: 0,
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
