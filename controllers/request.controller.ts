import { Request, Response, NextFunction } from 'express';
import { findClosestVehicle, RideRequest } from '../services/request.service.js';
import { validateRideRequest } from '../utils/validations/request.validation.js';

export const requestVehicle = (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const requestId = req.requestId;
    const { userLocation, destination, serviceType, userName, userGender, } = req.body;
    const requestData: RideRequest = { userLocation, destination, serviceType, userName, userGender};

    validateRideRequest(requestData);
    const result = findClosestVehicle(requestData,requestId);

    res.status(200).json({ message: 'Vehicle found successfully.', data: result});
  } catch (error) {
    next(error);
  }
};
