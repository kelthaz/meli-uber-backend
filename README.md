# Meli-Uber

**Meli-Uber** es una aplicación de backend desarrollada con **Node.js**, orientada a simular una plataforma de solicitud de viajes similar a Uber, optimizada para manejar concurrencia, pagos y procesamiento de solicitudes de forma eficiente.

##  Tecnologías y Herramientas

* **Node.js (22.1) + TypeScript (5.8)**
* **Express.js (5.0)** como framework HTTP
* **Jest (29.7)** para pruebas unitarias
* **ESLint (9.27)** para linting y formateo de código
* **Swagger (6.2) (OpenAPI)** para documentación de APIs
* **Arquitectura basada en capas** 

---

##  Estructura del Proyecto

```bash
src/
├── controllers/        # Lógica de controladores HTTP
├── routes/             # Definición de rutas Express
├── services/           # Lógica de negocio (casos de uso)
├── utils/              # Utilidades generales y validaciones
├── mocks/              # Datos simulados para pruebas / entorno local
├── middlewares/        # Middlewares personalizados
├── docs/               # Configuración de Swagger
├── errors/             # Manejo personalizado de errores
├── config/             # Configuración de ESLint, Prettier, TS
└── index.ts            # Punto de entrada principal
```

---

## Arquitectura

El proyecto sigue una **arquitectura modular en capas**, alineada a los principios de Clean Architecture:

* **Controladores (Controllers):** orquestan la lógica HTTP, reciben el `req`, delegan a servicios y devuelven la respuesta.
* **Servicios:** contienen la lógica de negocio (como selección de vehículos o validaciones de solicitud).
* **Utils y Validaciones:** validan entradas y abstraen lógica reutilizable.
* **Errores personalizados:** mediante `HttpError`, se define un esquema consistente de manejo de errores con status y mensajes claros.

> Esta estructura facilita el testeo, escalabilidad y mantenibilidad.

---

##  Flujo de Solicitud de Viaje

1. Usuario envía una solicitud (POST `/api/request/vehicle`): incluye userLocation, destination, serviceType, userName y userGender.
2. Middleware valida la estructura de la solicitud (`validateRideRequest`).
3. Servicio `findClosestVehicle` busca el vehículo más cercano y compatible.
4. Controlador responde con `200 OK` y los datos del viaje.

---

##  Documentación de API - Swagger

La documentación se genera automáticamente a partir del archivo en `src/docs/swagger.ts`.

### Visualización:

Levanta el servidor y accede a:

```
http://localhost:3000/api-docs
```

Swagger está configurado para exponer todos los endpoints, sus parámetros y posibles respuestas.

---

##  Testing

Las pruebas están escritas con **Jest**, siguiendo una estrategia de:

* Unit testing puro para **servicios** y **validaciones**.
* Mocks de datos en `src/mocks/vehicles.mock.ts`.

### Ejecutar Pruebas:

```bash
npm run test
```

### Cobertura:

```bash
npm run test:coverage
```

> Se cubren flujos principales y ramas como valores por defecto (`Unknown Driver`, `unknown gender`).

---

## Linting y Formateo

El proyecto está configurado con:

* **ESLint** (reglas base TypeScript)
* **Prettier** para estilo de código

### Ejecutar Linter:

```bash
npm run lint
```

### Ejecutar Prettier:

```bash
npm run format
```

---

## Validaciones de Solicitud

Ubicadas en `utils/validateRideRequest.ts`. Se asegura:

* `userLocation` y `destination` con `lat/lng` numéricos.
* `serviceType` como string (si existe).
* `userName` requerido.
* `userGender` debe ser `'male' | 'female' | 'other'`.

---

##  Servicio: `findClosestVehicle`

Define la lógica de cómo se selecciona el vehículo:

* Filtra por tipo de servicio (si se indica)
* Calcula distancia
* Retorna el más cercano
* Completa datos con nombre y género del conductor o valores por defecto

---

##  Buenas Prácticas Aplicadas

* Manejo de errores centralizado (`HttpError`)
* Separación de preocupaciones entre controladores y servicios
* Validaciones declarativas previas a la ejecución de servicios
* Tipado fuerte con TypeScript en todo el dominio
* Tests unitarios que cubren escenarios normales y excepcionales
* Swagger para documentación en tiempo real

---

##  Scripts Importantes

```json
  "scripts": {
    "test": "jest --coverage",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "lint": "eslint src"
  },
```

---

##  Ejecutar el Proyecto

```bash
npm install
npm run dev
```

El servidor correrá en `http://localhost:3000`

---


## A continuación, se muestran como probar los servicios:

# Caso successfully 200 OK 

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "John Doe",
  "userGender": "male"
}
```
#### Response Body:
```json
{
  "message": "Vehicle found successfully.",
  "data": {
    "requestId": "1f2db0cf-4a2d-4d89-91b9-6b570f182697",
    "vehicleId": "veh-002",
    "vehicleType": "premium",
    "estimatedDistance": "3486020.40",
    "userName": "John Doe",
    "userGender": "male",
    "driverName": "Ana Gómez",
    "driverGender": "female"
  }
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "John Doe",
  "userGender": "male"
}'
```


# Caso userGender is required. Error 400

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "John Doe",
  "userGender": ""
}
```
#### Response Body:
```json
{
  "error": "userGender is required and must be one of: male, female, other"
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "John Doe",
  "userGender": ""
}'
```

# Caso userName is required. Error 400

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "",
  "userGender": "male"
}
```
#### Response Body:
```json
{
  "error": "userName is required and must be a string"
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": "premium",
  "userName": "",
  "userGender": "male"
}'
```

# Caso serviceType must be a string. Error 400

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}
```
#### Response Body:
```json
{
  "error": "serviceType must be a string"
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}'
```

# Caso destination must be an object with numeric lat and lng. Error 400

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": "e"
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}
```
#### Response Body:
```json
{
  "error": "destination must be an object with numeric lat and lng"
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": "e"
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}'
```

# Caso userLocation must be an object with numeric lat and lng. Error 400

Operación: POST /api/request/vehicle

#### Endpoint:

http://localhost:3000/api/request/vehicle


#### Method Endpoint:
POST

#### Request body:
```json
{
  "userLocation": {
    "lat": "a",
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}
```
#### Response Body:
```json
{
  "error": "userLocation must be an object with numeric lat and lng"
}
```

#### Curl:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/request/vehicle' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "userLocation": {
    "lat": "a",
    "lng": -58.3816
  },
  "destination": {
    "lat": -34.609,
    "lng": -58.384
  },
  "serviceType": 2,
  "userName": "John Doe",
  "userGender": "male"
}'
```

##  Futuras Mejoras

* Integración con bases de datos
* Simulación de geolocalización en tiempo real
* Manejo de concurrencia y colas para solicitudes en simultáneo
* Módulo de pagos con validaciones antifraude
* Logger estructurado y trazabilidad de errores
