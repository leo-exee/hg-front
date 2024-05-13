import React from "react";
import { LocationProvider } from "./contexts/LocationProvider";
import { MarkerProvider } from "./contexts/MarkerProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <LocationProvider>
      <MarkerProvider>{children}</MarkerProvider>
    </LocationProvider>
  );
};
