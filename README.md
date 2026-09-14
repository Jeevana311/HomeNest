# 🏠 HomeNest – Real Estate Management System

HomeNest is a full-stack real-estate web application designed to help users explore, search, and manage property listings through a simple and user-friendly interface.

## 📌 Features

* User registration and login
* Secure user authentication
* Browse property listings
* View detailed property information
* Search properties
* Filter properties based on requirements
* Manage property listings
* REST API integration
* Database connectivity
* Responsive and user-friendly interface

## 🛠️ Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Spring Security
* Maven

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* Vite

### Database

* H2 Database for development
* MySQL support

## 📂 Project Structure

```text
realestate/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd realestate
```

---

## 🔧 Running the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

If the application starts successfully, you should see:

```text
Tomcat started on port 8080
Started HomeNestApplication
```

The backend will run at:

```text
http://localhost:8080
```

### Backend Requirements

Make sure the following are installed:

* Java JDK
* Maven
* Git

---

## 💻 Running the Frontend

Open a **new terminal** while keeping the backend running.

Navigate to the frontend folder:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The terminal will display the frontend URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

> Make sure the backend is running on port `8080` before using the frontend.

---

## 🗄️ Database

The current development configuration uses an H2 file-based database.

Database URL:

```text
jdbc:h2:file:./data/homenest
```

### H2 Console

The H2 database console is available at:

```text
http://localhost:8080/h2-console
```

The database configuration may be changed to MySQL for production deployment.

---

## 🔐 Authentication

The application uses Spring Security for authentication and authorization.

Authentication features include:

* User registration
* User login
* Password security
* Protected API endpoints
* Session/token-based authentication as configured by the backend

---

## 🔗 Backend and Frontend

The frontend communicates with the Spring Boot backend through REST APIs.

```text
React Frontend
      │
      │ HTTP Requests
      ▼
Spring Boot Backend
      │
      │ JPA / Hibernate
      ▼
Database
```

Backend:

```text
http://localhost:8080
```

Frontend:

```text
http://localhost:5173
```

---

## 📋 Requirements

Before running the project, install:

* Java JDK
* Maven
* Node.js
* npm
* Git

Check the installed versions:

```bash
java -version
mvn -version
node -v
npm -v
git --version
```

---

## ⚙️ Development Workflow

### Start Backend

```bash
cd backend
mvn spring-boot:run
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the frontend URL displayed by Vite.

---

## 🔮 Future Enhancements

* Property image upload
* Advanced property search
* Property favorites
* Property booking
* Property owner dashboard
* Admin dashboard
* Google Maps integration
* Email notifications
* Online appointment scheduling
* Production MySQL database
* Cloud deployment

---

## 👩‍💻 Author

**Jeevana Sruthi**

AI & Data Science Student
Vishnu Institute of Technology

---

## 📄 License

This project is developed for educational and project purposes.
