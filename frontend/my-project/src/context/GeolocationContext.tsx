import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import { useGeolocated } from 'react-geolocated';

// Define the shape of the context data
interface GeolocationContextType {
    coords: { latitude: number; longitude: number };
    isGeolocationAvailable: boolean;
    isGeolocationEnabled: boolean;
    city: string;
}

// Define the component props type
interface GeolocationComponentProps {
    children: ReactNode;
}

// Default coordinates (for example, New York City)
const defaultCoords = { latitude: 40.7128, longitude: -74.0060 };

// Create context with an initial value (undefined, will be handled with default values)
const GeolocationContext = createContext<GeolocationContextType>({
    coords: defaultCoords,
    isGeolocationAvailable: false,
    isGeolocationEnabled: false,
    city: "Milchstraße",
});

// Custom hook to use geolocation context
export const useGeolocationContext = () => {
    const context = useContext(GeolocationContext);
    if (!context) {
        throw new Error('useGeolocationContext must be used within a GeolocationProvider');
    }
    return context;
};

const reverseGeocode = async (latitude: number | undefined, longitude: number | undefined): Promise<string> => {
    const API_KEY = "45a2ccb5b62a48a6acb86b1f5dd8f3e0";

    try{
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${API_KEY}`);
        const data = await response.json();

        return data.results[0].components.town;
    }catch (error){
        console.log("Could not reverse geocode coordinates: " + error);
    }
    return "Milchstraße";
};

// GeolocationProvider Component
export const GeolocationProvider: React.FC<GeolocationComponentProps> = ({ children }) => {
    const [ city, setCity ] = useState<string>("Milchstraße");
    const previousCoords = useRef<{ latitude: number | undefined, longitude: number | undefined }>({
        latitude: undefined,
        longitude: undefined
    });

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
            maximumAge: 900000, // milliseconds: Will request new position every 15 minutes
            timeout: 30000, // milliseconds: Will wait for maximum of 30 seconds when requesting position
        },
        userDecisionTimeout: 60000, // user has one minute to accept or deny gps request
        watchPosition: false,
    });

    useEffect(() => {
        if(coords && previousCoords.current.latitude !== coords.latitude && previousCoords.current.longitude !== coords.longitude){
            const fetchCity = async () => {
                const city = await reverseGeocode(coords.latitude, coords.longitude);
                setCity(city);
            };
            fetchCity();
        }
        previousCoords.current.latitude = coords?.latitude;
        previousCoords.current.longitude = coords?.longitude;

    }, [coords]);

    // If geolocation data is unavailable, use default coordinates
    const finalCoords = coords ? coords : defaultCoords;

    // Provide geolocation context to the rest of the app
    return (
        <GeolocationContext.Provider
            value={{ coords: finalCoords, isGeolocationAvailable, isGeolocationEnabled, city: city, }}>
             {children}
        </GeolocationContext.Provider>
    );
};
