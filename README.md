# Amazon Clone

In this project a full stack clone of amazon website will be created just for development purposes.

## Tech Stack used

- JavaScript
- React
- Express
- SQL
- TailwindCSS
- Redux
- Axios
- Stripe
- Node
- HTML

## Dependecies

You can check how to install the dependencies on the [Environment and Project Set Up](#environment-and-project-set-up) section

- npm should be installed

### Server

- node.js should be installed
- express.js should be installed
- nodemon should be installed
- stripe should be installed
- dotenv should be installed
- bcrypt should be installed
- body-parser should be installed
- jsonwebtoken should be installed
- sqlite3 should be installed
- cors should be installed

### Client

- react should be installed
- react-router-dom should be installed
- tailwindcss should be installed
- swiper should be installed
- heroicons should be installed
- axios should be installed
- redux should be installed

## Environment and Project Set Up

##### `npm i`

Install npm

After installing npm on a global scope, you should create two folders, one for the server and one for the client

### Server

##### `npm init -y`

To create a project with the initial package.json

##### `npm i express`

Install express

##### `npm i nodemon -D`

Install nodemon as a devDependency

##### `npm i stripe`

Install Stripe (to process payments)

##### `npm i dotenv`

Install dotenv (to load environment variables)

##### `npm i bcrypt`

Install bcrypt (to hash passwords)

##### `npm i body-parser`

Install body-parser (to parse the body of the requests)

##### `npm i jsonwebtoken`

Install jsonwebtoken (to get a token with the logged user)

##### `npm i sqlite3`

Install sqlite3 (to interact with the SQLite DB)

##### `npm i cors`

Install cors (to allow traffic between client and server)

### Client

##### `npx create-react-app ./`

Creates the react app

- Note that the name of the project cannot contain Capital letters
- The ./ will create the react app on the current folder from the console that is triggered

##### `npm i react-router-dom`

Install react router dom, which will be used to navigate between pages

#### TailwindCSS

To install tailwind just follow the steps on the [documentation](https://tailwindcss.com/docs/guides/create-react-app)

##### `npm i swiper`

Install the swiper, which will be used to swipe through the carousels

##### `npm i @heroicons/react`

Install heroicons, which will be used to get some icons

##### `npm i axios`

Install axios, to make API calls

##### `npm i react-redux`

##### `npm i @reduxjs/toolkit`

Install redux, to pass states through components (like the amount of items in card and so on)

## Available Scripts

You can see all this scripts in the package.json

### Server

In the server directory, you can run:

##### `npm run dev`

Runs the app in the development mode with nodemon.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

##### `npm run start`

Runs the app with node.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### Client

In the client directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Documentation used

- [React documentation](https://reactjs.org/)
- [API requests documentation](https://javascript.info/fetch)
- [TailwindCSS documentation](https://tailwindcss.com/docs/guides/create-react-app)
- [Swiper documentation](https://www.npmjs.com/package/swiper)
- [Redux documentation](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [Stripe documentation](https://stripe.com/docs/checkout/quickstart)
- [SQLite documentation](https://www.sqlite.org/docs.html)

## Assets used

- [Amazon assets](https://drive.google.com/file/d/1AJ73Ya_rmSFsBmILPlrZtjUibeN4uKM2/view)
- [Icons](https://heroicons.com/)
- [Store API](https://fakestoreapi.com)
