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
npm test // To run all
npm test -- -i <file> // To run file (OBS, file conv; example.spec.ts)
npm test -- -i <file> -t 'this is my test' 
```
