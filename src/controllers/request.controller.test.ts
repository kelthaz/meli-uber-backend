import { requestVehicle } from './request.controller.js';
import * as requestService from '../services/request.service.js';
import * as validation from '../utils/validations/request.validation.js';
import { HttpError } from '../utils/errors/HttpError.js';


describe('requestVehicle controller', () => {
  const mockReq: any = {
    body: {
      userLocation: { lat: 1, lng: 2 },
      destination: { lat: 3, lng: 4 },
      serviceType: 'standard',
      userName: 'Jane',
      userGender: 'female',
    },
    requestId: 'test-request-id',
  };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 200 and vehicle data on success', () => {
    jest.spyOn(validation, 'validateRideRequest').mockImplementation(() => {});

    const findClosestVehicleSpy = jest.spyOn(requestService, 'findClosestVehicle').mockReturnValue({
        requestId: 'test-request-id',
        vehicleId: 'abc123',
        estimatedDistance: '10.00',
        vehicleType: 'standard',
        userName: 'Jane',
        userGender: 'female',
        driverName: 'John Driver',
        driverGender: 'male',
      });
      

    requestVehicle(mockReq, mockRes, mockNext);

    expect(validation.validateRideRequest).toHaveBeenCalledWith(mockReq.body);
    expect(findClosestVehicleSpy).toHaveBeenCalledWith(mockReq.body, mockReq.requestId);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Vehicle found successfully.',
        data: {
          requestId: 'test-request-id',
          vehicleId: 'abc123',
          estimatedDistance: '10.00',
          vehicleType: 'standard',
          userName: 'Jane',
          userGender: 'female',
          driverName: 'John Driver',
          driverGender: 'male',
        },
      });
      
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with an error if validation fails', () => {
    const mockReq: any = {
      body: {
        destination: { lat: 10, lng: 10 },
        serviceType: 'standard',
        userName: 'Jane',
        userGender: 'female',
      },
      requestId: 'test-request-id',
    };

    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    jest.spyOn(validation, 'validateRideRequest').mockImplementation(() => {
      throw new HttpError('userLocation is missing', 400);
    });

    requestVehicle(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
    expect(mockNext.mock.calls[0][0].message).toBe('userLocation is missing');
  });
});
