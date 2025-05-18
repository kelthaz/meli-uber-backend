import { vehicles } from '../mocks/vehicles.mock.js';
import { HttpError } from '../utils/errors/HttpError.js';

export interface Location {
  lat: number;
  lng: number;
}
export interface RideRequest {
  userLocation: Location;
  destination: Location;
  serviceType?: string;
  userName: string;
  userGender: 'male' | 'female' | 'other';
}


const calculateDistance = (a: Location, b: Location): number =>
  Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));

  export const findClosestVehicle = (request: RideRequest, requestId?: string) => {
    const { userLocation, serviceType, userName, userGender } = request;
  
    const filteredVehicles = vehicles.filter(
      v => !serviceType || v.type === serviceType
    );
  
    if (filteredVehicles.length === 0) {
      throw new HttpError(`No vehicles available for service type: ${serviceType}`, 400);
    }
  
    const closestVehicle = filteredVehicles.reduce((prev, curr) => {
      const prevDist = calculateDistance(prev.location, userLocation);
      const currDist = calculateDistance(curr.location, userLocation);
      return currDist < prevDist ? curr : prev;
    });
  
    return {
      requestId: requestId,  
      vehicleId: closestVehicle.id,
      vehicleType: closestVehicle.type,
      estimatedDistance: calculateDistance(closestVehicle.location, userLocation).toFixed(2),
      userName,
      userGender,
      driverName: closestVehicle.driverName || 'Unknown Driver',
      driverGender: closestVehicle.driverGender || 'unknown',
    };
  };
  
