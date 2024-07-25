import fetchUserFromGithub from './fetchService.js'; 
// eslint-disable-next-line max-len
import {saveUser, showAllUsers, UsersPerLocation, UsersPerLanguage} from './userService.js';

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
        await saveUser(user);
        console.log(`Name: ${user.name}`);
        console.log(`Following: ${user.following}`);
        console.log(`Followers: ${user.followers}`);
    
        if(user.languages) {
          console.log(`Languages: ${user.languages.join(', ')}`);
        }
      }
    });
  } else if(command === 'list') {
    showAllUsers();
  } else if(command === 'location') {
    const location = args[1];

    if(!location) {
      console.log(`Please add a location to display users from database.`);
      return;
    }

    UsersPerLocation(location);
  
  } else if(command === 'language') {
    const language = args[1];

    if(!language) {
      console.log(`Please add a language be display users from database.`);
      return;
    }

    UsersPerLanguage(language);
  }
}

main();