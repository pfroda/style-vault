interface Closet {
  id: string
  userId: string
  name: string
  // item: item[]
  // outfit outfit[]
}

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function postCloset (closet: Closet) {
  try {
    const response = await fetch(`${url}/closet/add`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(closet),
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function editCloset(id: string, closet: Closet) {
  try {
    const response = await fetch(`${url}/closet/edit/${id}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(closet),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error editing the closet');
  }
}

export async function deleteCloset(id: string) {
  try {
    const response = await fetch(`${url}/closet/delete/${id}`, {
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
    throw new Error('Error deleting the closet');
  }
}