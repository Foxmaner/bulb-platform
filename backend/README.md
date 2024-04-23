# BACKEND

## Build & Run Backend

```
npm start
```

## Use of Dabase

The database starts upp automatically, but when if not in testmode and want to connect to real, the enviroment in the .env have to be set to the correct URI from mongodb.

```
DB_URI=
```

If want use of Test Database, use 
```
DB = TEST
```

## Use of Login

There are two versions of login test/dev, 
How to turn of signIn, its quite difficult since most of the systems it 
although just to remove access to certain routes set in the .env an environment variable AUTH=false

.env
```
AUTH=false
```

#### Test Login
In th test there is a use of "local login" which means we just send a name and password.
If recieve status code 200, your signIn. 

example
OBS: port needs to be set in the backend, default 3001

```
fetch("http://localhost:{port}/login", {
    name: "user",
    password: "123"
})
```

#### Dev Login
In the dev login is use of google login which means you will be redirected too google for sign in.
You will get this by accessing in the browser.

example
OBS: port needs to be set in the backend, default 3001

http://localhost:{port}/google

## Test

Test is to make sure that everything works correctly, all the tests are stored under <rootdir>/src/test/* tests and has the file format *.spec.ts

It will the compile to dist folder to be able to run js files.

### Run Command, 

```
npm test                                    // To run all
npm test -- -i <file>                       // To run file (OBS, file conv; example.spec.ts)
npm test -- -i <file> -t 'this is my test'  // To run specific test
```

## Lint
For Lint, we have a focus on making code have a typing and we can check this by running

### Run Command, 

```
npm run lint
```

