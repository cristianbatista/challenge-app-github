# Challenge - API Users Github 
[![Build Status](https://travis-ci.org/cristianbatista/challenge-app-github.svg?branch=master)](https://travis-ci.org/cristianbatista/challenge-app-github)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

NodeJs 8x

NPM 3.5x

PostgreSQL 11

Docker-compose

### Installing

* Up database
```
docker-compose -f postgres-db.yml up
```

* Install dependencies
```
npm install
```

* Apply migrations
```
cd src 
sequelize db:migrate
```

* Start api
```
npm start
```

### Running the tests

* Execute test
```
npm test
```

* Execute test and coverage
```
npm run coverage
```

### API Docs

* Swagger - Routes and contracts

```
http://localhost:3000/swagger
```

### CI/CD

* [TravisCI](https://travis-ci.org/cristianbatista/challenge-app-github)
* [Heroku](https://dashboard.heroku.com/apps/challenge-app-github)
* Endpoint publish API: `https://challenge-app-github.herokuapp.com/swagger`

### Workflow data

1) create user
```
curl -X POST \
  http://localhost:3000/api/user \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "username": "cbt_silva",
    "name": "cristian",
    "password": "cbs123"
}'
```

2) authenticate user (get token in response)
```
curl -X POST \
  http://localhost:3000/api/user/authenticate \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "username": "cbt_silva",
    "password": "Y2JzMTIz"
}'
```

3) search github users
```
curl -X GET \
  'http://challenge-app-github.herokuapp.com/api/github-user?offset=1&limit=30&followers=100&language=java&location=brazil&token=NgQ3hsinBbcTbbWT8QP5nk' \
  -H 'cache-control: no-cache'
```