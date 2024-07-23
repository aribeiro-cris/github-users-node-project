import fetchUserFromGithub from './fetchService.js'; 

//command line args
const args = process.argv.slice(2); //creates an array with the args passing starting on index 2 (third element)

if (args.length === 0) {
  console.log('Please provide some input on the command line.');
} else {
  const username = args[0]; //index zero

  fetchUserFromGithub(username).then(user => {
    if(user) {
      console.log(`Name: ${user.name}`);
      console.log(`Following: ${user.followingNumber}`);
      console.log(`Followers: ${user.followersNumber}`);

      if(user.languages) {
        console.log(`Languages: ${user.languages.join(', ')}`);
      }
      
    }
  }
  )
}
