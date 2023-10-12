import { Item } from "../Interfaces";

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function postItem (item: Item) {
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

export async function editItem(id: string, item: Item) {
  try {
    const response = await fetch(`${url}/item/edit/${id}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error editing the item');
  }
}

export async function deleteItem(id: string) {
  try {
    const response = await fetch(`${url}/item/delete/${id}`, {
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
    throw new Error('Error deleting the item');
  }
}