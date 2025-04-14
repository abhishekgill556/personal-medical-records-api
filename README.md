#  Personal Medical Records API

A secure and scalable RESTful API for managing patients, doctors, appointments, and prescriptions in a healthcare context. Built with **Node.js**, **TypeScript**, **Express**, and **Firebase**.

---

##  Features

-  User Authentication with Firebase
-  Role-Based Access (Doctors & Patients)
-  CRUD operations for all medical resources
-  Data Validation with Joi
-  Firestore NoSQL integration
-  API Documentation with Swagger
-  Unit Testing with Jest + Supertest
-  Dev-friendly tooling with TypeScript & dotenv
-  GitHub Actions + Secure Coding Practices *(planned)*

---

##  Folder Structure

```
src/
 api/
    v1/
        routes/
        controllers/
        services/
        validators/
        types/
 config/
 tests/
 app.ts
 server.ts
```

---

##  Getting Started

### 1 Install Dependencies

```bash
npm install
```

### 2 Configure Firebase Environment

Create a `.env` file in the root with your service account:

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...(rest)...\n-----END PRIVATE KEY-----\n"
```

>  Replace actual newlines with `\n` in the private key string.

---

### 3 Start the Dev Server

```bash
npm run dev
```

Visit:
```
http://localhost:3000/api-docs
```
 to interact with the API via Swagger UI.

---

##  API Endpoints Overview

Base URL:  
```
http://localhost:3000/api/v1
```

### Auth

| Method | Endpoint        | Description                |
|--------|------------------|----------------------------|
| POST   | `/auth/signup`   | Register new user          |
| POST   | `/auth/login`    | Login and get JWT          |

### Patients

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | `/patients`        | Get all patients    |
| GET    | `/patients/:id`    | Get patient by ID   |
| POST   | `/patients`        | Create patient      |
| PUT    | `/patients/:id`    | Update patient      |
| DELETE | `/patients/:id`    | Delete patient      |

### Doctors

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | `/doctors`       | Get all doctors    |
| GET    | `/doctors/:id`   | Get doctor by ID   |
| POST   | `/doctors`       | Create doctor      |
| PUT    | `/doctors/:id`   | Update doctor      |
| DELETE | `/doctors/:id`   | Delete doctor      |

### Appointments

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| GET    | `/appointments`      | Get all appointments  |
| GET    | `/appointments/:id`  | Get appointment by ID |
| POST   | `/appointments`      | Book appointment      |
| PUT    | `/appointments/:id`  | Update appointment    |
| DELETE | `/appointments/:id`  | Cancel appointment    |

### Prescriptions

| Method | Endpoint                      | Description                   |
|--------|-------------------------------|-------------------------------|
| GET    | `/prescriptions/:patientId`   | Get prescriptions by patient |
| POST   | `/prescriptions`              | Add new prescription         |

---

##  API Docs (Swagger)

Access interactive documentation at:

```
http://localhost:3000/api-docs
```

---

##  Running Tests

```bash
npm run test
```

- Test coverage for all CRUD routes using **Jest** and **Supertest**
- Firebase interactions are mocked for unit testing

---

##  Security Features

- Helmet.js for secure headers
- CORS configuration
- Firebase Auth token validation
- Joi schema validation on request bodies
- `.env` for environment-sensitive configs

---

### Rate Limiting

This API uses `express-rate-limit` middleware to prevent abuse:

- **Limit**: 100 requests per 15 minutes per IP
- **Response**: Returns HTTP `429` status with a message if limit is exceeded

Example error response:
```json
{
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

##  Author

**Abhishek Gill**  



## SWagger API usage

# Personal Medical Records API

This is a back-end API built with Node.js, TypeScript, and Firebase. It supports patient management, doctor profiles, appointments, and prescriptions. This README shows how to use the main routes.

---

## Appointments API

### Base URL
`http://localhost:3000/api/v1/appointments`

### GET `/appointments`
Returns a list of all appointments.

#### Response
```json
[
  {
    "id": "a001",
    "patientId": "p001",
    "doctorId": "d001",
    "date": "2025-04-15T10:00:00Z",
    "reason": "Routine Checkup",
    "status": "Booked"
  }
]
```

### GET `/appointments/{id}`
Returns one appointment by ID.

#### Example
`GET /appointments/a001`

#### Response
```json
{
  "id": "a001",
  "patientId": "p001",
  "doctorId": "d001",
  "date": "2025-04-15T10:00:00Z",
  "reason": "Routine Checkup",
  "status": "Booked"
}
```

### POST `/appointments`
Creates a new appointment.

#### Request Body
```json
{
  "patientId": "p001",
  "doctorId": "d001",
  "date": "2025-04-15T10:00:00Z",
  "reason": "Routine Checkup"
}
```

### PUT `/appointments/{id}`
Updates an appointment.

#### Request Body
```json
{
  "patientId": "p001",
  "doctorId": "d001",
  "date": "2025-04-18T11:00:00Z",
  "reason": "Follow-up Checkup",
  "status": "Booked"
}
```

### DELETE `/appointments/{id}`
Deletes an appointment.

---

## Doctors API

### Base URL
`http://localhost:3000/api/v1/doctors`

### GET `/doctors`
Returns all doctors.

### GET `/doctors/{id}`
Returns one doctor.

### POST `/doctors`
```json
{
  "name": "Dr. Kaur",
  "specialization": "Neurology",
  "email": "kaur@example.com"
}
```

### PUT `/doctors/{id}`
```json
{
  "name": "Dr. Kaur Updated",
  "specialization": "Neurology",
  "email": "kaur.updated@example.com"
}
```

### DELETE `/doctors/{id}`
Deletes a doctor.

---

## Patients API

### Base URL
`http://localhost:3000/api/v1/patients`

### GET `/patients`
Returns all patients.

### GET `/patients/{id}`
Returns one patient.

### POST `/patients`
```json
{
  "name": "Jane Smith",
  "age": 30,
  "medicalHistory": ["Asthma"]
}
```

### PUT `/patients/{id}`
```json
{
  "name": "Jane Smith Updated",
  "age": 31,
  "medicalHistory": ["Asthma", "Migraine"]
}
```

### DELETE `/patients/{id}`
Deletes a patient.

---

## Prescriptions API

### Base URL
`http://localhost:3000/api/v1/prescriptions`

### GET `/prescriptions/{patientId}`
Returns prescriptions for one patient.

### POST `/prescriptions`
```json
{
  "doctorId": "d001",
  "patientId": "p001",
  "medicines": ["Paracetamol", "Ibuprofen"],
  "instructions": "Take after meals, twice a day"
}
```
