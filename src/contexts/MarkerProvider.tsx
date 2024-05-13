import { createContext, useContext, useEffect, useState } from "react";
import { getToilets } from "../services/api.toilets";
import { position } from "./LocationProvider";

export interface MarkerDTO {
  id: string;
  location: position;
}

interface MarkerContextProps {
  markers: MarkerDTO[];
  setMarkers: (markers: MarkerDTO[]) => void;
}

const MarkerContext = createContext<MarkerContextProps>({
  markers: [],
  setMarkers: () => {},
});

interface MarkerProviderProps {
  children: React.ReactNode;
}

export const MarkerProvider: React.FC<MarkerProviderProps> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerDTO[]>([]);

  useEffect(() => {
    getToilets().then((toilets) => {
      setMarkers(toilets);
    });
  }, []);

  return (
    <MarkerContext.Provider
      value={{
        markers,
        setMarkers,
      }}
    >
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkerContext = () => useContext(MarkerContext);
