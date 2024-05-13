import { createContext, useContext, useEffect, useState } from "react";

export interface MarkerDTO {
  id: string;
  latitude: number;
  longitude: number;
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
    setMarkers([
      {
        id: "1",
        latitude: 45.78,
        longitude: 5.78,
      },
      {
        id: "2",
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: "3",
        latitude: 37.7749,
        longitude: 5.69,
      },
      {
        id: "4",
        latitude: 45.755,
        longitude: 4.817,
      },
    ]);
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
