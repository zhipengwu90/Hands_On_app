import axios from "axios";
import API_KEY from './apiKey';


async function authenticate(mode, name, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    displayName: name,
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // console.log(response.data);
  const respondData = response.data;
  return respondData;
}

async function loginAuth(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // console.log(response.data);
  const respondData = response.data;
  const token = response.data.idToken;
  return respondData;
}

export function createUser(name, email, password) {
  return authenticate("signUp", name, email, password);
}

export function login(email, password) {
  return loginAuth("signInWithPassword", email, password);
}
