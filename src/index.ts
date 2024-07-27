import fetchUserFromGithub from './githubFetcher.js'; 
// eslint-disable-next-line max-len
import {saveUser, showAllUsers, UsersPerLocation, UsersPerLanguage, ExistingUser} from './databaseOperations.js';

export async function main() {
//command line args
  const args = process.argv.slice(2); //array with the args passing on index 2

  if (args.length === 0) {
    console.log('Please provide some input on the command line.');
    return;
  }

  const command = args[0];

  if (command === 'fetch') {
    const username = args[1];

    if(!username) {
      console.log(`Please add an username from an user to be fetch.`);
      return;
    }

    fetchUserFromGithub(username).then(async (user) => {
      if(user) {
        const existingUser = await ExistingUser(user.github_id);
      
        if (existingUser) {
          return;
        }

        await saveUser(user);
        console.log(`Name: ${user.name}`);
        if(user.location) {
          console.log(`Location: ${user.location}`);
        }
        console.log(`Following: ${user.following}`);
        console.log(`Followers: ${user.followers}`);
    
        if(user.languages) {
          console.log(`Languages: ${user.languages.join(', ')}`);
        }
      }
    });
  } else if(command === 'list') {
    await showAllUsers();
  } else if(command === 'location') {
    const location = args[1];

    if(!location) {
      console.log(`Please add a location to display users from database.`);
      return;
    }

    await UsersPerLocation(location);
  
  } else if(command === 'language') {
    const language = args[1];

    if(!language) {
      console.log(`Please add a language to be display users from database.`);
      return;
    }

    await UsersPerLanguage(language);
  }
}

main();