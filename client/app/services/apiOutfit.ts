import { Outfit } from "../Interfaces";

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function postOutfit (outfit: Outfit) {
  try {
    const response = await fetch(`${url}/outfit/add`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(outfit),
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function editOutfit(id: string, outfit: Outfit) {
  try {
    const response = await fetch(`${url}/outfit/edit/${id}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(outfit),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error editing the outfit');
  }
}

export async function deleteOutfit(id: string) {
  try {
    const response = await fetch(`${url}/outfit/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting the outfit');
  }
}