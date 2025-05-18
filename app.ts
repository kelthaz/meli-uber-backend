import express from 'express';
import requestRoutes from './routes/request.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import { addRequestId } from 'utils/middlewares/requestId.middleware.js';

const app = express();

app.use(express.json());
app.use(addRequestId);
app.use('/api/request/vehicle', requestRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
