import { createContext, useContext, useEffect, useState } from "react";

export interface position {
  latitude: number;
  longitude: number;
}

interface locationContextProps {
  userLocation: position;
  setUserLocation: (userLocation: position) => void;
}

const LocationContext = createContext<locationContextProps>({
  userLocation: {
    latitude: 0,
    longitude: 0,
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
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
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
