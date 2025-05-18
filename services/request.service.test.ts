import { findClosestVehicle, RideRequest } from './request.service.js';
import { vehicles } from '../mocks/vehicles.mock.js';
import * as vehicleMock from '../mocks/vehicles.mock.js';

describe('findClosestVehicle', () => {
  it('should return the closest vehicle regardless of service type', () => {
    const request: RideRequest = {
      userLocation: { lat: 0, lng: 0 },
      destination: { lat: 10, lng: 10 },
      userName: 'John Doe',
      userGender: 'male'
    };

    const result = findClosestVehicle(request);

    expect(result).toHaveProperty('vehicleId');
    expect(result).toHaveProperty('estimatedDistance');
    expect(result).toHaveProperty('vehicleType');
  });

  it('should return closest vehicle with matching serviceType', () => {
    const request: RideRequest = {
      userLocation: { lat: 0, lng: 0 },
      destination: { lat: 5, lng: 5 },
      serviceType: 'premium',
      userName: 'John Doe',
      userGender: 'male'
    };

    const result = findClosestVehicle(request);
    const vehicle = vehicles.find(v => v.id === result.vehicleId);

    expect(vehicle?.type).toBe('premium');
  });

  it('should throw error if no matching serviceType is found', () => {
    const request: RideRequest = {
      userLocation: { lat: 0, lng: 0 },
      destination: { lat: 5, lng: 5 },
      serviceType: 'nonexistent',
      userName: 'John Doe',
      userGender: 'male'
    };
    expect(() => findClosestVehicle(request)).toThrow(
      'No vehicles available for service type: nonexistent'
    );
    
   });
   
   it('should assign default driver name and gender when not provided', () => {
    const originalVehicles = [...vehicleMock.vehicles];
  
    vehicleMock.vehicles.length = 0;
    vehicleMock.vehicles.push({
      id: 'veh-default',
      type: 'standard',
      location: { lat: 0, lng: 0 },
    } as any);
  
    const request: RideRequest = {
      userLocation: { lat: 0, lng: 0 },
      destination: { lat: 1, lng: 1 },
      userName: 'Test User',
      userGender: 'other',
    };
  
    const result = findClosestVehicle(request);
  
    expect(result.driverName).toBe('Unknown Driver');
    expect(result.driverGender).toBe('unknown');
  
    vehicleMock.vehicles.length = 0;
    vehicleMock.vehicles.push(...originalVehicles);
  });
  
});
