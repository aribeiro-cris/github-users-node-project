# GitHub Users Node & TypeScript Project

This project is a Node.js and TypeScript application that fetches user data from GitHub and stores it in a PostgreSQL database. The application can display user data, list all stored users, and filter users based on location or programming languages using the command-line options. The database migration was setup using Knex.

## Main features

- Fetch user data from GitHub using the username. It will display name, location, followers, following and programming languages which the candidates is proficient.
- Stores user fetched data from GitHub in a PostgreSQL database. 
- Display all stores users on the database.
- Filter users by location or programming language.

## Prerequesites

1. Refer to https://nodejs.org/en/ to install node.js on your machine.

2. Clone the repository to your local machine:

```
    git clone git@github.com:aribeiro-cris/github-users-node-project
```

3. Navigate to the project directory:

```
cd github-users-node-project
```
4. Install dependencies:
```
npm install
```
5. Setup PostgreSQL database:
    - Create a `.env` file in the root of the project with the following content:
      ```
      DB_HOST=your_db_host
      DB_PORT=your_db_port
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      ```
    - Create a new database called `users_github` on PostgreSQL.   
    - Run database migrations on the command line:
      ```
      npx knex migrate:latest --env development
      ``` 

## Running the application

1. Fetch and store a GitHub user's data:
```
npm run start-dev fetch <username>
``` 
2. Display all users:
```
npm run start-dev list
``` 
3. Filter users from a specific location:
```
npm run start-dev location <location>
``` 
4. Filter users usigin a specific programming language:
```
npm run start-dev language <language>
``` 

## Database Schema

The PostgreSQL database schema includes a users table with the following columns:
- id (Primary key)
- name (String, not nullable)
- location (String, nullable)
- following (Integer, not nullable)
- followers (Integer, not nullable)
- languages (Array of text)

## Dependencies

### API Dependencies
- **GitHub external API**: Used to fetch user data and repository languages. You may need to provide an access token if you encounter rate limits.

### Language Dependencies
- **Node.js**: JavaScript runtime used to run the application.
- **TypeScript**: Superset of JavaScript that adds static typing.

### Node.js Packages
- **pg-promise**: Library for interfacing with PostgreSQL.
- **knex**: SQL query builder for Node.js, used for database migrations.
- **node-fetch**: Library for making HTTP requests.
- **dotenv**: Library for loading environment variables from a `.env` file.
- **eslint**: Pluggable linting utility for JavaScript and TypeScript.
- **@types/node**: TypeScript definitions for Node.js.

### Development Dependencies
- **nodemon**: Utility that monitors for changes in the code and automatically restarts the server.
- **ts-node**: TypeScript execution environment for Node.js.