import React from "react";
import { LocationProvider } from "./contexts/LocationProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <LocationProvider>{children}</LocationProvider>;
};
