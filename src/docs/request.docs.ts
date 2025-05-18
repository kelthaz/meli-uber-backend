const requestDocs = {
  '/api/request/vehicle': {
    post: {
      summary: 'Request a vehicle',
      description: 'Simulates requesting a vehicle with location, destination and user details.',
      tags: ['Request'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['userLocation', 'destination', 'userName', 'userGender'],
              properties: {
                userLocation: {
                  type: 'object',
                  properties: {
                    lat: { type: 'number', example: -34.6037 },
                    lng: { type: 'number', example: -58.3816 },
                  },
                  description: 'User current location',
                },
                destination: {
                  type: 'object',
                  properties: {
                    lat: { type: 'number', example: -34.6090 },
                    lng: { type: 'number', example: -58.3840 },
                  },
                  description: 'Desired destination',
                },
                serviceType: {
                  type: 'string',
                  description: 'Service type (optional)',
                  example: 'premium',
                },
                userName: {
                  type: 'string',
                  description: 'Name of the user requesting the ride',
                  example: 'John Doe',
                },
                userGender: {
                  type: 'string',
                  enum: ['male', 'female', 'other'],
                  description: 'Gender of the user',
                  example: 'male',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  vehicleId: { type: 'string', example: 'abc123' },
                  estimatedArrival: { type: 'string', format: 'date-time', example: '2025-05-17T14:56:00Z' },
                  userName: { type: 'string', example: 'John Doe' },
                  userGender: { type: 'string', example: 'male' },
                  driverName: { type: 'string', example: 'Carlos Pérez' },
                  driverGender: { type: 'string', example: 'male' },
                },
              },
            },
          },
        },
        '400': {
          description: 'Invalid request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Missing required fields' },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default requestDocs;
