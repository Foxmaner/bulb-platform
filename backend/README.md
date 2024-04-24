# BACKEND


## Lint
For Lint, we have a focus on making code have a typing and we can check this by running

### Run Command, 

```
npm run lint
```

## Test

Test is to make sure that everything works correctly, all the tests are stored under <rootdir>/src/test/* tests and has the file format *.spec.ts

It will the compile to dist folder to be able to run js files.

### Run Command, 

```
npm test                                    // To run all
npm test -- -i <file>                       // To run file (OBS, file conv; example.spec.ts)
npm test -- -i <file> -t 'this is my test'  // To run specific test
```

## Environment file
You may write an environment file (.env, in this directory) to specify the following functionality in the program:
DB_URI=[mongodb+srv://<username>:<password>@cluster0.3q5ijpk.mongodb.net/] where <username> is your username and <password> is your password for MongoDB.
NODE_ENV=[(development)/testing/production], designates the environment being run. 
VERIFICATION=[(true)/false], sets if login/verification is required. Some functionality may not work with this disabled.
PORT=[(3001)/1-65535], specifies the port the backend is hosted on.
FILE_SIZE=[(10485760)], the maximum allowed file size upload, in bytes. Default is 10 MiB.

Default values are given in parenthesis, if appliccable.