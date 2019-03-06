require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
    portDB: 5432,
    apiGithub: "https://api.github.com"
  },
  test: {
    username: "postgres",
    password: "root",
    database: "postgres",
    host: "172.17.0.2",
    dialect: "postgres",
    portDB: 5432,
    apiGithub: "https://api.github.com"
  },
  production: {
    username:  process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE ,
    host: process.env.HOST_DB,
    dialect: "postgres",
    portDB: process.env.PORT_DB,
    apiGithub: "https://api.github.com"
  }
}