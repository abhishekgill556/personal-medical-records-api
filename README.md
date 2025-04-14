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
