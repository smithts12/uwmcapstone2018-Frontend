## **How to use me:**

### <u>Suggested Node & NPM version</u>
Node ^v10.9.0  
NPM ^v6.2.0

---

### <u>your package.json file</u>

The following npm scripts are available:

```
"start": "node ./src/server/app.js",
"start:dev": "nodemon --ignore 'www/' --exec npm run build:dev",
"build": "webpack --config ./config/webpack.config.js",
"build:dev": "webpack --config ./config/webpack.config.js && node ./src/server/app.js",
"test": "jest --forceExit"
```  
---

#### <u>building and running the application</u>
run `npm run build` first or simply start with `npm run start:dev`

After the initial build a www folder is created. 
Now a `npm start` will work too.

running tests (jest) `npm test` or `npm test -- --watch`

#### View the application
follow me: [app on local host](http://localhost:4000)

---
## <u>issues</u>
#### Problems installing locally?
Should you see any issues running `npm i` feel free to remove the .npmrc file.
This file is used in companies to point to a secure registry so that the company can provide npm modules
without making these publicly available. 

This project is not using any proprietary modules and I assume that the capstone project will not either.
We will continue to work on this and hopefully you will not see issues with this in the near future.


### Problems installing with Docker?
Please let us know **asap**. 
#### current issues:
```
We are currently still working on a docker image that allows the node-sass building.
As soon as we have updated the image this message will be removed
```
