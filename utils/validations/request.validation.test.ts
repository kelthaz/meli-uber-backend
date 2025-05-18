import { validateRideRequest, ExtendedRideRequest } from './request.validation.js';
import { HttpError } from '../errors/HttpError.js';

describe('validateRideRequest', () => {
  const validRequest: ExtendedRideRequest = {
    userLocation: { lat: 1, lng: 2 },
    destination: { lat: 3, lng: 4 },
    serviceType: 'standard',
    userName: 'John Doe',
    userGender: 'male',
  };

  it('does not throw error for valid request', () => {
    expect(() => validateRideRequest(validRequest)).not.toThrow();
  });

  it('throws error if userLocation is missing or invalid', () => {
    const invalids = [
      {},
      { lat: 'a', lng: 2 },
      { lat: 1, lng: 'b' },
      null,
      undefined,
    ];

    for (const userLocation of invalids) {
      expect(() =>
        validateRideRequest({ ...validRequest, userLocation } as any)
      ).toThrowError('userLocation must be an object with numeric lat and lng');
    }
  });

  it('throws error if destination is missing or invalid', () => {
    const invalids = [
      {},
      { lat: 'a', lng: 2 },
      { lat: 1, lng: 'b' },
      null,
      undefined,
    ];

    for (const destination of invalids) {
      expect(() =>
        validateRideRequest({ ...validRequest, destination } as any)
      ).toThrowError('destination must be an object with numeric lat and lng');
    }
  });

  it('throws error if serviceType is not a string when provided', () => {
    expect(() =>
      validateRideRequest({ ...validRequest, serviceType: 123 as any })
    ).toThrowError('serviceType must be a string');
  });

  it('throws error if userName is missing or not a string', () => {
    expect(() =>
      validateRideRequest({ ...validRequest, userName: '' })
    ).toThrowError('userName is required and must be a string');

    expect(() =>
      validateRideRequest({ ...validRequest, userName: 123 as any })
    ).toThrowError('userName is required and must be a string');

    expect(() =>
      validateRideRequest({ ...validRequest, userName: undefined as any })
    ).toThrowError('userName is required and must be a string');
  });

  it('throws error if userGender is missing or invalid', () => {
    expect(() =>
      validateRideRequest({ ...validRequest, userGender: '' as any })
    ).toThrowError('userGender is required and must be one of: male, female, other');

    expect(() =>
      validateRideRequest({ ...validRequest, userGender: 'unknown' as any })
    ).toThrowError('userGender is required and must be one of: male, female, other');

    expect(() =>
      validateRideRequest({ ...validRequest, userGender: undefined as any })
    ).toThrowError('userGender is required and must be one of: male, female, other');
  });
});
