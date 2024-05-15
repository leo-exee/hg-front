import { position } from "../contexts/LocationProvider";
import { HERE_API_KEY } from "../constants/api.constant";

const HERE_BASE_URL = "https://autosuggest.search.hereapi.com/v1";

export const LYON = {
  longitude: 4.806397,
  latitude: 45.7613404,
};

interface hereAddress {
  address: {
    id: string;
    label: string;
  };
  position: {
    lat: number;
    lng: number;
  };
}

export interface addressDTO {
  id: string;
  label: string;
  location: position;
}

export const getAddressesHERE = async (
  query: string,
  lat: number = LYON.latitude,
  long: number = LYON.longitude
) => {
  try {
    const response = await fetch(
      `${HERE_BASE_URL}/discover?at=${lat},${long}&q=${query}&apiKey=${HERE_API_KEY}&limit=5`
    );
    const data = await response.json();
    const addresses: addressDTO[] = data.items.map(
      (hereAddress: hereAddress) => {
        return {
          id: hereAddress.address.id,
          label: hereAddress.address.label,
          location: {
            lat: hereAddress.position.lat,
            long: hereAddress.position.lng,
          },
        };
      }
    );
    return addresses;
  } catch (error) {
    console.error(error);
    return [];
  }
};
