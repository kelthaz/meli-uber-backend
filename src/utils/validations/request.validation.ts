import { RideRequest } from '../../services/request.service.js';
import { HttpError } from '../errors/HttpError.js';

export interface ExtendedRideRequest extends RideRequest {
  userName: string;
  userGender: 'male' | 'female' | 'other';
}

export const validateRideRequest = (request: ExtendedRideRequest) => {
  const { userLocation, destination, serviceType, userName, userGender } = request;

  if (
    !userLocation ||
    typeof userLocation.lat !== 'number' ||
    typeof userLocation.lng !== 'number'
  ) {
    throw new HttpError('userLocation must be an object with numeric lat and lng', 400);
  }

  if (
    !destination ||
    typeof destination.lat !== 'number' ||
    typeof destination.lng !== 'number'
  ) {
    throw new HttpError('destination must be an object with numeric lat and lng', 400);
  }

  if (serviceType && typeof serviceType !== 'string') {
    throw new HttpError('serviceType must be a string', 400);
  }

  if (!userName || typeof userName !== 'string') {
    throw new HttpError('userName is required and must be a string', 400);
  }

  if (!userGender || !['male', 'female', 'other'].includes(userGender)) {
    throw new HttpError('userGender is required and must be one of: male, female, other', 400);
  }
};
