import { Item } from "../Interfaces";

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function addItem (item: Item) {
  try {
    const response = await fetch(`${url}/item/add`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item)
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}