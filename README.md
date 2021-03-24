### Project In Progress...

# eShop API

> This is a typical eCommerce API which contains many functionalities such as Products, Orders, Category, Users, OrderItems and many more.

- Real World Backend RESTful API For E-Commerce Platform Ready for Mobile or Web E-Shop Application.
- Express & Mongoose Middleware.
- Login & Register Users - JWT/Cookie Authentication.
- API Security (XSS protection, Rate Limiting).
- Use MongoDB in Cloud.
- Advanced Mongoose Queries and Relationships Between Database Collections.
- File Upload & Multiple File Upload.
- Store and retrieve complex data in MongoDB.

# Usage

### Libraries

1. [Express](https://www.npmjs.com/package/express).
2. [Mongoose](https://www.npmjs.com/package/mongoose).
3. [Dotenv](https://www.npmjs.com/package/dotenv).
4. [Http-errors](https://www.npmjs.com/package/http-errors).
5. [Morgan](https://www.npmjs.com/package/morgan).
6. [Nodemon](https://www.npmjs.com/package/nodemon).
7. [Cors](https://www.npmjs.com/package/cors).
8. [Joi](https://www.npmjs.com/package/joi)

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

You can also install and setup Babel if you would like.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri

```

### Install Dependencies (frontend & backend)

```
npm install

```

### Run & Build

```
# Run backend (:5000)
npm run dev

# Build only
npm run build

```

## License

MIT License

Copyright (c) 2021 Puneeth P Gowda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
