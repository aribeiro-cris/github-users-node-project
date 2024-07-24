//const fetchAPI = require('node-fetch');
import fetch from 'node-fetch';
const API_URL = 'https://api.github.com/users/';

interface UserFetchResponse {
    name: string;
    location?: string;
    following: number;
    followers: number;
    repos_url: string;
}

interface User {
    name: string;
    location?: string;
    followingNumber: number;
    followersNumber: number;
    languages?: string[];
}

const fetchUserFromGithub = async (username: string) => {
  try {
    const response = await fetch(`${API_URL}${username}`);

    if(!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data: UserFetchResponse = await response.json() as UserFetchResponse;

    const user: User = {
      name: data.name,
      location: data.location,
      followingNumber: data.following,
      followersNumber: data.followers,
      languages: await fetchLanguagesFromUser(data.repos_url),
    };
    return user;
  } catch (err) {
    console.log(`Error fetching user data: ${err}`);
  }
}

const fetchLanguagesFromUser = async (reposUrl: string): Promise<string[]> => {
  try {
    const response = await fetch(reposUrl);

    if(!response.ok) {
      throw new Error(`Error fetching repos data: ${response.status}`);
    }

    const repositories = await response.json() as { languages_url: string }[];
    const languages: string[] = [];

    for (const repository of repositories) {
      const repoLanguages = await fetchLanguages(repository.languages_url);
      repoLanguages.forEach(language => {
        //check if language already exists on the languages array
        if (!languages.includes(language)) {
          languages.push(language);
        }
      });
    }

    console.log(languages);
    return languages;
  } catch (err) {
    console.log(`Error fetching repositories data: ${err}`);
    return [];
  }
}

const fetchLanguages = async(languagesUrl: string) => {
  try {
    const response = await fetch(languagesUrl);

    if(!response.ok) {
      throw new Error(`Error fetching languages data: ${response.status}`)
    }

    const languages = await response.json() as { [key:string]: string};
    return Object.keys(languages);
  } catch (err) {
    console.log(`Error fetching languages data: ${err}`);
    return [];
  }
}

export default fetchUserFromGithub;