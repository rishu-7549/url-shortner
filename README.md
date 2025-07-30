<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

A secure and scalable URL Shortener backend built using NestJS, MongoDB, and JWT-based authentication, inspired by services like Bit.ly. The system enables users to convert long URLs into short, shareable links, track usage statistics, and ensure secure access through authentication and rate limiting.

✅ Key Features:
• Short URL Generation: Converts long URLs into custom or auto-generated short codes.

• Redirection Logic: Redirects users to the original URL via /r/:shortCode.

• User Authentication: Secure login and registration endpoints with JWT token support (/auth/register, /auth/login).

• Authorization-Protected Endpoints: Only authenticated users can shorten URLs or view stats.

• API Token Handling: JWT is required in headers for protected routes like /api/shorten and /api/stats/:shortCode.

• Stats & Debug Endpoints: Track number of visits per short URL (/api/stats/:shortCode and /api/ debug/:shortCode).

• Rate Limiting: Prevents abuse using @nestjs/throttler to limit API calls per user.

• Swagger Documentation: Fully documented APIs accessible at /docs.

🛠️ Tech Stack:
• Backend Framework: NestJS (TypeScript)

• Database: MongoDB (Mongoose ODM)

• Authentication: JWT (Passport.js Strategy)

• Rate Limiting: @nestjs/throttler

• API Docs: Swagger (OpenAPI 3)

• Validation & Error Handling: NestJS Pipes and Filters

## Project setup

clone this repository--
https://github.com/rishu-7549/url-shortner.git

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Deployed Link--- https://url-shortner-8a76.onrender.com

Swagger Documentation
You can explore and test all your API endpoints through Swagger.
Just visit: http://localhost:3000/docs
Swagger provides a user-friendly interface for making requests, viewing schemas, and trying out secured endpoints with JWT tokens.

---

🔐 Authentication Endpoints
• POST /auth/register
Allows new users to register by providing their email and password.
• POST /auth/login
Authenticates a user and returns a JWT token. This token must be used in the Authorization header for protected routes.

---

✂️ URL Shortening Endpoints
• POST /api/shorten
Creates a short URL from a long one. This endpoint requires authentication. Include your JWT token as Authorization: Bearer <token>.
• GET /r/:shortCode
Publicly accessible endpoint that redirects to the original long URL based on the provided short code.

---

📊 URL Analytics Endpoints
• GET /api/stats/:shortCode
Returns visit statistics for a specific short URL. Only the user who created the short URL can access its stats. Authentication is required.
• GET /api/debug/:shortCode
A public debug endpoint to fetch information about a shortened URL, useful for testing without authentication.
