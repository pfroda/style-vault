import { Item, Outfit, Closet  } from "../Interfaces"

const GRAPHQL_URL = "http://localhost:3001/graphql";

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

const fetchGraphQL = <T = any>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>> => {
  return fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());
};

export const queryItems = (userId: string): Promise<GraphQLResponse<{ getItems: Item[] }>> => {
  const query = `
    query Query($userId: String!){
      getItems(userId: $userId) {
        id
        itemUrl
        category
        color
        occasion
        season
        brand
      }
    }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryItemById = (id: number): Promise<GraphQLResponse<{ getItemById: Item }>> => {
  const query = `
    query Query($id: Int!) {
      getItemById(id: $id) {
        id
        itemUrl
        category
        color
        occasion
        season
        brand
      }
    }
  `;
  return fetchGraphQL(query, { id });
};

export const queryOutfits = (userId: string): Promise<GraphQLResponse<{ getOutfits: Outfit[] }>> => {
  const query = `
    query Query($userId: String!) {
      getOutfits($userId: String!) {
        id
        name
        occasion
        season
      }
    }
  `;
  return fetchGraphQL(query, {userId});
};

export const queryOutfitById = (id: number): Promise<GraphQLResponse<{ getOutfitById: Outfit }>> => {
  const query = `
    query Query($id: Int!) {
      getOutfitById(id: $id) {
        id
        name
        occasion
        season
      }
    }
  `;
  return fetchGraphQL(query, { id });
};

export const queryClosets = (userId: string): Promise<GraphQLResponse<{ getClosets: Closet[] }>> => {
  const query = `
    query Query($userId: String!) {
      getClosets(userId: $userId) {
        id
        name
        userId
      }
    }
  `;
  return fetchGraphQL(query, {userId});
};

export const queryClosetById = (id: number): Promise<GraphQLResponse<{ getClosetById: Closet }>> => {
  const query = `
    query Query($id: Int!) {
      getClosetById(id: $id) {
        id
        name
        userId
      }
    }
  `;
  return fetchGraphQL(query, { id });
};

export const queryItemsByCategory = (category: string): Promise<GraphQLResponse<{ getItemsByCategory: Item[] }>> => {
  const query = `
    query Query($category: String!) {
      getItemsByCategory(category: $category) {
        id
        itemUrl
        category
        color
        occasion
        season
        brand
      }
    }
  `;
  return fetchGraphQL(query, { category });
};

export const queryItemsByCloset = (closetId: number): Promise<GraphQLResponse<{ getItemsByCloset: Item[] }>> => {
  const query = `
    query Query($closetId: Int!) {
      getItemsByCloset(closetId: $closetId) {
        id
        itemUrl
        category
        color
        occasion
        season
        brand
      }
    }
  `;
  return fetchGraphQL(query, { closetId });
};

export const queryOutfitsByCloset = (closetId: number): Promise<GraphQLResponse<{ getOutfitsByCloset: Outfit[] }>> => {
  const query = `
    query Query($closetId: Int!) {
      getOutfitsByCloset(closetId: $closetId) {
        id
        name
        occasion
        season
      }
    }
  `;
  return fetchGraphQL(query, { closetId });
};










// const GRAPHQL_URL = 'http://localhost:3001/graphql'; // TODO env var

// interface QueryResult {
//   getItemById: {
//     itemUrl: string;

//   };
// }

// export const queryItems = (id: number): Promise<QueryResult> => {
//   return fetch(GRAPHQL_URL, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//         query Query($id: Int!) {
//           getItemById(id: $id) {
//             itemUrl
//           }
//         }
//       `,
//       variables: { id }
//     })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (data.errors) {
//       throw new Error(data.errors.map((error: any) => error.message).join(', '));
//     }
//     return data.data as QueryResult;
//   })
//   .catch(error => {
//     console.error('Fetch error: ', error);
//     throw error; 
//   });
// }












// const GRAPHQL_URL = 'http://localhost:3001/graphql'; // TODO env var

// export const queryItems = () => {
//   return fetch(GRAPHQL_URL, {
//     method: "POST",
//     body: JSON.stringify({
//       query: `
//         query Query($id: Int!) {
//           getItemById(id: $id) {
//             itemUrl
//           }
//         }
//       `,
//       variables: { id }
//     })
//   })
// }

// export const queryItemsByColor = (color: string) => {
//   return fetch(GRAPHQL_URL, {
//     method: "POST",
//     body: JSON.stringify({
//       query: `
//         query ExampleQuery($color: String!)) {
//           getItemByColor(color: $color) {
//             itemUrl
//             id
//             color
//           }
//         }
//       `,
//       variables: { color }
//     })
//   })
// }