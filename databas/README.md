## DATABAS


# Lint
For Lint, we have a focus on making code have a typing and we can check this by running

+ Run Command, 

```
npm run lint
```

# Test

Test is to make sure that everything works correctly, all the tests are stored under <rootdir>/src/test/tests and has the file format *.(spec|test).ts

It will the compile to dist folder to be able to run js files.

+ Run Command, 

```
npm test
```

project-name/
|-- src/
|   |-- db/
|   |   |-- connection.ts
|   |-- models/
|   |   |-- User.ts // For authentication
|   |-- routes/
|   |   |-- api/
|   |   |   |-- someRoute.ts
|   |   |   |-- authRoute.ts // For authentication endpoints
|   |-- controllers/
|   |   |-- someController.ts
|   |   |-- authController.ts // For handling authentication logic
|   |-- middleware/
|   |   |-- authMiddleware.ts // For authentication middleware
|   |-- socket.ts // For Socket.IO configuration
|   |-- app.ts
|-- node_modules/
|-- dist/
|-- package.json
|-- tsconfig.json
|-- .env (optional)