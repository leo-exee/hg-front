import { createContext, useContext, useEffect, useState } from "react";
import { getToilets } from "../services/api.toilets";
import { ToiletDTO } from "../types/toilets.type";

interface MarkerContextProps {
  markers: ToiletDTO[];
  setMarkers: (markers: ToiletDTO[]) => void;
}

const MarkerContext = createContext<MarkerContextProps>({
  markers: [],
  setMarkers: () => {},
});

interface MarkerProviderProps {
  children: React.ReactNode;
}

export const MarkerProvider: React.FC<MarkerProviderProps> = ({ children }) => {
  const [markers, setMarkers] = useState<ToiletDTO[]>([]);

  useEffect(() => {
    getToilets().then((toilets) => {
      setMarkers(toilets);
    });
  }, [children]);

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
