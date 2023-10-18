import { Item, Outfit, Closet, ActivityFeed, User } from "../Interfaces"

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

export const queryItems = (filters: {
  userId: string;
  color?: string[];
  occasion?: string[];
  season?: string[];
  location?: string;
  category?: string;
  brand?: string[];
}): Promise<GraphQLResponse<{ getItems: Item[] }>> => {
  const query = `
    query Query(
      $userId: String!,
      $color: [String],
      $occasion: [String],
      $season: [String],
      $location: String,
      $category: String,
      $brand: [String]
    ){
      getItems(
        userId: $userId,
        color: $color,
        occasion: $occasion,
        season: $season,
        location: $location,
        category: $category,
        brand: $brand
      ) {
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
  return fetchGraphQL(query, filters);
};

export const queryItemById = (userId: string, id: string): Promise<GraphQLResponse<{ getItemById: Item }>> => {
  const query = `
    query Query($userId: String!, $id: String!) {
      getItemById(userId: $userId, id: $id) {
        id
        itemUrl
        category
        color
        occasion
        location
        season
        brand
      }
    }
  `;
  return fetchGraphQL(query, { userId, id });
};

export const queryOutfits = (userId: string): Promise<GraphQLResponse<{ getOutfits: Outfit[] }>> => {
  const query = `
    query Query($userId: String!) {
      getOutfits(userId: $userId) {
        id
        name
        outfitUrl
      }
    }
  `;
  return fetchGraphQL(query, {userId});
};

export const queryOutfitById = (userId: string, id: string): Promise<GraphQLResponse<{ getOutfitById: Outfit }>> => {
  const query = `
    query Query($userId: String!, $id: String!) {
      getOutfitById(userId: $userId, id: $id) {
        id
        name
        occasion
        season
      }
    }
  `;
  return fetchGraphQL(query, { userId, id });
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

export const queryClosetById = (userId: string, id: string): Promise<GraphQLResponse<{ getClosetById: Closet }>> => {
  const query = `
    query Query($userId: String!, $id: String!) {
      getClosetById(userId: $userId, id: $id) {
        id
        name
        userId
      }
    }
  `;
  return fetchGraphQL(query, { userId, id });
};

export const queryItemsByCategory = (userId: string, category: string): Promise<GraphQLResponse<{ getItemsByCategory: Item[] }>> => {
  const query = `
    query Query($userId: String!, $category: String!) {
      getItemsByCategory(userId: $userId, category: $category) {
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
  return fetchGraphQL(query, { userId, category });
};

export const queryItemsByCloset = (id: string): Promise<GraphQLResponse<{ getItemsByCloset: Item[] }>> => {
  const query = `
    query Query($id: String!) {
      getItemsByCloset(id: $id) {
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

export const queryOutfitsByCloset = (id: string): Promise<GraphQLResponse<{ getOutfitsByCloset: Outfit[] }>> => {
  const query = `
    query Query($id: String!) {
      getOutfitsByCloset(id: $id) {
        id
        name
        occasion
        season
      }
    }
  `;
  return fetchGraphQL(query, { id });
};

export const queryColors = (userId: string): Promise<GraphQLResponse<{ getColors: string[] }>> => {
  const query = `
    query Query($userId: String!) {
      getColors(userId: $userId)
    }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryBrands = (userId: string): Promise<GraphQLResponse<{ getBrands: string[] }>> => {
  const query = `
    query Query($userId: String!) {
      getBrands(userId: $userId)
    }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryOccasions = (userId: string): Promise<GraphQLResponse<{ getOccasions: string[] }>> => {
  const query = `
    query Query($userId: String!) {
      getOccasions(userId: $userId)
    }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryLocations = (userId: string): Promise<GraphQLResponse<{ getLocations: string[] }>> => {
  const query = `
    query Query($userId: String!) {
      getLocations(userId: $userId)
    }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryUsersForSearch = (username: string) : Promise<GraphQLResponse<{ getAllUsers: User[] }>> => {
  const query = `
  query Query {
    getAllUsers {
      id
      username
      profilePicture
    }
  }
  `;
  return fetchGraphQL(query, {username});
};

export const queryFavoritedOutfits = (userId: string): Promise<GraphQLResponse<{ getFavoritedOutfits: Outfit[] }>> => {
  const query = `
  query Query($userId: String!) {
    getFavoriteOutfits(userId: $userId) {
      id
      outfitId
      outfit {
        userId
        name
        occasion
        season
        closets {
          id
          userId
          name
        }
      }
    }
  }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryFavoritedItems = (userId: string): Promise<GraphQLResponse<{ getFavoritedItems: Item[] }>> => {
  const query = `
  query Query($userId: String!) {
    getFavoriteItems(userId: $userId) {
      id
      itemId
      item {
        id
        userId
        category
        itemUrl
        occasion
        season
        color
        brand
        closets {
          id
          userId
          name
        }
      }
    }
  }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryUserProfile = (id: string) : Promise<GraphQLResponse<{ getUserProfile: User }>> => {
  const query = `
  query Query {
    getAllUsers {
      id
      username
      profilePicture
      name
      closets {
        id
        userId
        name
        items {
          userId
          id
          category
          itemUrl
          occasion
          season
          color
          brand
        }
        outfits {
          id
          userId
          name
          occasion
          season
        }
      }
      followers {
        id
        username
        profilePicture
      }
      following {
        id
        username
        profilePicture
      }
      followersCount
      followingCount
    }
  }
  `;
  return fetchGraphQL(query, { id });
};

export const queryUserItems = (userId: string) : Promise<GraphQLResponse<{ getUserItems: Item[] }>> => {
  const query = `
  query Query($userId: String!) {
    getUserItems(userId: $userId) {
      id
      category
      itemUrl
    }
  }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryItemsFromUserCloset = (userId: string): Promise<GraphQLResponse<{ getItemsFromUserCloset: Item[] }>> => {
  const query = `
  query Query($userId: String!, $closetId: String!) {
    getItemsFromUserCloset(userId: $userId, closetId: $closetId) {
      id
      userId
      closets {
        id
        name
      }
      category
      itemUrl
      occasion
      season
      color
      brand
      location
    }
  }
  `;
  return fetchGraphQL(query, { userId });
};

export const queryOutfitsFromUserCloset = (userId: string): Promise<GraphQLResponse<{ getOutfitsFromUserCloset: Outfit[] }>> => {
  const query = `
  query Query($userId: String!, $closetId: String!) {
    getOutfitsFromUserCloset(userId: $userId, closetId: $closetId) {
      id
      userId
      name
      closets {
        id
        name
      }
      occasion
      season
    }
  }
  
  `;
  return fetchGraphQL(query, { userId });
};

