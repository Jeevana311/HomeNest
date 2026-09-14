# HomeNest backend

Spring Boot API for the real estate frontend.

## Run

Requirements: Java 21+ and Maven 3.9+.

```powershell
mvn spring-boot:run
```

The API runs at `http://localhost:8080`. H2 data is stored in `./data/homenest` and the H2 console is available at `http://localhost:8080/h2-console` with JDBC URL `jdbc:h2:file:./data/homenest`.

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/properties?mode=buy&category=residential&location=Guntur`
- `GET /api/properties/{id}`
- `POST /api/properties` (authenticated)
- `PUT /api/properties/{id}` (owner only)
- `DELETE /api/properties/{id}` (owner only)
- `GET /api/me/favorites`, `POST /api/me/favorites/{propertyId}`, `DELETE /api/me/favorites/{propertyId}`
- `POST /api/properties/{id}/enquiries`
- `POST /api/properties/{id}/visits`
- `GET /api/me/enquiries`, `GET /api/me/visits`, `GET /api/me/listings`

Authenticated requests use `Authorization: Bearer <token>` from the login response.
