import { registerUser, logUser } from "../Interfaces";

const url = process.env.BASE_URL

export async function registerUser (user: registerUser) {
  try {
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser (user: logUser) {
  try {
    const response = await fetch(`${url}/signin`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}