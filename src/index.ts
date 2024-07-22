//command line args
const args = process.argv.slice(2); //creates an array with the args passing starting on index 2 (third element)

if (args.length === 0) {
  console.log('Please provide some input on the command line.');
} else {
  const name = args[0]; //index zero
  const surname = args[1]; //index 1
  console.log(`Hello, ${name} ${surname}!`);
}
