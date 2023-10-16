import { RegisterUser, LoginUser, User } from "../Interfaces";

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function registerUser (user: RegisterUser) {
  try {
    const response = await fetch(`${url}/users/signup`, {
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

export async function loginUser (user: LoginUser) {
  try {
    const response = await fetch(`${url}/users/signin`, {
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

export async function updateUser (userId: string, user: User) {
  try {
    const response = await fetch(`${url}/users/${userId}/upload`, {
      method: "PUT",
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