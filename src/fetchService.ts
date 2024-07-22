//const fetchAPI = require('node-fetch');
import fetch from 'node-fetch';
const API_URL = 'https://api.github.com/users/';

interface UserResponse {
    name: string;
    location?: string;
    following: number;
    followers: number;
    //repos_url: string;
}

interface User {
    name: String;
    location?: String;
    followingNumber?: Number;
    followersNumber?: Number;
    //languages?: string[];
}

const fetchUserFromGithub = async (username: string) => {
    try {
        const response = await fetch(`${API_URL}${username}`);

        if(!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        let data: UserResponse = await response.json() as UserResponse;

        const user: User = {
            name: data.name,
            location: data.location,
            followingNumber: data.following,
            followersNumber: data.followers,
            //languages: // await another fetch from repost_url??
        };

        return user;

    } catch (err) {
        console.log(`Error fetching data: ${err}`);
    }
}

export default fetchUserFromGithub;