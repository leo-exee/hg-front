import axios from "axios";
import { position } from "../contexts/LocationProvider";

const ADDRESS_BASE_URL = "https://api-adresse.data.gouv.fr";

const addressInstance = axios.create({
  baseURL: ADDRESS_BASE_URL,
  timeout: 50000,
});

interface addresses_list {
  features: address[];
}

interface address {
  properties: {
    id: string;
    label: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface addressDTO {
  id: string;
  label: string;
  location: position;
}

export const getAddresses = async (query: string) => {
  const response = await fetch(
    `${ADDRESS_BASE_URL}/search/?q=${query}&limit=5`
  );
  const data = await response.json();
  const addresses: addressDTO[] = data.features.map((address: address) => {
    return {
      id: address.properties.id,
      label: address.properties.label,
      location: {
        lat: address.geometry.coordinates[1],
        long: address.geometry.coordinates[0],
      },
    };
  });
  return addresses;
};
