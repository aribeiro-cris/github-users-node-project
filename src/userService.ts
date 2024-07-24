import db from "./database.js";

const saveUserQuery = `INSERT INTO users 
                    (name, location, following, followers, languages)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id`;

const showAllUsersQuery = `SELECT * FROM users;`;

const usersPerLocationQuery = `SELECT * FROM users WHERE location = $1`;

const usersPerLanguageQuery = `SELECT * FROM users WHERE $1 = ANY(languages)`;

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
    console.log(`Error while accessing users stored in the database: ${err}`);
  }
}

export const showUsersPerLocation = async (location: string) => {
  try {
    const users = await db.any(usersPerLocationQuery, location);

    if (users.length === 0) {
      console.log(`No users living on ${location} in the database.`)
      return;
    }
        
    console.log(`Users on database living in ${location}:`);
    users.forEach((user) => {
      console.log(`User ID: ${user.id}, Name: ${user.name}`);
    });
  } catch (err) {
    console.log(`Error while acessing all users from ${location}: ${err}`);

  }
}

export const showUsersPerLanguage = async (language: string) => {
  try {
    const users = await db.any(usersPerLanguageQuery, [language]);

    if (users.length === 0) {
      console.log(`No users using ${language} stored in the database.`)
      return;
    }
        
    console.log(`Users on database using ${language}:`);
    users.forEach((user) => {
      console.log(`User ID: ${user.id}, Name: ${user.name}`);
    });
  } catch (err) {
    console.log(`Error while acessing all users using ${language}: ${err}`);

  }
}