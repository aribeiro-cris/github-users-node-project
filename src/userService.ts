import db from "./database.js";

const saveUserQuery = `INSERT INTO users (name, location, following, followers, languages)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id`;

const showAllUsersQuery = `SELECT * FROM users;`;

interface User {
    name: string,
    location?: string,
    followingNumber: number,
    followersNumber: number,
    languages?: string[];
}

export const saveUser = async (user: User) => {
    try {
        const saveUser = await db.one(saveUserQuery, [
            user.name,
            user.location,
            user.followingNumber,
            user.followersNumber,
            user.languages
        ]);
        console.log(`User created on the database with ID: ${saveUser.id}`);
    } catch (err) {
        console.log(`Error while trying to save user to database: ${err}`);
    }
}

export const showAllUsers = async () => {
    try {
        const users = await db.any(showAllUsersQuery);
        console.log(`Users on the database:`);
        users.forEach((user) => {
            console.log(`User ID: ${user.id}, Name: ${user.name}`);
        })
    } catch (err) {
        console.log(`Error while trying to access all users stored in the database: ${err}`);
    }
}